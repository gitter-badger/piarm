/**
 * Created by Julien Vincent.
 *
 * RPi.GPIO imitator for testing purposes
 */

import { env } from '../helpers/helpers';

var GPIO = {

    state: {

    },

    setup: function () {

    },

    read: function (channel, callback) {

        env("GPIO_" + channel, function (res) {
            return callback(null, res);
        });
    },

    write: function () {

    },

    setMode: function () {

    },

    setPollFrequency: function () {

    },

    destroy: function () {

    }
};

export default GPIO;