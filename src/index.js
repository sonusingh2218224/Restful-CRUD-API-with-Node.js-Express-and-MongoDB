const express = require("express");
const res = require("express/lib/response");
require("./database/connect");
const Student = require("./models/students");
const port = process.env.port || 3000;
const app = express();

//read then get method
// app.get("/", (req, res) => {
//   res.send("students are come");
// });

//create a new students

//create  then post http method
app.use(express.json());
//express.json() is a methoed inbuilt to reconginze the incoming request object as JSON object. this method is called a middleware
// app.post("/students", (req, res) => {
//   const user = new Student(req.body);

//   console.log(req.body);
//   user
//     .save()
//     .then(() => {
//       res.status(201).send(user);
//     })
//     .catch((e) => {
//       res.status(400).send(e);
//     });
// });
// create then post
app.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

// read then get restapi

app.get("/students", async (req, res) => {
  try {
    const readuser = await Student.find();
    res.send(readuser);
    console.log(readuser);
  } catch (error) {
    res.send(error);
  }
});
//indivisual students data using id
app.get("/students/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const studentData = await Student.find({ name });
    if (!studentData) {
      return res.status(400).send();
    } else {
      res.send(studentData);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//update the students by id
app.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateStudents = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(updateStudents);
  } catch (e) {
    res.status(404).send(e);
  }
});

//delete the students by is
app.delete("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteData = await Student.findByIdAndDelete(_id);
    if (req.params.id) {
      return res.status(404).send(deleteData);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
