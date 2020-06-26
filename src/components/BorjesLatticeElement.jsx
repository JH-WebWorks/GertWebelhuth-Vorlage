"use strict";

var React = require('react');
var Bjs = require('../borjes');

var Lattice = Bjs.types.Lattice;


var util = require('util');

class BorjesLatticeElement extends React.Component {

    constructor (props) {
        super()
    }

    change (e) {
        var x = this.props.x;
        var decl = this.props.decl;
        var type = e.target.value;
        var editForms = this.props.globalProps.editForms;
        var newVal = editForms[type];
/*        console.log('%c============================ BorjesLatticeElement type: ' + type, 'color:green');
        console.log('============================  BorjesLatticeElement editForms[type]; ' + JSON.stringify(editForms[type]));
        console.log('============================ BorjesLatticeElement editForms ' +JSON.stringify(editForms, null, 4));*/

        if(decl === true && (newVal.borjes === "tfstruct" || newVal.borjes === "fstruct")) {
            newVal = newVal.type;
        }

/*        console.log('============================ BorjesLatticeElement decl; ' + decl);
        console.log('============================ BorjesLatticeElement decl newVal: ' + decl + '\n' + JSON.stringify(newVal, null, 4));*/



        this.props.update(newVal);
    }

    removeDuplicates(arr) {
        let unique_array = []
        for (let i = 0; i < arr.length; i++) {
            if (unique_array.indexOf(arr[i]) == -1) {
                unique_array.push(arr[i])
            }
        }
        return unique_array;
    }


    render () {
        var x = this.props.x;
        var subtypes = this.props.globalProps.subtypes;
        var currentSubtypes = subtypes[x.type];
        currentSubtypes = this.removeDuplicates(currentSubtypes);

/*        console.log('%c============================ BorjesLatticeElement render begin ============================', 'color:red');
        console.log('============================ x: ' + JSON.stringify(x, null, 4));
        console.log('============================ x.type: ' + JSON.stringify(x.type, null, 4));
        //console.log('============================ subtypes: ' + JSON.stringify(subtypes, null, 4));
        console.log('============================ currentSubtypes: ' + JSON.stringify(currentSubtypes, null, 4));

        console.log('============================ this.props.informative: ' + this.props.informative);

        console.log('============================ BorjesLatticeElement render end ============================\n\n');*/



/*        if(this.props.role === 'fstructValue' && this.props.decl === true && x.type !== 'type') {
            return <span className="borjes_latticeel" style={{'color':'red', 'fontStyle':'italic'}}>{x.type}</span>;
        }*/



if(this.props.informative || this.props.decl) {
    var styleClass = 'borjes_latticeel';
} else {
    styleClass = 'borjes_latticeel_pale';
}

if (this.props.edit && currentSubtypes.length > 0) {
             currentSubtypes.sort().unshift(x.type);
            return (
               <select
                           className="borjes_latticeel"
                           value={x.type}
                           onChange={this.change.bind(this)}>
                {currentSubtypes.map(function(name, i) {
                    return <option key={name + '_' + i} value={name}>{name}</option>;
                })}
            </select>
            )
        } else {
            return (
           <span className={styleClass}>{x.type}</span>
            )
        }
    }

}

module.exports = BorjesLatticeElement;








