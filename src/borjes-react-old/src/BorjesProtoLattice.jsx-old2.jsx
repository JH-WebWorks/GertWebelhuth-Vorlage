"use strict";

import React from 'react';
import Bjs from 'borjes';

class BorjesProtoLattice extends React.Component {

    constructor(props) {
        super(props);
        var edit = true;
        this.state = {edit};
    }

    update (el, sub) {
        var x = this.props.x;
        if (sub !== null && Object.keys(sub).length == 0) {
            sub = null;
        }
        x[el] = sub;
        this.props.update(x);
    }

    addEl () {
        var el = this.newEl.value;
        var x = this.props.x;
        if (el.length > 0 && x[el] === undefined) {
            x[el] = null;
            this.props.update(x);
        }
    }

    remEl (el) {
        var x = this.props.x;
        delete x[el];
        this.props.update(x);
    }

    cpEl (el) {
        var cpbuffer = this.props.cpbuffer;
        cpbuffer.v = {
            borjes: 'latticeel',
            l: this.props.name || this.props.opts.name,
            e: el
        };
    }


    render () {
        var x = this.props.x;
        var opts = this.props.opts;
        var cpbuffer = this.props.cpbuffer || opts.cpbuffer || {};
        opts.name = this.props.name || opts.name;
        var edit = this.props.editSignature;
        var matrix = this.props.matrix;
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
                <BorjesProtoLattice x={x} opts={opts} update={this.props.update} />
            </span>;
        }

        var i=0;
        return <span style={contStyle} className="borjes borjes_latticeproto" >
            {Object.keys(x).map((k) => {
                var first = !opts.refs[k];
                opts.refs[k] = true;
                var after = first && (edit || x[k] !== null);
                return <span key={k+(i++)} style={rowStyle}>
                    {edit?<button className="small" onClick={this.remEl.bind(this, k)}>x</button>:null}
                    {edit && opts.name?<button className="small" onClick={this.cpEl.bind(this, k)}>c</button>:null}
                    <span className={first?"borjes_lpel_first":"borjes_lpel_ref"}>{k}</span>
                    {after?'—':null}
                    {after?<BorjesProtoLattice x={x[k] || {}} matrix={false} opts={opts} edit={edit} update={this.update.bind(this, k)} />:null}
                </span>;
            })}
            {edit?<span><input ref={d=>this.newEl=d} type="text" /><button onClick={this.addEl.bind(this)}>+</button></span>:null}

        </span>;
    }



    /*render () {
        var x = this.props.x;
        var opts = this.props.opts;
        opts.cpbuffer = this.props.cpbuffer  || {};
        opts.name = this.props.name;
        var matrix = this.props.matrix;
        var edit = this.state.edit;
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
                ⊤—<BorjesProtoLattice x={x} opts={opts} update={this.props.update} />
            </span>;
        }

        var i=0;
        return <span style={contStyle} className="borjes borjes_latticeproto" >
            {Object.keys(x).map((k) => {
                var first = !opts.refs[k];
                opts.refs[k] = true;
                var after = first && (edit || x[k] !== null);
                return <span key={k+(i++)} style={rowStyle}>
                    {edit? <button className="small" onClick={this.remEl.bind(this, k)}>x</button>:null}
                    {edit && opts.name?<button className="small" onClick={this.cpEl.bind(this, k)}>c</button>:null}
                    <span className={first?"borjes_lpel_first":"borjes_lpel_ref"}>{k}</span>
                    {after?'—':null}
                    {after?<BorjesProtoLattice x={x[k] || {}} matrix={false} update={this.update.bind(this, k)} />:null}
                </span>;
            })}
            {edit? <span><input ref={d=>this.newEl=d} type="text" /><button onClick={this.addEl.bind(this)}>+</button></span>:null}
            {matrix? <span style={{'cursor':'pointer'}} onClick={this.turnEditOff.bind(this)}>-</span>
                : <span style={{'cursor':'pointer', 'fontSize':'small'}} onClick={this.turnEditOn.bind(this)}>+</span>}
        </span>;
    }*/

}

export default BorjesProtoLattice;
