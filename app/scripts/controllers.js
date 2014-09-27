angular.module('jabber.controllers', [])
.controller('AccountCtrl', function($scope, XmppSvc){
  $scope.account = {};
  $scope.connect = function() {
    alert($scope.account.jid);
    console.log(XmppSvc.connect());
  }
})
.controller('ContactsCtrl', function($scope){
  $scope.contacts = [
    {nick: 'Alice', jid: 'alice@example.org', state: 'online'},
    {nick: 'Alice', jid: 'alice@example.org', state: 'online'},
  ];
});
