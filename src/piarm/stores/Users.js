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

        this.register(flux.getActions('users').addUser, this.addUser);

        this.state = {
            user: {}
        };

        this.getCredentials()
    }

    addUser = (user) => {

        let _this = this;
        Mysql.query('SELECT * FROM users LIMIT 1;', function (err, res) {

            if (res.length) {
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

        Mysql.query('SELECT * FROM users LIMIT 1;', function (err, res) {

            if (res.length) {
                this.setState({
                    user: {
                        email: res[0].email,
                        token: res[0].token
                    }
                })
            }
        }.bind(this))
    }

    getState() {

        return this.state.user;
    }
}