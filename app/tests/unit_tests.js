(function () {
    'use strict';
    mocha.setup('bdd');
    chai.should();

    describe('Unit Tests', function () {
        describe('Storage', function () {
            it('....', function () {
                'foo'.should.equal('foo');
            });
        });
    });

    mocha.run();
}());
