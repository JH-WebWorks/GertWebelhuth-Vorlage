"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var BorjesComponent = require('./BorjesComponent');

var branch = '<svg xmlns="http://www.w3.org/2000/svg"' + ' xmlns:xlink="http://www.w3.org/1999/xlink"' + ' width="100%" height="100%"' + ' preserveAspectRatio="none"' + ' viewBox="0 0 100 100">';
var straightN = branch + '  <line x1="50" y1="100" x2="50" y2="0" style="stroke:#000000;" vector-effect="non-scaling-stroke"/>' + '</svg>';
var leftN = branch + '  <line x1="0" y1="100" x2="100" y2="0" style="stroke:#000000;" vector-effect="non-scaling-stroke"/>' + '</svg>';
var rightN = branch + '  <line x1="100" y1="100" x2="0" y2="0" style="stroke:#000000;" vector-effect="non-scaling-stroke"/>' + '</svg>';
var branchN = {
    'c': straightN,
    'l': leftN,
    'r': rightN
};

var BorjesTree = function (_React$Component) {
    _inherits(BorjesTree, _React$Component);

    function BorjesTree(props) {
        _classCallCheck(this, BorjesTree);

        var _this = _possibleConstructorReturn(this, (BorjesTree.__proto__ || Object.getPrototypeOf(BorjesTree)).call(this, props));

        var s = true;
        if (props.beginExpanded !== undefined) {
            s = props.beginExpanded;
        } else if (_this.props.opts && _this.props.opts.hide_more && _this.props.x.node && _this.props.x.node.borjes === 'tfstruct') {
            s = false;
        }
        _this.dom = {};
        _this.state = {
            branches: _this.props.x.children.map(function () {
                return 'l';
            }),
            shown: _this.props.x.children.map(function () {
                return s;
            })
        };
        return _this;
    }

    _createClass(BorjesTree, [{
        key: 'update',
        value: function update(who, val) {
            var x = this.props.x;
            if (who == -1) {
                x.node = val;
            } else {
                x.children[who] = val;
            }
            this.props.update(x);
        }
    }, {
        key: 'toggleChild',
        value: function toggleChild(i) {
            var s = this.state.shown;
            s[i] = !s[i];
            this.setState({ shown: s });
            this.forceUpdate();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var x = this.props.x;
            var opts = this.props.opts;
            var ub = this.updateBranches.bind(this);

            var branchHeight = this.props.opts.branchHeight || "1em";
            var containerStyle = {
                display: 'inline-flex',
                flexDirection: 'column'
            };
            var nodeStyle = {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
            };
            var branchesStyle = {
                position: 'relative',
                height: branchHeight
            };
            var branchStyle = {
                cursor: 'pointer',
                position: 'absolute',
                height: branchHeight,
                top: 0
            };
            var childrenStyle = {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                margin: 2
            };

            function copy_opts(child) {
                var r = {};
                for (var k in opts) {
                    r[k] = opts[k];
                }
                if (child.borjes_bound) {
                    r.world = child.borjes_bound;
                }
                return r;
            }

            return React.createElement(
                'span',
                { className: 'borjes', style: containerStyle },
                React.createElement(
                    'div',
                    { ref: function ref(d) {
                            return _this2.dom.nodeWrapper = d;
                        }, style: nodeStyle },
                    React.createElement(BorjesComponent, { x: x.node, refresh: ub, update: this.update.bind(this, -1), opts: copy_opts(x.node) })
                ),
                React.createElement(
                    'div',
                    { style: branchesStyle },
                    x.children.map(function (c, i) {
                        var n = branchN[_this2.state.branches[i]];
                        return React.createElement('span', { onClick: _this2.toggleChild.bind(_this2, i), style: branchStyle, ref: function ref(d) {
                                return _this2.dom["branch" + i] = d;
                            }, key: "branch" + i, dangerouslySetInnerHTML: { __html: n } });
                    })
                ),
                React.createElement(
                    'div',
                    { style: childrenStyle },
                    x.children.map(function (c, i) {
                        return React.createElement(
                            'span',
                            { ref: function ref(d) {
                                    return _this2.dom["child" + i] = d;
                                }, key: "child" + i },
                            _this2.state.shown[i] ? React.createElement(BorjesComponent, { x: c, refresh: ub, update: _this2.update.bind(_this2, i), opts: copy_opts(c) }) : React.createElement(
                                'button',
                                { onClick: _this2.toggleChild.bind(_this2, i) },
                                '+'
                            )
                        );
                    })
                )
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.updateBranches(true);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.updateBranches();
        }
    }, {
        key: 'updateBranches',
        value: function updateBranches(first) {
            var rerender = false;
            var state = this.state;
            var cn = this.props.x.children;
            var nw = this.dom.nodeWrapper;
            if (!nw) return;
            var half = nw.clientWidth / 2;
            var start = nw.offsetLeft;
            for (var i = 0; i < cn.length; i++) {
                var d = this.dom["branch" + i];
                var child = this.dom["child" + i];
                if (!d || !child) continue;
                var left = child.offsetLeft - start + child.clientWidth / 2;
                var right = half - left;
                if (left > half - 2 && left < half + 2) {
                    d.style.width = '10px';
                    d.style.left = half - 5 + 'px';
                    if (state.branches[i] != 'c') {
                        state.branches[i] = 'c';
                        rerender = true;
                    }
                } else if (left > half) {
                    d.style.width = left - half + 'px';
                    d.style.left = half + 'px';
                    if (state.branches[i] != 'r') {
                        state.branches[i] = 'r';
                        rerender = true;
                    }
                } else {
                    d.style.width = half - left + 'px';
                    d.style.left = left + 'px';
                    if (state.branches[i] != 'l') {
                        state.branches[i] = 'l';
                        rerender = true;
                    }
                }
            }
            if (rerender) {
                this.setState(state);
            }
            if (!first) {
                var refresh = this.props.refresh;
                if (refresh) {
                    refresh();
                }
            }
        }
    }]);

    return BorjesTree;
}(React.Component);

module.exports = BorjesTree;

