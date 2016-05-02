'use strict';

const chai = require('chai');
const should = chai.should();
const Image = require('../models/image');
const utility = require('../public/utility');

describe('Utility', function() {

	describe('#formatTime', function() {

		it('should format date 6/20/2016', function() {
			var newDate = new Date(2016, 6, 20);
			var formattedDate = utility.formatTime(newDate);

			formattedDate.should.be.eq('6/20/2016');
		});

		it('should format 12/31/2016', function() {
			var newDate = new Date(2016, 12, 31);
			var formattedDate = utility.formatTime(newDate);

			formattedDate.should.be.eq('12/31/2016');
		});

		it('should format 1/1/2016', function() {
			var newDate = new Date(2016, 1, 1);
			var formattedDate = utility.formatTime(newDate);

			formattedDate.should.be.eq('1/1/2016');
		});
	});

	describe('#generateFilePrefix', function() {

		it('should generate number', function() {
			var newString = utility.generateFilePrefix();

			newString.should.be.a('string');
			newString.length.should.be.eq(13);
		});
	});

});
