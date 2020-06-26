"use strict";

var React = require('react');
var Bjs = require('../borjes');

class BorjesProtoLattice extends React.Component {

    constructor(props) {
        super(props);
    }

    update (el, sub) {
        var x = this.props.x;
        if (sub !== null && Object.keys(sub).length == 0) {
            sub = null;
        }
        x[el] = sub;
        this.props.update(x);
    }

    addEl (event) {
        if (event.keyCode === 13) {
            var el = this.newEl.value;
            var x = this.props.x;
            if (el.length > 0 && x[el] === undefined) {
                x[el] = null;
                this.props.update(x);
            }
        }
    }

    remEl (el) {
        var x = this.props.x;
        delete x[el];
        this.props.update(x);
    }

    cpEl (el) {
        this.props.opts.cpbuffer.v = {
            borjes: 'latticeel',
            l: this.props.name || this.props.opts.name,
            e: el
        };
    }




    render () {
        var x = this.props.x;
        var opts = this.props.opts;
        opts.cpbuffer = this.props.cpbuffer || opts.cpbuffer || {};
        opts.name = this.props.name || opts.name;
        var editSignature = this.props.editSignature;

        var matrix = this.props.matrix;
        var contStyle = {
            display: 'flex',
            flexDirection: 'column'
        };
        var rowStyle = {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        };

        if (!opts.child) {
            opts.child = true;
            opts.refs = {};
            return <span style={rowStyle}>
                <BorjesProtoLattice x={x} opts={opts} editSignature={editSignature} update={this.props.update} />
            </span>;
        }

        var i=0;
        return <div>
        <span style={contStyle} className="borjes borjes_latticeproto" >
            {Object.keys(x).map((k) => {
                var first = !opts.refs[k];
                opts.refs[k] = true;
                var after = first && (editSignature || x[k] !== null);

/*                {console.log('============================ BorjesProtoLattice begin ============================')};
                {console.log('============================ x ' + JSON.stringify(x, null, 4))}
                {console.log('============================ k ' + JSON.stringify(k, null, 4))}
                {console.log('============================ x[k] ' + JSON.stringify(x[k], null, 4))}
                {console.log('============================ opts.refs ' + JSON.stringify(opts.refs, null, 4))}
                {console.log('============================ opts.refs[k] ' + JSON.stringify(opts.refs[k], null, 4))}
                {console.log('============================ editSignature ' + editSignature)}
                {console.log('============================ this.props.editSignature ' + this.props.editSignature)}
                {console.log('============================ first ' + first)}
                {console.log('============================ editSignature || x[k] !== null ' + editSignature + ' ' + x[k] !== null)}
                {console.log('============================ after ' + after)}
                {console.log('============================ BorjesProtoLattice end ============================')};*/

                return <span key={k+(i++)} style={rowStyle}>
                    {editSignature ?<button className="small" onClick={this.remEl.bind(this, k)}>x</button>:null}
                    {/*{edit && opts.name?<button className="small" onClick={this.cpEl.bind(this, k)}>c</button>:null}*/}
                    <span className={first?"borjes_lpel_first":"borjes_lpel_ref"}>{k}</span>
                    {after?'—':null}
                    {after?<BorjesProtoLattice x={x[k] || {}} matrix={false} editSignature={editSignature} opts={opts}  update={this.update.bind(this, k)} />:null}
                </span>


            })}
            {editSignature ?<button className="small" >+</button>:null}
        </span>
        </div>

    }

}

module.exports = BorjesProtoLattice;

// {editSignature ?<span><input onKeyUp={this.addEl.bind(this)} ref={d=>this.newEl=d} type="text" /></span>:null}
