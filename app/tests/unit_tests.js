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
            });
            it('Saving object with setting the key first should work', function () {
                var storage = new StorageHandler('test-jabber-key');
                var object = { test: 'foo' };
                storage.save(object);
                var result = storage.get('test-jabber-key');
                result.should.eql(object);
            });
            it('Getting value without key should work when key was set first', function () {
                // key was set by previous test so we don't need to save it first
                var storage = new StorageHandler('test-jabber-key');
                var result = storage.get();
                result.should.eql({ test: 'foo' });
            });
            it('Getting value with key should work without setting the key first', function () {
                var storage = new StorageHandler();
                var result = storage.get('test-jabber-key');
                result.should.eql({ test: 'foo' });
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
            });
            it('Removing key should work', function () {
                // foo was set by the previous test
                var storage = new StorageHandler('foo');
                storage.remove('foo');
                var result = storage.get('foo');
                result.should.eql({});
            });
        });
    });

    mocha.run();
}());
