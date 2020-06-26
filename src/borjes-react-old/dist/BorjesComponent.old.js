"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _borjes = require('borjes');

var _borjes2 = _interopRequireDefault(_borjes);

var _BorjesTree = require('./BorjesTree');

var _BorjesTree2 = _interopRequireDefault(_BorjesTree);

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

var _BorjesSum = require('./BorjesSum');

var _BorjesSum2 = _interopRequireDefault(_BorjesSum);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FStruct = _borjes2.default.types.FStruct;
var Anything = _borjes2.default.types.Anything;

var BorjesComponent = function (_React$Component) {
    _inherits(BorjesComponent, _React$Component);

    function BorjesComponent() {
        _classCallCheck(this, BorjesComponent);

        return _possibleConstructorReturn(this, (BorjesComponent.__proto__ || Object.getPrototypeOf(BorjesComponent)).apply(this, arguments));
    }

    _createClass(BorjesComponent, [{
        key: 'updateLiteral',
        value: function updateLiteral(e) {
            this.props.update(_borjes2.default.types.Literal(e.target.value));
        }
    }, {
        key: 'remove',
        value: function remove() {
            this.props.update(Anything);
        }
    }, {
        key: 'copy',
        value: function copy() {
            this.props.opts.cpbuffer.v = _borjes2.default.types.copy(this.props.x);
        }
    }, {
        key: 'paste',
        value: function paste() {
            var p = this.props.opts.cpbuffer.v;
            if (p !== undefined) {
                if (p.borjes_bound) {
                    delete p.borjes_bound;
                }
                this.props.update(_borjes2.default.types.copy(p));
            }
        }
    }, {
        key: 'newV',
        value: function newV(type) {
            var o;
            switch (type) {
                case 'lt':
                    o = _borjes2.default.types.Literal('');
                    break;
                case 'f':
                    o = _borjes2.default.types.FStruct();
                    break;
                case 'v':
                    o = _borjes2.default.types.Variable(this.props.opts.world, Anything);
                    break;
                case 't':
                    var s = this.props.opts.signature;
                    o = _borjes2.default.types.Lattice.element(s, Object.keys(s.bits)[0]);
                    break;
                case 'tr':
                    var s = this.props.opts.signature;
                    o = _borjes2.default.types.TFS(_borjes2.default.types.Lattice.element(s, Object.keys(s.bits)[0]));
                    break;
                case 'li':
                    o = _borjes2.default.types.List(Anything);
                    break;
                case 'le':
                    o = _borjes2.default.types.List();
                    break;
                case 'd':
                    o = _borjes2.default.types.Disjunct(Anything, Anything);
                    break;
                case 'se':
                    o = _borjes2.default.types.Set();
                    break;
                case 'ss':
                    o = _borjes2.default.types.Set.sum(Anything, _borjes2.default.types.Variable(this.props.opts.world, Anything));
                    break;
            }
            this.props.update(o);
        }
    }, {
        key: 'toggleChild',
        value: function toggleChild(e) {
            this.refs.child.toggle(e);
        }
    }, {
        key: 'render',
        value: function render() {
            var x = this.props.x;
            var opts = this.props.opts || {};
            opts.cpbuffer = this.props.cpbuffer || opts.cpbuffer || {};
            var update = this.props.update;
            var refresh = this.props.refresh;
            if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) !== 'object') {
                return _react2.default.createElement(
                    'span',
                    null,
                    x
                );
            }
            if (x instanceof Array) {
                return _react2.default.createElement(
                    'div',
                    null,
                    '// TODO refresh and update',
                    x.map(function (y, i) {
                        return _react2.default.createElement(BorjesComponent, { opts: opts, key: i, x: y });
                    })
                );
            }
            if (x.borjes_bound !== undefined && opts.world === undefined) {
                opts.world = x.borjes_bound;
            }
            var prev;
            if (opts.editable) {
                prev = _react2.default.createElement(
                    _Menu2.default,
                    null,
                    _react2.default.createElement(
                        'button',
                        { onClick: this.remove.bind(this) },
                        'x'
                    ),
                    _react2.default.createElement(
                        'button',
                        { onClick: this.copy.bind(this) },
                        'copy'
                    ),
                    x.borjes == 'variable' || x.borjes == 'fstruct' || x.borjes == 'tfstruct' ? _react2.default.createElement(
                        'button',
                        { onClick: this.toggleChild.bind(this) },
                        'toggle'
                    ) : null
                );
            }
            switch (x.borjes) {
                case 'nothing':
                    console.log("Borjes-react: displaying nothing ", x);
                case 'anything':
                    return _react2.default.createElement(
                        _Menu2.default,
                        null,
                        _react2.default.createElement(
                            'button',
                            { onClick: this.paste.bind(this) },
                            'paste'
                        ),
                        _react2.default.createElement(
                            'button',
                            { onClick: this.newV.bind(this, 'tr') },
                            'typed fs'
                        ),
                        _react2.default.createElement(
                            'button',
                            { onClick: this.newV.bind(this, 'v') },
                            'variable'
                        ),
                        _react2.default.createElement(
                            'button',
                            { onClick: this.newV.bind(this, 'lt') },
                            'literal'
                        ),
                        _react2.default.createElement(
                            'button',
                            { onClick: this.newV.bind(this, 'f') },
                            'fstruct'
                        ),
                        _react2.default.createElement(
                            'button',
                            { onClick: this.newV.bind(this, 'd') },
                            'disjunct'
                        ),
                        _react2.default.createElement(
                            'button',
                            { onClick: this.newV.bind(this, 'se') },
                            'set'
                        ),
                        _react2.default.createElement(
                            'button',
                            { onClick: this.newV.bind(this, 'ss') },
                            'union'
                        ),
                        _react2.default.createElement(
                            'button',
                            { onClick: this.newV.bind(this, 'li') },
                            'list'
                        ),
                        _react2.default.createElement(
                            'button',
                            { onClick: this.newV.bind(this, 'le') },
                            'elist'
                        ),
                        _react2.default.createElement(
                            'button',
                            { onClick: this.newV.bind(this, 't') },
                            'type'
                        )
                    );
                case 'literal':
                    return _react2.default.createElement(
                        'span',
                        { className: 'borjes' },
                        prev,
                        _react2.default.createElement(
                            'span',
                            { className: 'borjes_literal' },
                            _react2.default.createElement('input', { type: 'text', value: x.s, onChange: this.updateLiteral.bind(this) }),
                            '}'
                        )
                    );
                case 'tree':
                    return _react2.default.createElement(_BorjesTree2.default, { x: x, refresh: refresh, update: update, opts: opts });
                case 'tfstruct':
                case 'fstruct':
                    if (FStruct.get(x, 'symbol') !== undefined) {
                        return _react2.default.createElement(
                            'span',
                            { className: 'borjes' },
                            _borjes2.default.formatter.flist(x, 'symbol')
                        );
                    } else {
                        return _react2.default.createElement(
                            'span',
                            { className: 'borjes' },
                            prev,
                            _react2.default.createElement(_BorjesAVM2.default, { ref: 'child', x: x, refresh: refresh, update: update, opts: opts })
                        );
                    }
                case 'list_empty':
                case 'list':
                    return _react2.default.createElement(
                        'span',
                        { className: 'borjes' },
                        prev,
                        _react2.default.createElement(_BorjesList2.default, { x: x, refresh: refresh, update: update, opts: opts })
                    );
                case 'variable':
                    return _react2.default.createElement(
                        'span',
                        { className: 'borjes' },
                        prev,
                        _react2.default.createElement(_BorjesVariable2.default, { ref: 'child', x: x, refresh: refresh, update: update, opts: opts })
                    );
                case 'latticeel':
                    return _react2.default.createElement(
                        'span',
                        { className: 'borjes' },
                        prev,
                        _react2.default.createElement(_BorjesLatticeElement2.default, { x: x, refresh: refresh, update: update, opts: opts })
                    );
                case 'disjunct':
                    return _react2.default.createElement(
                        'span',
                        { className: 'borjes' },
                        prev,
                        _react2.default.createElement(_BorjesDisjunct2.default, { x: x, refresh: refresh, update: update, opts: opts })
                    );
                case 'set':
                    return _react2.default.createElement(
                        'span',
                        { className: 'borjes' },
                        prev,
                        _react2.default.createElement(_BorjesSet2.default, { x: x, refresh: refresh, update: update, opts: opts })
                    );
                case 'set_sum':
                    return _react2.default.createElement(
                        'span',
                        { className: 'borjes' },
                        prev,
                        _react2.default.createElement(_BorjesSum2.default, { x: x, refresh: refresh, update: update, opts: opts })
                    );
            }
            console.log("Borjes-react: unrecognized object ", x);
            return _react2.default.createElement(
                'span',
                { className: 'borjes' },
                'Unrecognized Object'
            );
        }
    }]);

    return BorjesComponent;
}(_react2.default.Component);

exports.default = BorjesComponent;

