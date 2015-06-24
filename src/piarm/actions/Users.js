/*
 |--------------------------------------------------------------------------
 | Actions to interact with the Users store
 |--------------------------------------------------------------------------
**/

import { Actions } from 'flummox'

export default class Users extends Actions {

    storeCredentials(user) {

        return user;
    }

    getCredentials() {

        return true;
    }
}