/**
 * Created by Wonseok Jung in KETI on 2022-12-27.
 */

const mqtt = require('mqtt')
const {nanoid} = require('nanoid')
const {SerialPort} = require("serialport")
const fs = require("fs")
const axios = require("axios")

let rcPort = null
let rcPort_info = {
    Path: 'COM3',
    BaudRate: 115200
}

let local_mqtt_client = null
let gcs_sub_rc_res_topic = '/RF/RC/res'

let RCstrFromGCS = ''
let RCstrFromGCSLength = 0

let mobius_pub_rc_topic = '/Mobius/'

let my_gcs_name = ''

let flight = {};
try {
    flight = JSON.parse(fs.readFileSync('../flight.json', 'utf8'))
} catch (e) {
    console.log('can not find [ ../flight.json ] file')
    flight.approval_gcs = "LVC"
    flight.flight = "Dione"

    fs.writeFileSync('../flight.json', JSON.stringify(flight, null, 4), 'utf8')
}

retrieve_approval(flight)

function retrieve_approval(approval_info) {
    var config = {
        method: 'get',
        url: 'http://127.0.0.1:7579/Mobius/' + approval_info.approval_gcs + '/approval/' + approval_info.flight + '/la',
        headers: {
            'Accept': 'application/json',
            'X-M2M-RI': '12345',
            'X-M2M-Origin': 'SOrigin'
        }
    };

    axios(config)
        .then(function (response) {
            if (response.status === 200) {
                if (response.data.hasOwnProperty('m2m:cin')) {
                    if (response.data['m2m:cin'].hasOwnProperty('con')) {
                        if (response.data['m2m:cin'].con.hasOwnProperty('gcs')) {
                            my_gcs_name = response.data['m2m:cin'].con.gcs
                        } else {
                            my_gcs_name = 'KETI_LVC'
                        }
                        mobius_pub_rc_topic = mobius_pub_rc_topic + my_gcs_name + '/RC_Data'
                    }
                }
            }

            local_mqtt_connect('127.0.0.1')

            rcPortOpening()
        })
        .catch(function (error) {
            console.log(error);
        });

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

        local_mqtt_client = mqtt.connect(connectOptions)

        local_mqtt_client.on('connect', function () {
            console.log('local_RC_mqtt is connected to ( ' + serverip + ' )')
            if (gcs_sub_rc_res_topic !== '') {
                local_mqtt_client.subscribe(gcs_sub_rc_res_topic)
                console.log('[local_mqtt] gcs_sub_rc_res_topic is subscribed: ' + gcs_sub_rc_res_topic);

            }
        })

        local_mqtt_client.on('message', function (topic, message) {
            if (topic === gcs_sub_rc_res_topic) {
                rcPort.write(message, () => {
                    // console.log('send to SBUS Sender - ' + message.toString('hex'))
                })
            } else {
                console.log('[local_RC_mqtt] Received ' + message.toString('hex') + ' From ' + topic)
            }

        })

        local_mqtt_client.on('error', function (err) {
            console.log('[local_RC_mqtt] error - ' + err.message)
            local_mqtt_client = null
            local_mqtt_connect(serverip)
        })
    }
}

function rcPortOpening() {
    if (rcPort === null) {
        rcPort = new SerialPort({
            path: rcPort_info.Path,
            baudRate: parseInt(rcPort_info.BaudRate, 10),
        })

        rcPort.on('open', rcPortOpen)
        rcPort.on('close', rcPortClose)
        rcPort.on('error', rcPortError)
        rcPort.on('data', rcPortData)
    } else {
        if (rcPort.isOpen) {
            console.log('This is an already open RC port.')
        } else {
            rcPort.open()
        }
    }
}

function rcPortOpen() {
    console.log('rcPort(' + rcPort.path + '), rcPort rate: ' + rcPort.baudRate + ' open.');
}

function rcPortClose() {
    console.log('rcPort closed.')
}

function rcPortError(error) {
    console.log('[rcPort error]: ' + error.message)

    setTimeout(rcPortOpening, 2000)
}

let sequence = 0;
const RC_LENGTH = 68;

function rcPortData(message) {
    RCstrFromGCS += message.toString('hex').toLowerCase()

    while (RCstrFromGCS.length >= RC_LENGTH) {
        let header1 = RCstrFromGCS.substring(0, 2)
        if (header1 === 'ff') {
            let RCData = RCstrFromGCS.substring(0, RC_LENGTH)
            /* add sequence */
            // RCData = (sequence.toString(16).padStart(2, '0')) + RCData;
            // console.log(RCData)

            /*  send to local topic */
            local_mqtt_client.publish(mobius_pub_rc_topic, Buffer.from(RCData, 'hex'), ()=>{
                console.log(mobius_pub_rc_topic)
            });

            /* sequence update */
            // sequence++;
            // sequence %= 255;

            RCstrFromGCS = RCstrFromGCS.substring(RC_LENGTH);
            RCstrFromGCSLength = 0
        } else {
            RCstrFromGCS = RCstrFromGCS.substring(2);
        }
    }
}
