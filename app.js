const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const {getTodos, getTodoById, updateTodoById, createTodo} = require('./controllers/todoController')

app.use(express.json())


app.post('/todos', async(req, res) => {
    const todo = req.body;
    await createTodo(todo);
    res.status(200).json({"msg":"todo has been created"})
});

app.get('/todos', async(req, res) => {
    const todos = await getTodos();
    res.status(200).json(todos)
});

app.get('/todos/:todoId', async (req, res) => {
    const todos = await getTodoById(req.params.todoId);
    res.status(200).json(todos[0])
});

app.put('/todos/:todoId', async (req, res) => {
    const todo = req.body;
    await updateTodoById(todo);
    res.status(200).json({"msg":"todo has been updated"})
});

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log("connected to todo api")
});