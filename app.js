const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Todo = require('./todo');

dotenv.config();

const app = express();

const PORT = parseInt(process.env.PORT) || 3000;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

app.use(express.json());

app.get('/todo', async (_req, res) => {
  const allTodos = await Todo.find();
  return res.status(200).json(allTodos);
});

app.post('/todo', async (req, res) => {
  const newTodo = new Todo({ ...req.body });
  const created = await newTodo.save();
  return res.status(201).json(created);
});

const start = async () => {
  try {
    await mongoose.connect(DB_URI);
    app.listen(PORT, () => console.log('Server started on port 3000'));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
