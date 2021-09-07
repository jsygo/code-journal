/* global data */
/* exported data */
var $photoUrl = document.querySelector('#photo-url');
var $previewImg = document.querySelector('#preview-img');

function addPhoto(event) {
  $previewImg.setAttribute('src', $photoUrl.value);
}

$photoUrl.addEventListener('input', addPhoto);
