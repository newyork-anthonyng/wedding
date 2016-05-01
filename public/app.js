var fileUpload = function() {
  'use strict';

  function getSignedRequest(file, callback) {
    console.log('%c Getting signed request.', 'background-color: blue; color: white;');
    console.log('file:', file);

    const myUrl = '/image/sign_s3?file_name=' + file.name + '&file_type=' + file.type;

    $.ajax({
      url: myUrl,
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        callback(file, data.SignedRequest, data.url);
      }
    });
  }

  function uploadFile(file, signedRequest, url) {
    console.log('%c Uploading file');
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
      }
    });
  }

  return {
    getSignedRequest: getSignedRequest,
    uploadFile: uploadFile
  };
}();
