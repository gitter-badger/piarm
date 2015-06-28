/*
 |--------------------------------------------------------------------------
 | Socket client to receive push commands from server
 |--------------------------------------------------------------------------
 **/

import io from 'socket.io-client'
import Flux from '../flux'
import Handler from './SocketHandler'

class Socket {

    constructor() {

        this.state = {
            user: {},
            socket: null
        };

        Flux.getStore('users').on('change', this.storeUpdated);
        Flux.getActions('users').getCredentials();

        this.listen()
    }

    connect() {

        this.state.socket = io('http://192.168.0.144:3000', {
            email: this.state.user.email,
            token: this.state.user.token
        });
    }

    listen() {

        this.state.socket.on('connect', Handler.handleConnect);
        this.state.socket.on('disconnect', Handler.handleDisconnect);
        this.state.socket.on('reconnect', Handler.handleReconnect);

        this.state.socket.on('command', Handler.handleCommand);
        this.state.socket.on('state', Handler.handleState)
    }

    storeUpdated = () => {

        this.state.user = Flux.getStore('users').getUser();
        this.connect()
    };
}
const run = new Socket();
export default run;