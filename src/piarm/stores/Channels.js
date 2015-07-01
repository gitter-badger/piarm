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

        let path = "./channels.json";
        fs.exists(path, function (exists) {
            if (exists) {
                fs.readFile(path, "utf8", function (err, res) {
                    if (err) console.log(err);

                    let data = res;

                    if (res.channels) {
                        res.channels.push({
                            name: info.name,
                            channel: info.channel,
                            direction: info.direction,
                            edge: info.edge
                        });
                    } else {
                        data = {
                            channels: [
                                {
                                    name: info.name,
                                    channel: info.channel,
                                    direction: info.direction,
                                    edge: info.edge
                                }
                            ]
                        };
                    }

                    fs.writeFile(path, data, function (err) {
                        if (err) console.log(err);
                    });
                });
            } else {
                let data = {
                    channels: [
                        {
                            name: info.name,
                            channel: info.channel,
                            direction: info.direction,
                            edge: info.edge
                        }
                    ]
                };

                fs.writeFile(path, data, function (err) {
                    if (err) console.log(err);
                })
            }
        })
    }

    removeChannel(identifier) {

        let path = './channels.json';
        let data = '';
        fs.exists(path, function (exists) {
            if (exists) {
                fs.readFile(path, "utf8", function (err, res) {
                    if (err) console.log(err);

                    let data = res;

                    if (res.channels) {
                        res.channels.forEach(function (element, index) {

                            if (typeof identifier === 'string') {
                                if (element.name != identifier) {
                                    data.channels.splice(index, 1);
                                }
                            } else {
                                if (element.channel != identifier) {
                                    data.channels.splice(index, 1);
                                }
                            }
                        });

                        fs.writeFile(path, data, function (err) {
                            if (err) console.log(err);
                        });
                    }
                });
            } else {
                console.log("File doesn't exist!");
            }
        });
    }

    getChannels() {

        let _this = this;
        let path = "./channels.json";
        let channels;
        fs.exists(path, function (exists) {
            if (exists) {
                fs.readFile(path, "utf8", function (err, res) {
                    if (err) console.log(err);

                    res = JSON.parse(res);
                    if (res.channels) {
                        res.channels.forEach(function (channel) {
                            channels = _this.state.channels;
                            channels.push({
                                name: channel.name,
                                channel: channel.channel,
                                direction: channel.direction,
                                edge: channel.edge,
                                armed : channel.armed
                            });
                        });

                        _this.setState({
                            channels: channels
                        });
                    }
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