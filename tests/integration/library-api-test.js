const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');


chai.use(chaiHttp);
chai.should()

describe('Testing all library api calls', () => {
    describe('testing first the calls to book resource', () => {
        describe('testing first all GET calls', () => {
            describe('test /books call', () => {
                it('fetches all the books', (done) => {
                    chai.request(app)
                        .get('/library/books')
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.should.have.lengthOf(3);
                            done(); // important to be called at the end of asynchronous test
                        });
                });
            });
            describe('test /books/:id call', () => {
                before(() => {
                    console.log('Before called');
                    // initialize describe level variables
                    // called only once and then all 'it's' will execute
                });

                beforeEach(() => {
                    console.log('Before each called');
                    // called before execution of every test case in describe
                });

                it('fetches particular book', (done) => {
                    chai.request(app)
                        .get('/library/books/2')
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            const { id, title, pages, price } = res.body;
                            id.should.be.equal(2);
                            title.should.be.equal('Book 2');
                            pages.should.be.equal(890);
                            price.should.be.equal(230);
                            done(); // important to be called at the end of asynchronous test
                        });
                });
                it('fetching a book that does not exist', (done) => {
                    chai.request(app)
                        .get('/library/books/-56')
                        .end((err, res) => {
                            res.should.have.status(404);
                            done(); // important to be called at the end of asynchronous test
                        });
                });

                after(() => {
                    console.log('after called');
                    // deallocate or reset desscribe level variables
                    // called only once after all the test cases (it) in a describe have executed
                });

                afterEach(() => {
                    console.log('After each called');
                    // called after execution of every test case in describe
                });
            });
        });
    });
});
