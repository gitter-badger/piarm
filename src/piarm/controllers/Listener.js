/*
 |--------------------------------------------------------------------------
 | Listens for Gpio interrupts and deals with them
 |--------------------------------------------------------------------------
 */

import Flux from '../flux'
import Gpio from '../lib/rpi-Gpio'
import Handler from './Handler'

class Listener {

    constructor() {

        this.channels = [];

        Flux.getStore('channels').addListener('change', this.storeUpdated);
        Flux.getActions('channels').getChannels();
        Flux.getActions('channels').removeChannel(5);

        this.listen();
    }

    setup() {

        Gpio.destroy();
        this.channels.forEach(function (map) {
            Gpio.setup(map.channel, Gpio.DIR_IN, Gpio.EDGE_BOTH, function (err) {
                if (err) throw err;
                console.log('set up channel: ' + map.channel);
            }.bind(this))
        }.bind(this))
    }

    listen() {

        Gpio.on('change', Handler.handlePinChange);
    }

    storeUpdated = () => {

        this.channels = Flux.getStore('channels').getState().channels;
        this.setup();
    }
}

var run = new Listener();
export default run;