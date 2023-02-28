<template>
    <v-card>
        <v-app-bar app class="bg ml-n3 mr-n10" dark dense height="50">
            <v-toolbar-title>
                <v-row no-gutters align="center" justify="center" style="font-weight: bold; color: white">
                    <h4 class="mt-2">
                        <font-awesome-icon class="mr-2" icon="gamepad" size="lg"/>
                        KETI LVC RC Monitor
                    </h4>
                </v-row>
            </v-toolbar-title>
            <v-row no-gutters class="text-right mr-16 pr-2 justify-center mt-2">
                <h4>
                    {{ log }}
                    <font-awesome-icon
                        v-if="state === 'disconnected'"
                        class="ml-2 mr-n14"
                        icon="circle"
                        size="xs"
                        :style="{ color: 'red' }"/>
                    <font-awesome-icon
                        v-if="state === 'connected'"
                        class="ml-2 mr-n14"
                        icon="circle"
                        size="xs"
                        :style="{ color: 'blue' }"/>
                    <font-awesome-icon
                        v-if="state === 'rc connected'"
                        class="ml-2 mr-n14"
                        icon="fa-solid fa-circle" beat-fade
                        size="xs"
                        :style="{ color: 'green' }"/>
                    <font-awesome-icon
                        v-if="state === 'rc disconnected'"
                        class="ml-2 mr-n14"
                        icon="fa-solid fa-spinner" spin-pulse
                        size="xs"
                        :style="{ color: 'red' }"/>
                </h4>
            </v-row>
            <!--            TODO: TBD-->
            <!--            <v-menu-->
            <!--                top-->
            <!--                :offset-y="offset">-->
            <!--                <template v-slot:activator="{ on, attrs }">-->

            <!--                    <v-btn-->
            <!--                        icon-->
            <!--                        v-bind="attrs"-->
            <!--                        v-on="on"-->
            <!--                    >-->
            <!--                        <font-awesome-icon-->
            <!--                            icon="fa-solid fa-bars"-->
            <!--                            size="xl"-->
            <!--                            :style="{ color: 'white' }"/>-->
            <!--                    </v-btn>-->
            <!--                </template>-->

            <!--                <v-list>-->
            <!--                    <v-list-item-group-->
            <!--                        v-model="model"-->
            <!--                        mandatory-->
            <!--                        color="indigo"-->
            <!--                    >-->
            <!--                        <v-list-item-->
            <!--                            v-for="(item, index) in items"-->
            <!--                            :key="index"-->
            <!--                        >-->
            <!--                            <v-list-item-title v-text="item.title"></v-list-item-title>-->
            <!--                        </v-list-item>-->
            <!--                    </v-list-item-group>-->
            <!--                </v-list>-->
            <!--            </v-menu>-->

        </v-app-bar>
    </v-card>
</template>

<script>
import EventBus from "@/EventBus";

export default {
    name: "RCAppBar",
    data: function () {
        return {
            log: 'MQTT disconnected ',
            state: 'disconnected',

            items: [
                {title: 'Calibration'},
                {title: 'Click Me'},
                {title: 'Click Me'},
                {title: 'Click Me 2'},
            ],
            offset: false,
            model: 1
        }
    },
    mounted() {
        EventBus.$on('connect_state', (log) => {
            this.log = log.log;
            this.state = log.state;

            setTimeout(() => {
                if (this.state.substring(0, 2) !== 'rc') {
                    this.log = '';
                    this.state = '';
                } else {
                    if (this.$store.state.connect_state) {
                        this.log = '';
                        this.state = 'rc connected';
                    }
                }
            }, 5000);
        })
    }
}
</script>

<style scoped>
.v-text-field >>> label {
    font-size: 0.8em;
}

.bg {
    max-width: 101%;
    background-image: linear-gradient(15deg, #1272d0 0%, #b9d4f0 90%);
}
</style>
