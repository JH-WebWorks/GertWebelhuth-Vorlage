"use strict";

var React = require('react');
var BorjesComponent = require('./BorjesComponent');

var branch= '<svg xmlns="http://www.w3.org/2000/svg"'
           +' xmlns:xlink="http://www.w3.org/1999/xlink"'
           +' width="100%" height="100%"'
           +' preserveAspectRatio="none"'
           +' viewBox="0 0 100 100">';
var straightN = branch
           +'  <line x1="50" y1="100" x2="50" y2="0" style="stroke:#000000;" vector-effect="non-scaling-stroke"/>'
           +'</svg>';
var leftN = branch
           +'  <line x1="0" y1="100" x2="100" y2="0" style="stroke:#000000;" vector-effect="non-scaling-stroke"/>'
           +'</svg>';
var rightN = branch
           +'  <line x1="100" y1="100" x2="0" y2="0" style="stroke:#000000;" vector-effect="non-scaling-stroke"/>'
           +'</svg>';
var branchN = {
    'c': straightN,
    'l': leftN,
    'r': rightN
};

class BorjesTree extends React.Component {

    constructor (props) {
        super(props);
        var s = true;
        if (props.beginExpanded !== undefined) {
            s = props.beginExpanded;
        } else if (this.props.opts && this.props.opts.hide_more && this.props.x.node && this.props.x.node.borjes === 'tfstruct') {
            s = false;
        }
        this.dom = {};
        this.state = {
            branches: this.props.x.children.map(() => 'l'),
            shown: this.props.x.children.map(() => s)
        };
    }

    update (who, val) {
        var x = this.props.x;
        if (who == -1) {
            x.node = val;
        } else {
            x.children[who] = val;
        }
        this.props.update(x);
    }

    toggleChild (i) {
        var s = this.state.shown;
        s[i] = !s[i];
        this.setState({shown: s});
        this.forceUpdate();
    }

    render () {
        var x = this.props.x;
        var opts = this.props.opts;
        var ub = this.updateBranches.bind(this);

        var branchHeight = this.props.opts.branchHeight || "1em";
        var containerStyle = {
            display: 'inline-flex',
            flexDirection: 'column'
        };
        var nodeStyle = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
        };
        var branchesStyle = {
            position: 'relative',
            height: branchHeight
        };
        var branchStyle = {
            cursor: 'pointer',
            position: 'absolute',
            height: branchHeight,
            top: 0
        };
        var childrenStyle = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            margin: 2
        };

        function copy_opts(child) {
            var r = {};
            for (var k in opts) {
                r[k] = opts[k];
            }
            if (child.borjes_bound) {
                r.world = child.borjes_bound;
            }
            return r;
        }

        return <span className="borjes" style={containerStyle}>
            <div ref={d=>this.dom.nodeWrapper=d} style={nodeStyle}>
                <BorjesComponent x={x.node} refresh={ub} update={this.update.bind(this, -1)} opts={copy_opts(x.node)} />
            </div>
            <div style={branchesStyle}>
                {x.children.map((c, i) => {
                    var n = branchN[this.state.branches[i]];
                    return <span onClick={this.toggleChild.bind(this, i)} style={branchStyle} ref={d=>this.dom["branch"+i]=d} key={"branch"+i} dangerouslySetInnerHTML={{__html:n}} />;
                })}
            </div>
            <div style={childrenStyle}>
                {x.children.map((c, i) => <span ref={d=>this.dom["child"+i]=d} key={"child"+i}>{this.state.shown[i]
                        ?<BorjesComponent x={c} refresh={ub} update={this.update.bind(this, i)} opts={copy_opts(c)} />
                        :<button onClick={this.toggleChild.bind(this,i)}>+</button>}
                </span>)}
            </div>
        </span>;
    }

    componentDidMount () {
        this.updateBranches(true);
    }

    componentDidUpdate () {
        this.updateBranches();
    }

    updateBranches (first) {
        var rerender = false;
        var state = this.state;
        var cn = this.props.x.children;
        var nw = this.dom.nodeWrapper;
        if (!nw) return;
        var half = nw.clientWidth/2;
        var start = nw.offsetLeft;
        for (var i=0; i<cn.length; i++) {
            var d = this.dom["branch"+i];
            var child = this.dom["child"+i];
            if (!d || !child) continue;
            var left = (child.offsetLeft-start+child.clientWidth/2);
            var right = half-left;
            if (left>half-2 && left<half+2) {
                d.style.width = '10px';
                d.style.left = (half-5)+'px';
                if (state.branches[i] != 'c') {
                    state.branches[i] = 'c';
                    rerender = true;
                }
            } else if (left>half) {
                d.style.width = (left-half)+'px';
                d.style.left = half+'px';
                if (state.branches[i] != 'r') {
                    state.branches[i] = 'r';
                    rerender = true;
                }
            } else {
                d.style.width = (half-left)+'px';
                d.style.left = left+'px';
                if (state.branches[i] != 'l') {
                    state.branches[i] = 'l';
                    rerender = true;
                }
            }
        }
        if (rerender) {
            this.setState(state);
        }
        if (!first) {
            var refresh = this.props.refresh;
            if (refresh) { refresh(); }
        }
    }

}

module.exports = BorjesTree;
