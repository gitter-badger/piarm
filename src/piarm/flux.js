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

import ArmedActions from './actions/Armed'
import ArmedStore from './stores/Armed'

class Flux extends Flummox {

    constructor() {

        super();

        this.createActions('channels', ChannelActions);
        this.createStore('channels', ChannelStore, this);

        this.createActions('users', UserActions);
        this.createStore('users', UserStore, this);

        this.createActions('armed', ArmedActions);
        this.createStore('armed', ArmedStore, this)
    }
}

const flux = new Flux();
export default flux;