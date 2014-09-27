angular.module('jabber', ['ui.router', 'jabber.controllers', 'jabber.services'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('contacts', {
      url: '/contacts',
      templateUrl: 'templates/contacts.html',
      controller: 'ContactsCtrl'
    })

    .state('account-settings.html', {
      url: '/account',
      templateUrl: 'templates/tab-quick.html',
      controller: 'AccountCtrl'
    });

    $urlRouterProvider.otherwise('/contacts');
}).run();
