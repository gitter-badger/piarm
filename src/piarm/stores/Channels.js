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

    addChannel = (info) => {

        Mysql.query(
            "INSERT INTO channels " +
            "(name, channel, direction, edge) " +
            "VALUES " +
            "('" + info.name + "', " + info.channel + ", '" + info.direction + "', '" + info.edge + "');",
            function (err) {
                if (err) throw err;

                this.getChannels()
            }.bind(this))
    };

    removeChannel = (id) => {

        Mysql.query("DELETE FROM channels WHERE id = " + id, function (err) {
            if (err) throw err;

            this.getChannels()
        }.bind(this))
    };

    getChannels() {

        let channels = this.state.channels;
        Mysql.query('SELECT * FROM channels', function (err, res) {
            res.forEach(function (row) {
                channels.push(row)
            });

            this.setState({
                channels: channels
            })
        }.bind(this))
    }

    getState() {

        return this.state.channels;
    }
}