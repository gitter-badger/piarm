/**
 * Created by Julien Vincent.
 *
 * Collection of helper functions to be used within PiArm
 */

import fs from 'fs';

function env(name, def = null) {

    var value = null;

    if (def) {
        value = def;
    }

    return value;
}

export { env };