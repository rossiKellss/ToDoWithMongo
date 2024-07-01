const express = require("express");
const noteModel = require("./connection");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  const result = await noteModel.find({});
  if (!result) {
    console.log("No notes available");
  }
  res.render("index", { files: result });
});
app.post("/create", async (req, res) => {
  const { title, desc } = req.body;
  const result = await noteModel.create({ title, desc });
  if (!result) {
    console.log("Error creating");
  }
  res.redirect("/");
});
app.get("/read/:id", async (req, res) => {
  const id = req.params.id;
  const selectedData = await noteModel.findById(id);
  if (!selectedData) {
    console.log("No notes found");
  }
  res.render("show", { data: selectedData });
});
app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;

  const findAndDelete = await noteModel.findByIdAndDelete(id);
  if (!findAndDelete) {
    console.log("Cannot delete");
  }
  res.redirect("/");
});
app.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  res.render("edit", { id });
});
app.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { newTitle, newDesc } = req.body;
  const update = await noteModel.findByIdAndUpdate(id, {
    title: newTitle,
    desc: newDesc,
  });
  if (!update) {
    console.log("update unsucessful");
  }
  res.redirect("/");
});

app.listen(5000, () => {
  console.log("App running on port 5000");
});
