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

    setup() {
        Gpio.destroy();
        this.channels.forEach(function (map) {
            Gpio.setup(map.channel, Gpio.DIR_IN)
        });
    }

    listen() {

        Gpio.on('change', Handler.handlePinChange);
        Handler.on('AlarmChange', Handler.alarmFunction);
    }

    storeUpdated = () => {

        this.channels = Flux.getStore('channels').getState().channels;
        this.setup()
    }
}
const run = new GPIO();
export default run;