/*
 |--------------------------------------------------------------------------
 | Start the application
 |--------------------------------------------------------------------------
**/

var forever = require('forever-monitor');

var child = new (forever.Monitor)('piarm.js', {
    max: 1,
    silent: true
});

child.on('exit', function () {
    console.log('Application failed to start or exited after an error');
});

child.start();