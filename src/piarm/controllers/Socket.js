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
            user: null,
            socket: null,
            authorized: false
        };

        this.system = {
            channels: null,
            alarm: null,
            rules: null
        };

        Flux.getStore('users').on('change', this.updateUser);
        Flux.getActions('users').getCredentials();

        Flux.getStore('channels').on('change', this.pushState);
        //Flux.getStore('rules').on('change', this.pushState);
        Flux.getStore('alarm').on('change', this.pushState);
    }

    connect = () => {

        this.state.socket = io('http://192.168.0.144:3000');
        this.listen();
    };

    listen() {

        this.state.socket.on('connect', this.handleConnect);
        this.state.socket.on('reconnect', this.handleConnect);

        this.state.socket.on('auth', this.handleAuth);
        this.state.socket.on('state', this.handleNewState)
    }

    handleConnect = () => {

        this.state.socket.emit('auth', this.state.user);
    };

    handleNewState(state) {

        // check state times, differences and update accordingly
    }

    handleAuth = (err, status) => {

        if (err) {
            // handle error
        } else if (status == 202) {
            this.state.authorized = true;
            this.pushState()
        }
    };

    pushState = () => {

        if (this.state.authorized) {

            this.system.channels = Flux.getStore('channels').getState();
            this.system.alarm = Flux.getStore('alarm').getState();
            //this.system.rules = Flux.getStore('rules').getState();

            if (this.system.channels && this.system.alarm != null/* && this.system.rules*/) {
                this.state.socket.emit('state', this.system)
            }
        }
    };

    updateUser = () => {

        this.state.user = Flux.getStore('users').getState();
        this.connect()
    };
}
const run = new Socket();
export default run;