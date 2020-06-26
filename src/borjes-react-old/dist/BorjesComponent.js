"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Bjs = require('borjes');

var FStruct = Bjs.types.FStruct;
var Anything = Bjs.types.Anything;

var BorjesTree = require('./BorjesTree');
var BorjesAVM = require('./BorjesAVM');
var BorjesList = require('./BorjesList');
var BorjesVariable = require('./BorjesVariable');
var BorjesLatticeElement = require('./BorjesLatticeElement');
var BorjesDisjunct = require('./BorjesDisjunct');
var BorjesSet = require('./BorjesSet');
var BorjesSum = require('./BorjesSum');

var LongMenu = require('./LongMenu');
var Menu = require('./Menu');

var BorjesComponent = function (_React$Component) {
    _inherits(BorjesComponent, _React$Component);

    function BorjesComponent(props) {
        _classCallCheck(this, BorjesComponent);

        var _this = _possibleConstructorReturn(this, (BorjesComponent.__proto__ || Object.getPrototypeOf(BorjesComponent)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(BorjesComponent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._isMounted = true;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this._isMounted = false;
        }
    }, {
        key: 'updateLiteral',
        value: function updateLiteral(e) {
            this.props.update(Bjs.types.Literal(e.target.value));
        }
    }, {
        key: 'remove',
        value: function remove() {
            this.props.update(Anything);
        }
    }, {
        key: 'copy',
        value: function copy() {
            this.props.opts.cpbuffer.v = Bjs.types.copy(this.props.x);
        }
    }, {
        key: 'paste',
        value: function paste() {
            var p = this.props.opts.cpbuffer.v;
            if (p !== undefined) {
                if (p.borjes_bound) {
                    delete p.borjes_bound;
                }
                this.props.update(Bjs.types.copy(p));
                console.log('============================ BC paste ' + JSON.stringify(this.props.opts.cpbuffer.v, null, 4));
            }
        }
    }, {
        key: 'newV',
        value: function newV(type) {
            var o;
            switch (type) {
                case 'lt':
                    o = Bjs.types.Literal('');
                    break;
                case 'f':
                    o = Bjs.types.FStruct();
                    break;
                case 'v':
                    o = Bjs.types.Variable(this.props.opts.world, Anything);
                    break;
                case 't':
                    var s = this.props.opts.signature;
                    o = Bjs.types.Lattice.element(s, Object.keys(s.bits)[0]);
                    break;
                case 'tr':
                    var s = this.props.opts.signature;
                    o = Bjs.types.TFS(Bjs.types.Lattice.element(s, Object.keys(s.bits)[0]));
                    break;
                case 'li':
                    o = Bjs.types.List(Anything);
                    break;
                case 'le':
                    o = Bjs.types.List();
                    break;
                case 'd':
                    o = Bjs.types.Disjunct(Anything, Anything);
                    break;
                case 'se':
                    o = Bjs.types.Set();
                    break;
                case 'ss':
                    o = Bjs.types.Set.sum(Anything, Bjs.types.Variable(this.props.opts.world, Anything));
                    break;
            }
            /*        console.log('============================ BorjesComponent this._isMounted ' + this._isMounted);
                    console.log('============================ BorjesComponent this.props.update(o) ' + JSON.stringify(o, null, 4));*/
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
            var doc = this.props.doc;
            var file = this.props.file;
            // var showPreValueMenu = true;
            var edit = this.props.edit;

            if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) !== 'object') {
                return React.createElement(
                    'span',
                    { style: { 'color': 'red', 'fontStyle': 'italic' } },
                    x
                );
            }
            if (x instanceof Array) {
                return React.createElement(
                    'div',
                    null,
                    '// TODO refresh and update',
                    x.map(function (y, i) {
                        return React.createElement(BorjesComponent, { opts: opts, key: i, x: y });
                    })
                );
            }
            if (x.borjes_bound !== undefined && opts.world === undefined) {
                opts.world = x.borjes_bound;
            }

            var preValueMenu = React.createElement(
                Menu,
                null,
                React.createElement(
                    'button',
                    { onClick: this.remove.bind(this) },
                    'x'
                ),
                React.createElement(
                    'button',
                    { onClick: this.copy.bind(this) },
                    'copy'
                ),
                React.createElement(
                    'button',
                    { onClick: this.paste.bind(this) },
                    'paste'
                )
            );

            switch (x.borjes) {
                case 'nothing':
                    console.log("Borjes-react: displaying nothing ", x);
                case 'anything':
                    return React.createElement(
                        Menu,
                        null,
                        React.createElement(
                            'button',
                            { onClick: this.newV.bind(this, 't') },
                            'type'
                        ),
                        React.createElement(
                            'button',
                            { onClick: this.newV.bind(this, 'f') },
                            'fstruct'
                        ),
                        React.createElement(
                            'button',
                            { onClick: this.newV.bind(this, 'tr') },
                            'typed fs'
                        ),
                        React.createElement(
                            'button',
                            { onClick: this.newV.bind(this, 'le') },
                            'elist'
                        ),
                        React.createElement(
                            'button',
                            { onClick: this.newV.bind(this, 'li') },
                            'list'
                        ),
                        React.createElement(
                            'button',
                            { onClick: this.newV.bind(this, 'd') },
                            'disjunct'
                        ),
                        React.createElement(
                            'button',
                            { onClick: this.newV.bind(this, 'v') },
                            'variable'
                        ),
                        React.createElement(
                            'button',
                            { onClick: this.paste.bind(this) },
                            'paste'
                        )
                    );
                case 'literal':
                    return React.createElement(
                        'span',
                        { className: 'borjes' },
                        React.createElement(
                            'span',
                            { className: 'borjes_literal' },
                            React.createElement('input', { type: 'text', value: x.s, onChange: this.updateLiteral.bind(this) })
                        )
                    );
                case 'tree':
                    return React.createElement(BorjesTree, { x: x, refresh: refresh, update: update, opts: opts });
                case 'tfstruct':
                case 'fstruct':
                    if (FStruct.get(x, 'symbol') !== undefined) {
                        return React.createElement(
                            'span',
                            { className: 'borjes' },
                            Bjs.formatter.flist(x, 'symbol')
                        );
                    } else {
                        return React.createElement(
                            'span',
                            { className: 'borjes' },
                            React.createElement(BorjesAVM, { ref: 'child', decl: this.props.decl, x: x, doc: doc, file: file, refresh: refresh, update: update, opts: opts })
                        );
                    }
                case 'list_empty':
                case 'list':
                    return React.createElement(
                        'span',
                        { className: 'borjes' },
                        React.createElement(BorjesList, { x: x, file: file, refresh: refresh, edit: edit, update: update, opts: opts })
                    );
                case 'variable':
                    return React.createElement(
                        'span',
                        { className: 'borjes' },
                        React.createElement(BorjesVariable, { ref: 'child', x: x, file: file, refresh: refresh, edit: edit, update: update, opts: opts })
                    );
                case 'latticeel':
                    return React.createElement(
                        'span',
                        { className: 'borjes' },
                        React.createElement(BorjesLatticeElement, { x: x, file: file, refresh: refresh, edit: edit, update: update, opts: opts })
                    );
                case 'disjunct':
                    return React.createElement(
                        'span',
                        { className: 'borjes' },
                        React.createElement(BorjesDisjunct, { x: x, file: file, refresh: refresh, edit: edit, update: update, opts: opts })
                    );
                /*           case 'set':
                               return <span className="borjes"><BorjesSet x={x} refresh={refresh} update={update} opts={opts} /></span>;
                           case 'set_sum':
                               return <span className="borjes"><BorjesSum x={x} refresh={refresh} update={update} opts={opts} /></span>;*/
                case 'type':
                    return React.createElement(
                        'span',
                        null,
                        '\xA0'
                    );
            }
            console.log("Borjes-react: unrecognized object ", x);
            return React.createElement(
                'span',
                { className: 'borjes' },
                'Unrecognized Object'
            );
        }
    }]);

    return BorjesComponent;
}(React.Component);

module.exports = BorjesComponent;

