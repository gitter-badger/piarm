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
io.on('connection', function(socket){
    console.log('Client connected')

    socket.on('event', function(data){});
    socket.on('disconnect', function(){
        console.log('client disconnected')
    });
});
server.listen(3000);