'use strict';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('Image API', function() {

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
        res.body.Images[0].date.should.be.a('date');
        res.body.Images[0].date.should.be.eq('1/1/2016');

        done();
      });
  });

  it('should upload an image');
});
