// TODO: should be converted to Angular Service once we switch to Angular.js

(function() {
    'use strict';
    var notificationMessage;
    
    function NotificationHandler(message) {
        notificationMessage = message || '';
    }

    NotificationHandler.prototype.setMessage = function(message) {
        notificationMessage = message;
    }

    NotificationHandler.prototype.send = function() {
        if (notificationMessage === '') {
            console.warn('It does not make any sense to send an empty notification. Please don\'t do that!');
            return;
        }
        var notification;
        if (Notification.permission === "granted") {
            notification = new Notification(notificationMessage);
        }
        else {
            Notification.requestPermission(function (permission) {
                Notification.permission = permission;
                notification = new Notification(notificationMessage);
            });
        }
    }
    
    window.NotificationHandler = NotificationHandler;
}());