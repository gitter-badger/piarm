/*
 |--------------------------------------------------------------------------
 | Manage user information
 |--------------------------------------------------------------------------
 **/

import { Store } from 'flummox'
import fs from 'fs'

export default class Users extends Store {

    constructor(flux) {

        super();

        this.register(flux.getActions('users').storeCredentials, this.storeCredentials);
        this.register(flux.getActions('users').getCredentials, this.getCredentials);

        this.path = './user.json';
        this.state = {
            user: {}
        }
    }

    storeCredentials(user) {

        let data = user.email + '\n' + user.token;
        fs.writeFile(this.path, data, function (err) {
            if (err) throw err;

            this.setState({
                user: {
                    email: user.email,
                    token: user.token
                }
            })
        }.bind(this))
    }

    getCredentials() {

        let data = [];
        let _this = this;
        fs.exists(this.path, function (exists) {
            if (exists) {
                fs.readFile(path, "utf8", function (err, res) {
                    if (err) console.log(err);

                    res.toString().split(/\r?\n/).forEach(function (line) {
                        data.push(line);
                    });

                    _this.setState({
                        user: {
                            email: data[0],
                            token: data[1]
                        }
                    })
                })
            } else {
                console.log('File does not exist')
            }
        })
    }

    getUser() {

        return this.state.user;
    }
}