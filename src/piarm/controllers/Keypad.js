import keypress from 'keypress'

class Keypad {
    constructor(){
        keypress(process.stdin);
        // well done Julien
        process.stdin.setRawMode(true);
        process.stdin.resume();

        process.stdin.on('keypress', function (ch, key) {
            console.log('got "keypress"', key, ch);
            if (typeof key !== "undefined") {
                if (key.ctrl && key.name == 'c') {
                    process.stdin.pause();
                    console.log("Bye");
                    process.exit(0);
                }
            }
        }.bind(this));
    }
}
const run = new Keypad();
export default run;
