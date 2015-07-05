/*
 |--------------------------------------------------------------------------
 | Build initial database tables, reset database, seed database
 |--------------------------------------------------------------------------
 **/

import Mysql from 'mysql'
import Connector from './Connector'
import Schema from './Schema'

export default class Builder {

    constructor() {

        this.database = 'piarm';
        this.createDatabase();

        //this.seed()
        setTimeout(function(){
            this.seed();
        }.bind(this), 3000)
    }

    createDatabase = (cb) => {

        cb = cb || function () {
            };

        Connector.getConnection().query('CREATE DATABASE ' + this.database, err => {
            if (!err) {
                this.build(cb);
            } else {
                Connector.setDatabase(this.database);
                cb()
            }
        });
    };

    build(cb) {

        Connector.setDatabase(this.database);
        Schema.forEach(table => {
            Connector.getConnection().query(table)
        });
        cb()
    }

    reset = (cb) => {

        cb = cb || function () {
            };

        this.createDatabase(() => {
            Connector.getConnection().query("DROP DATABASE " + this.database, () => {

                this.createDatabase(cb);
            })
        })
    };

    seed = () => {

        this.reset(() => {

            for (var i = 0; i < 2; i++) {

                let c;
                if (!i) {
                    c = 3
                } else {
                    c = 5
                }
                Connector.getConnection().query(
                    "INSERT INTO channels " +
                    "(name, channel, direction, edge) VALUES " +
                    "('seed', " + c + ", 'in', 'both');"
                )
            }

            Connector.getConnection().query(
                "INSERT INTO users " +
                "(email, token) VALUES " +
                "('dummy@gmail.com', '9427eff152d7ca883540b1e53274076c');",
                () => {
                    console.log('seed complete')
                })
        });

    }
}