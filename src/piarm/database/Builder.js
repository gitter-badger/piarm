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

        this.state = {
            database: 'piarm',
            built: false
        };
        this.createDatabase()
    }

    createDatabase = () => {

        Connector.getConnection().query('CREATE DATABASE ' + this.state.database, function (err) {
            Connector.setDatabase(this.state.database);

            if (!err) {
                this.build();
            } else {
                this.state.built = true;
            }
        }.bind(this));
    };

    build() {

        Schema.forEach(function (table) {
            Connector.getConnection().query(table)
        }.bind(this));

        this.state.built = true;
    }
}