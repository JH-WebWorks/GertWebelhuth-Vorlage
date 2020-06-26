"use strict";

import React from 'react';
import Bjs from 'borjes';
import Menu from './Menu';

import BorjesAVM from './BorjesAVM';
import BorjesList from './BorjesList';
import BorjesVariable from './BorjesVariable';
import BorjesLatticeElement from './BorjesLatticeElement';
import BorjesDisjunct from './BorjesDisjunct';
import BorjesSet from './BorjesSet';
var FStruct = Bjs.types.FStruct;
var TFS = Bjs.types.TFS;
var BorjesComponent = require('./BorjesComponent');

class BorjesProtoLattice extends React.Component {

    constructor(props) {
        super(props);
        var subType = true;
        var showAVM = '';
        this.state = {subType, showAVM};
    }

    update (el, sub) {
        var x = this.props.x;
        if (sub !== null && Object.keys(sub).length == 0) {
            sub = null;
        }
        x[el] = sub;
        this.props.update(x);
    }


    addEl (event) {
        if (event.keyCode == 13) {
            var el = this.newEl.value;
            var x = this.props.x;
            if (el.length > 0 && x[el] === undefined) {
                x[el] = null;
                this.props.update(x);
            }
        }
    }

    remEl (el) {
        var x = this.props.x;
        delete x[el];
        this.props.update(x);
    }

    cpEl (el) {
        this.props.opts.cpbuffer.v = {
            borjes: 'latticeel',
            l: this.props.name || this.props.opts.name,
            e: el
        };
    }

    addSubType () {
        var subType = this.state.subType;
        subType = true;
        this.setState({subType});
    }

    addFeatF (t) {return null}

    showAVMF(t) {
        var showAVM = this.state.showAVM;
        showAVM = t;
        this.setState({showAVM})
    }

    hideAVMF() {
        var showAVM = this.state.showAVM;
        showAVM = '';
        this.setState({showAVM})
    }

    render() {
        var x = this.props.x;
        var opts = this.props.opts;
        opts.cpbuffer = this.props.cpbuffer || opts.cpbuffer || {};
        opts.name = this.props.name || opts.name;
        var subType = this.state.subType;
        var showAVM = this.state.showAVM;


        var contStyle = {
            display: 'flex',
            flexDirection: 'column'
        };
        var rowStyle = {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        };

        if (!opts.child) {
            opts.child = true;
            opts.refs = {};
            return <span style={rowStyle}>
                ⊤—<BorjesProtoLattice x={x} opts={opts} update={this.props.update}/>
            </span>;
        }

/*        var i = 0;
        var current = "sign";
        Object.keys(x).map((k) => {
            var first = !opts.refs[k];
            opts.refs[k] = true;
            var subs;
            var feats;
            x[k]?subs = x[k]["subs"]:subs=null;
            x[k]?feats = x[k]["feats"]:feats=null;
        }
        )*/

        return (
            <span style={contStyle} className="borjes borjes_latticeproto">
            {Object.keys(x).map((k) => {
                var first = !opts.refs[k];
                opts.refs[k] = true;
                var fstruc = TFS(k,x[k]["subs"]);
                console.clear;
                console.log(JSON.stringify(fstruc));
                console.log('==============================================================================================================');
                return (
                    <span key={'gert' + (i++)} style={rowStyle}>
/*                    <button className="small" onClick={this.addFeatF.bind(this,k)}>a</button>
                    <button className="small" onClick={this.remEl.bind(this,k)}>x</button>*/
                        {k === "sign"
                          ? <BorjesComponent onMouseLeave={this.hideAVMF.bind(this)} x={fstruc} cpbuffer={this.props.cpbuffer}/>: null}
                            {/*<span className={first ? "borjes_lpel_first" : "borjes_lpel_ref"} onMouseEnter={this.showAVMF.bind(this,current)}>{k}</span>*/}
            {/*{x[k]["subs"] ? '—' : null}*/}
            {/*{x[k]["subs"] ? <BorjesProtoLattice x={x[k] || {}} opts={opts} update={this.update.bind(this, k)} />:null}*/}
            </span>
            )
            })}
                <span><input ref={d => this.newEl = d} type="text" onKeyUp={this.addEl.bind(this)}/></span>
        </span>
        )
    }

}


                /*<span key={k+(i++)} style={rowStyle}>
                    <button className="small" onClick={this.addFeatF.bind(this, k)}>a</button>
                    <button className="small" onClick={this.remEl.bind(this, k)}>x</button>
                    <button className="small" onClick={this.addFeatF().bind(this, k)}>+F</button>
                    <span className={first?"borjes_lpel_first":"borjes_lpel_ref"} onMouseOver={this.showAVMF().bind(this, k)}}>{k}</span>
                    {subType?'—':null}
                    {subType?<BorjesProtoLattice x={x[k] || {}} opts={opts} update={this.update.bind(this, k)} />:null}
                </span>;*/



/*console.clear;
console.log("=================================================================================");
console.log("x = " + JSON.stringify(x));
console.log("Object.keys(x) = " + Object.keys(x));
console.log("k = " + k);
console.log("refs[k] = " + opts.refs[k]);

console.log("refs[k] = " + opts.refs[k]);
console.log("first = " + first);
console.log("x[k] = " + x[k]);
console.log("=================================================================================");*/

export default BorjesProtoLattice;
