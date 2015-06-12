/**
 * Created by Julien Vincent.
 *
 * MAIN file.
 */

//import helper from './helpers/helpers';
import GPIO from './tests/GPIO.js';
import { Object, hello } from './Object.js';

GPIO.read(1, function(err, res) {

    return console.log(res);
});

var object = new Object();

object.hello();