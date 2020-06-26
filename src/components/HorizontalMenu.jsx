"use strict";

require("../styles/horizontalMenu");

var React = require('react');
var Bjs = require('borjes');

var Lattice = Bjs.types.Lattice;


var util = require('util');

class HorizontalMenu extends React.Component {

    constructor(props) {
        super()

        this.state = {
            showSubmenu: false
        }

        this.clicked = this.clicked.bind(this)

    }

    OpenSubmenu() {
        this.setState({ showSubmenu: true });

    }

    clicked(name) {
        alert(name + ' clicked')
    }

/*    change (e) {
        var x = this.props.x;
        var type = e.target.value;
        var editForms = this.props.editForms;

        var newVal = editForms[type];
        this.props.update(newVal);
    }*/

    render() {
        var x = this.props.x;
        var subtypes = this.props.subtypes;
        var showSubmenu = this.state.showSubmenu;

            if (true) {
                return (
            <ul className="hm_ul">
                <li onClick={this.OpenSubmenu.bind(this)}><a>{x.type}</a></li>
                    <ul style={{display: showSubmenu ? 'block' : 'none'}}>
                        {subtypes[x.type].sort().map(function(name) {
                            return <li key={name} onClick={this.clicked(this, name)}><a>{name}</a></li>;
                        })
                        }
                    </ul>
            </ul>

            )
        } else {
                return <span className="borjes_latticeel" style={{'color':'red', 'fontStyle':'italic'}}>{x.e}</span>;
            }
        }
}


module.exports = HorizontalMenu;