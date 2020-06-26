"use strict";

var React = require('react');
var Bjs = require('../borjes');

var BorjesComponents = require("./BorjesComponents");
var BorjesComponent = BorjesComponents.BorjesComponent;

class BorjesSet extends React.Component {

    update (i, v) {
        var x = this.props.x;
        x.e[i] = v;
        this.props.update(x);
    }

    rm (i) {
        var x = this.props.x;
        x.e.splice(i, 1);
        this.props.update(x);
    }

    append () {
        var x = this.props.x;
        x.e.push(Bjs.types.Anything);
        this.props.update(x);
    }

    render () {
        var x = this.props.x;
        var opts = this.props.opts;
        return <span className="borjes_set">
            {x.e.map((el, i) => <span key={i}>
                {i>0?",":null}
                <button onClick={this.rm.bind(this, i)}>x</button>
                <BorjesComponent x={el} refresh={this.props.refresh} update={this.update.bind(this, i)} opts={opts} />
            </span>)}
            <button onClick={this.append.bind(this)}>+</button>
        </span>;
    }

}

module.exports = BorjesSet;
