/*
 |--------------------------------------------------------------------------
 | Manage user information
 |--------------------------------------------------------------------------
 **/

import { Store } from 'flummox'
import Mysql from '../database/Query'

export default class Token extends Store {

    constructor(flux) {

        super();

        this.register(flux.getActions('token').addToken, this.addToken);
        this.register(flux.getActions('token').getToken, this.getToken);

        this.state = {
            user: {}
        };
    }

    addToken = (token) => {

        Mysql.query('SELECT * FROM token LIMIT 1;', (err, res) => {

            if (res.length) {
                Mysql.query("UPDATE token SET " +
                    "email='" + token.email + ", token='" + token.token + "' WHERE " +
                    "id = 1;",
                        err => {
                        if (err) throw err;

                        this.getToken()
                    })
            } else {
                Mysql.query("INSERT INTO token " +
                    "(email, token) VALUES " +
                    "('" + token.email + "', '" + token.token + "');",
                        err => {
                        if (err) throw err;

                        this.getToken()
                    })
            }
        })
    };

    getToken() {

        Mysql.query('SELECT * FROM token LIMIT 1;', (err, res) => {

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