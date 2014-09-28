// TODO: should be converted to a Angular Model once we switch to Angular.js

(function() {
    'use strict';

    function ChatMessage(data) {
        this.sender = data.sender || '';
        this.receiver = data.receiver || '';
        this.text = data.text || '';
        this.date = data.date || new Date();
    }

    ChatMessage.prototype.sender = '';
    ChatMessage.prototype.receiver = '';
    ChatMessage.prototype.text = '';
    ChatMessage.prototype.date = '';

    ChatMessage.prototype.saveToHistory = function() {
        var chatHistory = new ChatHistory(message.receiver);
        chatHistory.appendMessage(this);
    }

    ChatMessage.prototype.send = function() {
        // TODO: implement actual sending of message

        this.saveToHistory();
    }

    window.ChatMessage = ChatMessage;
}());