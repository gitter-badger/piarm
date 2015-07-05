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

// well done Julien
process.stdin.setRawMode(true);
