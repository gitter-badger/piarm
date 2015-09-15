/*
 |--------------------------------------------------------------------------
 | Socket client to receive push commands from server
 |--------------------------------------------------------------------------
 **/

import io from 'socket.io-client'
import Flux from '../flux'

class Socket {

    constructor() {

        this.state = {
            token: null,
            socket: null,
            authorized: false,
            push: true
        };

        this.system = {
            channels: null,
            alarm: null,
            rules: null
        };

        this.timestamps = null;

        Flux.getStore('token').on('change', this.updateToken);
        Flux.getActions('token').getToken();

        Flux.getStore('channels').on('change', this.pushState);
        Flux.getStore('rules').on('change', this.pushState);
        Flux.getStore('alarm').on('change', this.pushState);
        Flux.getStore('timestamps').on('change', this.pushState);
    }

    connect() {

        this.state.socket = io('http://192.168.0.144:3000');
        this.listen()
    };

    listen() {

        this.state.socket.on('connect', this.handleConnect);
        this.state.socket.on('reconnect', this.handleConnect);

        this.state.socket.on('auth', this.handleAuth);
        this.state.socket.on('err', this.handleError);

        this.state.socket.on('state', this.handleNewState)
    }

    handleConnect = () => {

        console.log(this.state.token);
        this.state.socket.emit('auth', this.state.token);
    };

    handleNewState = (state) => {

        this.state.push = false;
        if (state.timestamps.channels_state > this.timestamps.channels_state) {
            Flux.getActions('channels').destroy();
            state.channels.forEach(channel => {
                Flux.getActions('channels').addChannel(channel)
            })
        }

        if (state.timestamps.rules_state > this.timestamps.rules_state) {
            Flux.getActions('rules').destroy();
            state.rules.forEach(rule => {
                Flux.getActions('rules').addRule(rule);
            })
        }

        if (state.timestamps.alarm_state > this.timestamps.alarm_state) {
            if (state.alarm.armed) {
                Flux.getActions('alarm').arm()
            } else {
                Flux.getActions('alarm').disarm()
            }
        }

        Flux.getActions('timestamps').set(state.timestamps, () => this.state.push = true);
    };

    handleAuth = (status) => {

        if (status == 202) {
            this.state.authorized = true;
            this.pushState()
        }
    };

    handleError(err) {
        console.log(err);
    }

    pushState = () => {

        if (this.state.authorized && this.state.push) {

            this.system.channels = Flux.getStore('channels').getState();
            this.system.alarm = Flux.getStore('alarm').getState();
            this.system.rules = Flux.getStore('rules').getState();
            this.timestamps = Flux.getStore('timestamps').getState();

            if (this.system.channels && this.system.alarm != null && this.system.rules && this.timestamps) {
                this.timestamps.token = this.state.token.token;
                this.state.socket.emit('state', this.system, this.timestamps)
            }
        }
    };

    updateToken = () => {

        this.state.token = Flux.getStore('token').getState();
        this.connect();
    };
}
const run = new Socket();
export default run;