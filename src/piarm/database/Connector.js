/*
 |--------------------------------------------------------------------------
 | Database connection
 |--------------------------------------------------------------------------
 **/

import Mysql from 'node-mysql'

class Connector {

    constructor() {

        this.connection = Mysql.createConnection({
            host: 'localhost',
            user: 'piarm',
            password: 'piarm',
            database: 'piarm'
        }).connect();

        this.build()
    }

    build() {

    }

    getChannels() {

        this.connection.query('SELECT * FROM channels', function (err, rows, fields) {
            if (err) console.log(err);

            console.log(rows);
            console.log(fields)
        })
    }
}