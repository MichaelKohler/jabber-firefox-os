// TODO: should be converted to Angular Service once we switch to Angular.js

(function() {
    'use strict';
    var settings = {};
    var settingsKey = "jabber-settings";
    var storage = new StorageHandler();

    function SettingsHandler() {
        this.load();
    }

    SettingsHandler.prototype.load = function() {
        settings = storage.get(settingsKey);
    }

    SettingsHandler.prototype.save = function() {
        storage.save(settings, settingsKey);
    }

    SettingsHandler.prototype.set = function(key, value) {
        settings[key] = value;
        this.save();
    }

    SettingsHandler.prototype.get = function(key) {
        return settings[key];
    }

    SettingsHandler.prototype.delete = function(key) {
        delete settings[key];
        this.save();
    }

    SettingsHandler.prototype.reset = function() {
        settings = DEFAULTS;
        this.save();
    }

    var DEFAULTS = {
        'foo': 'moooo'
    };

    window.SettingsHandler = SettingsHandler;
}());