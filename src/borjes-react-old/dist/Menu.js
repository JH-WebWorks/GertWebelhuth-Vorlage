"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var Menu = function (_React$Component) {
    _inherits(Menu, _React$Component);

    function Menu(props) {
        _classCallCheck(this, Menu);

        var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

        _this.state = { show: false, off: _this.off.bind(_this) };
        return _this;
    }

    _createClass(Menu, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this._isMounted = true;
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this._isMounted = false;
        }
    }, {
        key: "on",
        value: function on(e) {
            document.addEventListener("click", this.state.off);
            if (this._isMounted) this.setState({ show: true });
            e.stopPropagation();
        }
    }, {
        key: "off",
        value: function off(e) {
            document.removeEventListener("click", this.state.off);
            if (this._isMounted) this.setState({ show: false });
            e.stopPropagation();
        }
    }, {
        key: "render",
        value: function render() {
            var containerStyle = {
                position: 'relative'
            };
            var popupStyle = {
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                top: '100%',
                left: 0
            };

            var show = this.state.show;

            return React.createElement(
                "span",
                { className: "borjes_menu", style: containerStyle },
                React.createElement(
                    "button",
                    { className: "small", onClick: show ? this.off.bind(this) : this.on.bind(this) },
                    show ? '▴' : '▾'
                ),
                show ? React.createElement(
                    "div",
                    { style: popupStyle },
                    this.props.children
                ) : null
            );
        }
    }]);

    return Menu;
}(React.Component);

module.exports = Menu;

