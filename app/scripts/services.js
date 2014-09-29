angular.module('jabber.services', [])
.factory('XmppSvc', function() {
  var client = null;

  var setupDefaultListeners = function(client) {
    client.addListener(
        'online',
        function() {
            console.log('online');
        }
    );

    client.addListener(
        'error',
        function(e) {
            console.error(e);
            alert('Error: ' + e);
        }
    );
  };

  return {
    connect: function(acc) {
      client = new XMPP.Client({
          boshURL: acc.serverUrl,
          jid: acc.jid,
          password: acc.password,
          preferred: 'PLAIN' // BOSH only allows plain logins.
      });

      setupDefaultListeners(client);

      return client;
    },
    addListener: function(event, listener) {
      client.addListener(event, listener);
    }
  }
})

.factory('storageSrv', function() {
    var storageKey = '';

    return {
        setKey: function(key) {
          storageKey = key;
        },
        get: function(key) {
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
        },

        save: function(object, key) {
            var keyToSave = key || storageKey;
            var item = JSON.stringify(object);
            localStorage.setItem(keyToSave, item);
        },

        remove: function(key) {
            localStorage.removeItem(key);
        }
    };
})

.factory('settingsSrv', function(storageSrv) {
    var settingsKey = "jabber-settings";
    var storage = storageSrv.load();
    var settings = storageSrv.get(this.settingsKey);
    // TODO: use .json or something similar to store the default values
    var DEFAULTS = {
        'foo': 'moooo'
    };

    return {
        overloadKey: function(key) {
            settingsKey = key;
        },
        set: function(key, value) {
            settings[key] = value;
            save();
        },
        save: function() {
            storage.save(settings, settingsKey);
        },
        get: function(key) {
            return settings[key];
        },
        remove: function() {
            delete settings[key];
            save();
        },
        reset: function() {
            settings = DEFAULTS;
            save();
        }
    };
});