(function () {
    'use strict';
    mocha.setup('bdd');
    chai.should();

    describe('Unit Tests', function () {
        describe('Storage', function () {
            it('Saving string with setting the key first should work', function () {
                var storage = new StorageHandler('test-jabber-key');
                var content = 'test';
                storage.save(content);
                var result = storage.get('test-jabber-key');
                result.should.equal(content);
                storage.remove('test-jabber-key');
            });
            it('Saving object with setting the key first should work', function () {
                var storage = new StorageHandler('test-jabber-key');
                var object = { test: 'bla1' };
                storage.save(object);
                var result = storage.get('test-jabber-key');
                result.should.eql(object);
                storage.remove('test-jabber-key');
            });
            it('Getting value without key should work when key was set first', function () {
                var storage = new StorageHandler('test-jabber-key');
                var object = { test: 'bla2' };
                storage.save(object);
                var result = storage.get();
                result.should.eql(object);
                storage.remove('test-jabber-key');
            });
            it('Getting value with key should work without setting the key first', function () {
                var storage = new StorageHandler('test-jabber-key');
                var object = { test: 'bla3' };
                storage.save(object);
                storage = new StorageHandler();
                var result = storage.get('test-jabber-key');
                result.should.eql(object);
                storage.remove('test-jabber-key');
            });
            it('Getting non-existing key should return an empty object', function () {
                var storage = new StorageHandler();
                var result = storage.get('fooooo');
                result.should.eql({});
                storage.remove('fooooo');
            });
            it('Getting a mal-formatted json entry should return an empty object', function () {
                var malformatted = '{ "foo": asdadasd';
                localStorage.setItem('foo', malformatted);
                var storage = new StorageHandler();
                var result = storage.get('foo');
                result.should.eql({});
                storage.remove('foo');
            });
            it('Removing key should work', function () {
                var storage = new StorageHandler('foo');
                storage.save('test')
                storage.remove('foo');
                var result = storage.get('foo');
                result.should.eql({});
            });
        });

        describe('Settings', function () {
            it('Setting and getting value should work', function () {
                var settings = new SettingsHandler('jabber-settings-test');
                settings.set('foo', 'foobar');
                var result = settings.get('foo');
                result.should.eql('foobar');
                new StorageHandler().remove('jabber-settings-test');
            });
            it('Delete value should work', function () {
                var settings = new SettingsHandler('jabber-settings-test');
                settings.delete('foo');
                var result = settings.get('foo');
                chai.expect(result).to.be.undefined;
                new StorageHandler().remove('jabber-settings-test');
            });
            it('Resetting value should change the stored value', function () {
                var settings = new SettingsHandler('jabber-settings-test');
                settings.set('foo', 'test');
                settings.reset();
                var result = settings.get('foo');
                result.should.not.eql('test');
                new StorageHandler().remove('jabber-settings-test');
            });
            it('Getting non-existing setting should return undefined', function () {
                var settings = new SettingsHandler('jabber-settings-test');
                var result = settings.get('blablablabla');
                chai.expect(result).to.be.undefined;
                new StorageHandler().remove('jabber-settings-test');
            });
        });

        describe('ChatHistory', function () {
            it('Appending message to non-existing conversation should create it', function () {
                var storage = new StorageHandler();
                storage.remove('jabber-messages-test@example.org--test');
                var chatHistory = new ChatHistory('test@example.org--test');
                var message = { text: 'testmessage' };
                chatHistory.appendMessage(message);
                var history = chatHistory.getFullHistory();
                history.should.eql([ message ]);
                storage.remove('jabber-messages-test@example.org--test');
            });
            it('Appending message to existing conversation should append it and getting it should return everything', function () {
                var storage = new StorageHandler();
                storage.remove('jabber-messages-test@example.org--test');
                var chatHistory = new ChatHistory('test@example.org--test');
                var message = { text: 'testmessage' };
                chatHistory.appendMessage(message);
                var message2 = { text: 'testmessage2' };
                chatHistory.appendMessage(message2);
                var history = chatHistory.getFullHistory();
                history.should.eql([ message, message2 ]);
                storage.remove('jabber-messages-test@example.org--test');
            });
        });

        describe('ChatMessage', function () {
            it('Message should be populated correctly', function () {
                var date = Date.now();
                var message = new ChatMessage({
                    sender: 'me',
                    receiver: 'you',
                    text: 'testtext',
                    date: date
                });
                message.sender.should.eql('me');
                message.receiver.should.eql('you');
                message.text.should.eql('testtext');
                message.date.should.eql(date);
            });
            it('Message date should be populated correctly if not provided', function () {
                var message = new ChatMessage({ });
                chai.expect(message.date).not.to.be.undefined;
            });
            it('Message should be saved to history after send', function () {
                var message = new ChatMessage({
                    sender: 'me2@example.org--test',
                    receiver: 'you2@example.org--test',
                    text: 'testtext',
                    date: Date.now()
                });
                message.send();
                var history = new ChatHistory(message.sender);
                var result = history.getFullHistory();
                result[0].sender.should.eql(message.sender);
                result[0].receiver.should.eql(message.receiver);
                result[0].text.should.eql(message.text);
                result[0].date.should.eql(message.date);
                history.deleteAll();
            });
        });
    });

    mocha.run();
}());
