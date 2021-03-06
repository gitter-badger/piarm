/*
 |--------------------------------------------------------------------------
 | Handles GPIO pin changes
 |--------------------------------------------------------------------------
 **/
import Flux from '../flux'
import { EventEmitter } from 'events'

class Handler extends EventEmitter {

    constructor() {

        super();

        Flux.getStore('channels').on('change', this.storeUpdated);
        this.storeUpdated();

        this.state = {
            channels: [],
            alarm: false
        };
    }

    storeUpdated = () => {

        this.state.channels = Flux.getStore('channels').getState();
        this.debug("this.state.channels: " + JSON.stringify(this.state.channels, null, 4));
    };

    alarmFunction = (val) => {
        console.log('Alarm: ' + val);
    };

    handlePinChange(channel, value) {
        console.log("channel, value: " + channel + ", " + value);
        this.state.channels.forEach(res => {
            //console.log(JSON.stringify(res, null, 4));
            if (res.channel === channel && value) {
                if (res.armed) {
                    this.state.alarm = true;
                }
            }
        })
    }

    debug = (input) => {
        /* TODO: make cool debug function that determines if input is Object object or Object array etcetra
         in other words determine if console .log or .dir should be used
         (or JSON.stringify(res, null, 4) for that matter.
         */

        // console.log() and .dir() only do different things when used
        // in conjunction with A browser like chrome or firefox

        let debug_enable = false;
        if (debug_enable) console.log(input);
    }
}
let run = new Handler();
export default run;