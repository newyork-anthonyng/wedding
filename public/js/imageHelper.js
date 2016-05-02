var imageHelper = (function() {

	function getAllImages(callback) {
		$.ajax({
			url: 'image/all',
			method: 'GET',
			dataType: 'json',
			success: function(data) {
				callback(data['Images']);
			}
		});
	}

	function showAllImages(images) {
		var allImages = '';

		for(var i = 0; i < images.length; i++) {
			// create image tag with src
			console.log(images[i]['url']);
			var currentImage = '<img src="' + images[i]['url'] + '">';
			allImages += currentImage;
		}

		var $album = $('#album');
		$album.append(allImages);
	}

	return {
		getAllImages: getAllImages,
		showAllImages: showAllImages
	}
})();
