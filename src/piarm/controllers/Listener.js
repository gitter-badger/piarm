/*
 |--------------------------------------------------------------------------
 | Listens to events and responds to them accordingly
 |
 | Uses a test GPIO class or a Raspberry specific class
 | depending on environment
 |--------------------------------------------------------------------------
 */

import gpio from 'rpi-gpio'

export default class Listener {

    constructor() {

        gpio.on('change', this.channelUpdated);
        //setup();
    }

    setup() {

        gpio.setup(3, 'DIR_IN', function (err) {
            console.log('Error: ' + err);
        });
    }

    channelUpdated(channel, value) {

        console.log(channel + " " + value);
    }

    read() {

        gpio.read(3, function (err, value) {

            console.log(err + " " + value);
        })
    }
}