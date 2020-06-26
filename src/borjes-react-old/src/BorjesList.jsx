"use strict";

var React = require('react');
var Bjs = require('borjes');

var BorjesComponent = require('./BorjesComponent');
var BorjesAVM = require('borjes-react/src/BorjesAVM');


class BorjesList extends React.Component {

    updateFst (v) {
        var x = this.props.x;
        x.first = v;
        this.props.update(x);
    }

    updateRest (v) {
        var x = this.props.x;
        x.rest = v;
        this.props.update(x);
    }

    append () {
        var x = this.props.x;
        x.rest = Bjs.types.List(Bjs.types.Anything);
        this.props.update(x);
    }

    render () {
        var x = this.props.x;
        var opts = this.props.opts;
        var file = this.props.file;
        opts.editable = true;             // this value needs to come from AVM!
        if (x.borjes === 'list_empty') {
            return <span className="borjes_list"></span>;
        }
        var aft = [];
        var i = 0;
        var rest = x.rest;
        if (!opts.editable) {
            while (rest.borjes === 'list') {
                aft.push(",");
                aft.push(<BorjesComponent key={i} x={rest.first} file={file} refresh={this.error} update={this.error} opts={opts} />);
                i++;
                rest = rest.rest;
            }
        }
        return <span className="borjes_list">
            <BorjesComponent x={x.first} file={file} refresh={this.props.refresh} update={this.updateFst.bind(this)} opts={opts} />
            {aft}
            {rest.borjes !== 'list_empty'?",":null}
            {rest.borjes !== 'list_empty'?<BorjesComponent x={rest} file={file} refresh={this.props.refresh} update={this.updateRest.bind(this)} opts={opts} />:null}
            {rest.borjes === 'list_empty' && opts.editable?<button onClick={this.append.bind(this)}>+</button>:null}
        </span>;
    }

}

module.exports = BorjesList;


/*
{console.log('============================ x ' + JSON.stringify(x, null, 4))}
{console.log('============================ x.first ' + JSON.stringify(x.first, null, 4))}
{console.log('============================ rest ' + JSON.stringify(rest, null, 4))}*/
