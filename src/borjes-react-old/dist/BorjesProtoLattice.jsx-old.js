"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _borjes = require('borjes');

var _borjes2 = _interopRequireDefault(_borjes);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _BorjesAVM = require('./BorjesAVM');

var _BorjesAVM2 = _interopRequireDefault(_BorjesAVM);

var _BorjesList = require('./BorjesList');

var _BorjesList2 = _interopRequireDefault(_BorjesList);

var _BorjesVariable = require('./BorjesVariable');

var _BorjesVariable2 = _interopRequireDefault(_BorjesVariable);

var _BorjesLatticeElement = require('./BorjesLatticeElement');

var _BorjesLatticeElement2 = _interopRequireDefault(_BorjesLatticeElement);

var _BorjesDisjunct = require('./BorjesDisjunct');

var _BorjesDisjunct2 = _interopRequireDefault(_BorjesDisjunct);

var _BorjesSet = require('./BorjesSet');

var _BorjesSet2 = _interopRequireDefault(_BorjesSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FStruct = _borjes2.default.types.FStruct;
var TFS = _borjes2.default.types.TFS;
var BorjesComponent = require('./BorjesComponent');

var BorjesProtoLattice = function (_React$Component) {
    _inherits(BorjesProtoLattice, _React$Component);

    function BorjesProtoLattice(props) {
        _classCallCheck(this, BorjesProtoLattice);

        var _this = _possibleConstructorReturn(this, (BorjesProtoLattice.__proto__ || Object.getPrototypeOf(BorjesProtoLattice)).call(this, props));

        var subType = true;
        var showAVM = '';
        _this.state = { subType: subType, showAVM: showAVM };
        return _this;
    }

    _createClass(BorjesProtoLattice, [{
        key: 'update',
        value: function update(el, sub) {
            var x = this.props.x;
            if (sub !== null && Object.keys(sub).length == 0) {
                sub = null;
            }
            x[el] = sub;
            this.props.update(x);
        }
    }, {
        key: 'addEl',
        value: function addEl(event) {
            if (event.keyCode == 13) {
                var el = this.newEl.value;
                var x = this.props.x;
                if (el.length > 0 && x[el] === undefined) {
                    x[el] = null;
                    this.props.update(x);
                }
            }
        }
    }, {
        key: 'remEl',
        value: function remEl(el) {
            var x = this.props.x;
            delete x[el];
            this.props.update(x);
        }
    }, {
        key: 'cpEl',
        value: function cpEl(el) {
            this.props.opts.cpbuffer.v = {
                borjes: 'latticeel',
                l: this.props.name || this.props.opts.name,
                e: el
            };
        }
    }, {
        key: 'addSubType',
        value: function addSubType() {
            var subType = this.state.subType;
            subType = true;
            this.setState({ subType: subType });
        }
    }, {
        key: 'addFeatF',
        value: function addFeatF(t) {
            return null;
        }
    }, {
        key: 'showAVMF',
        value: function showAVMF(t) {
            var showAVM = this.state.showAVM;
            showAVM = t;
            this.setState({ showAVM: showAVM });
        }
    }, {
        key: 'hideAVMF',
        value: function hideAVMF() {
            var showAVM = this.state.showAVM;
            showAVM = '';
            this.setState({ showAVM: showAVM });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var x = this.props.x;
            var opts = this.props.opts;
            opts.cpbuffer = this.props.cpbuffer || opts.cpbuffer || {};
            opts.name = this.props.name || opts.name;
            var subType = this.state.subType;
            var showAVM = this.state.showAVM;

            var contStyle = {
                display: 'flex',
                flexDirection: 'column'
            };
            var rowStyle = {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            };

            if (!opts.child) {
                opts.child = true;
                opts.refs = {};
                return _react2.default.createElement(
                    'span',
                    { style: rowStyle },
                    '\u22A4\u2014',
                    _react2.default.createElement(BorjesProtoLattice, { x: x, opts: opts, update: this.props.update })
                );
            }

            /*        var i = 0;
                    var current = "sign";
                    Object.keys(x).map((k) => {
                        var first = !opts.refs[k];
                        opts.refs[k] = true;
                        var subs;
                        var feats;
                        x[k]?subs = x[k]["subs"]:subs=null;
                        x[k]?feats = x[k]["feats"]:feats=null;
                    }
                    )*/

            return _react2.default.createElement(
                'span',
                { style: contStyle, className: 'borjes borjes_latticeproto' },
                Object.keys(x).map(function (k) {
                    var first = !opts.refs[k];
                    opts.refs[k] = true;
                    var fstruc = TFS(k, x[k]["subs"]);
                    console.clear;
                    console.log(JSON.stringify(fstruc));
                    console.log('==============================================================================================================');
                    return _react2.default.createElement(
                        'span',
                        { key: 'gert' + i++, style: rowStyle },
                        '/*                    ',
                        _react2.default.createElement(
                            'button',
                            { className: 'small', onClick: _this2.addFeatF.bind(_this2, k) },
                            'a'
                        ),
                        _react2.default.createElement(
                            'button',
                            { className: 'small', onClick: _this2.remEl.bind(_this2, k) },
                            'x'
                        ),
                        '*/',
                        k === "sign" ? _react2.default.createElement(BorjesComponent, { onMouseLeave: _this2.hideAVMF.bind(_this2), x: fstruc, cpbuffer: _this2.props.cpbuffer }) : null
                    );
                }),
                _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement('input', { ref: function ref(d) {
                            return _this2.newEl = d;
                        }, type: 'text', onKeyUp: this.addEl.bind(this) })
                )
            );
        }
    }]);

    return BorjesProtoLattice;
}(_react2.default.Component);

/*<span key={k+(i++)} style={rowStyle}>
    <button className="small" onClick={this.addFeatF.bind(this, k)}>a</button>
    <button className="small" onClick={this.remEl.bind(this, k)}>x</button>
    <button className="small" onClick={this.addFeatF().bind(this, k)}>+F</button>
    <span className={first?"borjes_lpel_first":"borjes_lpel_ref"} onMouseOver={this.showAVMF().bind(this, k)}}>{k}</span>
    {subType?'—':null}
    {subType?<BorjesProtoLattice x={x[k] || {}} opts={opts} update={this.update.bind(this, k)} />:null}
</span>;*/

/*console.clear;
console.log("=================================================================================");
console.log("x = " + JSON.stringify(x));
console.log("Object.keys(x) = " + Object.keys(x));
console.log("k = " + k);
console.log("refs[k] = " + opts.refs[k]);

console.log("refs[k] = " + opts.refs[k]);
console.log("first = " + first);
console.log("x[k] = " + x[k]);
console.log("=================================================================================");*/

exports.default = BorjesProtoLattice;

