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

        Mysql.query("SELECT * FROM alarm LIMIT 1;", (err, res) => {
            if (res.length) {
                this.setState({
                    alarm: {
                        armed: res[0].armed
                    }
                })
            }
        })
    }

    arm() {

        Mysql.query('SELECT * FROM alarm LIMIT 1;', (err, res) => {

            if (res.length) {
                Mysql.query("UPDATE alarm SET " +
                    "armed=true" + " WHERE " +
                    "id = 1;",
                        err => {
                        if (err) throw err;

                        this.setState({
                            alarm: {
                                armed: true
                            }
                        })
                    })
            } else {
                Mysql.query("INSERT INTO alarm " +
                    "(armed) VALUES " +
                    "(true);",
                        err => {
                        if (err) throw err;

                        this.setState({
                            alarm: {
                                armed: true
                            }
                        })
                    })
            }
        })
    }

    disarm() {

        if (this.state.alarm.armed) {
            Mysql.query("UPDATE alarm SET " +
                "armed=false WHERE " +
                "id = 1;",
                    err => {
                    if (err) throw err;

                    this.setState({
                        alarm: {
                            armed: false
                        }
                    })
                })
        }
    }

    getState() {

        return this.state.alarm;
    }
}