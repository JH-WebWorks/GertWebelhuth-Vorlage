"use strict";

/* TODO
 *
 * Within a list, when a variable is followed by the long menu, the long menu doesn't work.
 *
 * */

require("../styles/visual");

var React = require("react");
var Bjs = require("../borjes");
var Anything = Bjs.types.Anything;
var FStruct = Bjs.types.FStruct;
var Lattice = Bjs.types.Lattice;
var Row = require("./Row");
var Rule = Bjs.Rule;
var TFS = Bjs.types.TFS;
var Type = Bjs.types.Type;
var Variable = Bjs.types.Variable;
var World = Bjs.types.World;

var BorjesProtoLattice = require("./BorjesProtoLattice");

/*var BorjesComponents = require("./BorjesComponents");
var AbbrEditor = require("./visual/AbbrEditor");
var BorjesComponent = BorjesComponents.BorjesComponent;
var BorjesList = BorjesComponents.BorjesList;
*/

var Declaration = require("../borjes/src/declaration");

var RuleEditor = require("./visual/RuleEditor");
var PrincipleEditor = require("./visual/PrincipleEditor");
var LexiconEditor = require("./visual/LexiconEditor");
var LexRuleEditor = require("./visual/LexRuleEditor");
var DeclarationEditor = require("./visual/DeclarationEditor");

var CollectInfo = require("./CollectInfo");
var collectAllTypes = CollectInfo.collectAllTypes;
var collectLocalFeatures = CollectInfo.collectLocalFeatures;
var collectSupertypes = CollectInfo.collectSupertypes;
var collectSubtypes = CollectInfo.collectSubtypes;
var collectAllFeatures = CollectInfo.collectAllFeatures;
var createEditForms = CollectInfo.createEditForms;
var isEmptyObject = CollectInfo.isEmptyObject;

var Survey = require("./Survey");

var util = require("util");

class VisualEditor extends React.Component {
  constructor(props) {
    super(props);
    var file = window.FileStore.getFile(this.props.filename);
    var doc = file.doc;
    var protosig = doc.at("global").at("signature").get();
    var signature = Lattice.fromProto(protosig, "signature");

    var rules, pples, lexicon, global, lexRules, abbreviations, declarations;
    try {
      rules = doc.at("rules").get();
      pples = doc.at("principles").get();
      lexicon = doc.at("lexicon").get();
      lexRules = doc.at("lexRules").get();
      abbreviations = doc.at("abbreviations").get();
      declarations = doc.at("declarations").get();
      global = doc.at("global").get();
    } catch (e) {}
    if (
      !rules ||
      !lexicon ||
      !lexRules ||
      !abbreviations ||
      !declarations ||
      !global ||
      !pples
    ) {
      rules = rules || [];
      pples = pples || [];
      lexicon = lexicon || [];
      lexRules = lexRules || [];
      abbreviations = abbreviations || [];
      declarations = declarations || [];
      global = global || { signature: {} };

      doc.set({
        rules,
        principles: pples,
        lexicon,
        lexRules,
        abbreviations,
        declarations,
        global,
      });
    }

    doc.on("change", () => this.updateGlobalProps());
    doc.on("change", () => this.forceUpdate());

    var localFeatures;

    this.state = {
      cpbuffer: {},
      editSignature: false,
      file,
      globalProps: {},
      queryNumDtrs: false,
      showAbbrs: false,
      showDecls: false,
      showLexicalRules: false,
      showPrinciples: false,
      showRules: false,
      showSignature: false,
      showSurvey: false,
      showWords: false,
      workbenchIds: [],
      workbenchItems: [],
    };

    this.deleteWorkbenchItem = this.deleteWorkbenchItem.bind(this);
    this.hideSurvey = this.hideSurvey.bind(this);
    this.hideSignature = this.hideSignature.bind(this);
    this.createLatticeel = this.createLatticeel.bind(this);
    this.updateGlobalProps = this.updateGlobalProps.bind(this);
  }

