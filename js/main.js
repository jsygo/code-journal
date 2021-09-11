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
var $formHeading = document.querySelector('div[data-view="entry-form"] h1');

function formSubmit(event) {
  event.preventDefault();
  var formValues = {};

  formValues.title = $entryForm.elements.title.value;
  formValues.photoUrl = $entryForm.elements.photoUrl.value;
  formValues.notes = $entryForm.elements.notes.value;

  if (data.editing !== null) {
    var editedEntry;
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing.entryId === data.entries[i].entryId) {
        data.entries[i].title = formValues.title;
        data.entries[i].photoUrl = formValues.photoUrl;
        data.entries[i].notes = formValues.notes;

        editedEntry = buildEntryTree(data.entries[i]);
      }
    }
    var querySelectorEntryId = 'li[data-entry-id="' + data.editing.entryId + '"]';
    var nodeToEdit = document.querySelector(querySelectorEntryId);
    nodeToEdit.replaceWith(editedEntry);

    $saveButtonColumn.setAttribute('class', 'column-full text-align-right');

    $deleteEntry.setAttribute('class', 'delete hidden');

    data.editing = null;
  } else {
    formValues.entryId = data.nextEntryId++;

    data.entries.unshift(formValues);

    $entriesList.prepend(buildEntryTree(formValues));
  }

  $previewImg.setAttribute('src', 'images/placeholder-image-square.jpg');

  $entryForm.reset();

  $formHeading.textContent = 'New Entry';

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
          <div class="row justify-between">
            <h3>Title</h3>
            <i class="fas fa-pen"></i>
          </div>
          <div class="row">
            <p>Notes</p>
          </div>
        </div>
      </div>
    </li> */

function buildEntryTree(entry) {
  var $entry = document.createElement('li');
  $entry.setAttribute('data-entry-id', entry.entryId);

  var $row = document.createElement('div');
  $row.setAttribute('class', 'row');

  var $imgColumn = document.createElement('div');
  $imgColumn.setAttribute('class', 'column-half');

  var $textColumn = document.createElement('div');
  $textColumn.setAttribute('class', 'column-half');

  var $titleRow = document.createElement('div');
  $titleRow.setAttribute('class', 'row justify-between');

  var $notesRow = document.createElement('div');
  $notesRow.setAttribute('class', 'row');

  var $img = document.createElement('img');
  $img.setAttribute('src', entry.photoUrl);
  $img.setAttribute('class', 'full-width margin-b-1rem border-radius-4px');

  var $title = document.createElement('h3');
  $title.textContent = entry.title;

  var $editIcon = document.createElement('i');
  $editIcon.setAttribute('class', 'fas fa-pen');
  $editIcon.setAttribute('data-entry-id', entry.entryId);

  var $notes = document.createElement('p');
  $notes.textContent = entry.notes;

  $entry.append($row);
  $row.append($imgColumn, $textColumn);
  $imgColumn.append($img);
  $textColumn.append($titleRow, $notesRow);
  $titleRow.append($title, $editIcon);
  $notesRow.append($notes);

  return $entry;
}

var $entriesList = document.querySelector('ul');

var $deleteEntry = document.querySelector('a.delete');

var $saveButtonColumn = document.querySelector('#save-button-column');

function editIconClick(event) {
  if (!event.target.matches('i')) {
    return;
  }

  $formHeading.textContent = 'Edit Entry';

  setView('entry-form');

  for (var i = 0; i < data.entries.length; i++) {
    if (JSON.stringify(data.entries[i].entryId) === event.target.getAttribute('data-entry-id')) {
      data.editing = data.entries[i];
    }
  }

  $previewImg.setAttribute('src', data.editing.photoUrl);
  $entryForm.elements.title.value = data.editing.title;
  $entryForm.elements.photoUrl.value = data.editing.photoUrl;
  $entryForm.elements.notes.value = data.editing.notes;

  $saveButtonColumn.setAttribute('class', 'column-full justify-between');

  $deleteEntry.setAttribute('class', 'delete');

  $deleteEntry.addEventListener('click', deleteEntryModal);
}

