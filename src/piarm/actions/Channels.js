/*
 |--------------------------------------------------------------------------
 | Actions to interact with the Channels store
 |--------------------------------------------------------------------------
**/

import { Actions } from 'flummox'

class Channels extends Actions {

    getChannels() {

        return undefined;
    }

    addChannel(name, channel) {

        return {
            name: name,
            channel: channel
        }
    }

    removeChannel(name, channel) {

        if (name) {
            return name;
        } else {
            return channel;
        }
    }
}