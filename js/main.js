/* global data */
/* exported data */

// dealing with form submission

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

  $entriesList.prepend(buildEntryTree(formValues));

  $previewImg.setAttribute('src', 'images/placeholder-image-square.jpg');

  $entryForm.reset();

  setView('entries');
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
  $img.setAttribute('src', entry.photoUrl);
  $img.setAttribute('class', 'full-width margin-b-1rem border-radius-4px');

  var $title = document.createElement('h3');
  $title.textContent = entry.title;

  var $notes = document.createElement('p');
  $notes.textContent = entry.notes;

  $li.append($row);
  $row.append($imgColumn, $textColumn);
  $imgColumn.append($img);
  $textColumn.append($title, $notes);

  return $li;
}

var $entriesList = document.querySelector('ul');

function contentLoadedHandler(event) {
  for (var i = 0; i < data.entries.length; i++) {
    $entriesList.append(buildEntryTree(data.entries[i]));
  }

  var previousView = data.view;
  setView(previousView);
}

window.addEventListener('DOMContentLoaded', contentLoadedHandler);

// view swapping

var $navBar = document.querySelector('header');
var $views = document.querySelectorAll('main div[data-view]');

function swapPages(event) {
  if (!event.target.matches('a[data-view]')) {
    return;
  }

  var dataView = event.target.getAttribute('data-view');
  setView(dataView);
}

$navBar.addEventListener('click', swapPages);

function setView(view) {
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === view) {
      $views[i].setAttribute('class', '');
      data.view = view;
    } else {
      $views[i].setAttribute('class', 'hidden');
    }
  }
}

var $newButton = document.querySelector('#new-button');
$newButton.addEventListener('click', function () {
  setView('entry-form');
});
