angular.module('jabber.models', ['jabber.services'])
.factory('ChatHistory', function (StorageSvc) {
    return function (email) {
        var _historyName = 'jabber-messages-' + email;
        StorageSvc.setKey(_historyName);

        return {
            getFullHistory: function() {
                return StorageSvc.get(_historyName) || [];
            },
            appendMessage: function(message) {
                var history = StorageSvc.get(_historyName);
                if (history instanceof Array && history.length > 0) {
                    history.push(message);
                }
                else {
                    // if there is no saved history yet, we have to create a new one
                    history = [ message ];
                }
                StorageSvc.save(history);
            },
            deleteAll: function() {
                StorageSvc.remove(_historyName);
            }
        };
    };
})
.factory('ChatMessage', function (ChatHistory) {
    return function (data) {
        var _date = null;
        if (data instanceof Object && data.date > 0) {
            _date = data.date;
        }
        else {
            _date = Date.now();
        }

        return {
            sender: data.sender || '',
            receiver: data.receiver || '',
            text: data.text || '',
            date: _date,
            saveToHistory: function(correctPerson) {
                var chatHistory = new ChatHistory(correctPerson);
                chatHistory.appendMessage({
                    sender: this.sender,
                    receiver: this.receiver,
                    text: this.text,
                    date: this.date
                });
            },
            send: function() {
                if (this.sender == '' || this.receiver == '' || this.text == '') {
                    console.error('Message is not correctly populated!');
                    return;
                }

                // TODO: implement actual sending of message

                this.saveToHistory(this.sender);
            }
        };
    };
});