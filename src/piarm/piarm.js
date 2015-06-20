/*
 |--------------------------------------------------------------------------
 | Main File
 |--------------------------------------------------------------------------
**/

import Server from './socket/Server'
import Socket from './socket/Socket'
import Listener from './controllers/Listener'

class Test extends Listener {

    constructor() {

        super();
    }

    setup() {

        gpio.setup(7, 'DIR_IN', function (err) {
            console.log('An error occured! ' + err)
        })
    }
}

let x = new Test();