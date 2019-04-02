'use strict';

const {Todo, TodoItem} = require('../models');

const create = async (title) => {
    return await Todo
        .create({
            title: title,
        });
};

const list = async () => {
    return await Todo
        .findAll({
            include: [{
                model: TodoItem,
                as: 'todoItems',
            }],
        });
};

const retrieve = async (todoId) => {
    return await Todo
        .findByPk(todoId, {
            include: [{
                model: TodoItem,
                as: 'todoItems',
            }],
        });
};

const update = async (todoId, title) => {
    let todo = await Todo
        .findByPk(todoId, {
            include: [{
                model: TodoItem,
                as: 'todoItems',
            }],
        });

    if (!todo) {
        throw new Error("Todo not found");
    }

    return await todo
        .update({
            title: title || todo.title,
        });
};

const destroy = async (todoId) => {
    let todo = await Todo
        .findByPk(todoId);

    if (!todo) {
        throw new Error("Todo not found");
    }

    return await todo.destroy();
};

module.exports = {
    create,
    list,
    retrieve,
    update,
    destroy
};