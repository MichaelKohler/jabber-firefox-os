// TODO: should be converted to Angular Service once we switch to Angular.js

(function() {
    'use strict';
    var storageKey = '';

    function StorageHandler(key) {
        storageKey = key || '';
    }

    StorageHandler.prototype.get = function(key) {
        if (storageKey === '') { storageKey = key; }
        var item = localStorage.getItem(storageKey);
        var object;
        try {
            object = JSON.parse(item);
        }
        catch (exception) {
            console.warn(exception.message);
            console.warn(item);
            return {};
        }

        return object || {};
    }

    StorageHandler.prototype.save = function(object, key) {
        var keyToSave = key || storageKey;
        var item = JSON.stringify(object);
        localStorage.setItem(keyToSave, item);
    }

    StorageHandler.prototype.remove = function(key) {
        localStorage.removeItem(key);
    }

    window.StorageHandler = StorageHandler;
}());