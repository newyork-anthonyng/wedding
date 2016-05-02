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
			var currentImage = '<img src="' + images[i]['url'] + '">';
			allImages += currentImage;
		}

		var $album = $('#album');
		$album.append(allImages);
	}

	function populateSlideshow(carousel, images) {
		var allImages = '';

		for(var i = 0; i < images.length; i++) {
			var className = 'item';
			if(i === 0) className += ' active';

			var currentSlide =
				'<div class="' + className + '">' +
					'<img src="' + images[i]['url'] + '">' +
				'</div>';

			allImages += currentSlide;
		}

		carousel.append(allImages);
	}

	return {
		getAllImages: getAllImages,
		showAllImages: showAllImages,
		populateSlideshow: populateSlideshow
	}
})();
