(function() {
    "use strict";

    var $$$helpers$helpers$$fs = require('fs');

    function $$$helpers$helpers$$env(name) {var def = arguments[1];if(def === void 0)def = null;
    
        var value = null;
    
        if (def) {
            value = def;
        }
        $$$helpers$helpers$$fs.readFile(".env", "utf8", function (err, res) {
    
            res.toString().split("\n").forEach(function (line, index, arr) {
                if (index === arr.length - 1 && line === "") {
                    return;
                }
                console.log(line);
                if (line.substr(0, line.indexOf('=')) == name) {
                    value = line.substr(line.indexOf('='));
                }
            });
        });
    
        return value;
    }

    var $$tests$GPIO$$GPIO = {
    
        setup: function() {
    
        },
    
        read: function(channel, callback) {
    
            var res = $$$helpers$helpers$$env("GPIO_" + channel);
    
            return callback(null, res);
        },
    
        write: function() {
    
        },
    
        setMode: function() {
    
        },
    
        setPollFrequency: function() {
    
        },
    
        destroy: function() {
    
        }
    };

    var $$tests$GPIO$$default = $$tests$GPIO$$GPIO;

    $$tests$GPIO$$default.read(1, function(err, res) {
    
        console.log(err + " " + res);
    });
}).call(this);