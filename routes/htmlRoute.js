const path = require("path");

const express = require("express");

const app = express();

module.exports = (app) => {
  app.get("/", function (req, res) {
    res.sendfile(path.join(__dirname, "../public/index.html"));
  });
  app.get("/notes", function (req, res) {
    res.sendfile(path.join(__dirname, "../public/notes.html"));
  });
};
