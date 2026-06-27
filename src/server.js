//jorgevalentefragoso@gmail.com

const express = require("express");

const app = express();
app.use(express.json());

const students = [
  { id: 1, name: "Ana", course: "QA Cloud Native" },
  { id: 2, name: "Luis", course: "DevSecOps" }
];

app.get("/", (req, res) => {
  res.json({
    app: "AWS QA Cloud Native Lab",
    status: "ok"
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.post("/students", (req, res) => {
  const { name, course } = req.body;

  if (!name || !course) {
    return res.status(400).json({
      error: "name and course are required"
    });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    course
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`API running on port ${port}`);
  });
}

module.exports = app;