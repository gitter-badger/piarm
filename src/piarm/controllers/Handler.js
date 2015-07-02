/*
 |--------------------------------------------------------------------------
 | Handles GPIO pin changes
 |--------------------------------------------------------------------------
 **/
import Flux from '../flux'

class Handler {

    constructor() {

        Flux.getStore('channels').on('change', this.storeUpdated);

        this.state = {
            channels: [],
            alarm: false
        };
    }

    storeUpdated = () => {
        this.state.channels = Flux.getStore('channels').getState().channels;
        /*        this.channels.forEach( function(map)
         {
         console.log("map.armed: " + map.armed);
         });*/
    };

    alarmFunction = (val) => {
        console.log('Alarm: ' + val);
    };

    handlePinChange = (channel, value) => {
        //console.log("channel, value: " + channel + ", " + value);
        this.state.channels.forEach(function (res, index) {
            //console.log(JSON.stringify(res, null, 4));
            if (res.channel === channel && value) {
                if (res.armed) {
                    this.state.alarm = true;
                }
            }
        }.bind(this));
    }
}
let run = new Handler();
export default run;