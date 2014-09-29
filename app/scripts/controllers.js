angular.module('jabber.controllers', [])
.controller('AccountCtrl', function($scope, XmppSvc){
  $scope.account = {};
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

  $scope.user = XmppSvc.getUserName();

  if(XmppSvc.getStatus() == 'online') {
    console.log("Getting online contacts");
    XmppSvc.getContacts(function(contacts) {
      $scope.$apply(function() {
        $scope.contacts = contacts;
      });
    });
  }

  $scope.status = XmppSvc.getStatus();
});
