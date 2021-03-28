const express = require("express");

let path = require("path");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

require("./routes/apiRoute")(app);

require("./routes/htmlRoute")(app);

var PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
