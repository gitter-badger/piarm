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

        this.state = {
            user: {}
        }
    }

    storeCredentials(user) {

    }

    getCredentials() {

    }

    getState() {

        return this.state.user;
    }
}