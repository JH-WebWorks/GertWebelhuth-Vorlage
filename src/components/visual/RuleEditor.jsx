"use strict";

var React = require('react');
var t = require('tcomb-form');
var Bjs = require('../../borjes');
var Tree = Bjs.Tree;
var World = Bjs.types.World;
var FStruct = Bjs.types.FStruct;
var Type = Bjs.types.Type;
var Variable = Bjs.types.Variable;
var Rule = Bjs.Rule;

var BorjesComponents = require("../BorjesComponents");
var BorjesComponent = BorjesComponents.BorjesComponent;

var Row = require('../Row');
var Actions = require('../../Actions');

class RuleEditor extends React.Component {

    constructor(props) {
        super(props);
        var doc = this.props.doc;
        var mother = doc.at('m').get();
        var daughters = doc.at('d').get();
        var tree;
        if (doc.at('arity').get() == 2) {
            tree = Tree(mother, [daughters[0], daughters[1]]);
        } else {
            tree = Tree(mother, [daughters[0], daughters[1], daughters[2]]);
        }
        World.bind(mother.borjes_bound, tree);
        this.state = { tree };
        doc.on('child op', () => {
            var mi = doc.at('m').get();
            var dou = doc.at('d').get();
            var tree = Tree(mi, dou);
            World.bind(mi.borjes_bound, tree);
            this.setState({ tree });
        });
    }

    update (x) {
        var doc = this.props.doc;
        var oldworld = this.state.tree.borjes_bound;
        if (!Bjs.types.eq(x.node, Bjs.types.Anything)) {
            World.bind(oldworld, x.node);
        }
        World.bind(oldworld, x);
        doc.at('m').set(x.node);
        var numDtrs = x.arity;
        doc.at('d').at(0).set(x.children[0]);
        doc.at('d').at(1).set(x.children[1]);
        if (numDtrs == 3) {
            doc.at('d').at(2).set(x.children[2]);
        }
        this.setState({tree: x});
        this.forceUpdate()
    }


    open () {
        this._row.open();
    }

    addName (event) {
        var doc = this.props.doc;
        doc.at('name').set(event.target.value);
        this.forceUpdate();
    }

    changeName (e) {
        var doc = this.props.doc;
        Actions.prompt({
            model: t.struct({ name: t.Str }),
            value: { name: doc.at('name').get() }
        }).then(data => {
            doc.at('name').set(data.name);
        }).catch(() => {});
    }

    closeWorkbenchItem() {
        var doc = this.props.doc;
        var rule = doc.at().get();
        if(rule.name === '') {
            alert('You must give a name to the item!');
            return;
        }
        var myId = this.props.editorId;
        this.props.close(myId);
    }

    render () {
        var doc = this.props.doc;
        var globalProps = this.props.globalProps;
        return <Row ref={d=>this._row=d} title={doc.at('name').get()} preTitle={'Phrase Definition: '}
                    initShown={true} collapsable={false} addName={this.addName.bind(this)}
                    actions={{
                        remove: this.props.rm,
                        close: this.closeWorkbenchItem.bind(this)
                    }}
                >
            <BorjesComponent x={this.state.tree}
                             globalProps={globalProps}
                             update={this.update.bind(this)}/>
                </Row>;
    }
}

module.exports = RuleEditor;
