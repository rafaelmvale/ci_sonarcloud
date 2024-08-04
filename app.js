const express = require('express')
const app = express()
app.use(express.json())

let tasks = [];

app.post('/tasks', (req, res) => {
    const {title} = req.body;
    if(!title) {
        return res.status(400).json({ error: 'Title is required'})
    }
    const task = {id: tasks.length + 1,title}

    tasks.push(task);

    res.status(201).json(task);
});

app.get('/tasks', (req, res) =>{
    res.json(tasks);
});

app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id != id);
    console.log(id, tasks)
    res.status(204).send();
  });

module.exports = app;