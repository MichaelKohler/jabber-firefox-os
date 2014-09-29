(function () {
    'use strict';

    describe('Services', function () {

        beforeEach(module('jabber.services'));

        describe('Storage', function () {
            var storage = null;

            beforeEach(inject(function(StorageSvc) {
                storage = StorageSvc;
            }));

            it('should save string with setting the key in the same call', function () {
                var content = 'test';
                storage.save(content, 'test-jabber-key');
                var result = storage.get('test-jabber-key');
                expect(result).toEqual(content);
                storage.remove('test-jabber-key');
            });

            it('should save string without key when key was set first', function () {
                storage.setKey('test-jabber-key');
                var content = 'test';
                storage.save(content);
                var result = storage.get('test-jabber-key');
                expect(result).toEqual(content);
                storage.remove('test-jabber-key');
            });

            it('should save object without key when key was set first', function () {
                storage.setKey('test-jabber-key');
                var object = { test: 'bla1' };
                storage.save(object);
                var result = storage.get('test-jabber-key');
                expect(result).toEqual(object);
                storage.remove('test-jabber-key');
            });

            it('should get value without key when key was set first', function () {
                storage.setKey('test-jabber-key');
                var object = { test: 'bla2' };
                storage.save(object);
                var result = storage.get();
                expect(result).toEqual(object);
                storage.remove('test-jabber-key');
            });

            it('should get value with key without setting key first', function () {
                storage.setKey('');
                var object = { test: 'bla3' };
                storage.save(object, 'test-jabber-key');
                var result = storage.get('test-jabber-key');
                expect(result).toEqual(object);
                storage.remove('test-jabber-key');
            });

            it('should return an empty object when getting a non-existing key', function () {
                storage.setKey('');
                var result = storage.get('fooooo');
                expect(result).toEqual({});
            });

            it('should return an empty object when getting a mal-formatted json entry', function () {
                var malformatted = '{ "foo": asdadasd';
                localStorage.setItem('foo', malformatted);
                var result = storage.get('foo');
                expect(result).toEqual({});
                storage.remove('foo');
            });

            it('should remove the storage item', function () {
                storage.save('test', 'foo')
                storage.remove('foo');
                var result = storage.get('foo');
                expect(result).toEqual({});
            });
        });

        describe('Settings', function () {
            var settings = null;
            var storage = null;

            beforeEach(inject(function(SettingsSvc, StorageSvc) {
                settings = SettingsSvc;
                storage = StorageSvc;
            }));

            it('should return value after getting it', function () {
                settings.overloadKey('jabber-settings-test');
                settings.set('foo', 'foobar');
                var result = settings.get('foo');
                expect(result).toBe('foobar');
                storage.remove('jabber-settings-test');
            });

            it('should remove the setting', function () {
                settings.overloadKey('jabber-settings-test');
                settings.remove('foo');
                var result = settings.get('foo');
                expect(result).not.toBeDefined();
                storage.remove('jabber-settings-test');
            });

            it('should change stored value when resetting settings', function () {
                settings.overloadKey('jabber-settings-test');
                settings.set('foo', 'test');
                settings.reset();
                var result = settings.get('foo');
                expect(result).not.toBe('test');
                storage.remove('jabber-settings-test');
            });

            it('should return undefined when getting non-existing setting', function () {
                settings.overloadKey('jabber-settings-test');
                var result = settings.get('blablablabla');
                expect(result).not.toBeDefined();
                storage.remove('jabber-settings-test');
            });
        });
    });

    describe('Models', function () {
        /*describe('ChatHistory', function () {
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
        });*/
    });
}());