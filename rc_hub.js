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
    flight = JSON.parse(fs.readFileSync('../flight.json', 'utf8'));
} catch (e) {
    console.log('can not find [ ../flight.json ] file');
    flight.host = '127.0.0.1';
    flight.gcs = 'KETI_LVC';
    flight.drone_name = "LVC_Drone";
    flight.sysid = 251;
    flight.simul = "on";

    fs.writeFileSync('../flight.json', JSON.stringify(flight, null, 4), 'utf8');
}

retrieve_approval(flight);

function retrieve_approval(approval_info) {
    my_gcs_name = approval_info.gcs;

    mobius_pub_rc_topic = mobius_pub_rc_topic + my_gcs_name + '/RC_Data';

    local_mqtt_connect('127.0.0.1');

    setTimeout(rcPortOpening, 10000);

    if (approval_info.simul.toLowerCase() === 'off') {
        console.log("====================================\n\t Using real drone \t\t\n====================================");
        rfPortOpening();
    } else {
        console.log("==============================\n\t Using SITL \t\t\n==============================");
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
            if (local_mqtt_client !== null) {
                local_mqtt_client.publish('/Mobius/' + flight.gcs + '/Mission_Data/' + flight.drone_name, Buffer.from(RCData, 'hex'), () => {
                    console.log('send Mission Data to ' + '/Mobius/' + flight.gcs + '/Mission_Data/' + flight.drone_name, RCData);
                });
            }

            if (flight.simul.toLowerCase() === 'off') {
                // to real
                if (rfPort !== null) {
                    rfPort.write(Buffer.from(RCData, 'hex'), () => {
                        console.log('Send ' + RCData + ' to real drone');
                    });
                }

                let mission_value = {};
                mission_value.target_system = my_sysid;
                mission_value.target_component = 1;
                mission_value.ch1_raw = SBUS2RC(parseInt(rc_data.substring(36, 38), 16));   // CH 18 - Tilt
                mission_value.ch2_raw = SBUS2RC(parseInt(rc_data.substring(34, 36), 16));   // CH 17 - Pan
                mission_value.ch3_raw = SBUS2RC(parseInt(rc_data.substring(38, 40), 16));   // CH 19 - Zoom
                mission_value.ch4_raw = SBUS2RC(parseInt(rc_data.substring(54, 56), 16));   // CH 27 - Gun
                // mission_value.ch4_raw = SBUS2RC(parseInt(rc_data.substring(40, 42), 16));   // CH 20
                mission_value.ch5_raw = SBUS2RC(parseInt(rc_data.substring(12, 14), 16));   // CH 6 - Drop
                mission_value.ch6_raw = SBUS2RC(parseInt(rc_data.substring(42, 44), 16));   // CH 21 - Camera direction
                mission_value.ch7_raw = SBUS2RC(parseInt(rc_data.substring(44, 46), 16));   // CH 22 - camera mode
                mission_value.ch8_raw = SBUS2RC(parseInt(rc_data.substring(46, 48), 16));   // CH 23 - sub
                mission_value.ch9_raw = SBUS2RC(parseInt(rc_data.substring(48, 50), 16));   // CH 24
                mission_value.ch10_raw = SBUS2RC(parseInt(rc_data.substring(50, 52), 16));   // CH 25
                mission_value.ch11_raw = SBUS2RC(parseInt(rc_data.substring(52, 54), 16));   // CH 26
                mission_value.ch12_raw = SBUS2RC(parseInt(rc_data.substring(56, 58), 16));   // CH 28
                mission_value.ch13_raw = SBUS2RC(parseInt(rc_data.substring(58, 60), 16));   // CH 29
                mission_value.ch14_raw = SBUS2RC(parseInt(rc_data.substring(60, 62), 16));   // CH 30
                mission_value.ch15_raw = SBUS2RC(parseInt(rc_data.substring(62, 64), 16));   // CH 31
                mission_value.ch16_raw = SBUS2RC(parseInt(rc_data.substring(64, 66), 16));   // CH 32

                try {
                    let mission_signal = mavlinkGenerateMessage(255, 0xbe, mavlink.MAVLINK_MSG_ID_RC_CHANNELS_OVERRIDE, mission_value);
                    if (mission_signal == null) {
                        console.log("mavlink message is null");
                    } else {
                        if (local_mqtt_client !== null) {
                            local_mqtt_client.publish(mobius_pub_rc_topic, Buffer.from(RCData, 'hex'), () => {
                                // console.log(mobius_pub_rc_topic, RCData);
                            });
                        }
                        if (rcPort !== null) {
                            rcPort.write(mission_signal, () => {
                                // console.log('write rcPort ' + mission_signal.toString('hex'));
                            });
                        }
                    }
                } catch (ex) {
                    console.log('[ERROR] ' + ex);
                }


            }

            RCstrFromGCS = RCstrFromGCS.substring(RC_LENGTH);
            RCstrFromGCSLength = 0;
        } else {
            console.log('wrong data - ' + RCstrFromGCS);
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
    if (rcPort !== null) {
        rcPort.write(message, () => {
            // console.log('Send res to RC')
        });
    }
}

const RC_RATE = 0.64;

function SBUS2RC(x) {
    return Math.round((x * 8 + 1 - 1000) * RC_RATE + 1500);
}

function mavlinkGenerateMessage(src_sys_id, src_comp_id, type, params) {
    const mavlinkParser = new MAVLink(null/*logger*/, src_sys_id, src_comp_id);
    try {
        var mavMsg = null;
        var genMsg = null;

        switch (type) {
            case mavlink.MAVLINK_MSG_ID_RC_CHANNELS_OVERRIDE:
                mavMsg = new mavlink.messages.rc_channels_override(params.target_system,
                    params.target_component,
                    params.ch1_raw,
                    params.ch2_raw,
                    params.ch3_raw,
                    params.ch4_raw,
                    params.ch5_raw,
                    params.ch6_raw,
                    params.ch7_raw,
                    params.ch8_raw,
                    params.ch9_raw,
                    params.ch10_raw,
                    params.ch11_raw,
                    params.ch12_raw,
                    params.ch13_raw,
                    params.ch14_raw,
                    params.ch15_raw,
                    params.ch16_raw,
                    // params.ch17_raw,
                    // params.ch18_raw,
                );
                break;
        }
    } catch (e) {
        console.log('MAVLINK EX:' + e);
    }

    if (mavMsg) {
        genMsg = Buffer.from(mavMsg.pack(mavlinkParser));
        //console.log('>>>>> MAVLINK OUTGOING MSG: ' + genMsg.toString('hex'));
    }

    return genMsg;
}
