"use strict"

var React = require('react');
var Bjs = require('borjes');

var BorjesComponent = require('./BorjesComponent');

var Menu = require('./Menu');
//import Menu from './Menu';

var FStruct = Bjs.types.FStruct;
var Anything = Bjs.types.Anything;
var Type = Bjs.types.Type;


class BorjesAVM extends React.Component {

    constructor(props) {
        super(props);
        var showFMenu = {};
        var show = this.props.opts.show;
        if (show === undefined) {
            show = true;
        }
        var showF = {};
        var x = this.props.x;
        var edit = false;

        var showInput;
        if (x.f.length === 0) {
            showInput = true;
        } else showInput = false;

        var showPrev2 = {};

        // x.f.forEach(f => showF[f] = !(this.props.opts.hide_more && (f === 'head_dtr' || f === 'nonh_dtr')));
        x.f.forEach(f => showF[f] = true);
        x.f.forEach(f => showPrev2[f] = false);
        this.state = {edit, show, showF, showInput, showPrev2};
    }

    updateF(feat, value) {
        var x = this.props.x;
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
                var s = this.props.opts.signature;
                v = Bjs.types.Lattice.element(s, Object.keys(s.bits)[0]);
                FStruct.set(inputAVM, feat, v)
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
        if (t !== Anything && x.borjes !== 'tfstruct') {
            x = Bjs.types.TFS(t, x.v, x.f);
        } else {
            x.type = t;
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
        this.props.opts.cpbuffer.v = Bjs.types.copy(this.props.x);
    }

    paste() {
        var p = this.props.opts.cpbuffer.v;
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
        this.props.opts.cpbuffer.v = Bjs.types.copy(val);
    }

    paste2(f) {
        var p = this.props.opts.cpbuffer.v;
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
        this.setState({edit:true});
    }

    turnEditOff() {
        this.setState({edit:false});
    }

    togglePrev2F(f) {
        var edit = this.state.edit;
        if(edit) {
            var showPrev2 = this.state.showPrev2;
            showPrev2[f] = !showPrev2[f];
            this.setState({showPrev2});
        }
    }

    render() {
        var x = this.props.x;
        var opts = this.props.opts;
        var showInput = this.state.showInput;
        var atrs = x.f;
        var refresh = this.props.refresh;
        var edit = this.state.edit;
        var showPrev2 = this.state.showPrev2;

        var prev = null;
        if (edit) {
            prev =
                <Menu>
                <button onClick={this.remove.bind(this)}>x</button>
                <button onClick={this.copy.bind(this)}>copy</button>
                <button onClick={this.paste.bind(this)}>paste</button>
            </Menu>
        }

        return (
            <span>
                {prev}<table className="borjes_fs" >
                    {x.borjes === 'tfstruct' ? <thead>
                    <tr>
                        <th colSpan="2">
                            <BorjesComponent x={x.type || Type} refresh={refresh} update={this.updateType.bind(this)} edit={edit} opts={opts}/>
                        </th>
                    </tr>
                    </thead> : null}
                    <tbody className={this.state.show ? 'borjes_visible' : 'borjes_hidden'}>
                   {atrs.map(f => {
                           var val = FStruct.get(x, f);
                       var prev2 = null;
                       if (edit && val.borjes !== 'anything' && val.borjes !== 'tfstruct' && val.borjes !== 'fstruct') {
                           prev2 = <Menu>
                               <button onClick={this.remove2.bind(this, f)}>x</button>
                               <button onClick={this.copy2.bind(this, val)}>copy</button>
                               <button onClick={this.paste2.bind(this, f)}>paste</button>
                           </Menu>
                       }
                           var fname = f;
                           return (
                               <tr key={'tr_' + fname}>
                                   <td className="borjes_feat">
                                       {edit ? <button onClick={this.rmF.bind(this, f)}>x</button> : null}
                                       <span
                                       key={'feature_' + fname} onDoubleClick={this.togglePrev2F.bind(this, f)}>{fname}
                                       </span>
                                   </td>
                                   <td>{showPrev2[f] ? prev2 : null}<span>
                                       <BorjesComponent
                                           x={val}
                                           update={this.updateF.bind(this, f)}
                                           edit={edit}
                                           refresh={refresh}
                                           opts={opts}/></span>

                                   </td>
                               </tr>
                           )
                       }
                   )
                   }
                    <tr>
                        <td>
                            {edit? <input ref={d => this.newFeature = d} type="text" size="40" id="newFeature" onKeyUp={this.newFeatureF.bind(this)}/>: null}
                        </td>
                    </tr>
                   {edit?<tr><td><span style={{'cursor':'pointer'}} onClick={this.turnEditOff.bind(this)}>-</span></td></tr>
                       : <tr><td><span style={{'cursor':'pointer', 'fontSize':'small'}} onClick={this.turnEditOn.bind(this)}>+</span></td></tr>}
                    </tbody>
                </table>
            </span>
        )
    }
}

export default BorjesAVM;
