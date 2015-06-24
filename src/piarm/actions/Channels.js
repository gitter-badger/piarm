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

    addChannel(name, channel) {

        return {
            name: name,
            channel: channel
        }
    }

    removeChannel(identifier) {

        return identifier;
    }
}