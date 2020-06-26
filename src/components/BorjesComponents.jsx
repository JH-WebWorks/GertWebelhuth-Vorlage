"use strict"

var React = require('react');
var Bjs = require('../borjes');
var util = require("util");
require("../styles/visual");

var Anything = Bjs.types.Anything;
var BorjesLatticeElement = require("./BorjesLatticeElement");
var BorjesTree = require('./BorjesTree');
var BorjesVariable = require('./BorjesVariable');
var FStruct = Bjs.types.FStruct;
var Menu = require('./Menu');
var TFS = Bjs.types.TFS;
var Type = Bjs.types.Type;
var World = Bjs.types.World;






/********************************************************************************
*********************************************************************************
 *
 * BorjesAVM
 *
*********************************************************************************
********************************************************************************/

class BorjesAVM extends React.Component {

    constructor(props) {
        super(props);

        var showFMenu = {};
         var show = true;              // this.props.opts.show;
        if (show === undefined) {
            show = true;
        }
        var showF = {};
        var x = this.props.x;
        var edit = false;

        var showInput;
/*        if (x.f.length === 0) {
            showInput = true;
        } else showInput = false;*/

        //console.log('============================ BorjesAVM x: ' +JSON.stringify(x, null, 4));

        var showPrev2 = {};
        //x.f.forEach(f => showPrev2[f] = false);

        // x.f.forEach(f => showF[f] = !(this.props.opts.hide_more && (f === 'head_dtr' || f === 'nonh_dtr')));
/*        x.f.forEach(f => showF[f] = true);
        x.f.forEach(f => showPrev2[f] = false);*/

        this.state = {edit, show, showF, showInput, showPrev2};

        this.realize = this.realize.bind(this);
        this.isInformative = this.isInformative.bind(this);


    }

