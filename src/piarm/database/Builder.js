/*
 |--------------------------------------------------------------------------
 | Build initial database tables
 |--------------------------------------------------------------------------
 **/

import Mysql from 'mysql'
import Connector from './Connector'
import Schema from './Schema'

export default class Builder {

    constructor() {

        this.database = 'piarm';
        this.createDatabase()
    }

    createDatabase = () => {

        Connector.getConnection().query('CREATE DATABASE ' + this.database, function (err) {
            if (!err) {
                this.build();
            } else {
                Connector.setDatabase(this.database);
            }
        }.bind(this));
    };

    build() {

        Connector.setDatabase(this.database);
        Schema.forEach(function (table) {
            Connector.getConnection().query(table)
        }.bind(this));
    }
}