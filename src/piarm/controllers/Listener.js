/*
 |--------------------------------------------------------------------------
 | Listens for Gpio interrupts and deals with them
 |--------------------------------------------------------------------------
 */

import Flux from '../flux'
import Gpio from '../lib/rpi-Gpio'
import Socket from './Socket'
import Handler from './Handler'

class Listener {

    constructor() {

        this.channels = [];

        Flux.getStore('channels').addListener('change', this.storeUpdated);
        Flux.getActions('channels').getChannels();

        this.listen()
    }

    setup(){

        Gpio.destroy();
        var _this = this;
        this.channels.forEach(function (map) {
            Gpio.setup(map.channel, Gpio.DIR_IN, Gpio.EDGE_BOTH, function (err) {
                if (err) throw err;
                console.log('set up channel: ' + map.channel)
            })
        });
    }

    listen() {

        Gpio.on('change', Handler.handlePinChange);
        Socket.on('change', Handler.handlePushCommand)
    }

    storeUpdated = () => {

        this.channels = Flux.getStore('channels').getState().channels;
        this.setup()
    }
}
const run = new Listener();
export default run;