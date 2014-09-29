angular.module('jabber.controllers', [])
.controller('AccountCtrl', function($scope, XmppSvc){
  $scope.account = {};

  XmppSvc.addEventListener('subscriptionRequest', function(from) {
    if(window.confirm('Allow ' + from + ' to see when you are online?')) {
      XmppSvc.allowSubscription(from);
    } else {
      XmppSvc.denySubscription(from);
    }
  });

  $scope.connect = function() {
    client = XmppSvc.connect($scope.account);
  }
})
.controller('ContactsCtrl', function($scope, XmppSvc){
  $scope.contacts = [
    {nick: 'Alice', jid: 'alice@example.org', status: 'online'},
    {nick: 'Bob', jid: 'bob@example.org', status: 'away'},
    {nick: 'Cecil', jid: 'cecil@example.org', status: 'offline'},
  ];

  XmppSvc.addEventListener('subscriptionRequest', function(from) {
    if(window.confirm('Allow ' + from + ' to see when you are online?')) {
      XmppSvc.allowSubscription(from);
    } else {
      XmppSvc.denySubscription(from);
    }
  });

  $scope.user = XmppSvc.getUserName();

  if(XmppSvc.getStatus() == 'online') {
    XmppSvc.getContacts(function(contacts) {
      $scope.$apply(function() {
        $scope.contacts = contacts;
      });
    });
  }

  $scope.status = XmppSvc.getStatus();
});
