/*
 |--------------------------------------------------------------------------
 | Listens to events and responds to them accordingly
 |
 | Uses a test GPIO class or a Raspberry specific class
 | depending on environment
 |--------------------------------------------------------------------------
 */

import Gpio from 'rpi-gpio'
import io from 'socket.io'

var gpio = new Gpio();
import testGPIO from '../tests/GPIO'

export default class Listener {

    constructor() {

        gpio.on('change', this.channelUpdated);
    }

    channelUpdated(channel, value) {

        console.log(channel + " " + value);
    }
}