  componentDidMount() {
    var doc = this.state.file.doc;
    var protosig = doc.at("global").at("signature").get();

    globalProps = {};

    var localFeatures = collectLocalFeatures(doc);
    var allTypes = collectAllTypes(protosig);
    var supertypes = collectSupertypes(protosig, [], localFeatures, {});
    var subtypes = collectSubtypes(protosig);
    var allFeatures = collectAllFeatures(localFeatures, supertypes);
    var editForms = createEditForms(allTypes, allFeatures);

    var globalProps = {
      localFeatures: localFeatures,
      allTypes: allTypes,
      supertypes: supertypes,
      subtypes: subtypes,
      allFeatures: allFeatures,
      editForms: editForms,
      cpbuffer: this.state.cpbuffer,
      file: doc,
    };
    this.setState({ globalProps });
  }

  updateGlobalProps() {
    var doc = this.state.file.doc;
    var protosig = doc.at("global").at("signature").get();

    var localFeatures = collectLocalFeatures(doc);
    var allTypes = collectAllTypes(protosig);
    var supertypes = collectSupertypes(protosig, [], localFeatures, {});
    var subtypes = collectSubtypes(protosig);
    var allFeatures = collectAllFeatures(localFeatures, supertypes);
    var editForms = createEditForms(allTypes, allFeatures);

    //console.log('============================ allFeatures ' +JSON.stringify(allFeatures, null, 4));

    /*      console.log('============================ allTypes.length ' + allTypes.length);
              console.log('============================ editForms ' +Object.keys(editForms).length);
              console.log('====================================================================================');
              console.log('====================================================================================');
              console.log('====================================================================================');
              console.log('============================ editForms ' +JSON.stringify(editForms, null, 4));*/

    var globalProps = {
      localFeatures: localFeatures,
      allTypes: allTypes,
      supertypes: supertypes,
      subtypes: subtypes,
      allFeatures: allFeatures,
      editForms: editForms,
      cpbuffer: this.state.cpbuffer,
      file: doc,
    };
    this.setState({ globalProps });
  }

  add(path, ref) {
    var doc = this.state.file.doc;
    doc.at(path).push(null);
    var i = doc.at(path).get().length - 1;
    switch (path) {
      case "lexicon":
        this.addWordToWorkbenchItems(i);
        break;
      case "principles":
        this.addPrincipleToWorkbenchItems(i);
        break;
      case "lexRules":
        this.addLexicalRuleToWorkbenchItems(i);
        break;
      case "abbreviations":
        this.addAbbreviationToWorkbenchItems(i);
        break;
      case "declarations":
        this.addDeclarationToWorkbenchItems(i);
        break;
    }
  }

  addRule(numDtrs) {
    var doc = this.state.file.doc;
    var protosig = doc.at("global").at("signature").get();
    var s = Lattice.fromProto(protosig, "signature");
    var mo = FStruct();
    mo = TFS(Bjs.types.Lattice.element(s, "type"));
    var w = World();
    var rule;
    if (numDtrs == 2) {
      rule = Rule(mo, [Variable(w, Anything), Variable(w, Anything)]);
    } else {
      rule = Rule(mo, [
        Variable(w, Anything),
        Variable(w, Anything),
        Variable(w, Anything),
      ]);
    }
    World.bind(w, mo);
    doc.at("rules").push(rule);
    var queryNumDtrs = this.state.queryNumDtrs;
    this.setState({ queryNumDtrs: false });
    var i = doc.at("rules").get().length - 1;
    this.addRuleToWorkbenchItems(i);
    //setTimeout(() => this.refs['rowrule' + i].open(), 0);
  }

  queryNumDtrsF() {
    this.setState({ queryNumDtrs: true });
  }

  delete(path, i) {
    var doc = this.state.file.doc;
    doc.at(path).at(i).remove();
    var myEditorId = path + i;
    this.deleteWorkbenchItem(myEditorId);
  }

  toggleEditSignature() {
    var editSignature = this.state.editSignature;
    var showSignature = true;
    editSignature = !editSignature;
    this.setState({ showSignature, editSignature });
  }

  updateSignature(x) {
    var doc = this.state.file.doc;
    doc.at("global").at("signature").set(x);
    this.forceUpdate();
  }

