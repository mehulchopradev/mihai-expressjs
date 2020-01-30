const chai = require('chai');
const { getFiboSeries } = require('../../common/services/series');

chai.should();

describe('execution of series service unit tests', () => {
    describe('execution of getFiboSeries()', () => {
        it('it returns the fibo series string', () => {
            let actual = getFiboSeries(8);
            actual.should.be.equal('0 1 1 2 3 5 8 13');

            actual = getFiboSeries(2);
            actual.should.be.equal('0 1');
        });
    });
});