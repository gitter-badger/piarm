/**
 * Created by Julien Vincent.
 *
 * MAIN file.
 */

//import { read } from './helpers/helpers';
import GPIO from './tests/GPIO';

GPIO.read(1, function(err, res) {

    console.log(err + " " + res);
});