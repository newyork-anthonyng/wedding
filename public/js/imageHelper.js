var imageHelper = (function() {

	function getAllImages(callback) {
		$.ajax({
			url: 'image/all',
			method: 'GET',
			dataType: 'json',
			success: function(data) {
				callback(data);
			}
		});
	}

	return {
		getAllImages: getAllImages
	}
})();
