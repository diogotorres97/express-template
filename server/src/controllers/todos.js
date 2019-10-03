const { Todo, TodoItem } = require('../models');

const create = async (title) => Todo.create({
  title,
});

const list = async () => Todo.findAll({
  include: [{
    model: TodoItem,
  }],
});

const retrieve = async (todoId) => Todo.findByPk(todoId, {
  include: [{
    model: TodoItem,
  }],
});

const update = async (todoId, title) => {
  const todo = await Todo.findByPk(todoId, {
    include: [{
      model: TodoItem,
    }],
  });

  if (!todo) {
    throw new Error('Todo not found');
  }

  return todo.update({
    title: title || todo.title,
  });
};

const destroy = async (todoId) => {
  const todo = await Todo.findByPk(todoId);

  if (!todo) {
    throw new Error('Todo not found');
  }

  return todo.destroy();
};

module.exports = {
  create,
  list,
  retrieve,
  update,
  destroy,
};
