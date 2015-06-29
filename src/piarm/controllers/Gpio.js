/*
 |--------------------------------------------------------------------------
 | Listens for Gpio interrupts and deals with them
 |--------------------------------------------------------------------------
 */

import Flux from '../flux'
import Gpio from '../lib/rpi-gpio'
import Handler from './GpioHandler'

class GPIO {

    constructor() {

        this.channels = [];

        Flux.getStore('channels').on('change', this.storeUpdated);
        Flux.getActions('channels').getChannels();

        this.listen()
    }

    setup(){

        Gpio.destroy();
        this.channels.forEach(function (map) {
            Gpio.setup(map.channel, Gpio.DIR_IN, Gpio.EDGE_BOTH, function (err) {
                if (err) throw err;
                console.log('set up channel: ' + map.channel)
            })
        });
    }

    listen() {

        Gpio.on('change', Handler.handlePinChange);
    }

    storeUpdated = () => {

        this.channels = Flux.getStore('channels').getState().channels;
        this.setup()
    }
}
const run = new GPIO();
export default run;