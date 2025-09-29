//Import expressjs into our file
const express = require('express');
//Import the path variable from node
const path = require('path');
//Setup express inside a constant named app
const app = express();
//Save port address in a variable for an easy change later
const PORT = 3000;

// Middleware to parse JSON request bodies (needed for POST/PUT)
app.use(express.json());

// Tell express to use its static server method and set the path to /public
app.use(express.static(path.join(__dirname, 'public')));

// ----------------- CRUD ROUTES START HERE -----------------

// Temporary storage for tasks (in-memory array, clears when server restarts)
let tasks = [];

// CREATE: Add a new task
app.post('/tasks', (req, res) => {
  // Every task will have an auto-increment id and text from the body
  const task = { id: tasks.length + 1, text: req.body.text };
  tasks.push(task);
  res.status(201).json(task); // respond with the new task
});

// READ: Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks); // return all tasks as JSON
});

// UPDATE: Edit a task by its ID
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.text = req.body.text; // update the text
    res.json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

// DELETE: Remove a task by ID
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id); // keep only tasks not matching id
  res.status(204).send(); // no content
});

// ----------------- CRUD ROUTES END -----------------

//Start the express server on port 3000 and run a callback that logs once it has started
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
