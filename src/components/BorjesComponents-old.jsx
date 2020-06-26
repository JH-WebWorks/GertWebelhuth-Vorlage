"use strict";

var React = require('react');
var Bjs = require('../borjes');

var FStruct = Bjs.types.FStruct;
var Anything = Bjs.types.Anything;

var BorjesTree = require('./BorjesTree');
var Lattice = Bjs.types.Lattice;
var BorjesVariable = require('./BorjesVariable');
var BorjesLatticeElement = require('./BorjesLatticeElement');
var BorjesDisjunct = require('./BorjesDisjunct');
var BorjesSet = require('./BorjesSet');
var BorjesSum = require('./BorjesSum');

var LongMenu = require('./LongMenu');
var Menu = require('./Menu');
var TFS = Bjs.types.TFS;
var Type = Bjs.types.Type;



var util = require("util");


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

    updateLiteral(e) {
        this.props.update(Bjs.types.Literal(e.target.value));
    }

    remove() {
        this.props.update(Anything);
    }

    copy() {
        this.props.globalProps.cpbuffer.v = Bjs.types.copy(this.props.x);

    }

    paste() {
        var p = this.props.globalProps.cpbuffer.v;
        if (p !== undefined) {
            if (p.borjes_bound) {
                delete p.borjes_bound;
            }
            this.props.update(Bjs.types.copy(p));
        }
    }

    newV(type) {
        var o;
        switch (type) {
            case 'lt':
                o = Bjs.types.Literal('');
                break;
            case 'f':
                o = Bjs.types.FStruct();
                break;
            case 'v':
                //o = Bjs.types.Type('type');
                break;
            case 't':
                o = Bjs.types.Type('type');
                break;
            case 'tr':
                o = FStruct();
                o = TFS(Type('type'));
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
        this.props.update(o);

    }

    toggleChild(e) {
        this.refs.child.toggle(e);
    }


    render() {
        var x = this.props.x;
        var globalProps = this.props.globalProps;
        var opts = this.props.opts || {};
        opts.cpbuffer = globalProps.cpbuffer || opts.cpbuffer || {};
        var update = this.props.update;
        var refresh = this.props.refresh;
        var doc = this.props.doc;
        // var showPreValueMenu = true;
        var edit = this.props.edit;

        if (typeof x !== 'object') {
            return <span style={{'color': 'red', 'fontStyle': 'italic'}}>{x}</span>;
        }
        if (x instanceof Array) {
            return (<div>
                // TODO refresh and update
                {x.map((y, i) => <BorjesComponent opts={opts} key={i} x={y}/>)}
            </div>);
        }
        if (x.borjes_bound !== undefined && opts.world === undefined) {
            opts.world = x.borjes_bound;
        }
/*        console.log('============================ BorjesComponent begin ============================');
        console.log('============================  role: ' + this.props.role);
        console.log('============================  x: ' + JSON.stringify(x));
        console.log('============================  this.props.file: ' + this.props.file);
        console.log('============================  update: ' + JSON.stringify(this.props.update, null, 4));
        console.log('============================ BorjesComponent end ============================\n\n');*/

        var preValueMenu = <Menu>
            <button onClick={this.remove.bind(this)}>x</button>
            <button onClick={this.copy.bind(this)}>copy</button>
            <button onClick={this.paste.bind(this)}>paste</button>
        </Menu>;


        switch (x.borjes) {
            case 'nothing':
                console.log("Borjes-react: displaying nothing ", x);
            case 'anything':
                if(this.props.decl === true) {
                    return <Menu>
                        <button onClick={this.newV.bind(this, 't')}>type</button>
                        <button onClick={this.newV.bind(this, 'le')}>elist</button>
                        <button onClick={this.newV.bind(this, 'li')}>list</button>
                    </Menu>;
                } else {
                    return <Menu>
                        <button onClick={this.newV.bind(this, 't')}>type</button>
                        {/*                    <button onClick={this.newV.bind(this, 'f')}>fstruct</button>
                    <button onClick={this.newV.bind(this, 'tr')}>typed fs</button>*/}
                        <button onClick={this.newV.bind(this, 'le')}>elist</button>
                        <button onClick={this.newV.bind(this, 'li')}>list</button>
                        <button onClick={this.newV.bind(this, 'd')}>disjunct</button>
                        <button onClick={this.newV.bind(this, 'v')}>variable</button>
                    </Menu>;
                }
            case 'literal':
                return <span className="borjes"><span className="borjes_literal">
                    <input type="text" value={x.s} onChange={this.updateLiteral.bind(this)}/>
                    </span></span>;
            case 'tree':
                return <BorjesTree x={x} refresh={refresh} update={update} opts={opts}/>;
            case 'list_empty':
            case 'list':
                return <span className="borjes"><BorjesList x={x}
                                                            globalProps={globalProps}
                                                            refresh={refresh}
                                                            edit={edit}
                                                            //file={this.props.file}
                                                            update={update}
                                                            opts={opts}/></span>;
            case 'variable':
                return <span className="borjes"><BorjesVariable ref="child"
                                                                x={x}
                                                                globalProps={globalProps}
                                                                refresh={refresh}
                                                                edit={edit}
                                                                update={update}
                                                                opts={opts}/></span>;
            case 'disjunct':
                return <span className="borjes"><BorjesDisjunct x={x}
                                                                globalProps={globalProps}
                                                                refresh={refresh}
                                                                edit={edit}
                                                                update={update}
                                                                opts={opts}/></span>;

            case 'type':
                var subtypes = globalProps.subtypes[x.type];
                return <span className="borjes"><BorjesLatticeElement x={x}
                                                                      decl={this.props.decl}
                                                                      globalProps={globalProps}
                                                                      refresh={refresh}
                                                                      edit={edit}
                                                                      role={this.props.role}
                                                                      update={update}
                                                                      opts={opts}/></span>;
        }
        if (x.borjes !== 'tfstruct' && x.borjes !== 'fstruct') {
            console.log("Borjes-react: unrecognized object ", x);
        }
        return <span className="borjes">Unrecognized Object</span>;

    }

}

module.exports = BorjesComponent;
