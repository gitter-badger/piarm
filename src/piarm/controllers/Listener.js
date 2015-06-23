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

    constructor(channels) {

        this.channels = channels;
        this.setup();
        this.listen();
    }

    setup() {

        this.channels.forEach(function (channel) {
            gpio.setup(channel, gpio.DIR_IN, 'both', function (err) {
                if (err) throw err;
            })
        })
    }

    read() {

        this.channels.forEach(function (channel) {

            gpio.read(channel, function (err, value) {

                if (err) throw err;
                console.log('channel: ' + channel + ' value: ' + value)
            })
        })
    }

    listen() {

        gpio.on('change', function () {

            this.read()
        }.bind(this));
    }
}