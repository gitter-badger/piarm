/*
 |--------------------------------------------------------------------------
 | Database schema
 |--------------------------------------------------------------------------
 **/

let schema = [
    // Channels table
    "CREATE TABLE channels" +
    "(" +
    "id INT NOT NULL AUTO_INCREMENT, " +
    "name VARCHAR(30) NOT NULL, " +
    "channel VARCHAR(2) NOT NULL, " +
    "direction VARCHAR(3) NOT NULL, " +
    "edge VARCHAR(7) NOT NULL, " +
    "PRIMARY KEY (id)" +
    ");",

    // Users table
    "CREATE TABLE token" +
    "(" +
    "id INT NOT NULL AUTO_INCREMENT, " +
    "email VARCHAR(50) NOT NULL, " +
    "token VARCHAR(100) NOT NULL, " +
    "PRIMARY KEY (id)" +
    ");",

    // Alarm state table
    "CREATE TABLE alarm" +
    "(" +
    "id INT NOT NULL AUTO_INCREMENT, " +
    "armed BOOLEAN NOT NULL, " +
    "PRIMARY KEY (id)" +
    ");",

    // Rules table
    "CREATE TABLE rules" +
    "(" +
    "id INT NOT NULL AUTO_INCREMENT, " +
    "active BOOLEAN NOT NULL, " +
    "time_start TIME, " +
    "time_end TIME, " +
    "date_start DATE, " +
    "date_end DATE, " +
    "days INT UNSIGNED, " +
    "PRIMARY KEY (id)" +
    ");",

    // Statements table
    "CREATE TABLE statements" +
    "(" +
    "id INT NOT NULL AUTO_INCREMENT, " +
    "rule_id INT UNSIGNED NOT NULL, " +
    "position INT UNSIGNED NOT NULL, " +
    "type INT(1) UNSIGNED NOT NULL, " +
    "code INT UNSIGNED NOT NULL, " +
    "PRIMARY KEY (id)" +
    ");",

    // Timestamps table
    "CREATE TABLE timestamps" +
    "(" +
    "id INT NOT NULL AUTO_INCREMENT, " +
    "channels_state VARCHAR(19), " +
    "rules_state VARCHAR(19), " +
    "alarm_state VARCHAR(19), " +
    "PRIMARY KEY (id)" +
    ");"
];

export default schema;