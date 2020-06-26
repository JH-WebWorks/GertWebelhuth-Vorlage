import React from "react";
import ReactDOM from "react-dom";
import Bjs from "borjes";

var B = Bjs.types;

import { Component as BorjesComponent,
    ProtoLattice as BorjesProtoLattice
} from "../dist/main";

var proto = {
    symbol: {
        word: {
            noun: null,
            verb: null
        },
        phrase: null
    },
    case: {
        nom: null,
        acc: null,
    },
    case_verb: {
        case: null,
        verb: null
    }
};
var L = B.Lattice.fromProto(proto);
var noun = B.Lattice.element(L, 'noun');
var verb = B.Lattice.element(L, 'verb');
var phrase = B.Lattice.element(L, 'verb');
var disj = B.Disjunct(B.Lattice.element(L, 'nom'), B.Lattice.element(L, 'acc'));
var W = B.World();
var Agr = B.Variable(W, B.FStruct({ gender: B.Literal('masc'), person: B.Literal('3sg') }));
var list = B.List(B.Literal('John'), B.List(B.Literal('loves'), B.List(B.Literal('Mary'))));
var John = B.TFS(noun, { phon: list, cat: disj, head: B.Literal('John'), agr: Agr });
var loves = B.TFS(verb, { cat: 'VP', head: B.Literal('loves') });
var list2 = B.List(B.Literal('John'), B.Variable(W, B.List(B.Literal('loves'), B.List(B.Literal('Mary')))));
var sentence = B.FStruct({ phon: list2, cat: 'S', head: 'loves', head_dtr: Agr, nonh_dtr: Agr });

var tree = Bjs.Tree(sentence, [Bjs.Tree(John, [B.copy(John), loves, B.copy(John)]), Bjs.Tree(B.copy(loves), Bjs.Tree(B.copy(loves)))]);
B.World.bind(W, tree);

var editable = false;
var cpbuffer = {};

var current = tree;

function updateSig (p) {
    L = B.Lattice.fromProto(p);
    render();
}

function render (val) {
    if (val!==undefined) {
        current = val;
    }
    ReactDOM.render(<BorjesComponent x={current} update={render} cpbuffer={cpbuffer} opts={{editable, signature:L, branchHeight: 30}} />, document.getElementById('area'));
    ReactDOM.render(<BorjesProtoLattice name={L.name} x={proto} update={updateSig} cpbuffer={cpbuffer} opts={{editable}} />, document.getElementById('latt'));
}

render();

var editB = document.getElementById('toggleEdit');
editB.onclick = function () {
    editable = !editable;
    render();
}
