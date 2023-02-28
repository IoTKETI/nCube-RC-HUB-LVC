<template>
    <v-container class="lte_rc mx-n2" fluid>
        <v-row>
            <v-col cols="6" class="mr-n16 ml-16">
                <v-row justify="center" class="ml-5 mr-n8">
                    <v-col cols="10">
                        <v-progress-linear
                            class="mt-2"
                            v-model="ch_value.ch1_value"
                            height="40"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: 3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Roll <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch1_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="2">
                    </v-col>
                </v-row>
                <v-row justify="center" style="height: 100px;">
                    <v-col cols="3" align-self="end">
                    </v-col>
                    <v-col cols="6" class="mt-16 pt-16 ml-n16 text-center">
                        <h3 style="font-weight: bold">[ {{ fltmode }} ]</h3>
                    </v-col>
                    <v-col cols="3" align-self="end">
                    </v-col>
                </v-row>
                <v-row align="center"
                       style="height: 100px;"
                       justify="center">
                    <v-col cols="6" class="ml-n16">
                        <v-progress-linear
                            class="progress-vertical"
                            v-model="ch_value.ch2_value"
                            height="50"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: -3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Pitch <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch2_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="6">
                        <v-progress-linear
                            class="progress-vertical"
                            v-model="ch_value.ch3_value"
                            height="50"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: -3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Throttle <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch3_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                </v-row>
                <v-row class="mt-16 pt-13" justify="center">
                    <v-col cols="1" class="ml-n12">
                    </v-col>
                    <v-col cols="10">
                        <v-progress-linear
                            v-model="ch_value.ch4_value"
                            height="40"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: 3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Yaw <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch4_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="1" class="mt-n2">
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="6" class="pl-n16">
                <v-row justify="center">
                    <v-col cols="10">
                        <v-progress-linear
                            class="mt-2"
                            v-model="ch_value.ch17_value"
                            height="40"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: 3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Pan <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch17_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="2">
                    </v-col>
                </v-row>
                <v-row justify="end" style="height: 108px;">
                    <v-col cols="6" align="center">
                    </v-col>
                </v-row>
                <v-row align="center"
                       style="height: 88px;">
                    <v-col cols="2"></v-col>
                    <v-col cols="6" align-self="center">
                        <v-progress-linear
                            class="progress-vertical"
                            v-model="ch_value.ch18_value"
                            height="50"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: -3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Tilt <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch18_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                </v-row>
                <v-row class="mt-16 pt-14" justify="center">
                    <v-col cols="10">
                        <v-progress-linear
                            v-model="ch_value.ch19_value"
                            height="40"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: 3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Zoom <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch19_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="2" class="mt-n2">
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-divider class="mt-n5"></v-divider>
        <v-row class="mt-n4 ml-3">
            <v-col cols="6" class="mr-n16 ml-14">
                <v-row class="ml-3">
                    <v-col cols="5">
                        <v-progress-linear
                            v-model="ch_value.ch5_value"
                            height="40"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: 3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Radio 5 <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch5_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="5">
                        <v-progress-linear
                            v-model="ch_value.ch10_value"
                            height="40"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: 3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Radio 10 <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch10_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                </v-row>
                <v-row class="ml-3 mt-sm-n1">
                    <v-col cols="5">
                        <v-progress-linear
                            v-model="ch_value.ch6_value"
                            height="40"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: 3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Radio 6 <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch6_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="5">
                        <v-progress-linear
                            v-model="ch_value.ch11_value"
                            height="40"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: 3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Radio 11 <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch11_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                </v-row>
                <v-row class="ml-3 mt-sm-n1">
                    <v-col cols="5">
                        <v-progress-linear
                            v-model="ch_value.ch7_value"
                            height="40"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: 3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Radio 7 <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch7_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="5">
                        <v-progress-linear
                            v-model="ch_value.ch12_value"
                            height="40"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: 3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Radio 12 <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch12_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                </v-row>
                <v-row class="ml-3 mt-sm-n1">
                    <v-col cols="5">
                        <v-progress-linear
                            v-model="ch_value.ch8_value"
                            height="40"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: 3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Radio 8 <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch8_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="5">
                        <v-progress-linear
                            v-model="ch_value.ch13_value"
                            height="40"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: 3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Radio 13 <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch13_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                </v-row>
                <v-row class="ml-3 mt-sm-n1">
                    <v-col cols="5">
                        <v-progress-linear
                            v-model="ch_value.ch9_value"
                            height="40"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: 3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Radio 9 <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch9_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="5">
                        <v-progress-linear
                            v-model="ch_value.ch14_value"
                            height="40"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: 3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Radio 14 <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch14_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="6" class="ml-n4">
                <v-row class="ml-3">
                    <v-col cols="5">
                        <v-progress-linear
                            v-model="ch_value.ch20_value"
                            height="40"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: 3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Radio 20 <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch20_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="5">
                        <v-progress-linear
                            v-model="ch_value.ch25_value"
                            height="40"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: 3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Radio 25 <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch25_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                </v-row>
                <v-row class="ml-3 mt-sm-n1">
                    <v-col cols="5">
                        <v-progress-linear
                            v-model="ch_value.ch21_value"
                            height="40"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: 3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Radio 21 <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch21_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="5">
                        <v-progress-linear
                            v-model="ch_value.ch26_value"
                            height="40"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: 3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Radio 26 <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch26_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                </v-row>
                <v-row class="ml-3 mt-sm-n1">
                    <v-col cols="5">
                        <v-progress-linear
                            v-model="ch_value.ch22_value"
                            height="40"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: 3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Radio 22 <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch22_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="5">
                        <v-progress-linear
                            v-model="ch_value.ch27_value"
                            height="40"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: 3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Radio 27 <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch27_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                </v-row>
                <v-row class="ml-3 mt-sm-n1">
                    <v-col cols="5">
                        <v-progress-linear
                            v-model="ch_value.ch23_value"
                            height="40"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: 3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Radio 23 <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch23_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="5">
                        <v-progress-linear
                            v-model="ch_value.ch28_value"
                            height="40"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: 3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Radio 28 <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch28_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                </v-row>
                <v-row class="ml-3 mt-sm-n1">
                    <v-col cols="5">
                        <v-progress-linear
                            v-model="ch_value.ch24_value"
                            height="40"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: 3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Radio 24 <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch24_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="5">
                        <v-progress-linear
                            v-model="ch_value.ch29_value"
                            height="40"
                            rounded
                            color="#2688ECFF"
                            background-color="#CCE5FFFF"
                            style="box-shadow: 3px 3px 2px 1px rgba(101,101,101,0.66);"
                        >
                            <span style="font-size: 23px; text-shadow: 1px 1px rgba(101,101,101,0.66);">Radio 29 <strong style="text-shadow: -1px -1px rgba(101,101,101,0);">{{ ch_raw.ch29_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import {nanoid} from "nanoid";
import mqtt from "mqtt";
import EventBus from "@/EventBus";

export default {
    name: 'RCData',

    components: {},

    data() {
        return {
            snackbar: false,
            connection: {
                host: this.$store.state.VUE_APP_MOBIUS_HOST,
                port: 8883,
                endpoint: '/mqtt',
                clean: true, // Reserved session
                connectTimeout: 4000, // Time out
                reconnectPeriod: 4000, // Reconnection interval
                // Certification Information
                clientId: 'mqttjs_rc_' + nanoid(15),
                username: 'keti_rc_server',
                password: 'keti_rc_server',
            },
            client: {
                connected: false,
            },
            subscribeSuccess: false,

            publish: {
                topic: 'topic/browser',
                qos: 0,
                payload: '{ "msg": "Hello, I am browser." }',
            },
            qosList: [
                {label: 0, value: 0},
                {label: 1, value: 1},
                {label: 2, value: 2},
            ],

            RC_RATE: 0.64,
            SBUS_RATE: 1.6,

            ch_raw: {
                ch1_raw: 1500,
                ch2_raw: 1500,
                ch3_raw: 1500,
                ch4_raw: 1500,
                ch5_raw: 1500,
                ch6_raw: 1500,
                ch7_raw: 1500,
                ch8_raw: 1500,
                ch9_raw: 1500,
                ch10_raw: 1500,
                ch11_raw: 1500,
                ch12_raw: 1500,
                ch13_raw: 1500,
                ch14_raw: 1500,
                ch15_raw: 1500,
                ch16_raw: 1500,
                ch17_raw: 1500,
                ch18_raw: 1500,
                ch19_raw: 1500,
                ch20_raw: 1500,
                ch21_raw: 1500,
                ch22_raw: 1500,
                ch23_raw: 1500,
                ch24_raw: 1500,
                ch25_raw: 1500,
                ch26_raw: 1500,
                ch27_raw: 1500,
                ch28_raw: 1500,
                ch29_raw: 1500,
                ch30_raw: 1500,
                ch31_raw: 1500,
                ch32_raw: 1500
            },

            ch_value: {
                ch1_value: 50,
                ch2_value: 50,
                ch3_value: 50,
                ch4_value: 50,
                ch5_value: 50,
                ch6_value: 50,
                ch7_value: 50,
                ch8_value: 50,
                ch9_value: 50,
                ch10_value: 50,
                ch11_value: 50,
                ch12_value: 50,
                ch13_value: 50,
                ch14_value: 50,
                ch15_value: 50,
                ch16_value: 50,
                ch17_value: 50,
                ch18_value: 50,
                ch19_value: 50,
                ch20_value: 50,
                ch21_value: 50,
                ch22_value: 50,
                ch23_value: 50,
                ch24_value: 50,
                ch25_value: 50,
                ch26_value: 50,
                ch27_value: 50,
                ch28_value: 50,
                ch29_value: 50,
                ch30_value: 50,
                ch31_value: 50,
                ch32_value: 50,
            },

            trim_count: 0,
            ch_trim: {
                ch1_trim: 1500,
                ch2_trim: 1500,
                ch3_trim: 1500,
                ch4_trim: 1500,
                ch5_trim: 1500,
                ch6_trim: 1500,
                ch7_trim: 1500,
                ch8_trim: 1500,
                ch9_trim: 1500,
                ch10_trim: 1500,
                ch11_trim: 1500,
                ch12_trim: 1500,
                ch13_trim: 1500,
                ch14_trim: 1500,
                ch15_trim: 1500,
                ch16_trim: 1500,
                ch17_trim: 1500,
                ch18_trim: 1500,
                ch19_trim: 1500,
                ch20_trim: 1500,
                ch21_trim: 1500,
                ch22_trim: 1500,
                ch23_trim: 1500,
                ch24_trim: 1500,
                ch25_trim: 1500,
                ch26_trim: 1500,
                ch27_trim: 1500,
                ch28_trim: 1500,
                ch29_trim: 1500,
                ch30_trim: 1500,
                ch31_trim: 1500,
                ch32_trim: 1500,
            },

            ch_max: {
                ch1_max: 2000,
                ch2_max: 2000,
                ch3_max: 2000,
                ch4_max: 2000,
                ch5_max: 2000,
                ch6_max: 2000,
                ch7_max: 2000,
                ch8_max: 2000,
                ch9_max: 2000,
                ch10_max: 2000,
                ch11_max: 2000,
                ch12_max: 2000,
                ch13_max: 2000,
                ch14_max: 2000,
                ch15_max: 2000,
                ch16_max: 2000,
                ch17_max: 2000,
                ch18_max: 2000,
                ch19_max: 2000,
                ch20_max: 2000,
                ch21_max: 2000,
                ch22_max: 2000,
                ch23_max: 2000,
                ch24_max: 2000,
                ch25_max: 2000,
                ch26_max: 2000,
                ch27_max: 2000,
                ch28_max: 2000,
                ch29_max: 2000,
                ch30_max: 2000,
                ch31_max: 2000,
                ch32_max: 2000
            },

            ch_min: {
                ch1_min: 1000,
                ch2_min: 1000,
                ch3_min: 1000,
                ch4_min: 1000,
                ch5_min: 1000,
                ch6_min: 1000,
                ch7_min: 1000,
                ch8_min: 1000,
                ch9_min: 1000,
                ch10_min: 1000,
                ch11_min: 1000,
                ch12_min: 1000,
                ch13_min: 1000,
                ch14_min: 1000,
                ch15_min: 1000,
                ch16_min: 1000,
                ch17_min: 1000,
                ch18_min: 1000,
                ch19_min: 1000,
                ch20_min: 1000,
                ch21_min: 1000,
                ch22_min: 1000,
                ch23_min: 1000,
                ch24_min: 1000,
                ch25_min: 1000,
                ch26_min: 1000,
                ch27_min: 1000,
                ch28_min: 1000,
                ch29_min: 1000,
                ch30_min: 1000,
                ch31_min: 1000,
                ch32_min: 1000
            },

            max: 100,

            RCstrToDrone: '',

            prev_communication_type: 'RC',
            crc8_Table: [
                0, 94, 188, 226, 97, 63, 221, 131, 194, 156, 126, 32, 163, 253, 31, 65,  // 0 ~ 15
                157, 195, 33, 127, 252, 162, 64, 30, 95, 1, 227, 189, 62, 96, 130, 220,  // 16 ~ 31
                35, 125, 159, 193, 66, 28, 254, 160, 225, 191, 93, 3, 128, 222, 60, 98,  // 32 ~ 47
                190, 224, 2, 92, 223, 129, 99, 61, 124, 34, 192, 158, 29, 67, 161, 255,		// 48 ~ 63
                70, 24, 250, 164, 39, 121, 155, 197, 132, 218, 56, 102, 229, 187, 89, 7,  // 64 ~ 79
                219, 133, 103, 57, 186, 228, 6, 88, 25, 71, 165, 251, 120, 38, 196, 154,  // 80 ~ 95
                101, 59, 217, 135, 4, 90, 184, 230, 167, 249, 27, 69, 198, 152, 122, 36,   // 96 ~ 111
                248, 166, 68, 26, 153, 199, 37, 123, 58, 100, 134, 216, 91, 5, 231, 185,  // 112 ~ 127
                140, 210, 48, 110, 237, 179, 81, 15, 78, 16, 242, 172, 47, 113, 147, 205,  // 128 ~ 143
                17, 79, 173, 243, 112, 46, 204, 146, 211, 141, 111, 49, 178, 236, 14, 80,  // 144 ~ 159
                175, 241, 19, 77, 206, 144, 114, 44, 109, 51, 209, 143, 12, 82, 176, 238,  // 160 ~ 175
                50, 108, 142, 208, 83, 13, 239, 177, 240, 174, 76, 18, 145, 207, 45, 115,  // 176 ~ 191
                202, 148, 118, 40, 171, 245, 23, 73, 8, 86, 180, 234, 105, 55, 213, 139, // 192 ~ 207
                87, 9, 235, 181, 54, 104, 138, 212, 149, 203, 41, 119, 244, 170, 72, 22,  // 208 ~ 223
                233, 183, 85, 11, 136, 214, 52, 106, 43, 117, 151, 201, 74, 20, 246, 168,  // 224 ~ 239
                116, 42, 200, 150, 21, 75, 169, 247, 182, 232, 10, 84, 215, 137, 107, 53  // 240 ~ 255
            ],

            requested: false,

            ErrorLog: {level: '', message: ''},

            fltmode: 'STABILIZE',

            rc_count: 0,
            t_rc: null
        }
    },
    methods: {
        createConnection() {
            if (this.$store.state.client.connected) {
                console.log('There is already a connected client. Destroyed connection and then reconnect.');
                this.destroyConnection()
            }
            if (!this.$store.state.client.connected) {
                const {port, endpoint, ...options} = this.connection
                const serverip = this.$store.state.VUE_APP_MOBIUS_HOST
                const connectUrl = `ws://${serverip}:${port}${endpoint}`

                try {
                    this.$store.state.client = mqtt.connect(connectUrl, options)
                } catch (error) {
                    console.log('mqtt.connect error', error)
                }
                this.$store.state.client.on('connect', () => {
                    console.log('[Local] (' + serverip + ') Connection succeeded!')

                    this.$store.state.client.publish('/RC/monitor/gcs', this.$store.state.VUE_APP_MOBIUS_GCS)

                    let topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data'
                    let qos = 0
                    this.$store.state.client.unsubscribe(topic)
                    this.$store.state.client.subscribe(topic, {qos}, (error, res) => {
                        if (error) {
                            console.log('[Local] Subscribe to topics error', error)
                        }
                        this.subscribeSuccess = true
                        EventBus.$emit('connect_state', ({"log": 'MQTT connected ', "state": "connected"}))
                        console.log('[Local] Subscribe to topics res', res)
                    })
                })
                this.$store.state.client.on('error', error => {
                    console.log('[Local] Connection failed', error)
                })
                this.$store.state.client.on('message', (topic, message) => {
                    // console.log(`Received message ${message.toString('hex')} from topic ${topic}`)
                    let topic_arr = topic.split('/')

                    if (topic_arr[3] === 'RC_Data') {
                        this.receiveFromRC(message)
                        if (!this.$store.state.connect_state) {
                            EventBus.$emit('connect_state', ({"log": 'RC signal connected ', "state": "rc connected"}))
                            this.$store.state.connect_state = true;
                        }
                        this.rc_count = 0;
                    }
                })
            }
        },
        doSubscribe() {
            if (this.$store.state.client.connected) {
                const {topic, qos} = this.subscription
                this.$store.state.client.subscribe(topic, {qos}, (error, res) => {
                    if (error) {
                        console.log('[Local] Subscribe to topics error', error)
                        // return
                    }
                    this.subscribeSuccess = true
                    console.log('[Local] Subscribe to topics res', res)
                })
            }
        },
        doUnSubscribe() {
            if (this.$store.state.client.connected) {
                if (this.$store.state.client) {
                    const {topic} = this.subscription
                    this.$store.state.client.unsubscribe(topic, error => {
                        if (error) {
                            console.log('[Local] Unsubscribe error', error)
                        }
                    })
                }
            }
        },
        destroyConnection() {
            if (this.$store.state.client.connected) {
                try {
                    if (Object.hasOwnProperty.call(this.$store.state.client, '__ob__')) {
                        this.$store.state.client.end()
                    }

                    this.$store.state.client = {
                        connected: false,
                        loading: false
                    }
                    console.log('[Local] Successfully disconnected!')
                } catch (error) {
                    this.$store.state.client = {
                        connected: false,
                        loading: false
                    };
                    console.log('[Local] Disconnect failed', error.toString())
                }
                // EventBus.$emit('init_drone_selected')
                EventBus.$emit('connect_state', ({"log": 'MQTT disconnected ', "state": "disconnected"}))
            }
        },
        SBUS2RC(x) {
            return Math.round((x * 8 + 1 - 1000) * this.RC_RATE + 1500);
        },
        min_max_scaler(val) {
            return (val - this.SBUS2RC(0)) / (this.SBUS2RC(250) - this.SBUS2RC(0)) * 100;
        },
        receiveFromRC(hex_content_each) {
            let received_rdData = hex_content_each.toString('hex')

            this.ch_raw.ch1_raw = parseInt(received_rdData.substring(2, 4), 16)
            this.ch_raw.ch1_raw = this.SBUS2RC(this.ch_raw.ch1_raw)

            this.ch_raw.ch2_raw = parseInt(received_rdData.substring(4, 6), 16)
            this.ch_raw.ch2_raw = this.SBUS2RC(this.ch_raw.ch2_raw)

            this.ch_raw.ch3_raw = parseInt(received_rdData.substring(6, 8), 16)
            this.ch_raw.ch3_raw = this.SBUS2RC(this.ch_raw.ch3_raw)

            this.ch_raw.ch4_raw = parseInt(received_rdData.substring(8, 10), 16)
            this.ch_raw.ch4_raw = this.SBUS2RC(this.ch_raw.ch4_raw)

            this.ch_raw.ch5_raw = parseInt(received_rdData.substring(10, 12), 16)
            this.ch_raw.ch5_raw = this.SBUS2RC(this.ch_raw.ch5_raw) - 7
            if (this.ch_raw.ch5_raw <= 1230) {
                this.fltmode = "ALT_HOLD";
            } else if (this.ch_raw.ch5_raw > 1230 && this.ch_raw.ch5_raw <= 1360) {
                this.fltmode = "POS_HOLD";
            } else if (this.ch_raw.ch5_raw > 1360 && this.ch_raw.ch5_raw <= 1490) {
                this.fltmode = "LOITER";
            } else if (this.ch_raw.ch5_raw > 1490 && this.ch_raw.ch5_raw <= 1620) {
                this.fltmode = "RTL";
            } else if (this.ch_raw.ch5_raw > 1620 && this.ch_raw.ch5_raw <= 1749) {
                this.fltmode = "AUTO";
            } else if (this.ch_raw.ch5_raw >= 1750) {
                this.fltmode = "BRAKE";
            }

            this.ch_raw.ch6_raw = parseInt(received_rdData.substring(12, 14), 16)
            this.ch_raw.ch6_raw = this.SBUS2RC(this.ch_raw.ch6_raw)

            this.ch_raw.ch7_raw = parseInt(received_rdData.substring(14, 16), 16)
            this.ch_raw.ch7_raw = this.SBUS2RC(this.ch_raw.ch7_raw)

            this.ch_raw.ch8_raw = parseInt(received_rdData.substring(16, 18), 16)
            this.ch_raw.ch8_raw = this.SBUS2RC(this.ch_raw.ch8_raw)

            this.ch_raw.ch9_raw = parseInt(received_rdData.substring(18, 20), 16)
            this.ch_raw.ch9_raw = this.SBUS2RC(this.ch_raw.ch9_raw)

            this.ch_raw.ch10_raw = parseInt(received_rdData.substring(20, 22), 16)
            this.ch_raw.ch10_raw = this.SBUS2RC(this.ch_raw.ch10_raw)

            this.ch_raw.ch11_raw = parseInt(received_rdData.substring(22, 24), 16)
            this.ch_raw.ch11_raw = this.SBUS2RC(this.ch_raw.ch11_raw)

            this.ch_raw.ch12_raw = parseInt(received_rdData.substring(24, 26), 16)
            this.ch_raw.ch12_raw = this.SBUS2RC(this.ch_raw.ch12_raw)

            this.ch_raw.ch13_raw = parseInt(received_rdData.substring(26, 28), 16)
            this.ch_raw.ch13_raw = this.SBUS2RC(this.ch_raw.ch13_raw)

            this.ch_raw.ch14_raw = parseInt(received_rdData.substring(28, 30), 16)
            this.ch_raw.ch14_raw = this.SBUS2RC(this.ch_raw.ch14_raw)

            this.ch_raw.ch15_raw = parseInt(received_rdData.substring(30, 32), 16)
            this.ch_raw.ch15_raw = this.SBUS2RC(this.ch_raw.ch15_raw)

            this.ch_raw.ch16_raw = parseInt(received_rdData.substring(32, 34), 16)
            this.ch_raw.ch16_raw = this.SBUS2RC(this.ch_raw.ch16_raw)

            this.ch_raw.ch17_raw = parseInt(received_rdData.substring(34, 36), 16)
            this.ch_raw.ch17_raw = this.SBUS2RC(this.ch_raw.ch17_raw)

            this.ch_raw.ch18_raw = parseInt(received_rdData.substring(36, 38), 16)
            this.ch_raw.ch18_raw = this.SBUS2RC(this.ch_raw.ch18_raw)

            this.ch_raw.ch19_raw = parseInt(received_rdData.substring(38, 40), 16)
            this.ch_raw.ch19_raw = this.SBUS2RC(this.ch_raw.ch19_raw)

            this.ch_raw.ch20_raw = parseInt(received_rdData.substring(40, 42), 16)
            this.ch_raw.ch20_raw = this.SBUS2RC(this.ch_raw.ch20_raw)

            this.ch_raw.ch21_raw = parseInt(received_rdData.substring(42, 44), 16)
            this.ch_raw.ch21_raw = this.SBUS2RC(this.ch_raw.ch21_raw)

            this.ch_raw.ch22_raw = parseInt(received_rdData.substring(44, 46), 16)
            this.ch_raw.ch22_raw = this.SBUS2RC(this.ch_raw.ch22_raw)

            this.ch_raw.ch23_raw = parseInt(received_rdData.substring(46, 48), 16)
            this.ch_raw.ch23_raw = this.SBUS2RC(this.ch_raw.ch23_raw)

            this.ch_raw.ch24_raw = parseInt(received_rdData.substring(48, 50), 16)
            this.ch_raw.ch24_raw = this.SBUS2RC(this.ch_raw.ch24_raw)

            this.ch_raw.ch25_raw = parseInt(received_rdData.substring(50, 52), 16)
            this.ch_raw.ch25_raw = this.SBUS2RC(this.ch_raw.ch25_raw)

            this.ch_raw.ch26_raw = parseInt(received_rdData.substring(52, 54), 16)
            this.ch_raw.ch26_raw = this.SBUS2RC(this.ch_raw.ch26_raw)

            this.ch_raw.ch27_raw = parseInt(received_rdData.substring(54, 56), 16)
            this.ch_raw.ch27_raw = this.SBUS2RC(this.ch_raw.ch27_raw)

            this.ch_raw.ch28_raw = parseInt(received_rdData.substring(56, 58), 16)
            this.ch_raw.ch28_raw = this.SBUS2RC(this.ch_raw.ch28_raw)

            this.ch_raw.ch29_raw = parseInt(received_rdData.substring(58, 60), 16)
            this.ch_raw.ch29_raw = this.SBUS2RC(this.ch_raw.ch29_raw)

            this.ch_raw.ch30_raw = parseInt(received_rdData.substring(60, 62), 16)
            this.ch_raw.ch30_raw = this.SBUS2RC(this.ch_raw.ch30_raw)

            this.ch_raw.ch31_raw = parseInt(received_rdData.substring(62, 64), 16)
            this.ch_raw.ch31_raw = this.SBUS2RC(this.ch_raw.ch31_raw)

            this.ch_raw.ch32_raw = parseInt(received_rdData.substring(64, 66), 16)
            this.ch_raw.ch32_raw = this.SBUS2RC(this.ch_raw.ch32_raw)

            // For displaying to progressbar
            this.ch_value.ch1_value = this.min_max_scaler(this.ch_raw.ch1_raw)
            this.ch_value.ch2_value = this.min_max_scaler(this.ch_raw.ch2_raw)
            this.ch_value.ch3_value = this.min_max_scaler(this.ch_raw.ch3_raw)
            this.ch_value.ch4_value = this.min_max_scaler(this.ch_raw.ch4_raw)
            this.ch_value.ch5_value = this.min_max_scaler(this.ch_raw.ch5_raw)
            this.ch_value.ch6_value = this.min_max_scaler(this.ch_raw.ch6_raw)
            this.ch_value.ch7_value = this.min_max_scaler(this.ch_raw.ch7_raw)
            this.ch_value.ch8_value = this.min_max_scaler(this.ch_raw.ch8_raw)
            this.ch_value.ch9_value = this.min_max_scaler(this.ch_raw.ch9_raw)
            this.ch_value.ch10_value = this.min_max_scaler(this.ch_raw.ch10_raw)
            this.ch_value.ch11_value = this.min_max_scaler(this.ch_raw.ch11_raw)
            this.ch_value.ch12_value = this.min_max_scaler(this.ch_raw.ch12_raw)
            this.ch_value.ch13_value = this.min_max_scaler(this.ch_raw.ch13_raw)
            this.ch_value.ch14_value = this.min_max_scaler(this.ch_raw.ch14_raw)
            this.ch_value.ch15_value = this.min_max_scaler(this.ch_raw.ch15_raw)
            this.ch_value.ch16_value = this.min_max_scaler(this.ch_raw.ch16_raw)
            this.ch_value.ch17_value = this.min_max_scaler(this.ch_raw.ch17_raw)
            this.ch_value.ch18_value = this.min_max_scaler(this.ch_raw.ch18_raw)
            this.ch_value.ch19_value = this.min_max_scaler(this.ch_raw.ch19_raw)
            this.ch_value.ch20_value = this.min_max_scaler(this.ch_raw.ch20_raw)
            this.ch_value.ch21_value = this.min_max_scaler(this.ch_raw.ch21_raw)
            this.ch_value.ch22_value = this.min_max_scaler(this.ch_raw.ch22_raw)
            this.ch_value.ch23_value = this.min_max_scaler(this.ch_raw.ch23_raw)
            this.ch_value.ch24_value = this.min_max_scaler(this.ch_raw.ch24_raw)
            this.ch_value.ch25_value = this.min_max_scaler(this.ch_raw.ch25_raw)
            this.ch_value.ch26_value = this.min_max_scaler(this.ch_raw.ch26_raw)
            this.ch_value.ch27_value = this.min_max_scaler(this.ch_raw.ch27_raw)
            this.ch_value.ch28_value = this.min_max_scaler(this.ch_raw.ch28_raw)
            this.ch_value.ch29_value = this.min_max_scaler(this.ch_raw.ch29_raw)
            this.ch_value.ch30_value = this.min_max_scaler(this.ch_raw.ch30_raw)
            this.ch_value.ch31_value = this.min_max_scaler(this.ch_raw.ch31_raw)
            this.ch_value.ch32_value = this.min_max_scaler(this.ch_raw.ch32_raw)
        }
    },
    mounted() {
        this.createConnection();

        this.t_rc = setInterval(() => {
            if (this.$store.state.connect_state) {
                this.rc_count++;
                if (this.rc_count > 200) {
                    this.$store.state.connect_state = false;
                    EventBus.$emit('connect_state', ({"log": 'Waiting for RC siganl ', "state": "rc disconnected"}))
                    this.rc_count = 0;
                }
            }
        }, 30);
    },
    beforeDestroy() {
        this.destroyConnection()
    }
}
</script>

<style>
.lte_rc {
    position: absolute;
    left: 3%;
    top: -25px;
}

.progress-vertical {
    transform: rotate(270deg);
}

::-webkit-scrollbar {
    display: none;
}
</style>
