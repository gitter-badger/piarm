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
            user: 'root',
            password: 'autoloader'
        });
        this.connection.connect(err => {
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
        this.connection.connect(err => {
            if (err) throw err;
        });
    }
}
const run = new Connector();
export default run;