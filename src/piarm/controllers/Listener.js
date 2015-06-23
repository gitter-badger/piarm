/*
 |--------------------------------------------------------------------------
 | Listens for GPIO interrupts and deals with them
 |--------------------------------------------------------------------------
 */

import Flux from '../flux'
import gpio from '../lib/rpi-gpio'

export default class Listener {

    constructor(channels) {

        this.channels = [];

        Flux.getStore('channels').addListener('change', this.channelsUpdated);
        Flux.getActions('channels').getChannels();

        this.listen();
    }

    setup() {

        this.channels.forEach(function (channel) {
            gpio.setup(channel, gpio.DIR_IN, 'both', function (err) {
                if (err) throw err;
                gpio.listen();
            }.bind(this))
        }.bind(this))
    }

    listen() {

        gpio.on('change', function (channel, pin) {

            console.log(channel + " : " + pin);
        });
    }

    channelsUpdated() {

        this.channels = Flux.getStore('channels').getState().channels;
        this.setup();
    }
}