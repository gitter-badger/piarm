/*
 |--------------------------------------------------------------------------
 | Manage user information
 |--------------------------------------------------------------------------
 **/

import { Store } from 'flummox'
import Mysql from '../database/Query'

export default class Users extends Store {

    constructor(flux) {

        super();

        this.register(flux.getActions('users').storeCredentials, this.storeCredentials);
        this.register(flux.getActions('users').getCredentials, this.getCredentials);

        this.state = {
            user: {}
        }
    }

    storeCredentials = (user) => {

        let _this = this;
        Mysql.query('SELECT * FROM users ORDER BY users ASC LIMIT 1;', function (err, res) {

            if (res == {}) {
                Mysql.query("UPDATE users SET " +
                    "email='" + user.email + ", token='" + user.token + "' WHERE " +
                    "id = 1;",
                    function (err) {
                        if (err) throw err;

                        _this.getCredentials()
                    })
            } else {
                Mysql.query("INSERT INTO users " +
                    "(email, token) VALUES " +
                    "('" + user.email + "', '" + user.token + "');",
                    function (err) {
                        if (err) throw err;

                        _this.getCredentials()
                    })
            }
        })
    };

    getCredentials() {

        Mysql.query('SELECT * FROM users ORDER BY users ASC LIMIT 1;', function (err, res) {

            this.setState({
                user: {
                    email: res.email,
                    token: res.token
                }
            })
        }.bind(this))
    }

    getState() {

        return this.state.user;
    }
}