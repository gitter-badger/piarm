/**
 * Created by Julien Vincent.
 *
 * MAIN file.
 */

import GPIO from './tests/GPIO';

GPIO.read(1, function(err, res) {

    console.log(res);
});