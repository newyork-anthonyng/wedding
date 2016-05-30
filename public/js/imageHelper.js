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
		var $allImages = $('<div>');

		for(var i = 0; i < images.length; i++) {
			var $container = $('<div>', {
				class: 'imgContainer'
			});
			var $img = $('<img>', {
				class: 'lazy',
				'data-original': images[i]['url']
			});

			$img.click(function() {
				openModal(this);
			});

			$container.append($img);
			$allImages.append($container);
		}

		var $album = $('#album');
		$album.append($allImages);

		window.setTimeout(function() {
			$('img.lazy').lazyload({
				effect: 'fadeIn'
			});
		}, 1000);
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
