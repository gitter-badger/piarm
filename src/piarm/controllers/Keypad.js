import keypress from 'keypress'

class Keypad {
    constructor(){
        keypress(process.stdin);
        process.stdin.setRawMode(true);

        process.stdin.on('keypress', (ch, key) => {
            console.log('got "keypress"', key, ch);
            if (typeof key !== "undefined") {
                if (key.ctrl && key.name == 'c') {
                    process.stdin.pause();
                    console.log("Bye");
                    process.exit(0);
                }
            }
        });
    }
}
const run = new Keypad();
export default run;
