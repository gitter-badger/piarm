/*
 |--------------------------------------------------------------------------
 | Store system armed status
 |--------------------------------------------------------------------------
 **/

import { Store } from 'flummox'
import Mysql from '../database/Query'

export default class Armed extends Store {

    constructor(flux) {

        super();

        this.register(flux.getActions('armed').update, this.update);
        this.register(flux.getActions('armed').arm, this.arm);
        this.register(flux.getActions('armed').disarm, this.disarm);

        this.state = {
            armed: false
        }
    }

    update() {

        Mysql.query("SELECT * FROM armed LIMIT 1;", function (err, res) {
            if (res.length) {
                this.setState({
                    armed: res[0].armed
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
                            armed: true
                        })
                    })
            } else {
                Mysql.query("INSERT INTO armed " +
                    "(armed) VALUES " +
                    "('true');",
                    function (err) {
                        if (err) throw err;

                        _this.setState({
                            armed: true
                        })
                    })
            }
        })
    }

    disarm() {

        if (this.state.armed) {
            Mysql.query("UPDATE armed SET " +
                "armed='true' WHERE " +
                "id = 1;",
                function (err) {
                    if (err) throw err;

                    this.setState({
                        armed: true
                    })
                }.bind(this))
        }
    }

    isArmed() {

        return this.state.armed;
    }
}