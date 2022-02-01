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

app.get("/projects/:id", function (req, res, next) {
  res.locals = data;

  if (data.projects[req.params.id]) {
    res.render("project", { project: data.projects[req.params.id] });
  } else {
    const err = new Error();
    err.status = 404;
    err.message = "Looks like the project you requested does not exist";
    res.render("not-found");
    next(err);
  }
});

app.use(function (req, res) {
  console.log("404 error handler called ");
  res.status(404).render("not-found");
});

app.use(function (err, req, res) {
  if (err) {
    console.log("Global error handler called", err);
  }

  if (err.status === 404) {
    res.status(404).render("not-found", { err });
  } else {
    err.message =
      err.message ||
      "Oops! It looks like something went wrong on the server side";
    res.status(err.status || 500).render("error", { err });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
