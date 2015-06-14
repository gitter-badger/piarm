/**
 * Created by Julien Vincent.
 *
 * Collection of helper functions to be used within PiArm
 */

var fs = require('fs');

/*
* Helper function to get config values
*
* */
function env(name, callback, def = null) {

    var value = null;
    if (def) {
        value = def;
    }

    fs.readFile(".env", "utf8", function (err, res) {
        // Split the file into it's resulting lines and loop through them
        res.toString().split(/\r?\n/).forEach(function (line) {
            // Find the line that matches the requested setting
            if (line.substr(0, line.indexOf('=')) == name) {
                // Update value with the associated setting value
                value = line.substr(line.indexOf('=') + 1);
            }
        });

        return callback(value);
    });
}

export { env };