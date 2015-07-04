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

        // Julien, can you log a message if there is no connection?
        this.connection.connect(function(err)
        {
            // console.log("err: " + err);
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