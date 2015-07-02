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
            user: {},
            channels: null,
            alarm: {
                armed: false,
                last_updated: null
            },
            socket: null,
            authorized: false
        };

        Flux.getStore('users').on('change', this._userUpdated);
        Flux.getStore('channels').on('change', this._channelsUpdated);
        Flux.getStore('alarm').on('change', this._alarmUpdated);
        Flux.getActions('users').getCredentials();
        Flux.getActions('channels').getChannels();
        //Flux.getActions('alarm').update()
    }

    connect = () => {

        this.state.socket = io('http://192.168.0.144:3000');
        this.listen();
    };

    listen() {

        this.state.socket.on('connect', this.handleConnect);
        this.state.socket.on('reconnect', this.handleConnect);

        this.state.socket.on('auth', this.handleAuth);
        this.state.socket.on('command', this.handleCommand)
    }

    handleConnect = () => {

        this.state.socket.emit('auth', this.state.user);
    };

    handleCommand(message) {

        console.log(message);
    }

    handleAuth = (err, status) => {

        if (err) {
            console.log(err)
        } else if (status == 202) {
            this.state.authorized = true;
            this.pushState()
        }
    };

    pushState = () => {

        if (this.state.channels && this.state.authorized) {
            this.state.socket.emit('state', {
                    channels: this.state.channels,
                    rules: [],
                    armed: this.state.armed
                })
        }
    };

    _userUpdated = () => {

        this.state.user = Flux.getStore('users').getState();
        this.connect()
    };

    _channelsUpdated = () => {

        this.state.channels = Flux.getStore('channels').getState();
        this.pushState()
    };

    _alarmUpdated = () => {

        this.state.armed = Flux.getStore('alarm').getState();
        this.pushState()
    }
}
const run = new Socket();
export default run;