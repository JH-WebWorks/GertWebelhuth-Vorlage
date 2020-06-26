"use strict";

var React = require('react');
var Actions = require('../Actions');


class TabPanel extends React.Component {

    constructor(props) {
    super(props);

        var selectedProject;

        this.state = {selectedProject};

    }

    componentDidMount () {
        window.ProjectStore.on('changed', this.forceUpdate.bind(this));
        window.TabStore.on('changed', this.forceUpdate.bind(this));
        window.UserStore.on('changed', this.forceUpdate.bind(this));
    }

    handleSelectChange(user, event) {
        Actions.project.open(user, event.target.value);

    }

    render () {

        var me = window.UserStore.getUser();

        var projects = window.ProjectStore.getAll();
        var me = window.UserStore.getUser();
        var ps;

        projects ? ps = projects[me] : ps = null;

        var myProjectNames;

        ps ? myProjectNames = Object.keys(ps).map(p =>
            <option key={p} value={p}>{p}</option>): myProjectNames = null;

        var conts = [0, 1, 2].map(panel => {
            var tabs = window.TabStore.getTabs(panel);
            if (tabs.length==0) { return undefined; }
            return tabs.map(tab =>
                (<div key={'cont'+tab.id}
                      style={{display:(tab.selected?'':'none')}} >
                    {tab.node}
                </div>)
            );
        });


        return (
            <main className="container" style={{padding:20}}>
                {conts[1]?conts[1]:
                    <div><h1>Please open a grammar:</h1>
                <select style={{backgroundColor:"orange", color:"blue"}}
                        value={this.state.selectedProject}
                        onChange={this.handleSelectChange.bind(this,me)}>
                    {myProjectNames}
                </select>
            </div>}
            </main>
        );
    }

};

module.exports = TabPanel;
