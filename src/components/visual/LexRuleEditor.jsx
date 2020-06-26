"use strict";

var React = require('react');
var t = require('tcomb-form');
var Bjs = require('../../borjes');
var World = Bjs.types.World;
var LexRule = require('../../borjes/src/lexRule');
var TFS = Bjs.types.TFS;

var BorjesComponents = require("../BorjesComponents");
var BorjesAVM = BorjesComponents.BorjesAVM;

var Row = require('../Row');
var Actions = require('../../Actions');

class LexRuleEditor extends React.Component {

    constructor(props) {
        super(props);
        var doc = this.props.doc;
        var ante;
        var cons;
        var forms;
        var patterns;
        var editForms = this.props.globalProps.editForms;
        if (doc.at().get() === null) {
            ante = editForms['word'];
            cons = editForms['word'];
            forms = Array();
            patterns = Array();
            World.bind(World(), ante);
            World.bind(World(), cons);
            doc.at().set(LexRule(ante, cons, forms, patterns));
        }
        this.state = {  firstString: '',
                        secondString: '',
                        firstPattern: '',
                        secondPattern: ''
        };
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

    /*editToggle (e) {
        var ed = this.state.editable;
        if (!ed) {
            this._row.open();
        }
        this.setState({editable: !this.state.editable});
        if (e) { e.stopPropagation(); }
    }*/

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

    removeForm (i) {
        var doc = this.props.doc;
        var forms = doc.at('f').get();
        forms.splice(i,1);
        doc.at('f').set(forms);
        this.forceUpdate();
    }

    removePattern (i) {
        var doc = this.props.doc;
        var patterns = doc.at('p').get();
        patterns.splice(i,1);
        doc.at('p').set(patterns);
        this.forceUpdate();
    }

    addForm () {
        var doc = this.props.doc;
        var forms = doc.at('f').get();
        var nextEntry = {
            in:this.state.firstString,
            out:this.state.secondString
        }
        forms.push(nextEntry);
        doc.at('f').set(forms);
        this.forceUpdate();
    }

    addPattern () {
        var doc = this.props.doc;
        var patterns = doc.at('p').get();
        var nextPattern = {
            in:this.state.firstPattern,
            out:this.state.secondPattern
        }
        patterns.push(nextPattern);
        doc.at('p').set(patterns);
        this.forceUpdate();
    }

    handleChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    closeWorkbenchItem() {
        var doc = this.props.doc;
        var lexRule = doc.at().get();
        if(lexRule.name === '') {
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
        var forms = doc.at('f').get();
        var patterns = doc.at('p').get();
        forms.sort(function(a, b){
            var x = a.in.toLowerCase();
            var y = b.in.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });
        var globalProps = this.props.globalProps;

        return <Row ref={d => this._row = d} title={doc.at('name').get()} preTitle={'Lexical rule: '}
                    initShown={true} collapsable={false} addName={this.addName.bind(this)}
                    actions={{
                        remove: this.props.rm,
                        close: this.closeWorkbenchItem.bind(this)
                    }}
                >
            <span className="borjes">
            <BorjesAVM x={a}
                       decl={false}
                       doc={doc.at('a')}
                       globalProps={globalProps}
                       update={this.update.bind(this, 'a')}/>
                {'\u00A0'}{"     licences     "}{'\u00A0'}
                <BorjesAVM x={c}
                           decl={false}
                           doc={doc.at('c')}
                           globalProps={globalProps}
                           update={this.update.bind(this, 'c')}/>

            <div style={{'marginTop': "20px"}}>
            <table>
                <thead>
                    <tr>
                        <th>Input Word{'\u00A0'}{'\u00A0'}</th>
                        <th>Output Word</th>
                    </tr>
                </thead>
                <tbody>
                {forms.map((y, i) =>
                    <tr>
                        <td><button key={'forms'+i} onClick={this.removeForm.bind(this, i)}>x</button>{y.in}{'\u00A0'}{'\u00A0'}</td>
                        <td>{y.out}</td>
                    </tr>)
                }
                </tbody>
            </table>
                <div>
                <input type="text" size="40" name="firstString" onChange={this.handleChange.bind(this)}/>
                    <input type="text" size="40" name="secondString" onChange={this.handleChange.bind(this)}/>
                        <button onClick={this.addForm.bind(this)}>Add Irregular</button></div>


                <table>
                <thead>
                    <tr>
                        <th>Input Pattern{'\u00A0'}{'\u00A0'}</th>
                        <th>Output Pattern</th>
                    </tr>
                </thead>
                <tbody>
                {patterns.map((y, i) =>
                    <tr>
                        <td><button key={'pattern'+i} onClick={this.removePattern.bind(this, i)}>x</button>{y.in}{'\u00A0'}{'\u00A0'}</td>
                        <td>{y.out}</td>
                    </tr>)
                }
                </tbody>
            </table>
            <div>
                    <input type="text" size="40" name="firstPattern" onChange={this.handleChange.bind(this)}/>
                    <input type="text" size="40" name="secondPattern" onChange={this.handleChange.bind(this)}/>
                    <button onClick={this.addPattern.bind(this)}>Add Pattern</button></div>
                 </div>



        </span></Row>
    }
}


module.exports = LexRuleEditor;