/**
 * Created by Julien Vincent.
 *
 * RPi.GPIO imitator
 */

import helper from '../helpers/helpers';

class GPIO {

    read(channel, callback) {

        callback(0, 1);
    }
}
export default GPIO = new GPIO;