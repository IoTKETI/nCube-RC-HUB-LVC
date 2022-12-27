import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        VUE_APP_MOBIUS_HOST: 'localhost',
        VUE_APP_MOBIUS_GCS: 'KETI_MUV',
        VUE_APP_MOBIUS_RC: 'KETI_RC',

        client: {
            connected: false,
            loading: false
        },
        MOBIUS_CONNECTION_CONNECTED: false,

        local_client: {
            connected: false,
            loading: false
        },
        local_MOBIUS_CONNECTION_CONNECTED: false,

        control_drone: JSON.parse(localStorage.getItem('control_drone_list')) ? JSON.parse(localStorage.getItem('control_drone_list')) : {},
    },
})
