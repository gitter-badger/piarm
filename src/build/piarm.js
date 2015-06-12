(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Julien Vincent.
 *
 * MAIN file.
 */

//import helper from './helpers/helpers';
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _testsGPIOJs = require('./tests/GPIO.js');

var _testsGPIOJs2 = _interopRequireDefault(_testsGPIOJs);

_testsGPIOJs2['default'].read(1, function (err, res) {

  return console.log(res);
});

},{"./tests/GPIO.js":2}],2:[function(require,module,exports){
/**
 * Created by Julien Vincent.
 *
 * RPi.GPIO imitator
 */

//import helper from '../helpers/helpers';

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GPIO = (function () {
    function GPIO() {
        _classCallCheck(this, GPIO);
    }

    _createClass(GPIO, [{
        key: "read",
        value: function read(channel, callback) {

            callback(0, 1);
        }
    }]);

    return GPIO;
})();

exports["default"] = GPIO = new GPIO();
module.exports = exports["default"];

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9qdWxpZW4vY29kZS9hbGFybS9zcmMvcGlhcm0vcGlhcm0uanMiLCIvaG9tZS9qdWxpZW4vY29kZS9hbGFybS9zcmMvcGlhcm0vdGVzdHMvR1BJTy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7OzJCQ09pQixpQkFBaUI7Ozs7QUFFbEMseUJBQUssSUFBSSxDQUFDLENBQUMsRUFBRSxVQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUU7O0FBRTVCLFNBQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUMzQixDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0pHLElBQUk7YUFBSixJQUFJOzhCQUFKLElBQUk7OztpQkFBSixJQUFJOztlQUVGLGNBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRTs7QUFFcEIsb0JBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDbEI7OztXQUxDLElBQUk7OztxQkFPSyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSnVsaWVuIFZpbmNlbnQuXHJcbiAqXHJcbiAqIE1BSU4gZmlsZS5cclxuICovXHJcblxyXG4vL2ltcG9ydCBoZWxwZXIgZnJvbSAnLi9oZWxwZXJzL2hlbHBlcnMnO1xyXG5pbXBvcnQgR1BJTyBmcm9tICcuL3Rlc3RzL0dQSU8uanMnO1xyXG5cclxuR1BJTy5yZWFkKDEsIGZ1bmN0aW9uKGVyciwgcmVzKSB7XHJcblxyXG4gICAgcmV0dXJuIGNvbnNvbGUubG9nKHJlcyk7XHJcbn0pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEp1bGllbiBWaW5jZW50LlxyXG4gKlxyXG4gKiBSUGkuR1BJTyBpbWl0YXRvclxyXG4gKi9cclxuXHJcbi8vaW1wb3J0IGhlbHBlciBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xyXG5cclxuY2xhc3MgR1BJTyB7XHJcblxyXG4gICAgcmVhZChjaGFubmVsLCBjYWxsYmFjaykge1xyXG5cclxuICAgICAgICBjYWxsYmFjaygwLCAxKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBHUElPID0gbmV3IEdQSU87Il19
