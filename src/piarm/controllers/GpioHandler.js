/*
 |--------------------------------------------------------------------------
 | Handles GPIO pin changes
 |--------------------------------------------------------------------------
**/
import Flux from '../flux'
import { EventEmitter } from 'events';

class GpioHandler {

    constructor()
    {
        this.channels = [];
        this.alarm = false;

        Flux.getStore('channels').on('change', this.storeUpdated);

        setTimeout(function()
        {
            console.log("2000!");
            console.log(JSON.stringify(this.channels, null, 4));
            this.channels[0].armed = true;
            console.log(JSON.stringify(this.channels, null, 4));

        }.bind(this), 2000);

    }


    storeUpdated = () => {
        this.channels = Flux.getStore('channels').getState().channels;
/*        this.channels.forEach( function(map)
        {
           console.log("map.armed: " + map.armed);
        });*/
    };

    handlePinChange = (channel, value) => {
        //console.log("channel, value: " + channel + ", " + value);
        this.channels.forEach(function(res, index)
        {
            //console.log(JSON.stringify(res, null, 4));
            if (res.channel === channel && value)
            {
                if (res.armed)
                {
                    this.alarm = true;
                    console.log("alarm!");
                    this.emit('AlarmChange', this.alarm);
                }
            }
        }.bind(this));
    }
}
let run = new GpioHandler();
export default run;