    isEmptyObject(obj) {
        if (obj === undefined) {
            return true;
        } else if (Object.getOwnPropertyNames(obj).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    updateF(feat, value) {
        var x = this.props.x;

/*        console.log('============================ AVM updateF x: ' + JSON.stringify(x, null, 4));
        console.log('============================ AVM updateF feat: ' + feat);
        console.log('============================ AVM updateF value: ' + JSON.stringify(value, null, 4));*/


        FStruct.set(x, feat, value);
        this.props.update(x);
    }

    addF() {
        var inputAVM = this.props.x;
        var currentAVM = inputAVM;
        var feats = this.newFeature.value;
        var fList = feats.split(" ");
        var decl = this.props.decl;
        var feat;
        var v;

        if (decl && fList.length > 1) {
            this.newFeature.value = "";
            return
        }

        for (var i = 0; i < fList.length; i++) {
            feat = fList[i];
            if (decl) {
                FStruct.set(inputAVM, feat, Anything);
            } else if (i === fList.length - 1) {
                FStruct.set(currentAVM, feat, Anything)
            } else {
                v = FStruct();
                FStruct.set(currentAVM, feat, v);
                currentAVM = v;
            }
            var s = this.state;
            s.showF[feat] = true;
            this.setState(s);
        }
        this.newFeature.value = "";
        this.props.update(inputAVM);
    }

    newFeatureF(event) {
        var feats = this.newFeature.value;
        if (event.keyCode == 13 && feats !== "") {
            this.addF();
            var s = this.state;
            s.showInput = false;
            this.setState(s)
        }

    }

    rmF(f) {
        var x = this.props.x;
        FStruct.unset(x, f);
        this.props.update(x);
    }

    updateType(t) {
        var x = this.props.x;

/*        console.log('============================ BorjesAVM updateType x: ' +JSON.stringify(x, null, 4));
        console.log('============================ BorjesAVM updateType t: ' +JSON.stringify(t, null, 4));
        console.log('============================ BorjesAVM updateType this.props.update: ' +JSON.stringify(this.props.update, null, 4));*/


        if(t.borjes === 'tfstruct') {
            x = t;
        } else {
            if (t.borjes === 'type' && x.borjes !== 'tfstruct') {
                x = Bjs.types.TFS(t, x.v, x.f);
            } else {
                x.type = t;
            }
        }
        this.props.update(x);
    }

    addType() {
        var s = this.props.opts.signature;
        var o = Bjs.types.Lattice.element(s, Object.keys(s.bits)[0]);
        this.updateType(o);
    }

    remove(f) {
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

    remove2(f) {
        this.updateF(f, Anything);
    }


    copy2(val) {
        this.props.globalProps.cpbuffer.v = Bjs.types.copy(val);
    }

    paste2(f) {
        var p = this.props.globalProps.cpbuffer.v;
        if (p !== undefined) {
            if (p.borjes_bound) {
                delete p.borjes_bound;
            }

            this.updateF(f, Bjs.types.copy(p));
        }
    }

    componentDidUpdate() {
        var refresh = this.props.refresh;
        if (refresh) {
            refresh();
        }
    }

    turnEditOn() {
        var edit = this.state.edit;
        edit = true;
        this.setState({edit});
    }

    turnEditOff() {
        var edit = this.state.edit;
        edit = false;
        this.setState({edit});
    }

    togglePrev2F(f) {
        var edit = this.state.edit;
        if(edit) {
            var showPrev2 = this.state.showPrev2;
            showPrev2[f] = !showPrev2[f];
            this.setState({showPrev2});
        }
    }


    isInformative(feat,val, fsType) {
        var globalProps = this.props.globalProps;
        var editForms = globalProps.editForms;
        var declaredEditFormOfFsType = editForms[fsType.type];
        var featureDeclarationsOfFsType = declaredEditFormOfFsType['v'];
        var declaredEditForm = featureDeclarationsOfFsType[feat];

/*        console.log('%c============================ isInformative begin ============================ ', 'color:green');
        console.log('============================ fsType: ' +JSON.stringify(fsType, null, 4));
        console.log('============================ feat: ' +JSON.stringify(feat, null, 4));
        console.log('============================ val: ' +JSON.stringify(val, null, 4));
        console.log('============================ declaredEditFormOfFsType: ' +JSON.stringify(declaredEditFormOfFsType, null, 4));
        console.log('============================ declaredEditForm: ' +JSON.stringify(declaredEditForm, null, 4));
        console.log('============================ editForms: ' + JSON.stringify(editForms, null, 4));
        console.log('%c============================ isInformative end ============================ ', 'color:green');*/


        if(this.borjesIdentical(val, declaredEditForm)) {
            return false;
        } else {
            return true;
        }

    }


    borjesIdentical(a, b) {
        var globalProps = this.props.globalProps;
        var editForms = globalProps.editForms;

        if (a['borjes'] !== b['borjes']) {
            return false;
        }

        if (a['borjes'] === 'type' &&
            b['borjes'] === 'type' &&
            a.type === b.type) {
            return true;
        }

        if (a['borjes'] === 'type' &&
            b['borjes'] === 'type' &&
            a.type !== b.type) {
            return false;
        }

        if (a.borjes === 'tfstruct' &&
            b.borjes === 'tfstruct' &&
            a.type.type !== b.type.type) {
            return false;
        }

        var currentType = a.type.type;
        var declaredFeats = editForms[currentType].f;
        var identicalValues = true;

        for (var i = 0; i < declaredFeats.length; i++) {
            var currentFeat = declaredFeats[i];

            if (!this.borjesIdentical(a['v'][currentFeat], b['v'][currentFeat])) {
                identicalValues = false;
            }
        }
        if (identicalValues === true) {
            return true;
        } else {
            return false
        }
    }


    realize(f, val, fstruc, decl) {
        var globalProps = this.props.globalProps;
        var file = globalProps.file;
        var decl =  this.props.decl;
        var edit = this.state.edit;

        if(decl === false) {
            var informative = this.isInformative(f, val, fstruc);
        }

        var rowStyle = 'borjes_feat';
        if(informative === false && edit === false && decl === false) {
            rowStyle = 'borjes_pale_feat';
        }


/*                console.log('%c============================ AVM realize begin ============================', 'color:blue');
                console.log('============================ f: ' + f);
                console.log('============================ val: ' + JSON.stringify(val, null, 4));
                console.log('============================ decl: '+ this.props.decl);
                console.log('============================ edit: ' + edit);
                console.log('============================ informative: ' + informative);
                console.log('%c============================ AVM realize end ============================\n\n', 'color:blue');*/

        var refresh = this.props.refresh;
        var opts = this.props.opts;
        var doc = this.props.doc;
        var editForms = globalProps.editForms;
        var allFeatures = globalProps.allFeatures;
        var valHasFeatures = !this.isEmptyObject(allFeatures[val.type]);

        var showPrev2 = this.state.showPrev2;
        var prev2 = null;
        if (edit && val.borjes !== 'anything' && val.borjes !== 'tfstruct' && val.borjes !== 'fstruct') {
            prev2 = <Menu>
                <button onClick={this.remove2.bind(this, f)}>x</button>
                <button onClick={this.copy2.bind(this, val)}>copy</button>
                <button onClick={this.paste2.bind(this, f)}>paste</button>
            </Menu>
        }


        if (val.borjes === "type") {
            return (
                <tr key={'tr_' + f}>
                    <td className={rowStyle}>
                        {edit === true && decl === true ? <button onClick={this.rmF.bind(this, f)}>x</button> : null}
                        <span
                            key={'feature_' + f}>{f}
                    </span>
                    </td>
                    <td>
                        <span className="borjes">
                            {edit === true ? prev2 : null}
                            <BorjesLatticeElement
                                x={val}
                                decl={this.props.decl}
                                edit={edit}
                                informative={informative}
                                role={'featureValue'}
                                doc={doc}
                                update={this.updateF.bind(this, f)}
                                refresh={refresh}
                                globalProps={globalProps}
                                opts={opts}/>
                   </span>
                    </td>
                </tr>
            )
        }



        if ((val.borjes === "tfstruct" || val.borjes === "fstruct") && decl === false) {
            return (
                <tr key={'tr_' + f}>
                    <td className={rowStyle}>
                        {edit === true && decl === true ? <button onClick={this.rmF.bind(this, f)}>x</button> : null}
                        <span
                            key={'feature_' + f}>{f}
                    </span>
                    </td>
                    <td>
                    <span className="borjes">
                        <BorjesAVM
                        ref="child"
                        decl={false}
                        x={val}
                        doc={doc}
                        edit={edit}
                        informative={informative}
                        refresh={refresh}
                        role={'featureValue'}
                        globalProps={globalProps}
                        update={this.updateF.bind(this, f)}
                        opts={opts}/>
                              </span>
                    </td>
                </tr>
            )
        }


        if (val.borjes === 'anything' || val.borjes === "list_empty" || val.borjes === "list" || val.borjes === "disjunct") {
            return (
                <tr key={'tr_' + f}>
                    <td className={rowStyle}>
                        {edit === true && decl === true ? <button onClick={this.rmF.bind(this, f)}>x</button> : null}
                        <span
                            key={'feature_' + f}>{f}
                    </span>
                    </td>
                    <td>
                            <span className="borjes">
                                {(edit === true && val.borjes !== 'anything') ? prev2 : null}
                                <BorjesComponent
                                x={val}
                                decl={this.props.decl}
                                role={'featureValue'}
                                doc={doc}
                                update={this.updateF.bind(this, f)}
                                edit={edit}
                                refresh={refresh}
                                globalProps={globalProps}
                                opts={opts}/>
                            </span>
                    </td>
                </tr>
            )
        }
    }





    render() {
        var x = this.props.x;
        var edit = this.state.edit;
        var globalProps = this.props.globalProps;
        var allFeatures = globalProps.allFeatures;
        var opts = this.props.opts;
        var file = globalProps.file;
        var showInput = this.state.showInput;


/*
        console.log('%c============================ AVM render begin ============================', 'color:orange');
        console.log('============================ this.state.show: ' + this.state.show) ;
        console.log('============================ this.props.decl: ' + this.props.decl) ;
        console.log('============================ edit: ' + edit) ;
        console.log('============================ x: ' + JSON.stringify(x, null, 4)) ;
        console.log('============================ AVM render end ============================\n\n');*/

        var atrs = x.f;
        var refresh = this.props.refresh;

        return (
            <span>
                {edit? <Menu>
                    <button onClick={this.remove.bind(this)}>x</button>
                    <button onClick={this.copy.bind(this)}>copy</button>
                    <button onClick={this.paste.bind(this)}>paste</button>
                </Menu>:null}
                <table className="borjes_fs">
                    {x.borjes === 'tfstruct' ?
                        <thead>
                        <tr>
                            <th colSpan="2">
                                <BorjesComponent x={x.type}
                                                 decl={this.props.decl}
                                                 file={file}
                                                 informative={this.props.informative}
                                                 role={'fstructValue'}
                                                 globalProps={globalProps}
                                                 refresh={refresh}
                                                 update={this.updateType.bind(this)}
                                                 edit={edit}
                                                 opts={opts}
                                />
                            </th>
                        </tr>
                        </thead> : null}
                    <tbody>
                   {atrs.map(f => {
                           var val = FStruct.get(x, f);
                           var fname = f;

                           return this.realize(f, val, x.type, this.props.decl);
                       }
                   )
                   }
                   <tr>
                        <td>
                            {edit && this.props.decl ?
                                <input ref={d => this.newFeature = d} type="text" size="40" id="newFeature"
                                       onKeyUp={this.newFeatureF.bind(this)}/> : null}
                        </td>
                    </tr>
                   {edit ? <tr>
                           <td><span style={{'cursor': 'pointer', 'color': '#00F'}}
                                     onClick={this.turnEditOff.bind(this)}>-</span></td>
                       </tr>
                       : <tr>
                           <td><span style={{'cursor': 'pointer', 'color': '#00F', 'fontSize': 'small'}}
                                     onClick={this.turnEditOn.bind(this)}>+</span></td>
                       </tr>}
                    </tbody>
                </table>

            </span>
        )
    }
}



/********************************************************************************
 *********************************************************************************
 *
 * BorjesComponent
 *
 *********************************************************************************
 ********************************************************************************/

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
                o = Bjs.types.Type('type');
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
/*            case 'se':
                o = Bjs.types.Set();
                break;
            case 'ss':
                o = Bjs.types.Set.sum(Anything, Bjs.types.Variable(this.props.opts.world, Anything));
                break;*/
        }
        console.log('============================ BorjesComponent JSON.stringify(o, null, 4): ' + JSON.stringify(o, null, 4));
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
                {x.map((y, i) => <BorjesComponent globalProps={globalProps} opts={opts} key={i} x={y}/>)}
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
                    return <span className="borjes"><BorjesLatticeElement x={Bjs.types.Type('type')}
                                                                          decl={true}
                                                                          globalProps={globalProps}
                                                                          refresh={refresh}
                                                                          edit={edit}
                                                                          role={this.props.role}
                                                                          update={update}
                                                                          opts={opts}/></span>;
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
                return <BorjesTree x={x} globalProps={globalProps} refresh={refresh} update={update} opts={opts}/>;
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


/********************************************************************************
*********************************************************************************
*
* BorjesDisjunct
*
*********************************************************************************
********************************************************************************/


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
                <BorjesComponent x={a} file={file} globalProps={this.props.globalProps} refresh={this.props.refresh} update={this.update.bind(this, i)} opts={opts} />
            </span>)}
            <button onClick={this.append.bind(this)}>+</button>
        </span>;
    }

}


