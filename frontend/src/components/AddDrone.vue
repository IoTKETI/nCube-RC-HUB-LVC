<template>
    <div>
        <div class='left'>
            <v-row
                class="ml-2 white--text font-weight-bold" style="font-size: 20px">
                Drone Name
            </v-row>
            <v-text-field
                class="custom-placeholer-color mx-2 mt-5"
                dense
                ref="drone"
                v-model="add_drone" :rules="add_drone_rule"
                placeholder=""
                label="Drone Name*"
                required
                filled
                height="50"
                style="font-size: 18px;"
                background-color="white"
                @keyup.enter="DroneADD"
            ></v-text-field>
            <v-row
                class="mt-n2" align="center" justify="space-around">
                <v-btn
                    fab
                    height="40"
                    width="100"
                    class="rounded-lg"
                    @click="DroneADD"
                    elevation="5"
                    style="font-size: 17px;font-weight: bold"
                    color="success"
                > 드론 추가
                </v-btn>
            </v-row>
            <div
                class="mt-8 aside-line"></div>
            <v-row
                class="mt-4 ml-2 white--text font-weight-bold" style="font-size: 20px">
                Drone List
                <v-btn
                    v-if="drone_selected.length > 0"
                    fab
                    height="30"
                    width="33"
                    class="rounded-lg"
                    elevation="5"
                    @click="DroneDELETE"
                    color="error"
                    style="position: absolute; right: 17%; font-size: 17px; font-weight: bold"
                >
                    <font-awesome-icon
                        class="control_drone_icon v-avatar--metronome"
                        icon="trash"
                        size="1x"/>
                </v-btn>
            </v-row>
            <v-data-table
                v-if="drone_list.length > 0"
                :headers="header"
                :items="drone_list"
                item-key="name"
                hide-default-footer
                dense
                class="control_drone_name elevation-1 mx-2 mt-7"
                light
                @click:row="rowClicked">
<!--                <template v-slot:item.icon="{ item }">-->
<!--                    <v-progress-circular-->
<!--                        class="control_drone_icon mt-1 ml-n2"-->
<!--                        v-if="$store.state.control_drone[item.name].status === 'ready'"-->
<!--                        indeterminate-->
<!--                        color="primary"-->
<!--                        :size="20"-->
<!--                    ></v-progress-circular>-->
<!--                    <font-awesome-icon-->
<!--                        :id="`status_${item.name}`"-->
<!--                        class="control_drone_icon mt-1 v-avatar&#45;&#45;metronome ml-n2"-->
<!--                        v-if="$store.state.control_drone[item.name].status !== 'ready'"-->
<!--                        :icon="iconName(item)"-->
<!--                        :style="{color:iconColor(item), animationDuration: iconDuration(item)}"-->
<!--                        size="1x"/>-->
<!--                    <div class="mt-n1 ml-n2">{{ $store.state.control_drone[item.name].status }}</div>-->
<!--                </template>-->
                <template v-slot:item.selected="{ item }">
                    <v-switch
                        class="mb-n4 mt-n1 "
                        v-model="$store.state.control_drone[item.name].selected"
                    ></v-switch>
                </template>
            </v-data-table>
<!--            <v-row>-->
<!--                <v-btn-->
<!--                    v-if="drone_selected.length > 0"-->
<!--                    fab-->
<!--                    height="30"-->
<!--                    width="33"-->
<!--                    class="rounded-lg"-->
<!--                    elevation="5"-->
<!--                    @click="DroneDELETE"-->
<!--                    color="error"-->
<!--                    style="position: absolute; right: 5%; font-size: 17px; font-weight: bold"-->
<!--                >-->
<!--                    <font-awesome-icon-->
<!--                        class="control_drone_icon v-avatar&#45;&#45;metronome"-->
<!--                        icon="trash"-->
<!--                        size="1x"/>-->
<!--                </v-btn>-->
<!--            </v-row>-->
<!--            <v-row-->
<!--                align="center" justify="space-around">-->
<!--                <v-btn-->
<!--                    v-if="drone_selected.length > 0"-->
<!--                    fab-->
<!--                    height="40"-->
<!--                    width="100"-->
<!--                    class="mt-4 rounded-lg"-->
<!--                    @click="link"-->
<!--                    elevation="5"-->
<!--                    color="primary"-->
<!--                    style="font-size: 17px;font-weight: bold"-->
<!--                    :disabled="!$store.state.MOBIUS_CONNECTION_CONNECTED"-->
<!--                > 연결-->
<!--                </v-btn>-->
<!--                <v-btn-->
<!--                    v-if="drone_selected.length > 0"-->
<!--                    fab-->
<!--                    height="40"-->
<!--                    width="115"-->
<!--                    class="mt-4 rounded-lg"-->
<!--                    @click="unlink"-->
<!--                    elevation="5"-->
<!--                    style="font-size: 17px;font-weight: bold"-->
<!--                    :disabled="!$store.state.MOBIUS_CONNECTION_CONNECTED"-->
<!--                > 연결해제-->
<!--                </v-btn>-->
<!--            </v-row>-->
            <div class="mt-8 mb-4 aside-line"></div>
        </div>
    </div>
