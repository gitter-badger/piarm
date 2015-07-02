/*
 |--------------------------------------------------------------------------
 | Store system armed status
 |--------------------------------------------------------------------------
 **/

import { Store } from 'flummox'
import Mysql from '../database/Query'

export default class Alarm extends Store {

    constructor(flux) {

        super();

        this.register(flux.getActions('alarm').update, this.update);
        this.register(flux.getActions('alarm').arm, this.arm);
        this.register(flux.getActions('alarm').disarm, this.disarm);

        this.state = {
            alarm: false
        }
    }

    update() {

        Mysql.query("SELECT * FROM armed LIMIT 1;", function (err, res) {
            if (res.length) {
                this.setState({
                    alarm: res[0].armed
                })
            }
        }.bind(this))
    }

    arm() {

        let _this = this;
        Mysql.query('SELECT * FROM armed LIMIT 1;', function (err, res) {

            if (res.length) {
                Mysql.query("UPDATE armed SET " +
                    "armed='true' WHERE " +
                    "id = 1;",
                    function (err) {
                        if (err) throw err;

                        _this.setState({
                            alarm: true
                        })
                    })
            } else {
                Mysql.query("INSERT INTO armed " +
                    "(armed) VALUES " +
                    "('true');",
                    function (err) {
                        if (err) throw err;

                        _this.setState({
                            alarm: true
                        })
                    })
            }
        })
    }

    disarm() {

        if (this.state.alarm) {
            Mysql.query("UPDATE armed SET " +
                "armed='true' WHERE " +
                "id = 1;",
                function (err) {
                    if (err) throw err;

                    this.setState({
                        alarm: true
                    })
                }.bind(this))
        }
    }

    getState() {

        return this.state.alarm;
    }
}