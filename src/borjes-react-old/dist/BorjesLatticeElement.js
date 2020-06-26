"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Bjs = require('borjes');

var Lattice = Bjs.types.Lattice;

var BorjesLatticeElement = function (_React$Component) {
    _inherits(BorjesLatticeElement, _React$Component);

    function BorjesLatticeElement(props) {
        _classCallCheck(this, BorjesLatticeElement);

        return _possibleConstructorReturn(this, (BorjesLatticeElement.__proto__ || Object.getPrototypeOf(BorjesLatticeElement)).call(this));
    }

    _createClass(BorjesLatticeElement, [{
        key: 'change',
        value: function change(e) {
            var x = this.props.x;
            this.props.update(Lattice.element(Lattice.from_element(x), e.target.value));
        }
    }, {
        key: 'render',
        value: function render() {
            var x = this.props.x;
            if (this.props.edit) {
                return React.createElement(
                    'select',
                    { className: 'borjes_latticeel',
                        value: x.e,
                        onChange: this.change.bind(this) },
                    Object.keys(Lattice.from_element(x).bits).sort().map(function (name) {
                        return React.createElement(
                            'option',
                            { key: name },
                            name
                        );
                    })
                );
            } else {
                return React.createElement(
                    'span',
                    { className: 'borjes_latticeel', style: { 'color': 'red', 'fontStyle': 'italic' } },
                    x.e
                );
            }
        }

        /*    constructor (props) {
                super(props);
                var show = true;
                this.state = {show};
            }
        
            toggle (e) {
                this.setState({ show: !this.state.show });
                e.stopPropagation();
            }
        
            change (e) {
                var x = this.props.x;
                this.props.update(Lattice.element(Lattice.from_element(x), e.target.value));
                this.setState({ show: false });
            }
        
        
            mouseLeaveFunction() {
                var s = this.state;
                s.show = false;
                this.setState(s);
            }
        
            render () {
                var show = this.state.show;
                var x = this.props.x;
                var types = Object.keys(Lattice.from_element(x).bits);
                types.sort();
        
                if (show) {
                    return <select className="borjes_latticeel"
                                   value={x.e}
                                   onChange={this.change.bind(this)}
                                   onmouseleave={this.mouseLeaveFunction.bind(this)}>
                        {types.map(function(name) {
                            return <option key={name}>{name}</option>;
                        })}
                    </select>;
                } else {
                    return <span className="borjes_latticeel" onClick={this.toggle.bind(this)}>{x.e}</span>;
                }
            }*/

    }]);

    return BorjesLatticeElement;
}(React.Component);

module.exports = BorjesLatticeElement;

