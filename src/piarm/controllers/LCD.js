/**
 * Created by Daniel on 2015-07-03.
 */
var Lcd = require('lcd'),
    lcd = new Lcd({rs: 12, e: 16, data: [6, 13, 19, 26], cols: 20, rows: 2});

//       BOARD  BCM
// RS -- 32 --- 12
// E  -- 36 --- 16
// D4 -- 31 --- 6
// D5 -- 33 --- 13
// D6 -- 35 --- 19
// D7 -- 37 --- 26

// Here is a test function for the lcd..

lcd.on('ready', function () {
    setInterval(function () {
        lcd.setCursor(0, 0);
        lcd.print(new Date().toISOString().substring(11, 19));
    }, 1000);
});
