<template>
    <v-app>
        <RCAppBar/>
        <v-main>
            <router-view></router-view>
        </v-main>
        <v-snackbar
            v-if="Level === 4"
            v-model="Flag"
            color="error"
            timeout="10000"
            elevation="24"
            height="60"
        >
            <b-icon
                icon="exclamation-circle-fill"
                class="mr-4 mb-n2"
                style="width: 25px; height: 25px"
            ></b-icon>
            <span style="vertical-align: middle; font-weight: bold; font-size: 20px">{{ Log }}</span>
        </v-snackbar>
        <v-snackbar
            v-if="Level === 3"
            v-model="Flag"
            color="warning"
            timeout="7000"
            elevation="24"
            height="60"
        >
            <b-icon-exclamation-triangle-fill
                class="mr-4 mb-n2"
                style="width: 25px; height: 25px"
            ></b-icon-exclamation-triangle-fill>
            <span style="vertical-align: middle; font-weight: bold; font-size: 20px">{{ Log }}</span>
        </v-snackbar>
        <v-snackbar
            v-if="Level === 2"
            v-model="Flag"
            color="success"
            timeout="5000"
            elevation="24"
            height="60"
        >
            <font-awesome-icon
                class="mr-4"
                icon="check-circle"
                size="2x"
                style="vertical-align: middle;"/>
            <span style="vertical-align: middle; font-weight: bold; font-size: 20px">{{ Log }}</span>
        </v-snackbar>
        <v-snackbar
            v-if="Level === 1"
            v-model="Flag"
            color="info"
            timeout="5000"
            elevation="24"
            height="60"
        >
            <font-awesome-icon
                class="mr-4"
                icon="info-circle"
                size="2x"
                style="vertical-align: middle;"/>
            <span style="vertical-align: middle; font-weight: bold; font-size: 20px">{{ Log }}</span>
        </v-snackbar>
    </v-app>
</template>

<script>
import RCAppBar from "./components/RCAppBar";
import EventBus from "@/EventBus";

export default {
    name: 'App',

    components: {
        RCAppBar,
    },

    data() {
        return {
            Log: '',
            Level: 0,
            Flag: false,
        }
    },
    mounted() {
        EventBus.$on('log_update', (log) => {
            this.Flag = true
            this.Log = log.log
            this.Level = log.level
        })
    }
};
</script>
