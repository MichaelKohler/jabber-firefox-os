angular.module('jabber.services', [])
.factory('XmppSvc', function() {
  var client = null,
      status = 'offline',
      account = {},
      roster = [],
      listeners = {};

  var announcePresence = function(status) {
    var presenceStanza = new XMPP.Element('presence');
    // if status is undefined, we send the initial broadcast presence
    // if status is set, we are changing status...
    if(status) {
      presenceStanza.c('show').t(status);
    }
    client.send(presenceStanza);
  };

  var handleResult = function(stanza) {
    console.log(stanza.attrs.id, stanza.attrs.id == 'roster_0')
    if(stanza.attrs.id == 'roster_0') {
      // We've received the list of contacts
      var contacts = stanza.getChild('query').getChildren('item');
      for(var i=0, len = contacts.length; i<len; i++) {
        roster.push({nick: contacts[i].attrs.name, jid: contacts[i].attrs.jid, status: 'offline'});
      }
      if(listeners.contactsReady) listeners.contactsReady(roster);
      announcePresence();
    }
  }

  var handlePresence = function(stanza) {
    if(stanza.attrs.type == 'subscribe') {
      if(listeners.subscriptionRequest) listeners.subscriptionRequest(stanza.attrs.from);
    } else {
      var from = stanza.attrs.from.split('/')[0];
      for(var i=0, len = roster.length; i<len; i++) {
        if(roster[i].jid == from) {
          roster[i].status = stanza.getChildText('show') || 'online';
          if(listeners.contactPresenceChanged) listeners.contactPresenceChanged(roster[i], i);
          return;
        }
      }
    }
  }

  var completeSubscriptionRequest = function(to, isAllowed) {
    client.send(new XMPP.Element('presence', {
      to: to,
      type: isAllowed ? 'subscribed' : 'unsubscribed'
    }))
  }

  var setupDefaultListeners = function(client) {
    client.addListener(
        'online',
        function() {
            console.log('online');
            status = 'online';
        }
    );

    client.addListener(
        'error',
        function(e) {
            console.error(e);
            alert('Error: ' + e);
            status = 'offline';
        }
    );

    client.on('stanza', function(stanza) {
      console.log('stanza:', stanza);
      if (stanza.is('message')) {
        //
      } else if(stanza.is('iq')) {
        handleResult(stanza);
      } else if(stanza.is('presence')) {
        handlePresence(stanza);
      }
    });
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
      account = acc;

      return client;
    },
    addEventListener: function(event, listener) {
      listeners[event] = listener;
    },
    addConnectionListener: function(event, listener) {
      client.addListener(event, listener);
    },
    getStatus: function() { return status; },
    getContacts: function(callback) {
      var getRosterMsg = new XMPP.Element('iq', {
          id: 'roster_0',
          type: 'get'
        }).c('query', {
          xmlns: 'jabber:iq:roster'
        });
      client.send(getRosterMsg);
      listeners.contactsReady = callback;
    },
    getUserName: function() { return account.nickname || account.jid; },
    allowSubscription: function(to) { completeSubscriptionRequest(to, true ); },
    denySubscription:  function(to) { completeSubscriptionRequest(to, false); },
    announcePresence: announcePresence
  };
})

.factory('StorageSvc', function() {
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

.factory('SettingsSvc', function(StorageSvc) {
    var settingsKey = 'jabber-settings';
    var settings = StorageSvc.get(settingsKey);
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
            this.save();
        },
        save: function() {
            StorageSvc.save(settings, settingsKey);
        },
        get: function(key) {
            return settings[key];
        },
        remove: function(key) {
            delete settings[key];
            this.save();
        },
        reset: function() {
            settings = DEFAULTS;
            this.save();
        }
    };
});
