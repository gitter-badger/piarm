/*
 |--------------------------------------------------------------------------
 | A collection of helper functions to be used within the Piarm module
 |--------------------------------------------------------------------------
 */

import fs from 'fs'

/**
 *
 * Helper function to get config values
 *
 **/
function env(name, callback, def = null) {

    var value = null;
    if (def) {
        value = def;
    }

    fs.readFile(".env", "utf8", function (err, res) {
        if (err) console.log(err);

        res.toString().split(/\r?\n/).forEach(function (line) {
            if (line.substr(0, line.indexOf('=')) == name) {
                value = line.substr(line.indexOf('=') + 1);
            }
        });

        return callback(value);
    });
}

export { env };