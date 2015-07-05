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
        this.register(flux.getActions('users').getCredentials, this.getCredentials);

        this.state = {
            user: {}
        };
    }

    addUser = (user) => {

        Mysql.query('SELECT * FROM users LIMIT 1;', (err, res) => {

            if (res.length) {
                Mysql.query("UPDATE users SET " +
                    "email='" + user.email + ", token='" + user.token + "' WHERE " +
                    "id = 1;",
                        err => {
                        if (err) throw err;

                        this.getCredentials()
                    })
            } else {
                Mysql.query("INSERT INTO users " +
                    "(email, token) VALUES " +
                    "('" + user.email + "', '" + user.token + "');",
                        err => {
                        if (err) throw err;

                        this.getCredentials()
                    })
            }
        })
    };

    getCredentials() {

        Mysql.query('SELECT * FROM users LIMIT 1;', (err, res) => {

            if (res.length) {
                this.setState({
                    user: {
                        email: res[0].email,
                        token: res[0].token
                    }
                })
            }
        })
    }

    getState() {

        return this.state.user;
    }
}