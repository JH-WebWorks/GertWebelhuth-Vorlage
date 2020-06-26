"use strict";

var React = require('react');

class Menu extends React.Component {

    constructor (props) {
        super(props);
        this.state = { show: false, off: this.off.bind(this) };
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    on (e) {
        document.addEventListener("click", this.state.off);
        if (this._isMounted) this.setState({ show: true });
        e.stopPropagation();
    }

    off (e) {
        document.removeEventListener("click", this.state.off);
        if (this._isMounted) this.setState({ show: false });
        e.stopPropagation();
    }


    render () {
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

        return <span className="borjes_menu" style={containerStyle}>
            <button className="small"  onClick={show?this.off.bind(this):this.on.bind(this)}>
            {show?'▴':'▾'}
            </button>
            {show?
                <div style={popupStyle} >
                    {this.props.children}
                </div>
            :null}
        </span>;
    }

}

module.exports = Menu;
