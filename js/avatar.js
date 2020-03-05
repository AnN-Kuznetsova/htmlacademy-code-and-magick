'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.upload input[type=file]');
  var setupUserPic = document.querySelector('.setup-user-pic');


  var matches = function (fileName) {
    return FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  var onReaderLoad = function (evt) {
    setupUserPic.src = evt.target.result;
  };

  var onFileChooserChange = function () {
    var file = fileChooser.files[0];
    var fileName = '';
    var reader;

    if (file) {
      fileName = file.name.toLowerCase();

      if (matches(fileName)) {
        reader = new FileReader();
        reader.addEventListener('load', onReaderLoad);
        reader.readAsDataURL(file);
      }
    }
  };

  var setAvatar = function () {
    fileChooser.addEventListener('change', onFileChooserChange);
  };


  window.avatar = setAvatar;
})();
