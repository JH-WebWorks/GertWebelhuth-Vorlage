"use strict";

var Bjs = require('../borjes');
var Lattice = Bjs.types.Lattice;
var TFS = Bjs.types.TFS;
var Type = Bjs.types.Type;
var util = require("util");

function collectAllTypes(protosig) {

    if (isEmptyObject(protosig)) {
        return [];
    }
    var result = [];

    traverse(protosig, function (key) {
        result.push(key)
    });

    var allTypes = removeDuplicates(result);
    return allTypes;

}

function traverse(obj, fn) {
    for (var key in obj) {
        fn.apply(this, [key, obj[key]]);
        if (obj[key] !== null && typeof(obj[key]) == "object") {
            traverse(obj[key], fn);
        }
    }
}

function removeDuplicates(arr) {
    let unique_array = [];
    for (let i = 0; i < arr.length; i++) {
        if (unique_array.indexOf(arr[i]) == -1) {
            unique_array.push(arr[i])
        }
    }
    return unique_array;
}

function isEmptyObject(obj) {
    if (obj === undefined) {
        return true;
    } else if (Object.getOwnPropertyNames(obj).length === 0) {
        return true;
    } else {
        return false;
    }
}

function collectLocalFeatures(doc) {
    var localFeatures = {};
    var protosig = doc.at('global').at('signature').get();
    var declarations = doc.at('declarations').get();

    if (isEmptyObject(protosig) || isEmptyObject(declarations)) {
        return {};
    }

    var declaration, currentType, currentFeature, currentValue;


    for (var i = 0; i < declarations.length; i++) {
        declaration = declarations[i];
        if(declaration === null) break;
        currentType = declaration['name'];

        var features = declaration['fstr']['f'];
        var newFeatureValueObject = {};

        for (var k = 0; k < features.length; k++) {
            currentFeature = features[k];
            currentValue = declaration['fstr']['v'][currentFeature];
            newFeatureValueObject[currentFeature] = currentValue;
        }
        localFeatures[currentType] = newFeatureValueObject;
    }

    return localFeatures
}


function collectSupertypes(inputObject, inputTypes, localFeatures, supertypes) {

    if (inputObject === null || localFeatures === undefined) {
        return
    }
    for (var key in inputObject) {
        if (supertypes[key] === undefined) {
            supertypes[key] = inputTypes;
        } else {
            supertypes[key] = removeDuplicates(inputTypes.concat(supertypes[key]))
        }


        var newInputObject = inputObject[key];
        var newInputTypes = inputTypes;

        if (Object.keys(localFeatures).includes(key)) {
            newInputTypes = newInputTypes.concat([key]);
        }
        collectSupertypes(newInputObject, newInputTypes, localFeatures, supertypes)
    }
    return supertypes;
}

function collectSubtypes(inputObject) {

    if (inputObject === undefined) {
        return;
    }
    if (inputObject === null) {
        return {};
    }

    var subtypes = {};
    var subtypes2 = {};
    Object.keys(inputObject).forEach(function (key) {
        if(inputObject[key] === null) {
            subtypes[key] = [];
        } else {
            subtypes[key] = collectAllTypes(inputObject[key]);
            subtypes = {...subtypes, ...collectSubtypes(inputObject[key])};
        }
    });
    return subtypes;
}


function collectAllFeatures(localFeatures, supertypes) {

    if(supertypes === undefined) {
        return {};
    }
    var allFeatures = {};
    var currentFeatures;

    Object.keys(supertypes).forEach(function (type) {
        currentFeatures = {};
        if (localFeatures[type] !== undefined) {
            currentFeatures = localFeatures[type]
        }
        Object.keys(supertypes).forEach(function (supertype) {
            if (supertypes[type].includes(supertype)) {
                currentFeatures = {...currentFeatures, ...localFeatures[supertype]}
            }
        })
        allFeatures[type] = currentFeatures;
    })
    return allFeatures;
}


function createEditForms(allTypes, allFeatures) {
    var editForms = {};

    for(var i = 0; i < allTypes.length; i++) {
        var currentTypeName = allTypes[i];
        editForms[currentTypeName] = createEditForm(currentTypeName, allFeatures);
    }
    return editForms;
}



function createEditForm(inputTypeName, allFeatures) {
    var inputFeatObj = allFeatures[inputTypeName];


    if (isEmptyObject(inputFeatObj)) {
        return Type(inputTypeName);
    } else {
        var inputFeats = Object.keys(inputFeatObj);
        var outputFeatObj = {};

        for (var x = 0; x < inputFeats.length; x++) {
            var inputFeat = inputFeats[x];
            var inputVal = inputFeatObj[inputFeat];
            outputFeatObj[inputFeat] = createEditForm(inputVal.type, allFeatures);
        }
    }
    return TFS(Type(inputTypeName), outputFeatObj);
}



module.exports = {
    isEmptyObject: isEmptyObject,
    collectAllTypes: collectAllTypes,
    collectLocalFeatures: collectLocalFeatures,
    collectSupertypes: collectSupertypes,
    collectSubtypes: collectSubtypes,
    collectAllFeatures: collectAllFeatures,
    createEditForms: createEditForms,
};