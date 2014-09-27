'use strict';

/* global XMPP */
/* Note these are connection details for a local dev server :) */
  
var client = new XMPP.Client({
    boshURL: window.prompt('Jabber Server URL', 'https://your-server.com:5281/http-bind/'),
    jid: window.prompt('Your Jabber ID', 'you@example.org'),
    password: window.prompt('Your password', ''),
    preferred: 'PLAIN'
});

client.addListener(
    'online',
    function() {
        console.log('online');
    }
);

client.addListener(
    'error',
    function(e) {
        console.error(e);
        alert('Erorr: ' + e);
    }
);