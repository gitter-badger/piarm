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
        this.register(flux.getActions('rules').destroy, this.destroy);

        this.state = {
            rules: []
        };

        this.updateStore()
    }

    addRule = (rule) => {

        Mysql.query("INSERT INTO rules (" +
        "name, active, time_start, time_end, date_start, date_end, days, last_edited) VALUES ('" +
        rule.name + "', " +
        rule.active + ", " +
        rule.time_start + ", " +
        rule.time_end + ", " +
        rule.date_start + ", " +
        rule.date_end + ", " +
        rule.days + ");", err => this.createStatements(rule.name, rule.statements));
    };

    createStatements = (ruleName, statements) => {

        Mysql.query("SELECT * FROM rules WHERE name = " + ruleName, (err, res) => {
            statements.forEach(statement => {
                Mysql.query("INSERT INTO statements (" +
                "rule_id, position, type, code, last_edited) VALUES (" +
                statement.res[0].id + ", " +
                statement.position + ", " +
                statement.type + ", " +
                statement.code + ");")
            });

            this.updateStore()
        })
    }

    updateRule(rule) {

        Mysql.query("UPDATE rules SET " +
        "active=" + rule.active + ", " +
        "time_start=" + rule.time_start + ", " +
        "time_end=" + rule.time_end + ", " +
        "date_start=" + rule.date_start + ", " +
        "date_end=" + rule.date_end + ", " +
        "days=" + rule.days + " " +
        "WHERE id = " + rule.id + ";");

        rule.statements.forEach(statement => {
            Mysql.query("UPDATE statements SET " +
                "rule_id=" + statement.rule_id + ", " +
                "position=" + statement.position + ", " +
                "type=" + statement.type + ", " +
                "code=" + statement.code + " " +
                "WHERE id = " + statement.id + ";"
            )
        })
    }

    updateStore() {

        let rs = [];
        Mysql.query("SELECT * FROM rules", (err, rules) => {
            if (err) throw err;
            Mysql.query("SELECT * FROM statements", (err, statements) => {
                if (err) throw err;

                rules.forEach(rule => {
                    rule.statements = [];
                    statements.forEach(statement => {
                        if (rule.id == statement.rule_id) {

                            rule.statements.push(statement);
                            rs.push(rule);
                        }
                    })
                });

                this.setState({
                    rules: rs
                });
            });
        })
    }

    destroy() {

        Mysql.query("DELETE * FROM rules");
        Mysql.query("DELETE * FROM statements");
    }

    getState() {

        return this.state.rules;
    }
}