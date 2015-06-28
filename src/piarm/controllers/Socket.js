/*
 |--------------------------------------------------------------------------
 | Socket client to receive push commands from server
 |--------------------------------------------------------------------------
**/

import io from 'socket.io-client'
import Flux from '../flux'
import EventEmitter from 'events'

class Socket extends EventEmitter {

    constructor() {

        super();

        Flux.getStore('users').on('change', this.storeUpdated);
        Flux.getActions('users').getCredentials();

        this.credentials = {};

        this.connect()
    }

    connect = () => {

    };

    storeUpdated = () => {

        this.credentials = Flux.getStore('users').getUser();
    };
}
const run = new Socket();
export default run;