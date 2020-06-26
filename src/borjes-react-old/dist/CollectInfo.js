"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function collectAllTypes(protosig) {

    if (isEmptyObject(protosig)) {
        return;
    }
    ;
    var result = [];

    var obj = protosig;

    traverse(protosig, function (key) {
        result.push(key);
    });

    var allTypes = removeDuplicates(result);
    return allTypes;
}

function traverse(obj, fn) {
    for (var key in obj) {
        fn.apply(this, [key, obj[key]]);
        if (obj[key] !== null && _typeof(obj[key]) == "object") {
            traverse(obj[key], fn);
        }
    }
}

function removeDuplicates(arr) {
    var unique_array = [];
    for (var i = 0; i < arr.length; i++) {
        if (unique_array.indexOf(arr[i]) == -1) {
            unique_array.push(arr[i]);
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

module.exports = {
    collectAllTypes: collectAllTypes
};

