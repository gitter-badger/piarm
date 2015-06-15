/**
 * Created by Julien Vincent.
 *
 * Listens to Pin changes.
 */

/*
 |--------------------------------------------------------------------------
 | Node module imports
 |--------------------------------------------------------------------------
 */
var gpio = require('rpi-gpio');
var io = require('socket.io');

import testGPIO from '../tests/GPIO'

export default class Listener {

    constructor() {

        gpio.on('change', this.channelUpdated);
    }

    channelUpdated(channel, value) {

        console.log(channel);
    }
}