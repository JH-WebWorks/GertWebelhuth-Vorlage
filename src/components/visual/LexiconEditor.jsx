"use strict";

var React = require('react');
var t = require('tcomb-form');
var Bjs = require('../../borjes');
var World = Bjs.types.World;
var Principle = Bjs.Principle;
var FStruct = Bjs.types.FStruct;
var TFS = Bjs.types.TFS;
var List = Bjs.types.List;
var Anything = Bjs.types.Anything;



var BorjesComponents = require("../BorjesComponents");
var BorjesAVM = BorjesComponents.BorjesAVM;


var Row = require('../Row');
var Actions = require('../../Actions');

class LexiconEditor extends React.Component {

    constructor(props) {
        super(props);
        var doc = this.props.doc;
        var ante;
        var cons;
        var editForms = this.props.globalProps.editForms;
        //var allFstructs = this.props.globalProps.allFstructs;



        if (doc.at().get() === null) {
            ante = editForms['word'];
            cons = Array();
            doc.at().set(Principle(ante, cons));
        }
        doc.on('child op', () => {
            this.forceUpdate();
        });

        this.state={};
    }


    handleKeyUp (event,word) {
        if (event.keyCode === 13) {
            this.addForms();
            document.getElementById("newWordItem").value = '';
        }
    }

    remove (i) {
        var doc = this.props.doc;
        var forms = doc.at('c').get();
        forms.splice(i,1);
        doc.at('c').set(forms);
        this.forceUpdate();
    }

    addName (event) {
        var doc = this.props.doc;
        doc.at('name').set(event.target.value);
        this.forceUpdate();
    }

    addForms () {

        var doc = this.props.doc;
        var forms = doc.at('c').get();
        var newWords = this.newWords.value;
        var wordList = newWords.split(" ");
        for (var i = 0; i < wordList.length; i++) {
            forms.push(wordList[i])
        }
        doc.at('c').set(forms);
        this.forceUpdate();
    }


    update (who, x) {
        //alert('LexiconEditor update (who, x) ' + who + JSON.stringify(x, null, 4))
        var doc = this.props.doc;
        var oldworld = doc.at(who, 'borjes_bound').get() || World();
        if (!Bjs.types.eq(x, Bjs.types.Anything)) {
            World.bind(oldworld, x);
        }
        doc.at(who).set(x);
        this.forceUpdate();
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
        this.forceUpdate();;
    }

    closeWorkbenchItem() {
        var doc = this.props.doc;
        var word = doc.at().get();
        if(word.name === '') {
            alert('You must give a name to the item!');
            return;
        }
        var myId = this.props.editorId;
        this.props.close(myId);
    }


    render() {
        var doc = this.props.doc;
        var a = doc.at('a').get();
        var items = doc.at('c').get();
        items = items.sort();
        var body = '';
        var globalProps = this.props.globalProps;
        var editForms = globalProps.editForms;

        //console.log('============================ LexiconEditor editForms[\'word\']: ' + JSON.stringify(editForms['word'], null, 4));

        //console.log('============================ LexiconEditor: ' +JSON.stringify(a, null, 4));

        return (
            <div>
                <Row ref={d => this._row = d} title={doc.at('name').get()} preTitle={'Word class: '}
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
                               update={this.update.bind(this, 'a')}
                    />
                    </span>
                    <div style={{'marginTop': "30px"}}>
                        Items (double-click to delete):{'\u00A0'} {items.map((y, i) => <span key={'form' + i}
                                                                                             style={{
                                                                                                 'cursor': "default",
                                                                                                 'color': 'blue',
                                                                                                 'fontStyle': 'italic'
                                                                                             }}
                                                                                             onDoubleClick={this.remove.bind(this, i)}>{y}{'\u00A0'}{'\u00A0'}</span>)}

                        <div>
                            Add:{'\u00A0'} <input ref={d => this.newWords = d} type="text" size="40" id="newWordItem"
                                                  onKeyUp={this.handleKeyUp.bind(this)}/>
                        </div>
                    </div>
                </Row>
{/*                <span className="borjes">
                <div style={{'fontWeight': "bold"}}><span>{'Feature structure: '}</span> </div>
                <div><BorjesAVM x={a} cpbuffer={this.props.cpbuffer}
                                  doc={this.props.doc.at('a')}
                                  decl={false}
                                  update={this.update.bind(this, 'a')}
                                  opts={{signature: this.props.sig}}/>

                </div>
                <div style={{'marginTop': "30px"}}>
                    Items (double-click to delete):{'\u00A0'} {items.map((y, i) => <span key={'form' + i}
                                                                                         style={{'cursor': "default"}}
                                                                                         onDoubleClick={this.remove.bind(this, i)}>{y}{'\u00A0'}{'\u00A0'}</span>)}

                    <div>
                        Add:{'\u00A0'} <input ref={d => this.newWords = d} type="text" size="40" id="newWordItem"
                                              onKeyUp={this.handleKeyUp.bind(this)}/>
                    </div>
                </div>
            </span>*/}
            </div>
        )
    }
}

module.exports = LexiconEditor;