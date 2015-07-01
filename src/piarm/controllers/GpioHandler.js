/*
 |--------------------------------------------------------------------------
 | Handles GPIO pin changes
 |--------------------------------------------------------------------------
 **/
import Flux from '../flux'
import EventEmitter from 'events';

class GpioHandler extends EventEmitter {

    constructor() {
        super();

        this.state = {
            channels: [],
            armed: false
        };

        Flux.getStore('channels').on('change', this.storeUpdated);
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
                    this.emit('AlarmChange', this.alarm);
                }
            }
        }.bind(this));
    }
}
let run = new GpioHandler();
export default run;