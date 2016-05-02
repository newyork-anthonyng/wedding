'use strict';

const Utility = {
	formatTime: function(date) {
		let mm = date.getMonth();
		let dd = date.getDate();
		let yyyy = date.getFullYear();

		if(mm === 0) {
			mm = 12;
			yyyy--;
		}
		return mm + '/' + dd + '/' + yyyy;
	},

	generateFilePrefix: function() {
		return '' + Date.now();
	}
};

module.exports = Utility;
