/*
 |--------------------------------------------------------------------------
 | Store channels that need to be exported
 |--------------------------------------------------------------------------
 **/

import { Store } from 'flummox'
import Mysql from '../database/Query'

export default class Channels extends Store {

    constructor(flux) {

        super();

        this.register(flux.getActions('channels').getChannels, this.getChannels);
        this.register(flux.getActions('channels').addChannel, this.addChannel);
        this.register(flux.getActions('channels').removeChannel, this.removeChannel);

        this.state = {
            channels: []
        }
    }

    addChannel(info) {

    }

    removeChannel(identifier) {

    }

    getChannels() {

        Mysql.query('SELECT * FROM channels', function (err, res) {
            console.log(res)
        })
    }

    getState() {

        return this.state.channels;
    }
}