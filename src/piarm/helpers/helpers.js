/**
 * Created by Julien Vincent.
 *
 * Collection of helper functions to be used within PiArm
 */

import fs from 'fs';

export default class helper {

    env(name, def = null) {

        var value = null;

        if (def) {
            value = def;
        }

        //fs.stat('../.env', function(error, stats) {
        //    fs.open('../.env', 'r', function(error, file) {
        //        var buffer = new Buffer(stats.size);
        //
        //        fs.read(file, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
        //            var data = buffer.toString("utf8", 0, buffer.length);
        //
        //            console.log(data);
        //            fs.close(file);
        //        });
        //    });
        //});
        return 1;
    }
}