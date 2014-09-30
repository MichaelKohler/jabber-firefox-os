angular.module('jabber.controllers', [])
.controller('AccountCtrl', function($scope, XmppSvc, SettingsSvc){
  console.log(SettingsSvc.get('account'));
  $scope.account = SettingsSvc.get('account') || {};

  XmppSvc.addEventListener('subscriptionRequest', function(from) {
    if(window.confirm('Allow ' + from + ' to see when you are online?')) {
      XmppSvc.allowSubscription(from);
    } else {
      XmppSvc.denySubscription(from);
    }
  });

  $scope.connect = function() {
    client = XmppSvc.connect($scope.account);
    var acc = $scope.account;
    SettingsSvc.set('account', {
      jid: acc.jid,
      password: acc.password, //TODO(mn): Encrypt password!
      serverUrl: acc.serverUrl,
      nickname: acc.nickname
    });
  }
})
.controller('ContactsCtrl', function($scope, $location, XmppSvc){
  $scope.contacts = [
    {nick: 'Alice', jid: 'alice@example.org', status: 'online'},
    {nick: 'Bob', jid: 'bob@example.org', status: 'away'},
    {nick: 'Cecil', jid: 'cecil@example.org', status: 'offline'},
  ];
    
  // I am the callback handler for the ngRepeat completion.
  $scope.$on('ngRepeatComplete', function(rce, elements) {
    // Prevent context menu long press)
    elements[0].querySelector('a').addEventListener('contextmenu', function(e){
      e.preventDefault();
    }, false);
  });

  XmppSvc.addEventListener('subscriptionRequest', function(from) {
    if(window.confirm('Allow ' + from + ' to see when you are online?')) {
      XmppSvc.allowSubscription(from);
    } else {
      XmppSvc.denySubscription(from);
    }
  });

  XmppSvc.addEventListener('contactPresenceChanged', function(contact, index) {
    $scope.$apply(function() {
      $scope.contacts[index].status = contact.status;
    });
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

  $scope.redirectToAddContact = function() {
    $location.path('/addcontact');
  };

  $scope.redirectToChangeStatus = function() {
    $location.path('/chatstate');
  };
})
.controller('AddContactsCtrl', function($scope){
})
.controller('ChatStateCtrl', function($scope){
})
.controller('SettingsCtrl', function($scope){
})
.controller('ChatStateCtrl', function($scope){
});
