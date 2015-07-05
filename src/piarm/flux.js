/*
 |--------------------------------------------------------------------------
 | Created by Julien Vincent
 |--------------------------------------------------------------------------
 **/

import { Flummox } from 'flummox'

import ChannelActions from './actions/Channels'
import ChannelStore from './stores/Channels'

import UserActions from './actions/Users'
import UserStore from './stores/Users'

import AlarmActions from './actions/Alarm'
import AlarmStore from './stores/Alarm'

import RuleActions from './actions/Rules'
import RuleStore from './stores/Rules'

class Flux extends Flummox {

    constructor() {

        super();

        this.createActions('channels', ChannelActions);
        this.createStore('channels', ChannelStore, this);

        this.createActions('users', UserActions);
        this.createStore('users', UserStore, this);

        this.createActions('alarm', AlarmActions);
        this.createStore('alarm', AlarmStore, this);

        this.createActions('rules', RuleActions);
        this.createStore('rules', RuleStore, this)
    }
}

const flux = new Flux();
export default flux;