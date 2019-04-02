'use strict';

const router = require("express").Router();
const {todoController} = require('../controllers');

router.post('/todos', async (req, res) => {
    const title = req.body.title;

    try {
        const todo = await todoController.create(title);
        res.status(201).send(todo);
    } catch (error) {
        res.status(400).send(error)
    }
});

router.get('/todos', async (_, res) => {
    try {
        const todo = await todoController.list();
        res.status(201).send(todo);
    } catch (error) {
        res.status(400).send(error)
    }
});

router.get('/todos/:todoId', async (req, res) => {
    const todoId = req.params.todoId;

    try {
        const todo = await todoController.retrieve(todoId);
        res.status(201).send(todo);
    } catch (error) {
        res.status(400).send(error)
    }
});

router.put('/todos/:todoId', async (req, res) => {
    const todoId = req.params.todoId;
    const title = req.body.title;

    try {
        const todo = await todoController.update(todoId, title);
        res.status(201).send(todo);
    } catch (error) {
        res.status(400).send(error)
    }
});

router.delete('/todos/:todoId', async (req, res) => {
    const todoId = req.params.todoId;

    try {
        const todo = await todoController.destroy(todoId);
        res.status(201).send(todo);
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = router;
