(function () {
  'use strict';
  
  angular
    .module('jabber', ['snap', 'ui.router', 'ngL20n', 'jabber.controllers', 'jabber.services',
            'jabber.models'])
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
        })

        .state('addcontact', {
          url: '/addcontact',
          templateUrl: 'templates/add-contact.html',
          controller: 'AddContactsCtrl'
        })

        .state('chatstate', {
          url: '/chatstate',
          templateUrl: 'templates/chat-state.html',
          controller: 'ChatStateCtrl'
        })

        .state('settings', {
          url: '/settings',
          templateUrl: 'templates/settings.html',
          controller: 'SettingsCtrl'
        });

      $urlRouterProvider.otherwise('/contacts');
    })
  
    // I invoke the given expression when associated 
    // ngRepeat loop has finished its rendering.
    .directive(
      'repeatComplete',
      function( $rootScope ) {
        return {
          restrict: 'A',
          link: function (scope, elements, attr) {
            scope.$emit('ngRepeatComplete', elements, attr);
          }
        };
      }
    )
   .run();
})();