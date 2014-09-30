(function () {
    'use strict';

    // CHAT WINDOW
    // Disable message send button if there is no input and display the placeholder accordingly
    var messageSendButton = document.getElementById('message-send-button');
    var messageInput = document.getElementById('message-input');
    if (messageSendButton && messageInput) {
        messageInput.addEventListener('input', function(){
            if(this.textContent.length === 0){
                this.classList.add('placeholder');
                messageSendButton.disabled = true;
            } else {
                this.classList.remove('placeholder');
                messageSendButton.disabled = false;
            }
        }, false);
    }

})();
