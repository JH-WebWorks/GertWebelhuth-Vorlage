"use strict";

var React = require('react');
var t = require('tcomb-form');
var Bjs = require('../../borjes');
var World = Bjs.types.World;
var Abbreviation = require('../../borjes/src/abbreviation');
var FStruct = Bjs.types.FStruct;
var TFS = Bjs.types.TFS;
var Lattice = Bjs.types.Lattice;
var List = Bjs.types.List;
var Type = Bjs.types.Type;
var Anything = Bjs.types.Anything;


var BorjesComponents = require("../BorjesComponents");
var BorjesAVM = BorjesComponents.BorjesAVM;


var Row = require('../Row');
var Actions = require('../../Actions');

class AbbrEditor extends React.Component {

    constructor(props) {
        super(props);
        var doc = this.props.doc;
        var editForms = this.props.globalProps.editForms;
        if (doc.at().get() === null) {
            var fs = TFS(Type('type'));
            doc.at().set(Abbreviation(fs));
        }
        doc.on('child op', () => {
            this.forceUpdate();
        });
    }


    remove (i) {
        var doc = this.props.doc;
        var abbrs = doc.at('abbreviations').get();
        abbrs.splice(i,1);
        doc.at('abbreviations').set(abbrs);
        this.forceUpdate();
    }

    addName (event) {
        var doc = this.props.doc;
        doc.at('name').set(event.target.value);
        this.forceUpdate();
    }

    update (who, x) {
        var doc = this.props.doc;
        var oldworld = doc.at(who, 'borjes_bound').get() || World();
        if (!Bjs.types.eq(x, Bjs.types.Anything)) {
            World.bind(oldworld, x);
        }
        doc.at(who).set(x);
        this.forceUpdate()
    }

    open () {
        this._row.open();
    }

    closeWorkbenchItem() {
        var doc = this.props.doc;
        var abbreviation = doc.at().get();
        if(abbreviation.name === '') {
            alert('You must give a name to the item!');
            return;
        }
        var myId = this.props.editorId;
        this.props.close(myId);
    }

    render () {

        var doc = this.props.doc;
        var abbreviation = doc.at().get();
        var fstr = abbreviation.fstr;
        var globalProps = this.props.globalProps;

        return <Row ref={d=>this._row=d} title={doc.at('name').get()} preTitle={'Abbreviation: '}
                    initShown={true} collapsable={false} addName={this.addName.bind(this)}
                    actions={{
                        remove: this.props.rm,
                        close: this.closeWorkbenchItem.bind(this)
                    }}
                >
            <span className="borjes">
            <div>
                <BorjesAVM x={fstr}
                           decl={false}
                           doc={doc.at('abbreviation')}
                           globalProps={globalProps}
                           update={this.update.bind(this, 'fstr')}/>
             </div>


        </span></Row>;
    }
}

module.exports = AbbrEditor;


