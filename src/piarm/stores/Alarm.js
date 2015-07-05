/*
 |--------------------------------------------------------------------------
 | Store system armed status
 |--------------------------------------------------------------------------
 **/

import { Store } from 'flummox'
import Mysql from '../database/Query'
import Date from '../lib/Datetime'

export default class Alarm extends Store {

    constructor(flux) {

        super();

        this.register(flux.getActions('alarm').arm, this.arm);
        this.register(flux.getActions('alarm').disarm, this.disarm);

        this.state = {
            alarm: null
        };

        this.updateStore()
    }

    updateStore() {

        Mysql.query("SELECT * FROM armed LIMIT 1;", (err, res) => {
            if (res.length) {
                this.setState({
                    alarm: {
                        armed: res[0].armed,
                        last_edited: res[0].last_edited
                    }
                })
            }
        })
    }

    arm() {

        Mysql.query('SELECT * FROM armed LIMIT 1;', (err, res) => {

            if (res.length) {
                Mysql.query("UPDATE armed SET " +
                    "armed='true'" + ", " +
                    "last_edited=" + Date + " WHERE " +
                    "id = 1;",
                        err => {
                        if (err) throw err;

                        this.setState({
                            alarm: {
                                armed: true,
                                last_edited: Date
                            }
                        })
                    })
            } else {
                Mysql.query("INSERT INTO armed " +
                    "(armed, last_edited) VALUES " +
                    "('true', " + Date + ");",
                        err => {
                        if (err) throw err;

                        this.setState({
                            alarm: {
                                armed: true,
                                last_edited: Date
                            }
                        })
                    })
            }
        })
    }

    disarm() {

        if (this.state.alarm.armed) {
            Mysql.query("UPDATE armed SET " +
                "armed='false'" + ", " +
                "last_edited=" + Date + " WHERE " +
                "id = 1;",
                    err => {
                    if (err) throw err;

                    this.setState({
                        alarm: {
                            armed: false,
                            last_edited: Date
                        }
                    })
                })
        }
    }

    getState() {

        return this.state.alarm;
    }
}