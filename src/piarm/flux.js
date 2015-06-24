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

class Flux extends Flummox {

    constructor() {

        super();

        this.createActions('channels', ChannelActions);
        this.createStore('channels', ChannelStore, this);

        this.createActions('users', UserActions);
        this.createStore('users', UserStore, this);
    }
}

const flux = new Flux();
export default flux;