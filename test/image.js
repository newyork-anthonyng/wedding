'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const Image = require('../models/image');

chai.use(chaiHttp);

describe('Image API', function() {

  Image.collection.drop();

  beforeEach(function(done) {
    var newImage = new Image({
      url: 'www.test.com',
      date: new Date('1/1/2016')
    });

    newImage.save(function(err) {
      done();
    });
  });
  afterEach(function(done) {
    Image.collection.drop();
    done();
  });

  it('should get all images on GET /image/all', function(done) {
    chai.request(server)
      .get('/image/all')
      .end(function(err, res) {
        res.should.have.a.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.a.property('SUCCESS');
        res.body.SUCCESS.should.be.true;
        res.body.should.have.a.property('MESSAGE');
        res.body.MESSAGE.should.be.eq('Retrieved all images.');

        res.body.should.have.a.property('Images');
        res.body.Images.should.be.a('array');
        res.body.Images.length.should.be.eq(1);
        res.body.Images[0].url.should.be.a('string');
        res.body.Images[0].url.should.be.eq('www.test.com');
        res.body.Images[0].date.should.be.a('string');
        var dateRegExp = /\d{1,2}\/\d{1,2}\/\d{4}/;
        dateRegExp.test(res.body.Images[0].date).should.be.true;

        done();
      });
  });

  it('should return signed S3 request on GET /image/sign_s3', function(done) {
    chai.request(server)
      .get('/image/sign_s3?file_name=test.pdf&file_type=application/pdf')
      .end(function(err, res) {
        res.should.have.a.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.a.property('SUCCESS');
        res.body.SUCCESS.should.be.true;
        res.body.should.have.a.property('MESSAGE');
        res.body.MESSAGE.should.be.eq('Retrieved signed S3 request.');
        res.body.should.have.a.property('SignedRequest');
        res.body.should.have.a.property('url');
        res.body.url.should.be.a('string');

        done();
      });
  });

  it('should upload an image');
});
