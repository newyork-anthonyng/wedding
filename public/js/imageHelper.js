var imageHelper = (function() {
	var currentImages;
	var intervalTime = 5 * (60000);

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

	function setInterval(images) {
		currentImages = images.length;
		window.setInterval(function() {
			getAllImages(function(msg) {
				console.log('retrieving images');
				if(currentImages !== msg.length) {
					location.reload();
				}
			});
		}, intervalTime);
	}

	function showAllImages(images) {
		// check if new images have been uploaded
		setInterval(images);

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

		if(typeof $().lazyload !== 'undefined') {
			window.setTimeout(function() {
				$('img.lazy').lazyload({
					effect: 'fadeIn'
				});
			}, 1000);
		}
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
		populateSlideshow: populateSlideshow,
		setInterval: setInterval
	}
})();

imageHelper.getAllImages(imageHelper.showAllImages);

function openModal(e) {
	var modal = $('#album-modal');
	modal.css('display', 'block');
	$('#album-modal img').attr('src', e.src);
}

$(function() {
	$('.close').click(function() {
		var modal = $('#album-modal');
		modal.css('display', 'none');
	});

	window.onclick = function(e) {
		var modal = document.getElementById('album-modal');
		if(e.target == modal) {
			modal.style.display = 'none';
		}
	}
});
