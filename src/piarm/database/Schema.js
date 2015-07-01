/*
 |--------------------------------------------------------------------------
 | Database schema
 |--------------------------------------------------------------------------
 **/

let schema = [
    "CREATE TABLE channels" +
    "(" +
    "id integer(11), " +
    "channel varchar(2), " +
    "direction varchar(3), " +
    "edge varchar(7)" +
    ");",

    "CREATE TABLE users" +
    "(" +
    "id integer(1), " +
    "email varchar(50), " +
    "token varchar(100)" +
    ");"
];

export default schema;