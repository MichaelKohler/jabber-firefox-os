// TODO: should be converted to Angular Service once we switch to Angular.js

(function() {
    'use strict';
    var settings = {};
    var settingsKey = "jabber-settings";

    function SettingsHandler() {
        this.load();
    }

    SettingsHandler.prototype.load = function() {
        var item = localStorage.getItem(settingsKey);
        settings = JSON.parse(item);
    }

    SettingsHandler.prototype.save = function() {
        var item = JSON.stringify(settings);
        localStorage.setItem(settingsKey, item);
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