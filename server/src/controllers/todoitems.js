'use strict';

const {TodoItem} = require('../models');

const create = async (content, todoId) => {
    return await TodoItem
        .create({
            content,
            todoId
        })
};

const update = async (id, todoId, content, complete) => {
    let todoItem = await TodoItem
        .findOne({
            where: {
                id,
                todoId,
            },
        });

    if (!todoItem) {
        throw new Error("TodoItem not found");
    }

    return await todoItem
        .update({
            content,
            complete,
        })
};

const destroy = async (id, todoId) => {
    let todoItem = await TodoItem
        .find({
            where: {
                id,
                todoId,
            },
        });

    if (!todoItem) {
        throw new Error("TodoItem not found");
    }

    return await todoItem.destroy();
};

module.exports = {
    create,
    update,
    destroy
};