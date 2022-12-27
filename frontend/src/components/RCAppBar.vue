<template>
    <v-card>
        <v-app-bar app dark dense height="50">
            <v-toolbar-title>
                <v-row no-gutters align="center" style="font-size: 23px; font-weight: bold; color: white">
                    <font-awesome-icon icon="gamepad" size="2x"/>
                    KETI nCube RC
                </v-row>
            </v-toolbar-title>

            <v-row no-gutters class="text-right justify-center mt-1">
                <v-col cols="2">
                    <v-text-field
                        dense dark hide-details outlined
                        ref="gcs"
                        v-model="gcs" :rules="gcs_rule"
                        placeholder="KETI_MUV"
                        label="GCS*"
                        style="font-size: 20px;"
                        required
                        :disabled="MOBIUS_CONNECTION_CONNECTED"
                    ></v-text-field>
                </v-col>
                <!--                <v-col cols="2">-->
                <!--                    &lt;!&ndash;                            <v-text-field hide-details ref="host" v-model="host" :rules="host_rule" placeholder="203.253.128.177" label="Host*" required></v-text-field>&ndash;&gt;-->
                <!--                    <v-text-field-->
                <!--                        class="mx-2"-->
                <!--                        dense dark hide-details outlined-->
                <!--                        ref="rc"-->
                <!--                        v-model="rc" :rules="rc_rule"-->
                <!--                        placeholder="JWS"-->
                <!--                        label="RC*"-->
                <!--                        style="font-size: 25px;"-->
                <!--                        required-->
                <!--                        :disabled="MOBIUS_CONNECTION_CONNECTED"-->
                <!--                    ></v-text-field>-->
                <!--                </v-col>-->
                <v-col cols="4" align-self="center">
                    <v-btn
                        class="mx-2 mt-n1 rounded-lg"
                        tile @click="GcsAppBarCreated"
                        elevation="4"
                        color="success"
                        style="font-size: 18px;"
                        height="40"
                        :disabled="MOBIUS_CONNECTION_CONNECTED"
                    > {{ MOBIUS_CONNECTION_TEXT }}
                    </v-btn>
                    <v-btn
                        class="mx-2 mt-n1 rounded-lg"
                        tile @click="GcsAppBarReseted"
                        elevation="2"
                        color="error"
                        style="font-size: 18px;"
                        height="40"
                        :disabled="!MOBIUS_CONNECTION_CONNECTED"
                    > {{ MOBIUS_DISCONNECTION_TEXT }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-app-bar>
    </v-card>
</template>

<script>
import EventBus from "@/EventBus";
import {nanoid} from "nanoid";

export default {
    name: "RCAppBar",
    data: function () {
        return {
            MOBIUS_DISCONNECTION_TEXT: 'Disconnect',
            MOBIUS_CONNECTION_TEXT: 'Connect',
            MOBIUS_CONNECTION_CONNECTED: false,

            gcs: localStorage.getItem('mobius_gcs') ? (localStorage.getItem('mobius_gcs')) : (this.$store.state.VUE_APP_MOBIUS_GCS),
            gcs_rule: [
                v => !!v || 'GCS 이름은 필수 입력사항입니다.',
                v => !/[~!@#$%^&*()+|<>?:{}]/.test(v) || 'GCS 이름에는 특수문자를 사용할 수 없습니다.'
            ]
        }
    },
    methods: {
        GcsAppBarCreated() {
            this.$store.state.VUE_APP_MOBIUS_GCS = this.gcs
            this.$store.state.VUE_APP_MOBIUS_RC = 'nCube_RC_HUB_' + nanoid(15)
            this.MOBIUS_CONNECTION_CONNECTED = true
            this.$store.state.MOBIUS_CONNECTION_CONNECTED = true

            localStorage.setItem('mobius_gcs', this.gcs)

            EventBus.$emit('mqttConnection')
        },
        GcsAppBarReseted() {
            this.MOBIUS_CONNECTION_CONNECTED = false
            this.$store.state.MOBIUS_CONNECTION_CONNECTED = false

            EventBus.$emit('mqttConnection')
        }
    },
    mounted() {
        if (this.MOBIUS_CONNECTION_CONNECTED) {
            this.GcsAppBarCreated();
        }
    },
    beforeDestroy() {
        this.GcsAppBarReseted()
    }
}
</script>

<style scoped>
#create .v-speed-dial {
    position: absolute;
}

#create .v-btn--floating {
    position: relative;
}

.v-text-field >>> label {
    font-size: 0.8em;
}

.baricon {
    color: white;
}
</style>
