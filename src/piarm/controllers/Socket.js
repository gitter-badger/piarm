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
            socket: null
        };

        Flux.getStore('users').on('change', this.storeUpdated);
        Flux.getActions('users').getCredentials();
        this.connect()
    }

    connect = () => {

        this.state.socket = io('http://192.168.0.144:3000');
        this.listen()
    };

    listen() {

        this.state.socket.on('connect', this.handleConnect);
        this.state.socket.on('reconnect', this.handleConnect);

        this.state.socket.on('command', this.handleCommand)
    }

    handleConnect = () => {

        this.state.socket.emit('auth', this.state.user);
    };

    handleCommand(message) {

        console.log(message)
    }

    storeUpdated = () => {

        this.state.user = Flux.getStore('users').getUser();
        this.connect()
    };
}
const run = new Socket();
export default run;