/**
 * Created by Julien Vincent.
 *
 * MAIN file.
 */

//import helper from './helpers/helpers';
import GPIO from './tests/GPIO.js';

GPIO.read(1, function(err, res) {

    return console.log(res);
});