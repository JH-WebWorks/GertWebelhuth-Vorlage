"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Bjs = require('borjes');

var BorjesComponent = require('./BorjesComponent');

var BorjesSet = function (_React$Component) {
    _inherits(BorjesSet, _React$Component);

    function BorjesSet() {
        _classCallCheck(this, BorjesSet);

        return _possibleConstructorReturn(this, (BorjesSet.__proto__ || Object.getPrototypeOf(BorjesSet)).apply(this, arguments));
    }

    _createClass(BorjesSet, [{
        key: 'update',
        value: function update(i, v) {
            var x = this.props.x;
            x.e[i] = v;
            this.props.update(x);
        }
    }, {
        key: 'rm',
        value: function rm(i) {
            var x = this.props.x;
            x.e.splice(i, 1);
            this.props.update(x);
        }
    }, {
        key: 'append',
        value: function append() {
            var x = this.props.x;
            x.e.push(Bjs.types.Anything);
            this.props.update(x);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var x = this.props.x;
            var opts = this.props.opts;
            return React.createElement(
                'span',
                { className: 'borjes_set' },
                x.e.map(function (el, i) {
                    return React.createElement(
                        'span',
                        { key: i },
                        i > 0 ? "," : null,
                        React.createElement(
                            'button',
                            { onClick: _this2.rm.bind(_this2, i) },
                            'x'
                        ),
                        React.createElement(BorjesComponent, { x: el, refresh: _this2.props.refresh, update: _this2.update.bind(_this2, i), opts: opts })
                    );
                }),
                React.createElement(
                    'button',
                    { onClick: this.append.bind(this) },
                    '+'
                )
            );
        }
    }]);

    return BorjesSet;
}(React.Component);

module.exports = BorjesSet;

