angular.module('jabber', ['snap', 'ui.router', 'jabber.controllers', 'jabber.services'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('contacts', {
      url: '/contacts',
      templateUrl: 'templates/contacts.html',
      controller: 'ContactsCtrl'
    })

    .state('account', {
      url: '/account',
      templateUrl: 'templates/account.html',
      controller: 'AccountCtrl'
    });

    $urlRouterProvider.otherwise('/contacts');
}).run();
