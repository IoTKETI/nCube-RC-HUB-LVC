/**
 * Created by Wonseok Jung in KETI on 2022-12-27.
 */

const mqtt = require('mqtt')
const {nanoid} = require('nanoid')
const fs = require("fs");
const axios = require("axios")

let local_mqtt_client = null
let sub_local_topic = '/RC/data'

let mobius_pub_rc_topic = '/Mobius/'

let my_drone_name = ''
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
                        mobius_pub_rc_topic = mobius_pub_rc_topic + my_gcs_name + '/RC_Data/'

                        if (response.data['m2m:cin'].con.hasOwnProperty('drone')) {
                            my_drone_name = response.data['m2m:cin'].con.drone
                        } else {
                            my_drone_name = 'LVC_Drone'
                        }

                        mobius_pub_rc_topic = mobius_pub_rc_topic + my_drone_name
                    }
                }
            }

            local_mqtt_connect('127.0.0.1')
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
            clientId: 'local_RC_RF_' + nanoid(15),
            protocolId: "MQTT",
            protocolVersion: 4,
            clean: true,
            reconnectPeriod: 2000,
            connectTimeout: 30000,
            rejectUnauthorized: false
        }

        local_mqtt_client = mqtt.connect(connectOptions)

        local_mqtt_client.on('connect', function () {
            console.log('local_mqtt_client is connected to ( ' + serverip + ' )')
            if (sub_local_topic !== '') {
                local_mqtt_client.subscribe(sub_local_topic)
                console.log('[local_mqtt_client] sub_local_topic is subscribed: ' + sub_local_topic)
            }
        })

        local_mqtt_client.on('message', function (topic, message) {
            // console.log('[local_mqtt_client] Received ' + message.toString() + ' From ' + topic)
            if (topic === sub_local_topic) {
                // console.log('\t[RF] ' + message.toString())
                let _msg = message.toString('hex')

                if (local_mqtt_client !== null) {
                    local_mqtt_client.publish(mobius_pub_rc_topic, Buffer.from(_msg, 'hex'), () => {
                        console.log('send to Mobius (' + mobius_pub_rc_topic + ') - ' + _msg)
                    })
                }
            } else {
                console.log('[local_mqtt_client] Received ' + message.toString() + ' From ' + topic)
            }
        })

        local_mqtt_client.on('error', function (err) {
            console.log('[local_mqtt_client] error - ' + err.message)
            local_mqtt_client = null
            local_mqtt_connect(serverip)
        })
    }
}
