"use strict";

var React = require('react');
var Bjs = require('borjes');

var BorjesComponent = require('./BorjesComponent');
var BorjesAVM = require('borjes-react/src/BorjesAVM');

class BorjesDisjunct extends React.Component {

    update (i, val) {
        var x = this.props.x;
        x.a[i] = val;
        this.props.update(x);
    }

    remove (i) {
        var x = this.props.x;
        x.a.splice(i, 1);
        this.props.update(x);
    }

    append (i) {
        var x = this.props.x;
        x.a.push(Bjs.types.Anything);
        this.props.update(x);
    }

    render () {
        var x = this.props.x;
        var opts = this.props.opts;
        var file = this.props.file;
        return <span className="borjes_disjunct">
            {x.a.map((a, i) => <span key={'alt'+i}>
                {i>0?'⋁':null}
                <button onClick={this.remove.bind(this, i)}>x</button>
                <BorjesComponent x={a} file={file} refresh={this.props.refresh} update={this.update.bind(this, i)} opts={opts} />
            </span>)}
            <button onClick={this.append.bind(this)}>+</button>
        </span>;
    }

}

module.exports = BorjesDisjunct;