function deleteEntryModal(event) {
  $deleteEntryModal.setAttribute('class', 'modal center-content');
}

var $deleteEntryModal = document.querySelector('div.modal');

function cancelDelete() {
  $deleteEntryModal.setAttribute('class', 'modal center-content hidden');
}

function confirmDelete() {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === data.editing.entryId) {
      data.entries.splice(i, 1);
    }
  }

  var querySelectorEntryId = 'li[data-entry-id="' + data.editing.entryId + '"]';
  var nodeToDelete = document.querySelector(querySelectorEntryId);
  $entriesList.removeChild(nodeToDelete);

  $deleteEntryModal.setAttribute('class', 'modal center-content hidden');

  setView('entries');
}

function cancelOrConfirmDelete(event) {
  if (event.target.matches('.modal-cancel-button')) {
    cancelDelete();
  }
  if (event.target.matches('.modal-confirm-button')) {
    confirmDelete();
    data.editing = null;
    $entryForm.reset();
    $previewImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}

$deleteEntryModal.addEventListener('click', cancelOrConfirmDelete);

$entriesList.addEventListener('click', editIconClick);

function generateEntriesList() {
  for (var i = 0; i < data.entries.length; i++) {
    $entriesList.append(buildEntryTree(data.entries[i]));
  }
}

function contentLoadedHandler(event) {
  generateEntriesList();

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

  if (data.editing !== null) {
    $saveButtonColumn.setAttribute('class', 'column-full text-align-right');

    $deleteEntry.setAttribute('class', 'delete hidden');

    $previewImg.setAttribute('src', 'images/placeholder-image-square.jpg');

    $entryForm.reset();

    $formHeading.textContent = 'New Entry';

    data.editing = null;
  }

  var dataView = event.target.getAttribute('data-view');
  setView(dataView);
}

$navBar.addEventListener('click', swapPages);

var $noEntries = document.querySelector('div.no-entries');

function setView(view) {
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === view) {
      $views[i].setAttribute('class', '');
      data.view = view;
    } else {
      $views[i].setAttribute('class', 'hidden');
    }
  }

  if (data.entries.length === 0) {
    $noEntries.setAttribute('class', 'row no-entries');
  } else {
    $noEntries.setAttribute('class', 'row no-entries hidden');
  }
}

var $newButton = document.querySelector('#new-button');
$newButton.addEventListener('click', function () {
  setView('entry-form');
});

// search bar

var $searchIcon = document.querySelector('.fa-search');
var $searchBar = document.querySelector('.search-bar');

function searchIconClick(event) {
  setView('entries');

  $searchBar.setAttribute('class', 'search-bar push-right margin-r-1rem border-radius-4px');

  $searchBar.focus();
}

$searchIcon.addEventListener('click', searchIconClick);

function searchBarBlur(event) {
  $searchBar.setAttribute('class', 'search-bar push-right margin-r-1rem border-radius-4px invisible');

  var $entriesNodeList = document.querySelectorAll('li');

  for (var i = 0; i < $entriesNodeList.length; i++) {
    $entriesNodeList[i].setAttribute('class', '');
  }

  $searchBar.value = null;
}

$searchBar.addEventListener('blur', searchBarBlur);

function searchBarInput(event) {
  var $entriesNodeList = document.querySelectorAll('li');

  for (var i = 0; i < $entriesNodeList.length; i++) {
    var $entryTitle = $entriesNodeList[i].querySelector('h3');
    var $entryNote = $entriesNodeList[i].querySelector('p');

    if (!$entryTitle.textContent.toLowerCase().includes($searchBar.value.toLowerCase())) {
      if (!$entryNote.textContent.toLowerCase().includes($searchBar.value.toLowerCase())) {
        $entriesNodeList[i].setAttribute('class', 'hidden');
      } else {
        $entriesNodeList[i].setAttribute('class', '');
      }
    } else {
      $entriesNodeList[i].setAttribute('class', '');
    }
  }
}

$searchBar.addEventListener('input', searchBarInput);
