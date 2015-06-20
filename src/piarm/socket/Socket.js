import io from 'socket.io-client'

let socket = io('http://192.168.0.144:3000');

socket.on('connect', function () {

    console.log('connected');

    socket.emit('name', 'name')
});

socket.on('command', function () {

    console.log('command received')
});