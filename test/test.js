var chai = require('chai');
var chaiHttp = require('chai-http');
var APIserver = require('../bin/www');
var nock = require('./nockConfig');
var util = require('util');

var should = chai.should();

chai.use(chaiHttp);

describe('Library API', function() {
  this.timeout(10000);
  after(function(done) {
    nock.cleanAll();
    done();
  });

  it('should call the root API url', function(done) {
    chai
      .request(APIserver)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have
          .property('message')
          .equal('Welcome to our calculator API!');
        done();
        // done(new Error('Test Error'));
      });
  });
  it('Get all books', function(done) {
    chai
      .request(APIserver)
      .get('/book')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').equal('Get all books!');

        done();
      });
  });
  it('post an empty book', function(done) {
    chai
      .request(APIserver)
      .post('/book')
      .end(function(err, res) {
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').equal('Validation error');
        res.body.should.have.property('errors');
        // res.body.should.have.property('book').equal({});
        done();
      });
  });
  it('post a valid book', function(done) {
    chai
      .request(APIserver)
      .post('/book')
      .send({ title: 'Handbook on AWS', author: 'NS', year: 2010, pages: 150 })
      .end(function(err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').equal('Book added!');
        res.body.should.have.property('book');
        // console.log(res.body);
        // console.log(res.body.book);
        res.body.book.should.have.property('title');
        res.body.book.should.have.property('author');
        res.body.book.should.have.property('pages');
        res.body.book.should.have.property('year');
        res.body.book.title.should.equal('Handbook on AWS');
        res.body.book.author.should.equal('NS');
        res.body.book.year.should.equal(2010);
        res.body.book.pages.should.equal(150);
        done();
      });
  });

  describe('Error from remote server', function() {
    this.timeout(10000);
    before(function(done) {
      nock('http://localhost:5000')
        .get('/book')
        .replyWithError('Something wrong happened')
        .post('/book')
        .replyWithError('Something wrong happened');
      done();
    });
    after(function(done) {
      nock.cleanAll();
      done();
    });

    it('Get all books', function(done) {
      chai
        .request(APIserver)
        .get('/book')
        .end(function(err, res) {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have
            .property('message')
            .equal('Error while getting books');
          done();
        });
    });

    it('post a valid book', function(done) {
      chai
        .request(APIserver)
        .post('/book')
        .send({
          title: 'Handbook on AWS',
          author: 'NS',
          year: 2010,
          pages: 150
        })
        .end(function(err, res) {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have
            .property('message')
            .equal('Error while adding book');
          done();
        });
    });
  });
});
