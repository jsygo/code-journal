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

  formValues.entryId = data.nextEntryId++;

  data.entries.unshift(formValues);

  $previewImg.setAttribute('src', 'images/placeholder-image-square.jpg');

  $entryForm.reset();
}

$entryForm.addEventListener('submit', formSubmit);

/*  <li>
      <div class="row">
        <div class="column-half">
          <img
            src="photoUrl"
            alt=""
            class="full-width margin-b-1rem border-radius-4px">
        </div>
        <div class="column-half">
          <h3>Title</h3>
          <p>Notes</p>
        </div>
      </div>
    </li> */
function buildEntryTree(entry) {
  var $li = document.createElement('li');

  var $row = document.createElement('div');
  $row.setAttribute('class', 'row');

  var $imgColumn = document.createElement('div');
  $imgColumn.setAttribute('class', 'column-half');

  var $textColumn = document.createElement('div');
  $textColumn.setAttribute('class', 'column-half');

  var $img = document.createElement('img');
  $img.setAttribute('src', '');
  $img.setAttribute('class', 'full-width margin-b-1rem border-radius-4px');
}
