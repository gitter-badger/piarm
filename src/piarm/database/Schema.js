/*
 |--------------------------------------------------------------------------
 | Database schema
 |--------------------------------------------------------------------------
 **/

let schema = [
    "CREATE TABLE channels" +
    "(" +
    "id int NOT NULL AUTO_INCREMENT, " +
    "name varchar(30) NOT NULL, " +
    "channel varchar(2) NOT NULL, " +
    "direction varchar(3) NOT NULL, " +
    "edge varchar(7) NOT NULL, " +
    "PRIMARY KEY (id)" +
    ");",

    "CREATE TABLE users" +
    "(" +
    "id int NOT NULL AUTO_INCREMENT, " +
    "email varchar(50) NOT NULL, " +
    "token varchar(100) NOT NULL, " +
    "PRIMARY KEY (id)" +
    ");",

    "CREATE TABLE armed" +
    "(" +
    "id int NOT NULL AUTO_INCREMENT, " +
    "armed boolean NOT NULL, " +
    "PRIMARY KEY (id)" +
    ");"
];

export default schema;