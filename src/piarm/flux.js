/*
 |--------------------------------------------------------------------------
 | Created by Julien Vincent
 |--------------------------------------------------------------------------
 **/

import { Flummox } from 'flummox'

import ChannelActions from './actions/Channels'
import ChannelStore from './stores/Channels'

import TokenActions from './actions/Token'
import TokenStore from './stores/Token'

import AlarmActions from './actions/Alarm'
import AlarmStore from './stores/Alarm'

import RuleActions from './actions/Rules'
import RuleStore from './stores/Rules'

import TimestampActions from './actions/Timestamps'
import TimestampStore from './stores/Timestamps'

class Flux extends Flummox {

    constructor() {

        super();

        this.createActions('channels', ChannelActions);
        this.createStore('channels', ChannelStore, this);

        this.createActions('token', TokenActions);
        this.createStore('token', TokenStore, this);

        this.createActions('alarm', AlarmActions);
        this.createStore('alarm', AlarmStore, this);

        this.createActions('rules', RuleActions);
        this.createStore('rules', RuleStore, this);

        this.createActions('timestamps', TimestampActions);
        this.createStore('timestamps', TimestampStore, this)
    }
}

const flux = new Flux();
export default flux;