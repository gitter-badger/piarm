/*
 |--------------------------------------------------------------------------
 | Created by Julien Vincent
 |--------------------------------------------------------------------------
**/

import { Flummox } from 'flummox'

import ChannelActions from './actions/Channels'
import ChannelStore from './stores/Channels'

class Flux extends Flummox {

    constructor() {

        super();

        this.createActions('channels', ChannelActions);
        this.createStore('channels', ChannelStore, this);
    }
}

const flux = new Flux();
export default flux;