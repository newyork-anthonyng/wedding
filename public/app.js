var fileUpload = function() {
  'use strict';

  function getSignedRequest(file, callback) {
    const myUrl = '/image/sign_s3?file_name=' + file.name + '&file_type=' + file.type;

    $.ajax({
      url: myUrl,
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        callback(file, data.signedRequest, data.url);
      }
    });
  }

  function uploadFile(file, signedRequest, url, callback) {
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
        callback();
      }
    });
  }

  return {
    getSignedRequest: getSignedRequest,
    uploadFile: uploadFile
  };
}();
