"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var Bjs = require('borjes');

var BorjesReact = require('borjes-react');
var Actions = require('../Actions');

var DirTree = require('./DirTree');
var TabPanel = require('./TabPanel');





require('styles/visual');

class App extends React.Component {

    constructor(props) {
        super(props);

        window.ProjectStore.on('changed', this.forceUpdate.bind(this));
    }

    render() {



        return (
            <div className="container" style={{marginTop:20}}>
                <h1>{Gert}</h1>

            </div>
        )

    }

}

module.exports = App;