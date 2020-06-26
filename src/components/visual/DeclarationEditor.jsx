"use strict";

var React = require('react');
var t = require('tcomb-form');
var Bjs = require('../../borjes');
var World = Bjs.types.World;
var Declaration = require('../../borjes/src/declaration');
var FStruct = Bjs.types.FStruct;
var TFS = Bjs.types.TFS;
var Type = Bjs.types.Type;
var Lattice = Bjs.types.Lattice;
var List = Bjs.types.List;
var Anything = Bjs.types.Anything;

var BorjesComponents = require("../BorjesComponents");
var BorjesAVM = BorjesComponents.BorjesAVM;

var Row = require('../Row');
var Actions = require('../../Actions');

var util = require("util");

class DeclarationEditor extends React.Component {

    constructor(props) {
        super(props);
        var doc = this.props.doc;
        var fs = FStruct();
        var s = this.props.sig;
        if (doc.at().get() === null) {
            fs = TFS(Type('type'));
            World.bind(World(), fs);
            doc.at().set(Declaration(fs));
        }
        doc.on('child op', () => {
            this.forceUpdate();
        });

        this.state = {};

    }

    update(who, x) {
        var doc = this.props.doc;
        var oldworld = doc.at(who, 'borjes_bound').get() || World();
        if (!Bjs.types.eq(x, Bjs.types.Anything)) {
            World.bind(oldworld, x);
        }
        doc.at(who).set(x);
        this.forceUpdate();
    }

    open() {
        this._row.open();
    }

    changeName(e) {
        var doc = this.props.doc;
        Actions.prompt({
            model: t.struct({name: t.Str}),
            value: {name: doc.at('name').get()}
        }).then(data => {
            doc.at('name').set(data.name);
        }).catch(() => {
        });
        this.forceUpdate();
    }

    closeWorkbenchItem() {
        var doc = this.props.doc;
        var decl = doc.at().get();
        if(decl.name === '') {
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

    render() {
        var doc = this.props.doc;
        var decl = doc.at().get();
        var fstr = decl.fstr;
        var globalProps = this.props.globalProps;

        return (
            <div>
                <Row ref={d => this._row = d} title={doc.at('name').get()} preTitle={' Feature Declaration: '}
                     initShown={true} collapsable={false} addName={this.addName.bind(this)}
                     actions={{
                         remove: this.props.rm,
                         close: this.closeWorkbenchItem.bind(this)
                     }}
                >
            <span className="borjes">
            {'Feature structure: '}
                <div style={{'marginBottom': "10px"}}>
                <BorjesAVM x={fstr}
                           decl={true}
                           edit={false}
                           doc={doc.at('fstr')}
                           globalProps={globalProps}
                           update={this.update.bind(this, 'fstr')}
                />
            </div>
        </span>
                </Row>
            </div>
        )
    }
}

module.exports = DeclarationEditor;