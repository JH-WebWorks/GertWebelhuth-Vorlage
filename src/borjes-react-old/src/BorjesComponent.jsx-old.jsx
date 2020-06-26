"use strict";

import React from 'react';
import Bjs from 'borjes';

var FStruct = Bjs.types.FStruct;
var TFS = Bjs.types.TFS;
var Anything = Bjs.types.Anything;

import BorjesTree from './BorjesTree';
import BorjesAVM from './BorjesAVM';
import BorjesList from './BorjesList';
import BorjesVariable from './BorjesVariable';
import BorjesLatticeElement from './BorjesLatticeElement';
import BorjesDisjunct from './BorjesDisjunct';
import BorjesSet from './BorjesSet';
import BorjesSum from './BorjesSum';

import LongMenu from './LongMenu';
import Menu from './Menu';

class BorjesComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    updateLiteral (e) {
        this.props.update(Bjs.types.Literal(e.target.value));
    }

    remove () {
        this.props.update(Anything);
    }

    copy () {
        this.props.opts.cpbuffer.v = Bjs.types.copy(this.props.x);

    }

    paste () {
        var p = this.props.opts.cpbuffer.v;
        if (p !== undefined) {
            if (p.borjes_bound) {
                delete p.borjes_bound;
            }
            this.props.update(Bjs.types.copy(p));
            console.log('============================ BC paste ' + JSON.stringify(this.props.opts.cpbuffer.v, null, 4));
        }
    }

    newV (type) {
        var o;
        switch (type) {
            case 'lt':
                o = Bjs.types.Literal('');
                break;
            case 'f':
                o = Bjs.types.FStruct();
                break;
            case 'v':
                o = Bjs.types.Variable(this.props.opts.world, Anything);
                break;
            case 't':
                var s = this.props.opts.signature;
                o = Bjs.types.Lattice.element(s, Object.keys(s.bits)[0]);
                break;
            case 'tr':
                var s = this.props.opts.signature;
                o = Bjs.types.TFS(Bjs.types.Lattice.element(s, Object.keys(s.bits)[0]));
                break;
            case 'li':
                o = Bjs.types.List(Anything);
                break;
            case 'le':
                o = Bjs.types.List();
                break;
            case 'd':
                o = Bjs.types.Disjunct(Anything, Anything);
                break;
            case 'se':
                o = Bjs.types.Set();
                break;
            case 'ss':
                o = Bjs.types.Set.sum(Anything, Bjs.types.Variable(this.props.opts.world, Anything));
                break;
        }
/*        console.log('============================ BorjesComponent this._isMounted ' + this._isMounted);
        console.log('============================ BorjesComponent this.props.update(o) ' + JSON.stringify(o, null, 4));*/
        this.props.update(o);

    }

    toggleChild (e) {
        this.refs.child.toggle(e);
    }



   render () {
        var x = this.props.x;
        var opts = this.props.opts || {};
        opts.cpbuffer = this.props.cpbuffer || opts.cpbuffer || {};
        var update = this.props.update;
        var refresh = this.props.refresh;
        var doc = this.props.doc;
        // var showPreValueMenu = true;
        var edit=this.props.edit

       console.log('============================ BorjesComponent x ' + JSON.stringify(x, null, 4))


        if (typeof x !== 'object') {
            return <span style={{'color':'red', 'fontStyle':'italic'}}>{x}</span>;
        }
        if (x instanceof Array) {
            return (<div>
                    // TODO refresh and update
                {x.map((y, i) => <BorjesComponent opts={opts} key={i} x={y} />)}
            </div>);
        }
        if (x.borjes_bound !== undefined && opts.world === undefined) {
            opts.world = x.borjes_bound;
        }

/*        var preValueMenu = <Menu>
                <button onClick={this.remove.bind(this)}>x</button>
                <button onClick={this.copy.bind(this)}>copy</button>
                <button onClick={this.paste.bind(this)}>paste</button>
            </Menu>;*/

        switch (x.borjes) {
            case 'nothing':
                console.log("Borjes-react: displaying nothing ", x);
            case 'anything':
                return <Menu>
                        <button onClick={this.newV.bind(this, 't')}>type</button>
                        <button onClick={this.newV.bind(this, 'f')}>fstruct</button>
                        <button onClick={this.newV.bind(this, 'tr')}>typed fs</button>
                        <button onClick={this.newV.bind(this, 'le')}>elist</button>
                        <button onClick={this.newV.bind(this, 'li')}>list</button>
                        <button onClick={this.newV.bind(this, 'd')}>disjunct</button>
                        <button onClick={this.newV.bind(this, 'v')}>variable</button>
                        <button onClick={this.paste.bind(this)}>paste</button>
                    </Menu>;
/*            case 'literal':
                return <span className="borjes"><span className="borjes_literal">
                    <input type="text" value={x.s} onChange={this.updateLiteral.bind(this)} />
                    </span></span>;
            case 'tree':
                return <BorjesTree x={x} refresh={refresh} update={update} opts={opts} />;*/
            case 'tfstruct':
            case 'fstruct':
                if (FStruct.get(x, 'symbol') !== undefined) {
                    return <span className="borjes">{Bjs.formatter.flist(x, 'symbol')}</span>;
                } else {
                    return <span className="borjes"><BorjesAVM ref="child" decl={this.props.decl} x={x} doc={doc} refresh={refresh} update={update} opts={opts} /></span>;
                }
            /*            case 'list_empty':
                        case 'list':
                            return <span className="borjes"><BorjesList x={x} refresh={refresh} edit={edit} update={update} opts={opts} /></span>;
                        case 'variable':
                            return <span className="borjes"><BorjesVariable ref="child" x={x} refresh={refresh} edit={edit} update={update} opts={opts} /></span>;*/
            case 'latticeel':
                return <span className="borjes"><BorjesLatticeElement x={x} refresh={refresh} edit={edit} update={update} opts={opts} /></span>;
/*            case 'disjunct':
                return <span className="borjes"><BorjesDisjunct x={x} refresh={refresh} edit={edit} update={update} opts={opts} /></span>;*/



 /*           case 'set':
                return <span className="borjes"><BorjesSet x={x} refresh={refresh} update={update} opts={opts} /></span>;
            case 'set_sum':
                return <span className="borjes"><BorjesSum x={x} refresh={refresh} update={update} opts={opts} /></span>;*/
            case 'type':
                return <span>{'\u00A0'}</span>
        }
        console.log("Borjes-react: unrecognized object ", x);
        return <span className="borjes">Unrecognized Object</span>;
    }

}

export default BorjesComponent;