</template>
<script>
import EventBus from "../EventBus";

export default {
    name: 'AddDrone',
    data() {
        return {
            MOBIUS_CONNECTION_CONNECTED: (localStorage.getItem('mobius_connected') === 'true') ? localStorage.getItem('mobius_connected') : false,

            add_drone: "",
            add_drone_rule: [
                v => !!v || 'Drone 이름은 필수 입력사항입니다.',
                v => !/[~!@#$%^&*()+|<>?:{}]/.test(v) || 'Drone 이름에는 특수문자를 사용할 수 없습니다.'
            ],
            header: [
                {
                    text: 'Name',
                    align: 'center',
                    sortable: true,
                    value: 'name',
                    width: '45%'
                },
                // {
                //     text: 'Status',
                //     align: 'center',
                //     sortable: false,
                //     value: 'icon',
                //     width: '35%'
                // },
                {
                    text: 'Select',
                    align: 'center',
                    sortable: false,
                    value: 'selected',
                    width: '20%'
                }
            ],
            drone_list: JSON.parse(localStorage.getItem('control_dronelist')) ? JSON.parse(localStorage.getItem('control_dronelist')) : [],
            drone_selected: [],
            drone_list_item: [],
        }
    },
    methods: {
        DroneADD() {
            let drone = {}
            drone.name = this.add_drone
            drone.icon = 'times-circle'
            drone.status = 'disabled'
            drone.bpm = 1
            drone.bpmcolor = 'red'
            drone.recv_counter = 1
            // drone.system_id = 1
            this.drone_list.push(drone)

            localStorage.setItem('control_dronelist', JSON.stringify(this.drone_list));

            this.$store.state.control_drone[drone.name] = {
                icon: 'times-circle',
                status: 'disabled',
                bpm: 1,
                bpmcolor: 'red',
                recv_counter: 1,
                // system_id: 1,
                timer_id: setInterval(() => {
                    this.$store.state.control_drone[drone.name].bpm = this.$store.state.control_drone[drone.name].recv_counter;
                    this.$store.state.control_drone[drone.name].recv_counter = 1;
                    if (this.$store.state.control_drone[drone.name].bpm === 1) {
                        this.$store.state.control_drone[drone.name].icon = 'unlink'
                        this.$store.state.control_drone[drone.name].status = 'disconnected'
                        this.UpdateTable(drone.name)
                        let topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/' + drone.name + '/conn'

                        if (this.$store.state.client.connected) {
                            this.$store.state.client.publish(topic, Buffer.from('unsubscribe'))
                        } else {
                            console.log('disconnected with Mobius')
                        }
                    } else if (this.$store.state.control_drone[drone.name].bpm < 5) {
                        this.$store.state.control_drone[drone.name].icon = 'exclamation-triangle'
                    } else if (this.$store.state.control_drone[drone.name].bpm < 9) {
                        this.$store.state.control_drone[drone.name].icon = 'play'
                    } else if (this.$store.state.control_drone[drone.name].bpm < 12) {
                        this.$store.state.control_drone[drone.name].icon = 'circle'
                    }
                }, 10000)
            }

            localStorage.setItem('control_drone_list', JSON.stringify(this.$store.state.control_drone));

            let topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/' + drone.name + '/status'
            let qos = 0
            if (this.$store.state.client.connected) {
                this.$store.state.client.unsubscribe(topic)
                this.$store.state.client.subscribe(topic, {qos}, (error, res) => {
                    if (error) {
                        console.log('Subscribe to topics error', error)
                    }
                    this.subscribeSuccess = true
                    console.log('Subscribe to topics res', res)
                })
            } else {
                console.log('disconnected with Mobius')
            }
        },
        DroneDELETE() {
            for (let select = this.drone_selected.length; select > 0; select--) {
                for (let idx = this.drone_list.length; idx > 0; idx--) {
                    if (this.drone_list[idx - 1].name === this.drone_selected[select - 1]) {
                        let topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/' + this.drone_list[idx - 1].name + '/status'
                        try {
                            if (this.$store.state.client.connected) {
                                this.$store.state.client.unsubscribe(topic)
                                topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/' + this.drone_list[idx - 1].name + '/conn'
                                this.$store.state.client.publish(topic, Buffer.from('unsubscribe'))
                            }
                        } catch (e) {
                            console.log(e)
                            console.log('Disconnected with server')
                        }

                        clearInterval(this.$store.state.control_drone[this.drone_list[idx - 1].name].timer_id)

                        delete this.$store.state.control_drone[this.drone_list[idx - 1].name]
                        this.drone_list.splice(idx - 1, 1)
                        this.drone_selected.splice(select - 1, 1)
                    }
                }
            }
            localStorage.setItem('control_dronelist', JSON.stringify(this.drone_list));
            localStorage.setItem('control_drone_list', JSON.stringify(this.$store.state.control_drone));
        },
        rowClicked: function (item, row) {
            let selectState = (row.isSelected) ? false : true
            row.select(selectState)
            if (!selectState) {
                this.drone_selected = this.drone_selected.filter(
                    selectedKeyID => selectedKeyID !== row.item.name)
                this.drone_list_item = this.drone_list_item.filter(
                    selectedKeyID => selectedKeyID !== row.item.name)
                this.$store.state.control_drone[row.item.name].selected = false
            } else {
                this.drone_selected.push(row.item.name)
                this.drone_list_item.push(row)
                this.$store.state.control_drone[row.item.name].selected = true
            }
            this.$store.state.client.publish('/RC/monitor/drone', JSON.stringify(this.drone_selected))
        },
        // link() {
        //     if (this.$store.state.client.connected) {
        //         for (let idx in this.drone_selected) {
        //             if (this.$store.state.control_drone[this.drone_selected[idx]].status === 'ready') {
        //                 let topic = '/RC/' + this.drone_selected[idx] + '/conn'
        //                 this.$store.state.client.publish(topic, Buffer.from(this.$store.state.VUE_APP_MOBIUS_RC))
        //                 console.log(topic)
        //             }
        //         }
        //     } else {
        //         EventBus.$emit('log_update', {level: 3, log: "위의 CONNECT 버튼을 눌러주세요."})
        //     }
        // },
        // unlink() {
        //     if (this.$store.state.client.connected) {
        //         for (let idx in this.drone_selected) {
        //             let topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/' + this.drone_selected[idx] + '/conn'
        //             this.$store.state.client.publish(topic, Buffer.from('unsubscribe'))
        //         }
        //     }
        // },
        UpdateTable(drone) {
            if (this.drone_list.length === 0) {
                this.drone_list.push(drone)
            } else {
                for (let idx in this.drone_list) {
                    if (this.drone_list[idx].name === drone) {
                        this.drone_list[idx].icon = this.$store.state.control_drone[drone].icon
                        this.drone_list[idx].status = this.$store.state.control_drone[drone].status
                        this.drone_list[idx].bpmcolor = this.$store.state.control_drone[drone].bpmcolor
                    }
                }
            }
        },
        // iconName(item) {
        //     if (this.$store.state.control_drone[item.name].status === 'disconnected') {
        //         this.$store.state.control_drone[item.name].icon = 'unlink'
        //     } else if (this.$store.state.control_drone[item.name].status === 'ready') {
        //         this.$store.state.control_drone[item.name].icon = 'spinner'
        //     } else if (this.$store.state.control_drone[item.name].status === 'connected') {
        //         this.$store.state.control_drone[item.name].icon = 'link'
        //     } else if (this.$store.state.control_drone[item.name].status === 'send') {
        //         if (this.$store.state.control_drone[item.name].bpm < 5) {
        //             this.$store.state.control_drone[item.name].icon = 'circle'
        //         } else if (this.$store.state.control_drone[item.name].bpm < 9) {
        //             this.$store.state.control_drone[item.name].icon = 'circle'
        //         } else if (this.$store.state.control_drone[item.name].bpm < 12) {
        //             this.$store.state.control_drone[item.name].icon = 'circle'
        //         }
        //     } else if (this.$store.state.control_drone[item.name].status === 'disabled') {
        //         this.$store.state.control_drone[item.name].icon = 'times-circle'
        //     } else {
        //         this.$store.state.control_drone[item.name].icon = 'exclamation-circle'
        //     }
        //     return this.$store.state.control_drone[item.name].icon
        // },
        // iconColor(item) {
        //     if (this.$store.state.control_drone[item.name].status === 'disconnected') {
        //         this.$store.state.control_drone[item.name].bpmcolor = 'orange'
        //     } else if (this.$store.state.control_drone[item.name].status === 'connected') {
        //         this.$store.state.control_drone[item.name].bpmcolor = 'black'
        //     } else if (this.$store.state.control_drone[item.name].status === 'ready') {
        //         this.$store.state.control_drone[item.name].bpmcolor = 'blue'
        //     } else if (this.$store.state.control_drone[item.name].status === 'send') {
        //         if (this.$store.state.control_drone[item.name].bpm < 5) {
        //             this.$store.state.control_drone[item.name].bpmcolor = 'orange'
        //         } else if (this.$store.state.control_drone[item.name].bpm < 9) {
        //             this.$store.state.control_drone[item.name].bpmcolor = 'blue'
        //         } else if (this.$store.state.control_drone[item.name].bpm < 12) {
        //             this.$store.state.control_drone[item.name].bpmcolor = 'lime'
        //         }
        //     } else if (this.$store.state.control_drone[item.name].status === 'disabled') {
        //         this.$store.state.control_drone[item.name].bpmcolor = 'red'
        //     } else {
        //         this.$store.state.control_drone[item.name].bpmcolor = 'red'
        //     }
        //     this.UpdateTable(item.name)
        //     return this.$store.state.control_drone[item.name].bpmcolor
        // },
        // iconDuration(item) {
        //     return (2 / this.$store.state.control_drone[item.name].bpm).toString() + 's'
        // }
    },
    mounted() {
        EventBus.$on('update-table', (drone) => {
            this.UpdateTable(drone);
        });

        EventBus.$on('add-counter', (drone) => {
            this.$store.state.control_drone[drone].recv_counter++;
        });
        EventBus.$on('drone-selected', () => {
            for (let idx in this.drone_list_item) {
                this.drone_list_item[idx].select(false)
            }
        })
        EventBus.$on('init_drone_selected', () => {
            this.drone_selected = []
        })
    },
    beforeDestroy() {
        this.add_drone = ""

        for (let idx in this.drone_list) {
            let topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/' + this.drone_list[idx].name + '/conn'
            if (this.$store.state.client.connected) {
                this.$store.state.client.publish(topic, Buffer.from('unsubscribe'))
            }
        }
        this.drone_list = []
    }
}
</script>

<style>
a {
    color: black
}

a:hover {
    color: rgb(39, 39, 40);
}

.left {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 23%;
    height: 100%;
    /*background: rgb(39, 39, 40);*/
    background: rgb(26, 35, 126);
    padding: 90px 0;
    overflow: hidden;
}

.theme--light.v-data-table tbody tr.v-data-table__selected {
    background: rgb(75, 75, 75) !important;
    color: white;
}

.theme--light.v-data-table tbody tr.v-data-table__selected:hover {
    background: rgb(124, 124, 124) !important;
}

.v-application--is-ltr .v-data-table .v-data-table__wrapper table thead tr th {
    font-size: 17px;
    color: #000000;
    background-color: #ffffff;
}

.control_drone_name td {
    font-size: 17px !important;
    font-weight: bold;
}

.control_drone_icon {
    font-size: 15px !important;
    vertical-align: middle;
}

.aside-line {
    display: block;
    width: calc(100% + 10px);
    margin: 24px -5px 6px -5px;
    border-bottom: 3px solid rgb(127, 130, 139);
}

@keyframes metronome-example {
    from {
        transform: scale(.5);
    }

    to {
        transform: scale(1.3);
    }
}

.v-avatar--metronome {
    animation-name: metronome-example;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    position: relative;
    opacity: 1; /* for demo purpose  */
}
</style>

<style scoped>
.v-text-field--outlined {
    border-color: rgb(255, 255, 255);
    border-width: 3px;
}

hr {
    color: white;
    padding-top: 3px;
}

.v-text-field >>> label {
    font-size: 0.8em;
}
</style>
