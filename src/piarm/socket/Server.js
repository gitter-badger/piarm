/*
 |--------------------------------------------------------------------------
 | Client socket server for accepting push commands.
 |
 | Uses the socket.io library. (http://socket.io/)
 |--------------------------------------------------------------------------
 */

import http from 'http'
import Socket from 'socket.io'

var server = http.createServer();
var io = Socket(server);

var sockets = {};

io.on('connection', function (socket) {
    console.log('Client connected');

    socket.on('name', function (data) {
        sockets = {name: data, socket: socket};

        ping();
    });

});

function ping() {
    let i = true;
    while (i) {

        if (sockets.name == 'name') {

            sockets.socket.emit('command');
            i = false;
        }
    }
}

server.listen(3000);
