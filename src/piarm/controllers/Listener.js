/*
 |--------------------------------------------------------------------------
 | Listens to events and responds to them accordingly
 |
 | Uses a test GPIO class or a Raspberry specific class
 | depending on environment
 |--------------------------------------------------------------------------
 */

import gpio from '../tests/rpi-gpio.js/rpi-gpio'

export default class Listener {

    constructor() {

        this.listen();
        this.setup();
        gpio.setPollFrequency(200);
    }

    setup() {

        gpio.setup(3, gpio.DIR_IN, function (err) {

            this.read();
        }.bind(this));
    }

    channelUpdated(channel, value) {

        console.log(channel + " value " + value);
    }

    read() {

        gpio.read(3, function (err, value) {

            console.log(err + " " + value);
        })
    }

    listen() {

        gpio.on('change', Listener.channelUpdated);
    }
}