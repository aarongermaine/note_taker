const noteData = require("../js/index");

const express = require("express");

const app = express();

const fs = require("fs");

const path = require("path");

// ROUTING

module.exports = (app) => {
  app.get("/api/notes", (req, res) => res.json(noteData));

  app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    noteData.push(newNote);
    fs.writeFile("Main/db/db.json", JSON.stringify(noteData));
    if (err) throw err;
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
};
