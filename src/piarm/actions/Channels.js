/*
 |--------------------------------------------------------------------------
 | Actions to interact with the Channels store
 |--------------------------------------------------------------------------
 **/

import { Actions } from 'flummox'

export default class Channels extends Actions {

    getChannels() {

        return true;
    }

    addChannel(info) {

        return info;
    }

    removeChannel(id) {

        return id;
    }
}