var fileUpload = function() {

	function getSignedRequest(file) {
		console.log('%c Getting signed request.', 'background-color: blue; color: white;');
		console.log('file:', file);

		var myUrl = '/image/sign_s3?file_name=' + file.name + '&file_type=' + file.type;

		$.ajax({
			url: myUrl,
			method: 'GET',
			dataType: 'json',
			success: function(data) {
				console.log('data from signed request:', data);
				uploadFile(file, data.SignedRequest, data.url);
			}
		});
	}

	function uploadFile(file, signedRequest, url) {
		console.log('%c Uploading file', 'background-color: yellow;');
		console.log('file:', file);
		console.log('signedRequest:', signedRequest);
		console.log('url:', url);

		$.ajax({
			url: signedRequest,
			method: 'PUT',
			data: file,
			contentType: file.type,
			processData: false,
			beforeSend: function(xhr) {
				xhr.setRequestHeader('x-amz-acl', 'public-read');
			},
			success: function() {
				console.log('%c Photo successfully uploaded.', 'background-color: red; color: white;');
				updateDatabase({ url: url });
			}
		});
	}

	function updateDatabase(data) {
		console.log('Updating database.');
		console.log(data);

		$.ajax({
			url: '/image/upload',
			method: 'POST',
			data: data,
			success: function() {
				console.log('%c Database successfully updated.', 'background-color: green; color: white;');
				cleanupFileInput();
			}
		});
	}

	function cleanupFileInput() {
		var uploadForm = $('form')[0];
		uploadForm.reset();

		$('#upload-text').text('Photo uploaded!');
		setTimeout(function() {
			$('#upload-text').text('\xA0');
		}, 3000);
	}

	return {
		getSignedRequest: getSignedRequest,
		uploadFile: uploadFile,
		updateDatabase: updateDatabase
	};
}();
