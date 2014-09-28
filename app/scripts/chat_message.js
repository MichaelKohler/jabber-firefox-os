// TODO: should be converted to a Angular Model once we switch to Angular.js

(function() {
    'use strict';

    function ChatMessage(data) {
        this.sender = data.sender || '';
        this.receiver = data.receiver || '';
        this.text = data.text || '';
        if (data.date > 0) {
            this.date = data.date;
        }
        else {
            this.date = Date.now();
        }
    }

    ChatMessage.prototype.sender = '';
    ChatMessage.prototype.receiver = '';
    ChatMessage.prototype.text = '';
    ChatMessage.prototype.date = '';

    ChatMessage.prototype.saveToHistory = function(correctPerson) {
        var chatHistory = new ChatHistory(correctPerson);
        chatHistory.appendMessage(this);
    }

    ChatMessage.prototype.send = function() {
        if (this.sender == '' || this.receiver == '' || this.text == '') {
            console.error('Message is not correctly populated!');
            return;
        }

        // TODO: implement actual sending of message

        this.saveToHistory(this.sender);
    }

    window.ChatMessage = ChatMessage;
}());