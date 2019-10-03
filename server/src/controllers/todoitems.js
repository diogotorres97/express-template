const { TodoItem } = require('../models');

const create = async (content, todoId) => TodoItem.create({
  content,
  todoId,
});

const update = async (id, todoId, content, complete) => {
  const todoItem = await TodoItem.findOne({
    where: {
      id,
      todoId,
    },
  });

  if (!todoItem) {
    throw new Error('TodoItem not found');
  }

  return todoItem.update({
    content,
    complete,
  });
};

const destroy = async (id, todoId) => {
  const todoItem = await TodoItem.findOne({
    where: {
      id,
      todoId,
    },
  });

  if (!todoItem) {
    throw new Error('TodoItem not found');
  }

  return todoItem.destroy();
};

module.exports = {
  create,
  update,
  destroy,
};