  updateDeclarations(x) {
    var doc = this.state.file.doc;

    var decls = doc.at("declarations").get();

    var decl = {};

    if (x === "case_pos") {
      decl = { case: { borjes: "type", type: "case" } };
    }
    if (x === "agr_pos") {
      decl = { agr: { borjes: "type", type: "agr" } };
    }
    if (x === "num_pos") {
      decl = { num: { borjes: "type", type: "num" } };
    }
    if (x === "per_pos") {
      decl = { per: { borjes: "type", type: "per" } };
    }
    if (x === "vform_pos") {
      decl = { vform: { borjes: "type", type: "vform" } };
    }
    if (x === "sign") {
      decl = { cat: { borjes: "type", type: "cat" } };
    }
    if (x === "phrase") {
      decl = {
        hd_dtr: { borjes: "type", type: "sign" },
        dtrs: { borjes: "type", type: "list" },
      };
    }
    if (x === "cat") {
      decl = {
        pos: { borjes: "type", type: "pos" },
        spr: { borjes: "type", type: "list" },
        comps: { borjes: "type", type: "list" },
      };
    }

    var fs = TFS(Type(x), decl);
    decls.push(Declaration(fs, x));
    doc.at("declarations").set(decls);
  }

  deleteF() {
    var fstruc = this.state.fstruc;
    var feature = this.state.selectedElement;
    var doc = this.state.doc;
    FStruct.unset(fstruc, feature);
    var oldworld = doc.at("a", "borjes_bound").get() || World();
    if (!Bjs.types.eq(fstruc, Bjs.types.Anything)) {
      World.bind(oldworld, fstruc);
    }
    doc.set(fstruc);
  }

  update(who, x) {
    var doc = this.props.doc;
    var oldworld = doc.at(who, "borjes_bound").get() || World();
    if (!Bjs.types.eq(x, Bjs.types.Anything)) {
      World.bind(oldworld, x);
    }
    doc.at(who).set(x);
  }

  toggleWords() {
    this.hideSignature();
    this.hideSurvey();
    var showWords = this.state.showWords;
    showWords = !showWords;
    this.setState({ showWords });
  }

  toggleLexicalRules() {
    this.hideSignature();
    this.hideSurvey();
    var showLexicalRules = this.state.showLexicalRules;
    showLexicalRules = !showLexicalRules;
    this.setState({ showLexicalRules });
  }

  toggleRules() {
    this.hideSignature();
    this.hideSurvey();
    var showRules = this.state.showRules;
    showRules = !showRules;
    this.setState({ showRules });
  }

  togglePrinciples() {
    this.hideSignature();
    this.hideSurvey();
    var showPrinciples = this.state.showPrinciples;
    showPrinciples = !showPrinciples;
    this.setState({ showPrinciples });
  }

  toggleAbbrs() {
    this.hideSignature();
    this.hideSurvey();
    var showAbbrs = this.state.showAbbrs;
    showAbbrs = !showAbbrs;
    this.setState({ showAbbrs });
  }

  toggleDecls() {
    this.hideSignature();
    this.hideSurvey();
    var showDecls = this.state.showDecls;
    showDecls = !showDecls;
    this.setState({ showDecls });
  }

  toggleSignature() {
    this.hideSurvey();
    var showSignature = this.state.showSignature;
    showSignature = !showSignature;
    this.setState({ showSignature });
  }

  toggleSurvey() {
    this.hideSignature();
    var showSurvey = this.state.showSurvey;
    showSurvey = !showSurvey;
    this.setState({ showSurvey });
  }

  hideSignature() {
    var showSignature = this.state.showSignature;
    showSignature = false;
    this.setState({ showSignature });
  }

  hideSurvey() {
    var showSurvey = this.state.showSurvey;
    showSurvey = false;
    this.setState({ showSurvey });
  }

