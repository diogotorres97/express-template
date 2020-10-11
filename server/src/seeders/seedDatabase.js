const { User } = require('../models');

const {
  todoController,
  todoItemsController,
} = require('../controllers');

const initializeUsers = async () => {
  await Promise.all([
    User.create({ email: 'john@template.com', password: 'john' }),
    User.create({ email: 'jane@template.com', password: 'jane' }),
    User.create({ email: 'test@template.com', password: 'test' }),
  ]);
};

const initializeTodos = async () => {
  await Promise.all([
    todoController.create('My First Todo'),
    todoController.create('Lorem impsum'),
    todoController.create('Buy some books'),
  ]);
};

const initializeTodoItems = async () => {
  await Promise.all([
    todoItemsController.create('My First Todo Item', 1),
    todoItemsController.create('Random', 1),
    todoItemsController.create('The Monkey Test', 3),
  ]);
};

const initializeDatabase = async () => {
  await initializeUsers();
  await initializeTodos();
  await initializeTodoItems();
};

module.exports = {
  initializeDatabase,
};
