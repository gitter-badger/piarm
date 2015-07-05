/*
 |--------------------------------------------------------------------------
 | Store channels that need to be exported
 |--------------------------------------------------------------------------
 **/

import { Store } from 'flummox'
import Mysql from '../database/Query'
import Date from '../lib/Datetime'

export default class Channels extends Store {

    constructor(flux) {

        super();

        this.register(flux.getActions('channels').addChannel, this.addChannel);
        this.register(flux.getActions('channels').removeChannel, this.removeChannel);

        this.state = {
            channels: []
        };

        this.getChannels()
    }

    addChannel = (info) => {

        Mysql.query(
            "INSERT INTO channels " +
            "(name, channel, direction, edge, last_edited) " +
            "VALUES " +
            "('" + info.name + "', " + info.channel + ", '" + info.direction + "', '" + info.edge + "', " + Date + ");",
                err => {
                if (err) throw err;

                this.getChannels()
            })
    };

    removeChannel = (id) => {

        Mysql.query("DELETE FROM channels WHERE id = " + id, err => {
            if (err) throw err;

            this.getChannels()
        })
    };

    getChannels() {
        let channels = this.state.channels;
        Mysql.query('SELECT * FROM channels', (err, res) => {
            res.forEach(row => {
                channels.push(row)
            });

            this.setState({
                channels: channels
            })
        })
    }

    getState() {

        return this.state.channels;
    }
}