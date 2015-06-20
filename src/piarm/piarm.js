/*
 |--------------------------------------------------------------------------
 | Main File
 |--------------------------------------------------------------------------
**/

import Listener from './controllers/Listener'

class Test extends Listener {

    constructor() {

        super();
    }
}

var x = new Test();
x.read();