"use strict";

var React = require('react');
var t = require('tcomb-form');
var Bjs = require('../../borjes');
var World = Bjs.types.World;
var Principle = Bjs.Principle;
var Anything = Bjs.types.Anything;
var FStruct = Bjs.types.FStruct;
var TFS = Bjs.types.TFS;
var Lattice = Bjs.types.Lattice;
var Type = Bjs.types.Type;


var BorjesComponents = require("../BorjesComponents");
var BorjesAVM = BorjesComponents.BorjesAVM;


var Menu = require('../Menu');

var Row = require('../Row');
var Actions = require('../../Actions');

class PrincipleEditor extends React.Component {

    constructor(props) {
        super(props);
        var doc = this.props.doc;
        var ante;
        var cons;
        var fs = FStruct();
        var s = this.props.sig;
        if (doc.at().get() === null) {
            ante = TFS(Type('type'));
            cons = TFS(Type('type'));
            doc.at().set(Principle(ante, cons));
        }
        this.state = { edit: true };
        doc.on('child op', () => {
            this.forceUpdate();
        });
    }

    update (who, x) {
        var doc = this.props.doc;
        var oldworld = doc.at(who, 'borjes_bound').get() || World();
        if (!Bjs.types.eq(x, Bjs.types.Anything)) {
            World.bind(oldworld, x);
        }
        doc.at(who).set(x);
        this.forceUpdate();
    }

    remove_a () {
        var doc = this.props.doc;
        doc.at('a').set(Anything);
        this.forceUpdate();
    }

    copy_a (x) {
        this.props.globalProps.cpbuffer.v = Bjs.types.copy(x);
    }

    paste_a () {
        var p = this.props.globalProps.cpbuffer.v;
        var doc = this.props.doc;
        var oldworld = doc.at('a', 'borjes_bound').get() || World();
        if (p !== undefined) {
            if (p.borjes_bound) {
                delete p.borjes_bound;
            }
            doc.at('a').set(Bjs.types.copy(p));
            this.forceUpdate();
        }
    }

    remove_c () {
        var doc = this.props.doc;
        doc.at('c').set(Anything);
        this.forceUpdate();
    }

    copy_c (x) {
        this.props.globalProps.cpbuffer.v = Bjs.types.copy(x);
    }

    paste_c () {
        var p = this.props.globalProps.cpbuffer.v;
        var doc = this.props.doc;
        var oldworld = doc.at('c', 'borjes_bound').get() || World();
        if (p !== undefined) {
            if (p.borjes_bound) {
                delete p.borjes_bound;
            }
            doc.at('c').set(Bjs.types.copy(p));
            this.forceUpdate();
        }
    }

    open () {
        this._row.open();
    }

    changeName (e) {
        var doc = this.props.doc;
        Actions.prompt({
            model: t.struct({ name: t.Str }),
            value: { name: doc.at('name').get() }
        }).then(data => {
            doc.at('name').set(data.name);
        }).catch(() => {});
        this.forceUpdate();
    }

    closeWorkbenchItem() {
        var doc = this.props.doc;
        var principle = doc.at().get();
        if(principle.name === '') {
            alert('You must give a name to the item!');
            return;
        }
        var myId = this.props.editorId;
        this.props.close(myId);
    }

    addName (event) {
        var doc = this.props.doc;
        doc.at('name').set(event.target.value);
        this.forceUpdate();
    }


    render () {
        var doc = this.props.doc;
        var a = doc.at('a').get();
        var c = doc.at('c').get();
        var edit = this.state.edit;
        var prev_a = null;
        var prev_c = null;
        var globalProps = this.props.globalProps;

        if (edit) {
            prev_a = <Menu>
                <button onClick={this.remove_a.bind(this)}>x</button>
                <button onClick={this.copy_a.bind(this, a)}>copy</button>
                <button onClick={this.paste_a.bind(this)}>paste</button>
            </Menu>
        }

        if (edit) {
            prev_c = <Menu>
                <button onClick={this.remove_c.bind(this)}>x</button>
                <button onClick={this.copy_c.bind(this, c)}>copy</button>
                <button onClick={this.paste_c.bind(this)}>paste</button>
            </Menu>
        }

        return <Row ref={d => this._row = d} title={doc.at('name').get()} preTitle={'Principle: '}
                    initShown={true} collapsable={false} addName={this.addName.bind(this)}
                    actions={{
                        remove: this.props.rm,
                        close: this.closeWorkbenchItem.bind(this)
                    }}>

                    <span className="borjes">
                    {a.borjes === 'anything' || a.borjes === 'tfstruct' || a.borjes === 'fstruct' ? null : prev_a}<BorjesAVM
                        x={a}
                        decl={false}
                        doc={doc.at('a')}
                        globalProps={globalProps}
                        update={this.update.bind(this, 'a')}/>
                        {"⇒"}
                        {c.borjes === 'anything' || c.borjes === 'tfstruct' || c.borjes === 'fstruct' ? null : prev_c}<BorjesAVM
                        x={c}
                        decl={false}
                        doc={doc.at('c')}
                        globalProps={globalProps}
                        update={this.update.bind(this, 'c')}/>
                    </span>
        </Row>;
    }
}

module.exports = PrincipleEditor;


