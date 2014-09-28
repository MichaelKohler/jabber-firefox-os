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
});