  addWordToWorkbenchItems(i) {
    var doc = this.state.file.doc;
    var lexicon = doc.at("lexicon");
    var workbenchItems = this.state.workbenchItems;
    var workbenchIds = this.state.workbenchIds;
    if (workbenchIds.includes("lex" + i)) {
      alert("This item is already on the workbench!");
      return;
    }
    var newWordEditor = (
      <LexiconEditor
        key={"lex" + i}
        doc={lexicon.at(i)}
        close={this.deleteWorkbenchItem.bind(this)}
        editorId={"lex" + i}
        globalProps={this.state.globalProps}
        rm={this.delete.bind(this, "lexicon", i)}
      />
    );
    workbenchItems.push(newWordEditor);
    workbenchIds.push("lex" + i);
    this.setState({ workbenchItems, workbenchIds });
  }

  addLexicalRuleToWorkbenchItems(i) {
    var doc = this.state.file.doc;
    var lexRules = doc.at("lexRules");
    var workbenchItems = this.state.workbenchItems;
    var newLexRuleEditor = (
      <LexRuleEditor
        key={"lexRule" + i}
        doc={lexRules.at(i)}
        close={this.deleteWorkbenchItem.bind(this)}
        editorId={"lexRule" + i}
        globalProps={this.state.globalProps}
        rm={this.delete.bind(this, "lexRules", i)}
      />
    );
    workbenchItems.push(newLexRuleEditor);
    this.setState({ workbenchItems });
  }

  addRuleToWorkbenchItems(i) {
    var doc = this.state.file.doc;
    var rules = doc.at("rules");
    var workbenchItems = this.state.workbenchItems;
    var newRuleEditor = (
      <RuleEditor
        key={"rule" + i}
        doc={rules.at(i)}
        close={this.deleteWorkbenchItem.bind(this)}
        editorId={"rule" + i}
        globalProps={this.state.globalProps}
        rm={this.delete.bind(this, "rules", i)}
      />
    );
    workbenchItems.push(newRuleEditor);
    this.setState({ workbenchItems });
  }

  addAbbreviationToWorkbenchItems(i) {
    var doc = this.state.file.doc;
    var abbreviations = doc.at("abbreviations");
    var workbenchItems = this.state.workbenchItems;
    var newAbbrEditor = (
      <AbbrEditor
        key={"abbreviation" + i}
        doc={abbreviations.at(i)}
        close={this.deleteWorkbenchItem.bind(this)}
        editorId={"abbreviation" + i}
        globalProps={this.state.globalProps}
        rm={this.delete.bind(this, "abbreviations", i)}
      />
    );
    workbenchItems.push(newAbbrEditor);
    this.setState({ workbenchItems });
  }

  addDeclarationToWorkbenchItems(i) {
    var doc = this.state.file.doc;
    var decls = doc.at("declarations");
    var workbenchItems = this.state.workbenchItems;
    var newDeclarationEditor = (
      <DeclarationEditor
        key={"decl" + i}
        doc={decls.at(i)}
        close={this.deleteWorkbenchItem.bind(this)}
        editorId={"decl" + i}
        globalProps={this.state.globalProps}
        rm={this.delete.bind(this, "declarations", i)}
      />
    );
    workbenchItems.push(newDeclarationEditor);
    this.setState({ workbenchItems });
  }

  addPrincipleToWorkbenchItems(i) {
    var doc = this.state.file.doc;
    var pples = doc.at("principles");
    var workbenchItems = this.state.workbenchItems;
    var newPrincipleEditor = (
      <PrincipleEditor
        key={"pple" + i}
        doc={pples.at(i)}
        close={this.deleteWorkbenchItem.bind(this)}
        editorId={"pple" + i}
        globalProps={this.state.globalProps}
        rm={this.delete.bind(this, "principles", i)}
      />
    );
    workbenchItems.push(newPrincipleEditor);
    this.setState({ workbenchItems });
  }

  deleteWorkbenchItem(myEditorId) {
    var workbenchItems = this.state.workbenchItems;
    var workbenchIds = this.state.workbenchIds;
    var index = workbenchIds.indexOf(myEditorId);
    workbenchItems.splice(index, 1);
    workbenchIds.splice(index, 1);
    this.setState({ workbenchItems, workbenchIds });
  }

  traverse(obj, fn) {
    for (var key in obj) {
      fn.apply(this, [key, obj[key]]);
      if (obj[key] !== null && typeof obj[key] == "object") {
        this.traverse(obj[key], fn);
      }
    }
  }

