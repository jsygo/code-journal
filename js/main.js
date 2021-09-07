/* global data */
/* exported data */
var $photoUrl = document.querySelector('#photo-url');
var $previewImg = document.querySelector('#preview-img');

function addPhoto(event) {
  $previewImg.setAttribute('src', $photoUrl.value);
}

$photoUrl.addEventListener('input', addPhoto);

var $entryForm = document.querySelector('form');

function formSubmit(event) {
  event.preventDefault();
  var formValues = {};

  formValues.title = $entryForm.elements.title.value;
  formValues.photoUrl = $entryForm.elements.photoUrl.value;
  formValues.notes = $entryForm.elements.notes.value;

  formValues.nextEntryId = data.nextEntryId;
  data.nextEntryId++;

  data.entries.unshift(formValues);

  $previewImg.setAttribute('src', 'images/placeholder-image-square.jpg');

  $entryForm.reset();
}

$entryForm.addEventListener('submit', formSubmit);
