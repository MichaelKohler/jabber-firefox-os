// TODO: should be converted to Angular Service once we switch to Angular.js

(function() {
    'use strict';
    var historyName = '';
    var storage;

    function ChatHistory(email) {
        historyName = 'jabber-messages-' + email;
        storage = new StorageHandler(historyName);
    }

    ChatHistory.prototype.getFullHistory = function() {
        return storage.get(historyName) || [];
    }

    ChatHistory.prototype.appendMessage = function(message) {
        var history = storage.get(historyName);
        if (history) {
            history.push(message);
        }
        else {
            // if there is no saved history yet, we have to create a new one
            history = [ message ];
        }
        storage.save(history);
    }

    window.ChatHistory = ChatHistory;
}());