/********************************************************************************
 *********************************************************************************
 *
 * BorjesList
 *
 *********************************************************************************
 ********************************************************************************/


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
        var globalProps = this.props.globalProps;
        var opts = this.props.opts;
        var file = this.props.file;
        var edit = this.props.edit;
        if (x.borjes === 'list_empty') {
            return <span className="borjes_list"></span>;
        }
        var aft = [];
        var i = 0;
        var rest = x.rest;
        if (!edit) {
            while (rest.borjes === 'list') {
                aft.push(",");
                aft.push(<BorjesComponent globalProps={globalProps} edit={edit} key={i} x={rest.first} file={file} refresh={this.error} update={this.error} opts={opts} />);
                i++;
                rest = rest.rest;
            }
        }
        return <span className="borjes_list">
            <BorjesComponent x={x.first} globalProps={globalProps} edit={edit} file={file} refresh={this.props.refresh} update={this.updateFst.bind(this)} opts={opts} />
            {aft}
            {rest.borjes !== 'list_empty'?",":null}
            {rest.borjes !== 'list_empty'?<BorjesComponent x={rest} edit={edit} globalProps={globalProps} file={file} refresh={this.props.refresh} update={this.updateRest.bind(this)} opts={opts} />:null}
            {rest.borjes === 'list_empty' && edit ?<button onClick={this.append.bind(this)}>+</button>:null}
        </span>;
    }

}

