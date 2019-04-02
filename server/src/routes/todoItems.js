'use strict';
let router = require("express").Router();
const {todoItemsController} = require('../controllers');

router.post('/todos/:todoId/items', async (req, res) => {
    const content = req.body.content;
    const todoId = req.params.todoId;

    try {
        const todoItem = await todoItemsController.create(content, todoId);
        res.status(201).send(todoItem);
    } catch (error) {
        res.status(400).send(error)
    }
});

router.put('/todos/:todoId/items/:todoItemId', async (req, res) => {
    const id = req.params.todoItemId;
    const todoId = req.params.todoId;
    const content = req.body.content || todoItem.content;
    const complete = req.body.complete || todoItem.complete;

    try {
        const updatedTodoItem = await todoItemsController.update(id, todoId, content, complete);
        res.status(200).send(updatedTodoItem);
    } catch (error) {
        res.status(400).send(error)
    }
});

router.delete('/todos/:todoId/items/:todoItemId', async (req, res) => {
    const id = req.params.todoItemId;
    const todoId = req.params.todoId;

    try {
        const todoItem = await todoItemsController.destroy(id, todoId);
        res.status(204).send();
    } catch (error) {
        res.status(400).send(error)
    }
});

router.all('/todos/:todoId/items', (req, res) =>
    res.status(405).send({
        message: 'Method Not Allowed',
    }));

module.exports = router;



