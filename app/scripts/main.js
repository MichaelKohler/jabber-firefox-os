(function () {
    'use strict';
    
    var themeColor = document.head.querySelector('meta[name="theme-color"]');
    
    var index = document.getElementById('index');
    var chat = document.getElementById('chat');
    
    var mainPanels = document.getElementById('index').querySelectorAll('section[role="region"]');
    var contactsPanel = document.getElementById('contacts-panel');
    var addContactPanel = document.getElementById('add-contact-panel');
    var changeStatusPanel = document.getElementById('change-status-panel');
    var accountSettingsPanel = document.getElementById('account-settings-panel');
    var connectionSettingsPanel = document.getElementById('connection-settings-panel');
    var optionsPanel = document.getElementById('options-panel');
    
    // Toggle Sidebar
    var toggleSidebarButtons = document.querySelectorAll('.toggle-sidebar');
    
    for(var i = 0, iLen = toggleSidebarButtons.length; i < iLen; i++) {
        toggleSidebarButtons[i].addEventListener('click', function(){
            for(var j = 0, jLen = mainPanels.length; j < jLen; j++) {
                mainPanels[j].classList.toggle('open-sidebar');
            }
        }, false);
    }
    
    // Sidebar
    document.getElementById('sidebar-show-contacts').addEventListener('click', function(){
        for(var i = 0, iLen = mainPanels.length; i < iLen; i++) {
            mainPanels[i].hidden = true;
            mainPanels[i].classList.remove('open-sidebar');
        }
        contactsPanel.hidden = false;
    }, false);
    document.getElementById('sidebar-add-contact').addEventListener('click', function(){
        for(var i = 0, iLen = mainPanels.length; i < iLen; i++) {
            mainPanels[i].hidden = true;
            mainPanels[i].classList.remove('open-sidebar');
        }
        addContactPanel.hidden = false;
    }, false);
    document.getElementById('sidebar-change-status').addEventListener('click', function(){
        for(var i = 0, iLen = mainPanels.length; i < iLen; i++) {
            mainPanels[i].hidden = true;
            mainPanels[i].classList.remove('open-sidebar');
        }
        changeStatusPanel.hidden = false;
    }, false);
    document.getElementById('sidebar-account-settings').addEventListener('click', function(){
        for(var i = 0, iLen = mainPanels.length; i < iLen; i++) {
            mainPanels[i].hidden = true;
            mainPanels[i].classList.remove('open-sidebar');
        }
        accountSettingsPanel.hidden = false;
    }, false);
    document.getElementById('sidebar-connection-settings').addEventListener('click', function(){
        for(var i = 0, iLen = mainPanels.length; i < iLen; i++) {
            mainPanels[i].hidden = true;
            mainPanels[i].classList.remove('open-sidebar');
        }
        connectionSettingsPanel.hidden = false;
    }, false);
    document.getElementById('sidebar-options').addEventListener('click', function(){
        for(var i = 0, iLen = mainPanels.length; i < iLen; i++) {
            mainPanels[i].hidden = true;
            mainPanels[i].classList.remove('open-sidebar');
        }
        optionsPanel.hidden = false;
    }, false);
    
    // Settings - All "Done" Buttons redirect to Mainscreen, normally
    // would they force a "Save Settings" Action before redirect
    var settingsDoneButtons = document.querySelectorAll('.settings-done');
    
    for(var i = 0, iLen = settingsDoneButtons.length; i < iLen; i++) {
        settingsDoneButtons[i].addEventListener('click', function(){
            for(var i = 0, iLen = mainPanels.length; i < iLen; i++) {
                mainPanels[i].hidden = true;
                mainPanels[i].classList.remove('open-sidebar');
            }
            contactsPanel.hidden = false;
        }, false);
    }
    
    // Main screen
    document.getElementById('show-change-status-btn').addEventListener('click', function(){
        for(var i = 0, iLen = mainPanels.length; i < iLen; i++) {
            mainPanels[i].hidden = true;
            mainPanels[i].classList.remove('open-sidebar');
        }
        changeStatusPanel.hidden = false;
    }, false);
    
    // Start chat
    var contacts = document.querySelectorAll('.contact');
    
    for(var i = 0, iLen = contacts.length; i < iLen; i++) {
        contacts[i].addEventListener('click', function(){
            chat.className = 'current';
            index.className = 'left';
        }, false);
    }
    
    // Close chat
    document.getElementById('chat-back-btn').addEventListener('click', function(){
        chat.className = 'right';
        index.className = 'current';
    }, false);
    
    // Contact/chat settings
    var contactSettings = document.getElementById('contact-settings');
    
    document.getElementById('show-contact-settings').addEventListener('click', function(){
        themeColor.content = 'black';
        contactSettings.hidden = false;
        contactSettings.className = 'fade-in';
    }, false);
    
    document.getElementById('hide-contact-settings').addEventListener('click', function(){
        themeColor.content = '#F97C17';
        contactSettings.className = 'fade-out';
        contactSettings.hidden = true;
    }, false);

    // TEST
    document.getElementById("sendTest").addEventListener("click", function() {
        var stanza = new XMPP.Element('message', { to: window.prompt("Send message to?", "somebody@example.org"), type: 'chat'}).c('body').t(window.prompt("Your message", "Hello there!"));
        client.send(stanza);
    });
    
})();
