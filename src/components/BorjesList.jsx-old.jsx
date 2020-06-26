"use strict";

var React = require('react');
var Bjs = require('borjes');

var BorjesComponent = require('./BorjesComponent');

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

                console.log('============================ BorjesList this.props.update ' + JSON.stringify(this.props.update, null, 4));
                console.log('============================ BorjesList x ' + JSON.stringify(x, null, 4));

                var opts = this.props.opts;

        /*
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
                           aft.push(<BorjesComponent key={i} x={rest.first} refresh={this.error} update={this.error} opts={opts} />);
                           i++;
                           rest = rest.rest;
                       }
                   }
                   console.log('============================ BorjesList x.first ' + JSON.stringify(x.first, null, 4));
                   console.log('============================ BorjesList this.props.refresh ' + JSON.stringify(this.props.refresh, null, 4));

                   console.log('============================ BorjesList opts ' + JSON.stringify(opts, null, 4));*/

        return <span className="borjes_list">
            <BorjesComponent x={x.first} refresh={this.props.refresh} update={this.updateFst.bind(this)} opts={opts} />
{/*            {aft}
            {rest.borjes !== 'list_empty'?",":null}
            {rest.borjes !== 'list_empty'?<BorjesComponent x={rest} refresh={this.props.refresh} update={this.updateRest.bind(this)} opts={opts} />:null}
            {rest.borjes === 'list_empty' && opts.editable?<button onClick={this.append.bind(this)}>+</button>:null}*/}
        </span>;
    }

}

module.exports = BorjesList;


/*
refresh={this.props.refresh} update={this.updateFst.bind(this)} opts={opts}

{console.log('============================ x ' + JSON.stringify(x, null, 4))}
{console.log('============================ x.first ' + JSON.stringify(x.first, null, 4))}
{console.log('============================ rest ' + JSON.stringify(rest, null, 4))}*/
