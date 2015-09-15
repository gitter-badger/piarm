/*
 |--------------------------------------------------------------------------
 | LCD module to interact with the LCD
 |--------------------------------------------------------------------------
 **/

import Lcd from 'lcd'

class LCD {

    //       BOARD  BCM
    // RS -- 32 --- 12
    // E  -- 36 --- 16
    // D4 -- 31 --- 6
    // D5 -- 33 --- 13
    // D6 -- 35 --- 19
    // D7 -- 37 --- 26

    constructor() {
        this.lcd = new Lcd({rs: 12, e: 16, data: [6, 13, 19, 26], cols: 20, rows: 2});

        // Here is a test function for the lcd.. It displays the time
        this.lcd.on('ready', () => {
            setInterval(() => {
                this.lcd.setCursor(0, 0);
                this.lcd.print(new Date().toISOString().substring(11, 19));
            }, 1000);
        });


        // If ctrl+c is hit, free resources and exit.
        process.on('SIGINT', () => {
            this.lcd.close();
            process.exit();
        });
    }
}
const run = new LCD();
export default run;