/*
 |--------------------------------------------------------------------------
 | Database connection
 |--------------------------------------------------------------------------
 **/

import Mysql from 'mysql'

class Connector {

    constructor() {


        this.connection = Mysql.createConnection({
            host: 'localhost',
            user: 'piarm',
            password: 'piarm'
        });
        this.connection.connect(function (err) {
             if (err) throw err;
        });
    }

    getConnection() {

        return this.connection;
    }

    setDatabase(database) {

        this.connection = Mysql.createConnection({
            host: 'localhost',
            user: 'piarm',
            password: 'piarm',
            database: database
        });
        this.connection.connect()
    }
}
const run = new Connector();
export default run;