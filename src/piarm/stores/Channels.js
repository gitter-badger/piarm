/*
 |--------------------------------------------------------------------------
 | Store channels that need to be exported
 |--------------------------------------------------------------------------
 **/

import { Store } from 'flummox'

class Channels extends Store {

    constructor(flux) {

        super();

        this.register(flux.getActions('channels').getChannels, this.getChannels);

        this.state = {
            channels: []
        }
    }

    getChannels() {

        let _this = this;
        let path = "./.channels";
        fs.exists(path, function (exists) {
            if (exists) {
                fs.readFile(path, "utf8", function (err, res) {
                    if (err) console.log(err);

                    res.toString().split(/\r?\n/).forEach(function (line) {

                        let name = line.substr(0, line.indexOf('='));
                        let channel = line.substr(line.indexOf('=') + 1);
                        let channels = _this.state.channels.push({
                            name: name,
                            channel: channel
                        });

                        _this.setState({
                            channels: channels
                        });
                    });
                });
            } else {

                console.log("File doesn't exist!");
            }
        });
    }

    getState() {

        return this.state;
    }
}