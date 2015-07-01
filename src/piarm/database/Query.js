/*
 |--------------------------------------------------------------------------
 | Created by Julien Vincent
 |--------------------------------------------------------------------------
 **/

import Mysql from 'mysql'
import Builder from './Builder'
import Connector from './Connector'

class Query extends Builder {

    constructor() {

        super();
    }

    query = (statement, cb) => {

        cb = cb || function () {
            };

        Connector.getConnection().query(statement, function (err, r, f) {
            if (err) return process.nextTick(function () {
                this.query(statement, cb)
            }.bind(this));

            return cb(err, r, f);
        }.bind(this))
    }
}
let run = new Query();
export default run;