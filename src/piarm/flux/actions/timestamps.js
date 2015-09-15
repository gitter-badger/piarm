/*
 |--------------------------------------------------------------------------
 | Interact with the Timestamps store
 |--------------------------------------------------------------------------
 **/

import { Actions } from 'flummox'

export default
class Timestamps extends Actions {

    update() {

        return true;
    }

    set(timestamps, cb) {

        return {
            timestamps: timestamps,
            cb: cb
        };
    }
}