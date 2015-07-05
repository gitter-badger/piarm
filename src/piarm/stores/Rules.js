/*
 |--------------------------------------------------------------------------
 | Created by Julien Vincent
 |--------------------------------------------------------------------------
 **/

import { Store } from 'flummox'
import Mysql from '../database/Query'
import Date from '../lib/Datetime'

export default
class Rules extends Store {

    constructor(flux) {

        super();

        this.register(flux.getActions('rules').addRule, this.addRule);
        this.register(flux.getActions('rules').updateRule, this.updateRule);
        this.register(flux.getActions('rules').updateStore, this.updateStore);

        this.state = {
            rules: {}
        };
    }

    addRule(rule) {

        Mysql.query("INSERT INTO rules (" +
        "active, time_start, time_end, date_start, date_end, days, last_edited) VALUES (" +
        rule.active + ", " +
        rule.time_start + ", " +
        rule.time_end + ", " +
        rule.date_start + ", " +
        rule.date_end + ", " +
        rule.days + ", " +
        Date + ");");

        rule.statements.forEach(statement => {
            Mysql.query("INSERT INTO statements (" +
            "rule_id, position, type, code, last_edited) VALUES (" +
            statement.rule_id + ", " +
            statement.position + ", " +
            statement.type + ", " +
            statement.code + ", " +
            Date + ");")
        })
    }

    updateRule(rule) {

        Mysql.query("UPDATE rules SET " +
        "active=" + rule.active + ", " +
        "time_start=" + rule.time_start + ", " +
        "time_end=" + rule.time_end + ", " +
        "date_start=" + rule.date_start + ", " +
        "date_end=" + rule.date_end + ", " +
        "days=" + rule.days + ", " +
        "last_edited=" + Date + " " +
        "WHERE id = " + rule.id + ";");

        rule.statements.forEach(statement => {
            Mysql.query("UPDATE statements SET " +
                "rule_id=" + statement.rule_id + ", " +
                "position=" + statement.position + ", " +
                "type=" + statement.type + ", " +
                "code=" + statement.code + ", " +
                "last_edited= " + Date + " " +
                "WHERE id = " + statement.id + ";"
            )
        })
    }

    updateStore() {

        let rules = [];
        Mysql.query("SELECT * FROM rules", (err, res) => {
            if (err) throw err;

            res.forEach(rule => {
                Mysql.query("SELECT * FROM statements WHERE rule_id = " + rule.id, (err, statements) => {
                    if (err) throw err;

                    rule.statements = statements;

                    rules.push(rule)
                })
            });

            this.setState({
                rules: rules
            })
        })
    }

    getState() {

        return this.state.rules;
    }
}