  createLatticeel(protosig, type) {
    if (isEmptyObject(protosig)) return;

    var protosigOfType = null;

    this.traverse(protosig, function (key, val) {
      if (key === type) {
        protosigOfType = val;
      }
    });
    var latticeOfType = Lattice.fromProto(protosigOfType, type);
    var latticeel = Bjs.types.Lattice.element(latticeOfType, "nom");

    return latticeel;
  }

  render() {
    var doc = this.state.file.doc;
    var protosig = doc.at("global").at("signature").get();
    var rules = doc.at("rules");
    var pples = doc.at("principles");
    var lexicon = doc.at("lexicon");
    var lexRules = doc.at("lexRules");
    var abbreviations = doc.at("abbreviations");
    var decls = doc.at("declarations");

    var showWords = this.state.showWords;
    var showRules = this.state.showRules;
    var showLexicalRules = this.state.showLexicalRules;
    var showAbbrs = this.state.showAbbrs;
    var showPrinciples = this.state.showPrinciples;
    var showDecls = this.state.showDecls;

    var showSurvey = this.state.showSurvey;

    var displayBlock = {
      display: "block",
    };

    var displayNone = {
      display: "none",
    };

    var words = lexicon.get();
    var wordDivs = [];
    var i;
    for (i = 0; i < words.length; i++) {
      if (words[i] != null && words[i].name.length > 0) {
        wordDivs.push(
          <div
            className="sidenav_span"
            key={"word" + i}
            onClick={this.addWordToWorkbenchItems.bind(this, i)}
          >
            {words[i].name}
          </div>
        );
      }
    }

    var lexicalRules = lexRules.get();
    var lexRuleDivs = [];
    var j;
    for (j = 0; j < lexicalRules.length; j++) {
      if (lexicalRules[j] != null && lexicalRules[j].name.length > 0) {
        lexRuleDivs.push(
          <div
            className="sidenav_span"
            key={"lexicalRule" + j}
            onClick={this.addLexicalRuleToWorkbenchItems.bind(this, j)}
          >
            {lexicalRules[j].name}
          </div>
        );
      }
    }

    var psRules = rules.get();
    var ruleDivs = [];
    var k;
    for (k = 0; k < psRules.length; k++) {
      if (psRules[k] != null && psRules[k].name.length > 0) {
        ruleDivs.push(
          <div
            className="sidenav_span"
            key={"psRule" + k}
            onClick={this.addRuleToWorkbenchItems.bind(this, k)}
          >
            {psRules[k].name}
          </div>
        );
      }
    }

    var principles = pples.get();
    var ppleDivs = [];
    var m;
    for (m = 0; m < principles.length; m++) {
      if (principles[m] != null && principles[m].name.length > 0) {
        ppleDivs.push(
          <div
            className="sidenav_span"
            key={"principle" + m}
            onClick={this.addPrincipleToWorkbenchItems.bind(this, m)}
          >
            {principles[m].name}
          </div>
        );
      }
    }

    var abbreviations = abbreviations.get();
    var abbreviationsDivs = [];
    var n;
    for (n = 0; n < abbreviations.length; n++) {
      if (abbreviations[n] != null && abbreviations[n].name.length > 0) {
        abbreviationsDivs.push(
          <div
            className="sidenav_span"
            key={"abbreviation" + n}
            onClick={this.addAbbreviationToWorkbenchItems.bind(this, n)}
          >
            {abbreviations[n].name}
          </div>
        );
      }
    }

    var declarations = decls.get();
    var declsDivs = [];
    var p;
    for (p = 0; p < declarations.length; p++) {
      if (declarations[p] != null && declarations[p].name.length > 0) {
        declsDivs.push(
          <div
            className="sidenav_span"
            key={"declaration" + p}
            onClick={this.addDeclarationToWorkbenchItems.bind(this, p)}
          >
            {declarations[p].name}
          </div>
        );
      }
    }

    var workbenchItems = this.state.workbenchItems;
    var queryNumDtrs = this.state.queryNumDtrs;

    return (
      <div>
        <div className="w3-row">
          <div className="w3-col w3-container" style={{ width: 200 }}>
            <div className="sidenav">
              <span
                className="sidenav_first_level"
                onClick={this.toggleWords.bind(this)}
                onDoubleClick={this.add.bind(this, "lexicon", "lex")}
                style={{ marginTop: 100 }}
              >
                Word Classes
              </span>
              <div id="wordsDiv" style={showWords ? displayBlock : displayNone}>
                {wordDivs}
              </div>

              <span
                className="sidenav_first_level"
                onClick={this.toggleAbbrs.bind(this)}
                onDoubleClick={this.add.bind(
                  this,
                  "abbreviations",
                  "abbreviation"
                )}
              >
                Abbreviations
              </span>
              <div id="abbsDiv" style={showAbbrs ? displayBlock : displayNone}>
                {abbreviationsDivs}
              </div>

              <span
                className="sidenav_first_level"
                onClick={this.toggleLexicalRules.bind(this)}
                onDoubleClick={this.add.bind(this, "lexRules", "lexRule")}
              >
                Lexical Rules
              </span>
              <div
                id="lexicalRulesDiv"
                style={showLexicalRules ? displayBlock : displayNone}
              >
                {lexRuleDivs}
              </div>

              <div>
                {queryNumDtrs === false ? (
                  <span
                    className="sidenav_first_level"
                    onClick={this.toggleRules.bind(this)}
                    onDoubleClick={this.queryNumDtrsF.bind(this)}
                  >
                    Phrases
                  </span>
                ) : (
                  <span className="sidenav_first_level">
                    Dtrs:{" "}
                    <button
                      onClick={this.addRule.bind(this, 2)}
                      style={{ color: "blue" }}
                    >
                      2{" "}
                    </button>
                    <button
                      onClick={this.addRule.bind(this, 3)}
                      style={{ color: "blue" }}
                    >
                      3{" "}
                    </button>
                  </span>
                )}
              </div>
              <div id="rulesDiv" style={showRules ? displayBlock : displayNone}>
                {ruleDivs}
              </div>

              <span
                className="sidenav_first_level"
                onClick={this.togglePrinciples.bind(this)}
                onDoubleClick={this.add.bind(this, "principles", "pple")}
              >
                Principles
              </span>
              <div
                id="principlesDiv"
                style={showPrinciples ? displayBlock : displayNone}
              >
                {ppleDivs}
              </div>

              <span className="sidenav_first_level">
                <span onClick={this.toggleSignature.bind(this)}> Types</span>
                {this.state.showSignature ? (
                  <label onClick={this.toggleEditSignature.bind(this)}>
                    {" "}
                    (Edit)
                  </label>
                ) : null}
              </span>
              <span
                className="sidenav_first_level"
                onClick={this.toggleDecls.bind(this)}
                onDoubleClick={this.add.bind(this, "declarations", "decl")}
              >
                Features
              </span>
              <div id="abbsDiv" style={showDecls ? displayBlock : displayNone}>
                {declsDivs}
              </div>

              <span
                className="sidenav_first_level"
                onClick={this.toggleSurvey.bind(this)}
              >
                Survey
              </span>
            </div>
          </div>
        </div>
        <div style={{ marginLeft: 200, marginTop: 20 }}>
          <div>{workbenchItems}</div>

          <div
            className={
              this.state.showSignature ? "borjes_visible" : "borjes_hidden"
            }
          >
            <div
              style={{ marginTop: 100, marginBottom: 100, paddingRight: "1em" }}
            >
              <BorjesProtoLattice
                x={protosig}
                editSignature={this.state.editSignature}
                name="signature"
                update={this.updateSignature.bind(this)}
                opts={{ cpbuffer: this.state.cpbuffer }}
              />
            </div>
          </div>
          <div
            id="surveyDiv"
            className={showSurvey ? "borjes_visible" : "borjes_hidden"}
            style={{ marginTop: 100, marginBottom: 100, paddingRight: "1em" }}
          >
            <Survey
              updateSignature={this.updateSignature.bind(this)}
              updateDeclarations={this.updateDeclarations.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = VisualEditor;
