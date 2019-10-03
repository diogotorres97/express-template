const router = require('express').Router();
const { todoItemsController } = require('../controllers');

router.post('/todos/:todoId/items', async (req, res) => {
  const { content } = req.body;
  const { todoId } = req.params;

  try {
    const todoItem = await todoItemsController.create(content, todoId);
    res.status(201).send(todoItem);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put('/todos/:todoId/items/:todoItemId', async (req, res) => {
  const id = req.params.todoItemId;
  const { todoId } = req.params;
  const { content, complete } = req.body;

  try {
    const updatedTodoItem = await todoItemsController.update(id, todoId, content, complete);
    res.status(200).send(updatedTodoItem);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/todos/:todoId/items/:todoItemId', async (req, res) => {
  const id = req.params.todoItemId;
  const { todoId } = req.params;

  try {
    await todoItemsController.destroy(id, todoId);
    res.status(200).send();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.all('/todos/:todoId/items', (req, res) => res.status(405).send({
  message: 'Method Not Allowed',
}));

module.exports = router;
