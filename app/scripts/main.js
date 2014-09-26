(function () {
    'use strict';
    console.log('do it!');

    document.getElementById("sendTest").addEventListener("click", function() {
        var stanza = new XMPP.Element('message', { to: window.prompt("Send message to?", "somebody@example.org"), type: 'chat'}).c('body').t(window.prompt("Your message", "Hello there!"));
        client.send(stanza);
    });
}());
