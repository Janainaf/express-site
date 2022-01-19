const express = require("express");
const path = require("path");
const data = require("./data.json");
const port = 30010;
const app = express();

app.set("view engine", "pug");

app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/", function (req, res) {
  res.locals = data.projects;
  res.render("index", { data: data.projects });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
