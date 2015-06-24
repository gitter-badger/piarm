/*
 |--------------------------------------------------------------------------
 | Store channels that need to be exported
 |--------------------------------------------------------------------------
 **/

import { Store } from 'flummox'
import fs from 'fs'

export default class Channels extends Store {

    constructor(flux) {

        super();

        this.register(flux.getActions('channels').getChannels, this.getChannels);
        this.register(flux.getActions('channels').addChannel, this.addChannel);
        this.register(flux.getActions('channels').removeChannel, this.removeChannel);

        this.state = {
            channels: []
        }
    }

    addChannel(info) {

        let path = "./.channels";
        fs.exists(path, function (exists) {
            if (exists) {
                fs.appendFile(path, "\n" + info.name + "=" + info.channel, function (err) {
                    if (err) console.log(err);
                });
            } else {
                fs.writeFile(path, info.name + "=" + infor.channel, function (err) {
                    if (err) console.log(err);
                })
            }
        })
    }

    removeChannel(identifier) {

        let path = './.channels';
        let data = '';
        fs.exists(path, function (exists) {
            if (exists) {
                fs.readFile(path, "utf8", function (err, res) {
                    if (err) console.log(err);

                    res.toString().split(/\r?\n/).forEach(function (line) {

                        if (typeof identifier === 'string') {
                            if (line.substr(0, line.indexOf('=')) != identifier) {
                                if (line != '') {
                                    console.log(line);
                                    data += line + '\n';
                                }
                            }
                        } else {
                            if (line.substr(line.indexOf('=') + 1) != identifier) {
                                if (line != '') {
                                    console.log(line);
                                    data += line + '\n';
                                }
                            }
                        }
                    });

                    fs.writeFile(path, data, function (err) {
                        if (err) console.log(err);
                    });
                });
            } else {
                console.log("File doesn't exist!");
            }
        });
    }

    getChannels() {

        let _this = this;
        let path = "./.channels";
        let channels;
        fs.exists(path, function (exists) {
            if (exists) {
                fs.readFile(path, "utf8", function (err, res) {
                    if (err) console.log(err);

                    res.toString().split(/\r?\n/).forEach(function (line) {

                        let name = line.substr(0, line.indexOf('='));
                        let channel = line.substr(line.indexOf('=') + 1);
                        channels = _this.state.channels;
                        channels.push({
                            name: name,
                            channel: channel
                        });
                    });

                    _this.setState({
                        channels: channels
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