/**
 * Created by Julien Vincent.
 *
 * RPi.GPIO imitator
 */

import { env } from '../helpers/helpers';

var GPIO = {

    read: function(channel, callback) {

        let res = env("ENVIRONMENT", 'Default Name');

        callback(0, res);
    }
};

export default GPIO;