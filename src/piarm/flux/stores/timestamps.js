/*
 |--------------------------------------------------------------------------
 | Store system timestamps
 |--------------------------------------------------------------------------
 **/

import { Store } from 'flummox'
import Mysql from '../database/Query'

export default
class Timestamps extends Store {

    constructor(flux) {

        super();

        this.register(flux.getActions('timestamps').update, this.update);
        this.register(flux.getActions('timestamps').set, this.set);

        this.state = {
            timestamps: null
        };

        this.update()
    }

    update() {

        Mysql.query("SELECT * FROM timestamps", (err, res) => {
            if (err) throw err;

            this.setState({
                timestamps: res[0]
            })
        })
    }

    set = (obj) => {

        obj.cb = obj.cb || function () {
            };

        Mysql.query("SELECT * FROM timestamps", (err, res) => {
            if (err) throw err;

            if (res.length) {
                Mysql.query("UPDATE timestamps SET " +
                    "channels_state='" + obj.timestamps.channels_state + "', " +
                    "rules_state='" + obj.timestamps.rules_state + "', " +
                    "alarm_state='" + obj.timestamps.alarm_state + "' " +
                    "WHERE id = 1",
                        err => {
                        if (err) throw err;

                        obj.cb()
                    });
            } else {
                Mysql.query(
                    "INSERT INTO timestamps " +
                    "(channels_state, rules_state, alarm_state) VALUES " +
                    "('" + obj.timestamps.channels_state +
                    "', '" + obj.timestamps.rules_state +
                    "', '" + obj.timestamps.alarm_state + "')",
                        err => {
                        if (err) throw err;

                        obj.cb();
                    });
            }
        });

        this.update()
    };

    getState() {

        return this.state.timestamps;
    }
}