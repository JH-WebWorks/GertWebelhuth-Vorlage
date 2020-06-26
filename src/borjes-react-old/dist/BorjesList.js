"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Bjs = require('borjes');

var BorjesComponent = require('./BorjesComponent');
var BorjesAVM = require('borjes-react/src/BorjesAVM');

var BorjesList = function (_React$Component) {
    _inherits(BorjesList, _React$Component);

    function BorjesList() {
        _classCallCheck(this, BorjesList);

        return _possibleConstructorReturn(this, (BorjesList.__proto__ || Object.getPrototypeOf(BorjesList)).apply(this, arguments));
    }

    _createClass(BorjesList, [{
        key: 'updateFst',
        value: function updateFst(v) {
            var x = this.props.x;
            x.first = v;
            this.props.update(x);
        }
    }, {
        key: 'updateRest',
        value: function updateRest(v) {
            var x = this.props.x;
            x.rest = v;
            this.props.update(x);
        }
    }, {
        key: 'append',
        value: function append() {
            var x = this.props.x;
            x.rest = Bjs.types.List(Bjs.types.Anything);
            this.props.update(x);
        }
    }, {
        key: 'render',
        value: function render() {
            var x = this.props.x;
            var opts = this.props.opts;
            var file = this.props.file;
            opts.editable = true; // this value needs to come from AVM!
            if (x.borjes === 'list_empty') {
                return React.createElement('span', { className: 'borjes_list' });
            }
            var aft = [];
            var i = 0;
            var rest = x.rest;
            if (!opts.editable) {
                while (rest.borjes === 'list') {
                    aft.push(",");
                    aft.push(React.createElement(BorjesComponent, { key: i, x: rest.first, file: file, refresh: this.error, update: this.error, opts: opts }));
                    i++;
                    rest = rest.rest;
                }
            }
            return React.createElement(
                'span',
                { className: 'borjes_list' },
                React.createElement(BorjesComponent, { x: x.first, file: file, refresh: this.props.refresh, update: this.updateFst.bind(this), opts: opts }),
                aft,
                rest.borjes !== 'list_empty' ? "," : null,
                rest.borjes !== 'list_empty' ? React.createElement(BorjesComponent, { x: rest, file: file, refresh: this.props.refresh, update: this.updateRest.bind(this), opts: opts }) : null,
                rest.borjes === 'list_empty' && opts.editable ? React.createElement(
                    'button',
                    { onClick: this.append.bind(this) },
                    '+'
                ) : null
            );
        }
    }]);

    return BorjesList;
}(React.Component);

module.exports = BorjesList;

/*
{console.log('============================ x ' + JSON.stringify(x, null, 4))}
{console.log('============================ x.first ' + JSON.stringify(x.first, null, 4))}
{console.log('============================ rest ' + JSON.stringify(rest, null, 4))}*/

