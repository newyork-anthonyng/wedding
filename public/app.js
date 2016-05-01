var fileUpload = function() {

  function getSignedRequest(file, callback) {
    console.log('%c Getting signed request.', 'background-color: blue; color: white;');
    console.log('file:', file);

    var myUrl = '/image/sign_s3?file_name=' + file.name + '&file_type=' + file.type;

    $.ajax({
      url: myUrl,
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        console.log('data from signed request:', data);
        callback(file, data.SignedRequest, data.url);
      }
    });
  }

  function uploadFile(file, signedRequest, url, callback) {
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
        callback();
      }
    });
  }

  function updateDatabase(data) {
    console.log('Updating database.');

    $.ajax({
      url: '/image/upload',
      data: data,
      success: function() {
        console.log('%c Database successfully updated.', 'background-color: green; color: white;');
      }
    });
  }

  return {
    getSignedRequest: getSignedRequest,
    uploadFile: uploadFile,
    updateDatabase: updateDatabase
  };
}();