/********************************************************************************
 *********************************************************************************
 *
 * BorjesAVM
 *
 *********************************************************************************
 ********************************************************************************/



/*class BorjesAVM extends React.Component {

    constructor (props) {
        super(props);
        var show = this.props.opts.show;
        if (show === undefined) { show = true; }
        this.state = { show };
    }

    toggle (e) {
        this.setState({ show: !this.state.show });
        e.stopPropagation();
    }

    updateV (value) {
        var x = this.props.x;
        World.set(this.props.opts.world, x.index, value);
        this.props.update(x);
    }

    updateT (e) {
        var x = this.props.x;
        this.props.opts.world.titles[x.index] = e.target.value;
        this.props.update(x);
    }

    render () {
        var x = this.props.x;
        var w = this.props.opts.world;
        var value = World.get(w, x.index);
        var edit=this.props.edit;
        return <span>
            <input className="borjes_variable" type="text" value={w.titles[x.index]} onChange={this.updateT.bind(this)} />
            <span className={this.state.show?"borjes_visible":"borjes_hidden"}>
                <BorjesComponent update={this.updateV.bind(this)} edit={edit} refresh={this.props.refresh} x={value} opts={this.props.opts} />
            </span>
        </span>;
    }

    componentDidUpdate () {
        var refresh = this.props.refresh;
        if (refresh) { refresh(); }
    }

}*/

module.exports = {
    BorjesAVM: BorjesAVM,
    BorjesComponent: BorjesComponent,
    BorjesDisjunct: BorjesDisjunct,
    BorjesList: BorjesList,

};


