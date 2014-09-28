angular.module('jabber.controllers', [])
.controller('AccountCtrl', function($scope, XmppSvc){
  $scope.account = {};
  $scope.connect = function() {
    client = XmppSvc.connect($scope.account);
  }
})
.controller('ContactsCtrl', function($scope){
  $scope.contacts = [
    {nick: 'Alice', jid: 'alice@example.org', state: 'online'},
    {nick: 'Alice', jid: 'alice@example.org', state: 'online'},
  ];
});
