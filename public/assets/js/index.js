var $noteHeader = $(".note-header");

var $newNote = $(".new-note");

var $listNotes = $(".list-container .list-group");

var $noteText = $(".note-textarea");

var $noteSave = $(".save-note");

//get all active notes
var activeNote = {};

var getNotes = function getNotes() {
  return $.ajax({
    url: "/api/notes",
    method: "GET",
  });
};
// getting the notes from the api
saveNote = (note) => {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST",
  });
};
//saving the note to the api

deleteNote = (id) => {
  return $.ajax({
    url: "api/notes/".concat(id),
    data: id,
    method: "DELETE",
  });
};
//function for deleting notes

// function for rendering the notes
renderActiveNote = () => {
  $noteSave.hide();

  if (activeNote.id) {
    $noteHeader.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteHeader.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteHeader.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteHeader.val("");
    $noteText.val("");
  }
};

var length = 8;
var timestamp = +new Date();
//timestamp for funsies

_getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

generateID = () => {
  var ts = timestamp.toString();
  var parts = ts.split("").reverse();
  var id = "";

  for (var i = 0; i < length; ++i) {
    var index = _getRandomInt(0, parts.length - 1);

    id += parts[index];
  }

  return id;
};

handleNoteSave = () => {
  var id = generateID();
  var newNote = {
    id: id,
    title: $noteHeader.val(),
    text: $noteText.val(),
  };
  saveNote(newNote).then(function (data) {
    getRenderNotes();
    renderActiveNote();
  });
};
//function for handling the the saved data of the note

handleNoteDelete = (event) => {
  event.stopImmediatePropagation();
  var note = $(this).parent(".list-group-item").data();

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(function (data) {
    var el = document.getElementById(note.id);
    el.remove();
  });
};
//function for handling the deletion of a note

handleNoteView = () => {
  activeNote = $(this).data();
  renderActiveNote();
};

handleNewNoteView = () => {
  activeNote = {};
  renderActiveNote();
};

handleRenderSaveBtn = () => {
  if (!$noteHeader.val().trim() || !$noteText.val().trim()) {
    $noteSave.hide();
  } else {
    $noteSave.show();
  }
};

//displaying notes from the db
renderlistNotes = (notes) => {
  $listNotes.empty();
  var listNotesItems = [];

  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];
    var $li = $("<li class='list-group-item'>").data(note);
    var $span = $("<span>").text(note.title);
    var $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
    );
    $li.append($span, $delBtn).attr("id", note.id);
    listNotesItems.push($li);
  }

  $listNotes.append(listNotesItems);
};

getRenderNotes = () => {
  return getNotes().then(function (data) {
    renderlistNotes(data);
  });
};

$noteSave.on("click", handleNoteSave);
$listNotes.on("click", ".list-group-item", handleNoteView);
$newNote.on("click", handleNewNoteView);
$listNotes.on("click", ".delete-note", handleNoteDelete);
$noteHeader.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

getRenderNotes();
