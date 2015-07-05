/**
 * Created by Daniel on 2015-07-05.
 */

var keydown = require('keydown')

var kd = keydown(['<control>', 'a'])

kd.on('pressed', function() {
    // control + a are both pressed right now
    console.log("control + a are both pressed right now")
})

/*var Listener = require('../lib/keypress')

var listener = new window.keypress.Listener();

listener.simple_combo("shift s", function() {
    console.log("You pressed shift and s");
});*/

/*
var keypress = require('keypress');

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
    console.log('got "keypress"', key, ch);
    if (typeof key !== "undefined") {
        if (key.ctrl && key.name == 'c') {
            process.stdin.pause();
        }
    }
});

process.stdin.resume();
*/
