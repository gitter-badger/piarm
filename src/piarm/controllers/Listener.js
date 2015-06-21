/*
 |--------------------------------------------------------------------------
 | Listens to events and responds to them accordingly
 |
 | Uses a test GPIO class or a Raspberry specific class
 | depending on environment
 |--------------------------------------------------------------------------
 */

import gpio from '../lib/rpi-gpio'

export default class Listener {

    constructor() {

        gpio.on('change', this.channelUpdated);
        this.setup();
    }

    setup() {

        gpio.setup(3, gpio.DIR_IN, function (err) {

            if (err) throw err;
            this.listen();
        }.bind(this));
    }

    read() {

    }

    channelUpdated(channel, value) {

        console.log("channel: " + channel + " value: " + value);
    }

    listen() {

        gpio.on('change', this.channelUpdated)
    }
}