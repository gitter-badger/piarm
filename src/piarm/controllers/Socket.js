/*
 |--------------------------------------------------------------------------
 | Socket client to receive push commands from server
 |--------------------------------------------------------------------------
**/

import io from 'socket.io-client'
import Flux from '../flux'

class Socket {

    constructor() {

        Flux.getStore('users').addListener('change', this.storeUpdated);
        Flux.getActions('users').getCredentials();

        this.credentials = {};

        this.connect()
    }

    connect(){

    };

    storeUpdated = () => {

        this.credentials = Flux.getStore('users').getUser();
    };
}
const run = new Socket();
export default run;