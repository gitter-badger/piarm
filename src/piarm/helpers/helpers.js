/**
 * Created by Julien Vincent.
 *
 * Collection of helper functions to be used within PiArm
 */

var fs = require('fs');

function env(name, def = null) {

    var value = null;

    if (def) {
        value = def;
    }
    fs.readFile(".env", "utf8", function(error, data) {
        console.log(data);
    });

    return value;
}

export { env };