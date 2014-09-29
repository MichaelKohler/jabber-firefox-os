angular.module('jabber.controllers', [])
.controller('AccountCtrl', function($scope, XmppSvc){
  $scope.account = {};
  $scope.connect = function() {
    client = XmppSvc.connect($scope.account);
  }
})
.controller('ContactsCtrl', function($scope){
  $scope.contacts = [
    {nick: 'Alice', jid: 'alice@example.org', status: 'online'},
    {nick: 'Bob', jid: 'bob@example.org', status: 'away'},
    {nick: 'Cecil', jid: 'cecil@example.org', status: 'offline'},
  ];

  $scope.status = 'online';
});
