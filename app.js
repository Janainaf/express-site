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
  const id = parseFloat(req.params.id) - 1;
  //needs to check if projects/ is not a number
  if (id >= data.projects.length || isNaN(id)) {
    res.render("error");
  } else {
    res.render("project", { project: data.projects[id] });
  }
});

app.get("*", function (req, res) {
  res.render("error");
});

app.use(function (req, res, next) {
  res.status(404).render("error");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
