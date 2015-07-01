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
        Flux.getActions('users').getCredentials()
    }

    connect = () => {

        this.state.socket = io('http://192.168.0.144:3000');
        this.listen();
    };

    listen() {

        this.state.socket.on('connect', this.handleConnect);
        this.state.socket.on('reconnect', this.handleConnect);

        this.state.socket.on('auth', this.handleAuth);
        this.state.socket.on('command', Handler.handleCommand)
    }

    handleConnect = () => {

        this.state.socket.emit('auth', this.state.user);
    };

    handleAuth(status) {

        if (status = 202) {

            this.state.socket
                .to(this.state.user.token)
                .emit('state', {
                    channels: [],
                    rules: [],
                    armed: false
                })
        }
    }

    storeUpdated = () => {

        this.state.user = Flux.getStore('users').getState();
        this.connect()
    };
}
const run = new Socket();
export default run;