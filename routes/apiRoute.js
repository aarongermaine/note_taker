var noteData = require("../db/db.json");
var express = require("express");
var app = express();
var fs = require("fs");
var path = require("path");

require("./htmlRoutes")(app);

module.exports = (app) => {
  app.get("/api/notes", function (req, res) {
    res.json(noteData);
    console.log(
      "Received a ".concat(req.method, " request from ").concat(req.url)
    );
  });

  app.post("/api/notes", function (req, res) {
    console.log(
      "Received a ".concat(req.method, " request from ").concat(req.url)
    );
    var newNote = req.body;
    noteData.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(noteData), function (err) {
      if (err) throw err;
      console.log("Note ".concat(newNote.id, " added to db"));
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
  });

  app.delete("/api/notes/:id", function (req, res) {
    var deleteNote = req.params.id;
    var noteUpdate = noteData.filter(function (note) {
      return note.id !== deleteNote;
    });
    fs.writeFile("./db/db.json", JSON.stringify(noteUpdate), function (err) {
      if (err) throw err;
      console.log("Note ".concat(deleteNote, " deleted"));
      res.json({
        ok: true,
      });
    });
  });
};
