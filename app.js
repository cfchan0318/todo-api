const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const {getTodos, getTodoById} = require('./controllers/todoController')

app.use(express.json())

app.get('/todos', async(req, res) => {
    const todos = await getTodos();
    res.status(200).json(todos)
});

app.get('/todos/:todoId', async (req, res) => {
    const todos = await getTodoById(req.params.todoId);
    res.status(200).json(todos)
});

app.put('/todos/:todoId', async (req, res) => {
    const todo = req.body.todo;
    
});

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log("connected to todo api")
});