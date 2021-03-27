const express = require("express");

const path = require("path");

const app = express();

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(routes);

app.use(express.static(path.join(__dirname, "public")));

require("./public/assets/routes/htmlRoute")(app);

require("./public/assets/routes/apiRoute")(app);

app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));

module.exports = express();
