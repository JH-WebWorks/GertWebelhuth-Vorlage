"use strict";

var React = require('react');
require('../styles/visual');

var util = require('util');




class Survey extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            posGroup: {
                'n': false,
                'v': false,
                'a': false,
                'p': false,
                'd': false,
                'c': false,
                'adv': false
            },
            agrGroup: {
                '1s': false,
                '2s': false,
                '3s': false,
                '1p': false,
                '2p': false,
                '3p': false
            },
            caseGroup: {
                'nom': false,
                'acc': false
            },
            numGroup: {
                'sg': false,
                'pl': false
            },
            perGroup: {
                'fst': false,
                'sec': false,
                'thd': false
            },
            vformGroup: {
                'finite': false,
                'base': false,
                'presp': false,
                'pastp': false
            },
            agrPosGroup: {
                'n': false,
                'v': false,
                'd': false,
                'a': false
            },
            casePosGroup: {
                'n': false,
                'd': false,
                'a': false
            },
            numPosGroup: {
                'n': false,
                'v': false,
                'd': false,
                'a': false
            },
            perPosGroup: {
                'n': false,
                'v': false,
                'd': false
            },
            vformPosGroup: {
                'v': false
            },
            signature: {}
        };

        this.collect = this.collect.bind(this);
        this.createDeclarations.bind(this);
        this.createSignature = this.createSignature.bind(this);
        this.handleCheckboxes = this.handleCheckboxes.bind(this);
        this.types2json = this.types2json.bind(this)
    }

    handleCheckboxes(event) {
        var group = event.target.name;
        let obj = this.state[group];
        obj[event.target.value] = event.target.checked; // true or false
        this.setState({group: obj});
    }

    collect(group) {
        var checkBoxGroup = this.state[group];
        var types = [];

        for(var key in checkBoxGroup) {
            if(checkBoxGroup[key] === true) {
                types.push(key)
            }
        }

        var output = this.types2json(types);
        return output;
    }

    types2json(types) {
        if(types === []) {
            return null;
        } else {
            var obj = {};
            types.forEach(function(x) {
                    obj[x] = null
                }
            )
            return obj;
        }
    }

    createSignature() {
        var pos = this.collect('posGroup');
        var agrs = this.collect('agrGroup');
        var cases = this.collect('caseGroup');
        var nums = this.collect('numGroup');
        var pers = this.collect('perGroup');
        var vforms = this.collect('vformGroup');

        var signature = {};

        var type = {};

        if (!this.isEmptyObject(pos)) {
            type['pos'] = pos;
        }

        if (!this.isEmptyObject(agrs)) {
            type['agr'] = agrs;
        }

        if (!this.isEmptyObject(cases)) {
            type['case'] = cases;
        }

        if (!this.isEmptyObject(nums)) {
            type['num'] = nums;
        }

        if (!this.isEmptyObject(pers)) {
            type['per'] = pers;
        }

        if (!this.isEmptyObject(vforms)) {
            type['vform'] = vforms;
        }

        if (pos === [] && agrs === [] && cases === [] && nums === [] &&  pers === [] &&  vforms === []) {
            signature['type'] = null;
        } else {
            signature['type'] = type;
        }

        type['list'] = {
            e_list: null,
            ne_list: null
        };
        type['sign'] = {
            word: null,
            phrase: null
        };
        type['cat'] = null;

        var casePos = this.collect('casePosGroup');

        var obj = {};
        for (var x in casePos) {
            if (casePos[x]) {
                obj[x] = null;
            }
        }

        var obj = {'case_pos': casePos};
        var obj2 = {...type['pos'], ...obj}
        type['pos'] = obj2;


        var persPos = this.collect('perPosGroup');

        var obj = {};
        for (var x in persPos) {
            if (persPos[x]) {
                obj[x] = null;
            }
        }

        var obj = {'per_pos': persPos};
        if(!this.isEmptyObject(persPos)) {
            var obj2 = {...type['pos'], ...obj}
            type['pos'] = obj2;
        }

        var numPos = this.collect('numPosGroup');

        var obj = {};
        for (var x in numPos) {
            if (numPos[x]) {
                obj[x] = null;
            }
        }

        var obj = {'num_pos': numPos};
        if(!this.isEmptyObject(numPos)) {
            var obj2 = {...type['pos'], ...obj}
            type['pos'] = obj2;
        }

        var agrPos = this.collect('agrPosGroup');

        var obj = {};
        for (var x in agrPos) {
            if (agrPos[x]) {
                obj[x] = null;
            }
        }

        var obj = {'agr_pos': agrPos};
        if(!this.isEmptyObject(agrPos)) {
            var obj2 = {...type['pos'], ...obj}
            type['pos'] = obj2;
        }


        var vformPos = this.collect('vformPosGroup');

        var obj = {};
        for (var x in vformPos) {
            if (vformPos[x]) {
                obj[x] = null;
            }
        }

        var obj = {'vform_pos': vformPos};
        if(!this.isEmptyObject(vformPos)) {
            var obj2 = {...type['pos'], ...obj}
            type['pos'] = obj2;
        }

        return signature;
    }

    createDeclarations() {
        var partsOfSpeech = [];

        var collect = this.collect;
        var props = this.props;

        var posGroup = ['casePosGroup', 'agrPosGroup', 'numPosGroup', 'perPosGroup', 'vformPosGroup'];

        var addIntermediateType = this.addIntermediateType;

        posGroup.forEach(function (group) {
            partsOfSpeech = collect(group);

            if (Object.keys(partsOfSpeech).length > 0 && group === 'vformPosGroup') {
                props.updateDeclarations('vform_pos');
            }
            if (Object.keys(partsOfSpeech).length > 1) {
                if (group === 'casePosGroup') {
                    props.updateDeclarations('case_pos');
                }
                if (group === 'agrPosGroup') {
                    props.updateDeclarations('agr_pos');
                }
                if (group === 'numPosGroup') {
                    props.updateDeclarations('num_pos');
                }
                if (group === 'perPosGroup') {
                    props.updateDeclarations('per_pos');
                }
            }
        })
        props.updateDeclarations('sign');
        props.updateDeclarations('phrase');
        props.updateDeclarations('cat');

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

    handleDone() {

        var newSignature = this.createSignature();
        this.props.updateSignature(newSignature);

        this.createDeclarations();



    }



  render() {

    return (
        <div className="w3-container">

            <div className="section" >Parts of Speech</div>

            <div><input type="checkbox" className="checkbox" value="n" name="posGroup"
                        checked={this.state.posGroup['n']}
                        onChange={this.handleCheckboxes}/><span style={{color: 'brown'}}> noun (n)</span>
        </div>
      <div><input type="checkbox" className="checkbox" value="v" name="posGroup"
                  checked={this.state.posGroup['v']}
                  onChange={this.handleCheckboxes}/><span style={{color: 'brown'}}> verb (v)</span></div>
      <div><input type="checkbox" className="checkbox" value="a" name="posGroup"
                  checked={this.state.posGroup['a']}
                  onChange={this.handleCheckboxes}/><span style={{color: 'brown'}}> adjective (a)</span></div>
      <div><input type="checkbox" className="checkbox" value="p" name="posGroup"
                  checked={this.state.posGroup['p']}
                  onChange={this.handleCheckboxes}/><span style={{color: 'brown'}}> preposition (p)</span></div>
      <div><input type="checkbox" className="checkbox" value="d" name="posGroup"
                  checked={this.state.posGroup['d']}
                  onChange={this.handleCheckboxes}/><span style={{color: 'brown'}}> determiner (d)</span></div>
      <div><input type="checkbox" className="checkbox" value="c" name="posGroup"
                  checked={this.state.posGroup['c']}
                  onChange={this.handleCheckboxes}/><span style={{color: 'brown'}}> complementizer (c)</span></div>
      <div><input type="checkbox" className="checkbox" value="adv" name="posGroup"
                  checked={this.state.posGroup['adv']}
                  onChange={this.handleCheckboxes}/><span style={{color: 'brown'}}> adverb (adv)</span></div>


            <div className="section" style={{marginTop:20}}>Part of Speech Features</div>

            <table className="featTable" >
                <thead>
                <tr  style={{fontVariant: 'small-caps'}}>
                    <td></td><th className="surveyTd" style={{align: "center"}} >case</th><th className="surveyTd">person</th><th className="surveyTd">number</th><th className="surveyTd">agreement</th><th className="surveyTd">verb form</th>
                </tr>
                </thead>
                <tbody>
                <tr className="paddingBottomTR">
                    <td style={{color:'brown'}}>feature of:
                    </td>
                    <td style={{color:'brown', textAlign: 'center'}}>
                        <input type="checkbox" className="checkbox" name="casePosGroup" value="n"
                               checked={this.state.casePosGroup['n']}
                               onChange={this.handleCheckboxes}/> n
                        <input type="checkbox" className="checkbox" name="casePosGroup" value="d" style={{marginLeft:"10px"}}
                               checked={this.state.casePosGroup['d']}
                               onChange={this.handleCheckboxes}/> d
                        <input type="checkbox" className="checkbox" name="casePosGroup" value="a" style={{marginLeft:"10px"}}
                               checked={this.state.casePosGroup['a']}
                               onChange={this.handleCheckboxes}/> a
                    </td>
                    <td style={{color:'brown'}}>
                        <input type="checkbox" className="checkbox" name="perPosGroup" value="n"
                               checked={this.state.perPosGroup['n']}
                               onChange={this.handleCheckboxes}/> n
                        <input type="checkbox" className="checkbox" name="perPosGroup" value="v" style={{marginLeft:"10px"}}
                               checked={this.state.perPosGroup['v']}
                               onChange={this.handleCheckboxes}/> v
                        <input type="checkbox" className="checkbox" name="perPosGroup" value="d" style={{marginLeft:"10px"}}
                               checked={this.state.perPosGroup['d']}
                               onChange={this.handleCheckboxes}/> d
                    </td>
                    <td style={{color:'brown'}}>
                        <input type="checkbox" className="checkbox" name="numPosGroup" value="n"
                               checked={this.state.numPosGroup['n']}
                               onChange={this.handleCheckboxes}/> n
                        <input type="checkbox" className="checkbox" name="numPosGroup" value="v" style={{marginLeft:"10px"}}
                               checked={this.state.numPosGroup['v']}
                               onChange={this.handleCheckboxes}/> v
                        <input type="checkbox" className="checkbox" name="numPosGroup" value="d" style={{marginLeft:"10px"}}
                               checked={this.state.numPosGroup['d']}
                               onChange={this.handleCheckboxes}/> d
                        <input type="checkbox" className="checkbox" name="numPosGroup" value="a" style={{marginLeft:"10px"}}
                               checked={this.state.numPosGroup['a']}
                               onChange={this.handleCheckboxes}/> a
                    </td>
                    <td style={{color:'brown'}}>
                        <input type="checkbox" className="checkbox" name="agrPosGroup" value="n"
                               checked={this.state.agrPosGroup['n']}
                               onChange={this.handleCheckboxes}/> n
                        <input type="checkbox" className="checkbox" name="agrPosGroup" value="v" style={{marginLeft:"10px"}}
                               checked={this.state.agrPosGroup['v']}
                               onChange={this.handleCheckboxes}/> v
                        <input type="checkbox" className="checkbox" name="agrPosGroup" value="d" style={{marginLeft:"10px"}}
                               checked={this.state.agrPosGroup['d']}
                               onChange={this.handleCheckboxes}/> d
                        <input type="checkbox" className="checkbox" name="agrPosGroup" value="a" style={{marginLeft:"10px"}}
                               checked={this.state.agrPosGroup['a']}
                               onChange={this.handleCheckboxes}/> a
                    </td>
                    <td style={{color:'brown'}}>
                        <input type="checkbox" className="checkbox" name="vformPosGroup" value="v"
                               checked={this.state.vformPosGroup['v']}
                               onChange={this.handleCheckboxes}/> v
                    </td>
                </tr>
                <tr className="surveyTr" style={{marginTop: '50px', color:'green'}}>
                    <td>possible values:</td>
                    <td><input type="checkbox" className="checkbox" value="nom" name="caseGroup"
                               checked={this.state.caseGroup['nom']}
                               onChange={this.handleCheckboxes} /> nom</td>
                    <td><input type="checkbox" className="checkbox" value="fst"name="perGroup"
                               checked={this.state.perGroup['fst']}
                               onChange={this.handleCheckboxes} /> first</td>
                    <td><input type="checkbox" className="checkbox" value="sg" name="numGroup"
                               checked={this.state.numGroup['sg']}
                               onChange={this.handleCheckboxes} /> singular</td>
                    <td><input type="checkbox" className="checkbox" value="1s" name="agrGroup"
                               checked={this.state.agrGroup['1s']}
                               onChange={this.handleCheckboxes}/> 1s</td>
                    <td><input type="checkbox" className="checkbox" value="finite" name="vformGroup"
                               checked={this.state.vformGroup['finite']}
                               onChange={this.handleCheckboxes} /> finite</td>
                </tr>
                <tr className="surveyTr" style={{color:'green'}}>
                    <td></td>
                    <td><input type="checkbox" className="checkbox" value="acc" name="caseGroup"
                               checked={this.state.caseGroup['acc']}
                               onChange={this.handleCheckboxes}/> acc</td>
                    <td><input type="checkbox" className="checkbox" value="sec" name="perGroup"
                               checked={this.state.perGroup['sec']}
                               onChange={this.handleCheckboxes} /> second</td>
                    <td><input type="checkbox" className="checkbox" value="pl" name="numGroup"
                               checked={this.state.numGroup['pl']}
                               onChange={this.handleCheckboxes} /> plural</td>
                    <td><input type="checkbox" className="checkbox" value="2s" name="agrGroup"
                               checked={this.state.agrGroup['2s']}
                               onChange={this.handleCheckboxes}/> 2s</td>
                    <td><input type="checkbox" className="checkbox" value="base" name="vformGroup"
                               checked={this.state.vformGroup['base']}
                               onChange={this.handleCheckboxes} /> base</td>
                </tr>
                <tr style={{color:'green'}}>
                    <td></td>
                    <td> </td>
                    <td><input type="checkbox" className="checkbox" value="thd" name="perGroup"
                               checked={this.state.perGroup['thd']}
                               onChange={this.handleCheckboxes} /> third</td>
                    <td> </td>
                    <td><input type="checkbox" className="checkbox" value="3s" name="agrGroup"
                               checked={this.state.agrGroup['3s']}
                               onChange={this.handleCheckboxes}/> 3s</td>
                    <td><input type="checkbox" className="checkbox" value="presp" name="vformGroup"
                               checked={this.state.vformGroup['presp']}
                               onChange={this.handleCheckboxes} /> presp</td>
                </tr>
                <tr style={{color:'green'}}>
                    <td></td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td><input type="checkbox" className="checkbox" value="1p" name="agrGroup"
                               checked={this.state.agrGroup['1p']}
                               onChange={this.handleCheckboxes}/> 1p</td>
                    <td><input type="checkbox" className="checkbox" value="pastp" name="vformGroup"
                               checked={this.state.vformGroup['pastp']}
                               onChange={this.handleCheckboxes} /> pastp</td>
                </tr>
                <tr style={{color:'green'}}>
                    <td></td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td><input type="checkbox" className="checkbox" value="2p" name="agrGroup"
                               checked={this.state.agrGroup['2p']}
                               onChange={this.handleCheckboxes}/> 2p</td>
                    <td> </td>
                    <td> </td>
                </tr>
                <tr className="paddingBottomTR" style={{color:'green'}}>
                    <td></td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td><input type="checkbox" className="checkbox" value="3p" name="agrGroup"
                               checked={this.state.agrGroup['3p']}
                               onChange={this.handleCheckboxes}/> 3p</td>
                    <td> </td>
                    <td> </td>
                </tr>
                <tr style={{fontVariant: 'small-caps'}}>
                    <td>feature name</td><td className="surveyTd" >case</td><td className="surveyTd">per</td><td className="surveyTd">num</td><td className="surveyTd">agr</td><td className="surveyTd">vform</td>
                </tr>

                </tbody>
            </table>
            <button onClick={this.handleDone.bind(this)}>Done</button>
        </div>
    );
  }
}



module.exports = Survey;
