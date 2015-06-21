/*
 |--------------------------------------------------------------------------
 | Listens to events and responds to them accordingly
 |
 | Uses a test GPIO class or a Raspberry specific class
 | depending on environment
 |--------------------------------------------------------------------------
 */

import gpio from 'rpi-gpio'
import { EventEmitter } from 'events'

let watcher = new EventEmitter();

export default class Listener {

    constructor() {



        this.listen();
        this.setup();
    }

    setup() {

        gpio.setup(3, gpio.DIR_IN, function (err) {

            if (err) throw err;
            this.read();
        }.bind(this));
    }

    read() {

        let i = true;
        while(i) {
            setTimeout(function() {
                gpio.read(3, function (err, value) {

                    if (err) throw err;
                    watcher.emit('change', 3, value)
                })
            }, 300)
        }
    }

    channelUpdated(channel, value) {

        console.log("channel: " + channel + " value: " + value);
    }

    listen() {

        watcher.on('change', this.channelUpdated);
    }
}