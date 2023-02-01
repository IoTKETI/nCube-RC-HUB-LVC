/**
 * Created by Wonseok Jung in KETI on 2022-12-27.
 */

const mqtt = require('mqtt');
const {nanoid} = require('nanoid');
const {SerialPort} = require("serialport");
const fs = require("fs");

let rcPort = null;
let rcPort_info = {
    Path: 'COM3',
    BaudRate: 115200
}

let rfPort = null;
let rfPort_info = {
    Path: 'COM4',
    BaudRate: 115200
}

let local_mqtt_client = null;
let gcs_sub_rc_res_topic = '/RF/RC/res';

let RCstrFromGCS = '';
let RCstrFromGCSLength = 0;

let mobius_pub_rc_topic = '/Mobius/';

let my_gcs_name = '';

let flight = {};
try {
    flight = JSON.parse(fs.readFileSync('./flight.json', 'utf8'));
} catch (e) {
    console.log('can not find [ ./flight.json ] file');
    flight.host = '127.0.0.1';
    flight.gcs = 'KETI_LVC';
    flight.drone_name = "LVC_Drone";
    flight.sysid = 251;
    flight.simul = "on";

    fs.writeFileSync('./flight.json', JSON.stringify(flight, null, 4), 'utf8');
}

retrieve_approval(flight);

function retrieve_approval(approval_info) {
    my_gcs_name = approval_info.gcs;

    mobius_pub_rc_topic = mobius_pub_rc_topic + my_gcs_name + '/RC_Data';

    local_mqtt_connect('127.0.0.1');

    rcPortOpening();
    if (approval_info.simul.toLowerCase() === 'off') {
        rfPortOpening();
    }
}

function local_mqtt_connect(serverip) {
    if (local_mqtt_client === null) {
        let connectOptions = {
            host: serverip,
            port: 1883,
            protocol: "mqtt",
            keepalive: 60,
            clientId: 'local_RC_' + nanoid(15),
            protocolId: "MQTT",
            protocolVersion: 4,
            clean: true,
            reconnectPeriod: 2000,
            connectTimeout: 30000,
            rejectUnauthorized: false
        }

        local_mqtt_client = mqtt.connect(connectOptions);

        local_mqtt_client.on('connect', function () {
            console.log('local_RC_mqtt is connected to ( ' + serverip + ' )');
            if (gcs_sub_rc_res_topic !== '') {
                local_mqtt_client.subscribe(gcs_sub_rc_res_topic);
                console.log('[local_mqtt] gcs_sub_rc_res_topic is subscribed: ' + gcs_sub_rc_res_topic);

            }
        })

        local_mqtt_client.on('message', function (topic, message) {
            if (topic === gcs_sub_rc_res_topic) {
                rcPort.write(message, () => {
                    // console.log('send to SBUS Sender - ' + message.toString('hex'));
                });
            } else {
                console.log('[local_RC_mqtt] Received ' + message.toString('hex') + ' From ' + topic);
            }

        })

        local_mqtt_client.on('error', function (err) {
            console.log('[local_RC_mqtt] error - ' + err.message);
            local_mqtt_client = null;
            local_mqtt_connect(serverip);
        })
    }
}

function rcPortOpening() {
    if (rcPort === null) {
        rcPort = new SerialPort({
            path: rcPort_info.Path,
            baudRate: parseInt(rcPort_info.BaudRate, 10),
        });

        rcPort.on('open', rcPortOpen);
        rcPort.on('close', rcPortClose);
        rcPort.on('error', rcPortError);
        rcPort.on('data', rcPortData);
    } else {
        if (rcPort.isOpen) {
            console.log('This is an already open RC port.')
        } else {
            rcPort.open();
        }
    }
}

function rcPortOpen() {
    console.log('rcPort(' + rcPort.path + '), rcPort rate: ' + rcPort.baudRate + ' open.');
}

function rcPortClose() {
    console.log('rcPort closed.');

    setTimeout(rcPortOpening, 2000);
}

function rcPortError(error) {
    console.log('[rcPort error]: ' + error.message);

    setTimeout(rcPortOpening, 2000);
}

const RC_LENGTH = 68;

function rcPortData(message) {
    RCstrFromGCS += message.toString('hex').toLowerCase();

    while (RCstrFromGCS.length >= RC_LENGTH) {
        let header1 = RCstrFromGCS.substring(0, 2);
        if (header1 === 'ff') {
            let RCData = RCstrFromGCS.substring(0, RC_LENGTH);

            /*  send to local topic */
            // to Simul
            local_mqtt_client.publish(mobius_pub_rc_topic, Buffer.from(RCData, 'hex'), () => {
                console.log(mobius_pub_rc_topic);
            });

            if (flight.simul.toLowerCase() === 'off') {
                // to real
                rfPort.write(RCData, () => {
                    console.log('Send to real drone');
                });
            }

            RCstrFromGCS = RCstrFromGCS.substring(RC_LENGTH);
            RCstrFromGCSLength = 0;
        } else {
            RCstrFromGCS = RCstrFromGCS.substring(2);
        }
    }
}

function rfPortOpening() {
    if (rfPort === null) {
        rfPort = new SerialPort({
            path: rfPort_info.Path,
            baudRate: parseInt(rfPort_info.BaudRate, 10),
        });

        rfPort.on('open', rfPortOpen);
        rfPort.on('close', rfPortClose);
        rfPort.on('error', rfPortError);
        rfPort.on('data', rfPortData);
    } else {
        if (rfPort.isOpen) {
            console.log('This is an already open RC port.');
        } else {
            rfPort.open();
        }
    }
}

function rfPortOpen() {
    console.log('rfPort(' + rfPort.path + '), rfPort rate: ' + rfPort.baudRate + ' open.');
}

function rfPortClose() {
    console.log('rfPort closed.');

    setTimeout(rfPortOpening, 2000);
}

function rfPortError(error) {
    console.log('[rfPort error]: ' + error.message);

    setTimeout(rfPortOpening, 2000);
}

function rfPortData(message) {
    rcPort.write(message, () => {
        console.log('Send res to RC')
    });
}
