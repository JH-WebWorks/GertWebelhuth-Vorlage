"use strict";

var React = require('react');
var Bjs = require('borjes');

var Lattice = Bjs.types.Lattice;

class BorjesLatticeElement extends React.Component {

    constructor (props) {
        super()

    }

    change (e) {
        var x = this.props.x;
        this.props.update(Lattice.element(Lattice.from_element(x), e.target.value));
    }

    render () {
        var x = this.props.x;
         if (this.props.edit) {
            return <select className="borjes_latticeel"
                           value={x.e}
                           onChange={this.change.bind(this)}>
                {Object.keys(Lattice.from_element(x).bits).sort().map(function(name) {
                    return <option key={name}>{name}</option>;
                })}
            </select>;
        } else {
            return <span className="borjes_latticeel" style={{'color':'red', 'fontStyle':'italic'}}>{x.e}</span>;
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

}

module.exports = BorjesLatticeElement;








