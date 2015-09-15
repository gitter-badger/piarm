/*
 |--------------------------------------------------------------------------
 | Build initial database tables, reset database, seed database
 |--------------------------------------------------------------------------
 **/

import Mysql from 'mysql'
import Connector from './Connector'
import Schema from './Schema'
import Date from '../lib/Datetime'

export default class Builder {

    constructor() {

        this.database = 'piarm';
        this.createDatabase();
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
        Schema.forEach(table =>
                Connector.getConnection().query(table)
        );
        cb()
    }

    reset = (cb) => {

        cb = cb || function () {
            };

        this.createDatabase(() => {
            Connector.getConnection().query("DROP DATABASE " + this.database, () =>
                    this.createDatabase(cb)
            )
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
                    "('seed', " + c + ", 'in', 'both');",
                    () => console.log('seeded channels'))
            }

            Connector.getConnection().query(
                "INSERT INTO rules " +
                "(active, time_start, time_end, date_start, date_end, days) VALUES " +
                "(true, null, null, null, null, 1111111);",
                () => console.log('seeded rules'));

            Connector.getConnection().query(
                "INSERT INTO statements " +
                "(rule_id, position, type, code) VALUES " +
                "(1, 0, 1, 0);",
                () => console.log('seeded statements'));

            Connector.getConnection().query(
                "INSERT INTO alarm " +
                "(armed) VALUES " +
                "(true);",
                () => console.log('seeded alarm'));

            Connector.getConnection().query(
                "INSERT INTO token " +
                "(email, token) VALUES " +
                "('dummy@gmail.com', '$2y$10$99ci5fyGEIipPdqoiG6s1ejLsERSN9fdeDjoNlZyVi723LOkML9GG');",
                () => console.log('seeded token'));

            Connector.getConnection().query(
                "INSERT INTO timestamps " +
                "(channels_state, rules_state, alarm_state) VALUES " +
                "('" + Date + "', '" + Date + "', '" + Date + "');",
                () => console.log('seeded timestamps'))
        });
    }
}