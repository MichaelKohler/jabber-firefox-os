angular.module('jabber.services', [])
.factory('XmppSvc', function() {
  return {
    connect: function(jid, password, server) {
      return true;
    }
  }
});
