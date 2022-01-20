const express = require("express");
const path = require("path");
const data = require("./data.json");
const port = 3000;
const app = express();

app.set("view engine", "pug");

app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.locals = data.projects;
  res.render("index", { data: data.projects });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/projects/:id", function (req, res) {
  res.locals = data;
  const id = req.params.id;
  res.render("project", { project: data.projects[id] });
  // have to check for length - error if not found
  // and /0 is awful
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
