"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Bjs = require('borjes');

var BorjesComponent = require('./BorjesComponent');

var Menu = require('./Menu');
//import Menu from './Menu';

var FStruct = Bjs.types.FStruct;
var Anything = Bjs.types.Anything;
var Type = Bjs.types.Type;

var BorjesAVM = function (_React$Component) {
    _inherits(BorjesAVM, _React$Component);

    function BorjesAVM(props) {
        _classCallCheck(this, BorjesAVM);

        var _this = _possibleConstructorReturn(this, (BorjesAVM.__proto__ || Object.getPrototypeOf(BorjesAVM)).call(this, props));

        var showFMenu = {};
        var show = _this.props.opts.show;
        if (show === undefined) {
            show = true;
        }
        var showF = {};
        var x = _this.props.x;
        var edit = false;

        var showInput;
        if (x.f.length === 0) {
            showInput = true;
        } else showInput = false;

        var showPrev2 = {};

        // x.f.forEach(f => showF[f] = !(this.props.opts.hide_more && (f === 'head_dtr' || f === 'nonh_dtr')));
        x.f.forEach(function (f) {
            return showF[f] = true;
        });
        x.f.forEach(function (f) {
            return showPrev2[f] = false;
        });
        _this.state = { edit: edit, show: show, showF: showF, showInput: showInput, showPrev2: showPrev2 };
        return _this;
    }

    _createClass(BorjesAVM, [{
        key: 'updateF',
        value: function updateF(feat, value) {
            var x = this.props.x;
            FStruct.set(x, feat, value);
            this.props.update(x);
        }
    }, {
        key: 'addF',
        value: function addF() {
            var inputAVM = this.props.x;
            var currentAVM = inputAVM;
            var feats = this.newFeature.value;
            var fList = feats.split(" ");
            var decl = this.props.decl;
            var feat;
            var v;

            if (decl && fList.length > 1) {
                this.newFeature.value = "";
                return;
            }

            for (var i = 0; i < fList.length; i++) {
                feat = fList[i];
                if (decl) {
                    var s = this.props.opts.signature;
                    v = Bjs.types.Lattice.element(s, Object.keys(s.bits)[0]);
                    FStruct.set(inputAVM, feat, v);
                } else if (i === fList.length - 1) {
                    FStruct.set(currentAVM, feat, Anything);
                } else {
                    v = FStruct();
                    FStruct.set(currentAVM, feat, v);
                    currentAVM = v;
                }
                var s = this.state;
                s.showF[feat] = true;
                this.setState(s);
            }
            this.newFeature.value = "";
            this.props.update(inputAVM);
        }
    }, {
        key: 'newFeatureF',
        value: function newFeatureF(event) {
            var feats = this.newFeature.value;
            if (event.keyCode == 13 && feats !== "") {
                this.addF();
                var s = this.state;
                s.showInput = false;
                this.setState(s);
            }
        }
    }, {
        key: 'rmF',
        value: function rmF(f) {
            var x = this.props.x;
            FStruct.unset(x, f);
            this.props.update(x);
        }
    }, {
        key: 'updateType',
        value: function updateType(t) {
            var x = this.props.x;
            if (t !== Anything && x.borjes !== 'tfstruct') {
                x = Bjs.types.TFS(t, x.v, x.f);
            } else {
                x.type = t;
            }
            this.props.update(x);
        }
    }, {
        key: 'addType',
        value: function addType() {
            var s = this.props.opts.signature;
            var o = Bjs.types.Lattice.element(s, Object.keys(s.bits)[0]);
            this.updateType(o);
        }
    }, {
        key: 'remove',
        value: function remove(f) {
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
            }
        }
    }, {
        key: 'remove2',
        value: function remove2(f) {
            this.updateF(f, Anything);
        }
    }, {
        key: 'copy2',
        value: function copy2(val) {
            this.props.opts.cpbuffer.v = Bjs.types.copy(val);
        }
    }, {
        key: 'paste2',
        value: function paste2(f) {
            var p = this.props.opts.cpbuffer.v;
            if (p !== undefined) {
                if (p.borjes_bound) {
                    delete p.borjes_bound;
                }

                this.updateF(f, Bjs.types.copy(p));
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var refresh = this.props.refresh;
            if (refresh) {
                refresh();
            }
        }
    }, {
        key: 'turnEditOn',
        value: function turnEditOn() {
            this.setState({ edit: true });
        }
    }, {
        key: 'turnEditOff',
        value: function turnEditOff() {
            this.setState({ edit: false });
        }
    }, {
        key: 'togglePrev2F',
        value: function togglePrev2F(f) {
            var edit = this.state.edit;
            if (edit) {
                var showPrev2 = this.state.showPrev2;
                showPrev2[f] = !showPrev2[f];
                this.setState({ showPrev2: showPrev2 });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var x = this.props.x;
            var opts = this.props.opts;
            var showInput = this.state.showInput;
            var atrs = x.f;
            var refresh = this.props.refresh;
            var edit = this.state.edit;
            var showPrev2 = this.state.showPrev2;

            var prev = null;
            if (edit) {
                prev = React.createElement(
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
            }

            return React.createElement(
                'span',
                null,
                prev,
                React.createElement(
                    'table',
                    { className: 'borjes_fs' },
                    x.borjes === 'tfstruct' ? React.createElement(
                        'thead',
                        null,
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'th',
                                { colSpan: '2' },
                                React.createElement(BorjesComponent, { x: x.type || Type, refresh: refresh, update: this.updateType.bind(this), edit: edit, opts: opts })
                            )
                        )
                    ) : null,
                    React.createElement(
                        'tbody',
                        { className: this.state.show ? 'borjes_visible' : 'borjes_hidden' },
                        atrs.map(function (f) {
                            var val = FStruct.get(x, f);
                            var prev2 = null;
                            if (edit && val.borjes !== 'anything' && val.borjes !== 'tfstruct' && val.borjes !== 'fstruct') {
                                prev2 = React.createElement(
                                    Menu,
                                    null,
                                    React.createElement(
                                        'button',
                                        { onClick: _this2.remove2.bind(_this2, f) },
                                        'x'
                                    ),
                                    React.createElement(
                                        'button',
                                        { onClick: _this2.copy2.bind(_this2, val) },
                                        'copy'
                                    ),
                                    React.createElement(
                                        'button',
                                        { onClick: _this2.paste2.bind(_this2, f) },
                                        'paste'
                                    )
                                );
                            }
                            var fname = f;
                            return React.createElement(
                                'tr',
                                { key: 'tr_' + fname },
                                React.createElement(
                                    'td',
                                    { className: 'borjes_feat' },
                                    edit ? React.createElement(
                                        'button',
                                        { onClick: _this2.rmF.bind(_this2, f) },
                                        'x'
                                    ) : null,
                                    React.createElement(
                                        'span',
                                        {
                                            key: 'feature_' + fname, onDoubleClick: _this2.togglePrev2F.bind(_this2, f) },
                                        fname
                                    )
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    showPrev2[f] ? prev2 : null,
                                    React.createElement(
                                        'span',
                                        null,
                                        React.createElement(BorjesComponent, {
                                            x: val,
                                            update: _this2.updateF.bind(_this2, f),
                                            edit: edit,
                                            refresh: refresh,
                                            opts: opts })
                                    )
                                )
                            );
                        }),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                null,
                                edit ? React.createElement('input', { ref: function ref(d) {
                                        return _this2.newFeature = d;
                                    }, type: 'text', size: '40', id: 'newFeature', onKeyUp: this.newFeatureF.bind(this) }) : null
                            )
                        ),
                        edit ? React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                null,
                                React.createElement(
                                    'span',
                                    { style: { 'cursor': 'pointer' }, onClick: this.turnEditOff.bind(this) },
                                    '-'
                                )
                            )
                        ) : React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                null,
                                React.createElement(
                                    'span',
                                    { style: { 'cursor': 'pointer', 'fontSize': 'small' }, onClick: this.turnEditOn.bind(this) },
                                    '+'
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return BorjesAVM;
}(React.Component);

exports.default = BorjesAVM;

