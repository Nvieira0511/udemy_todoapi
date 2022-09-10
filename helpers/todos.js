var db = require("../models");

exports.getTodos = function (req, res) {
  db.Todo.find()
    .then(function (todos) {
      res.json(todos);
    })
    .catch(function (err) {
      res.send(err);
    });
};
exports.createTodo = function (req, res) {
  console.log("herer");
  db.Todo.create(req.body)
    .then(function (newTodo) {
      console.log(json(newTodo));
      res.status(201).json(newTodo);
      console.log("success");
    })
    .catch(function (err) {
      res.send(err);
    });
};
exports.getTodo = function (req, res) {
  db.Todo.findById(req.params.todoId)
    .then(function (foundTodo) {
      res.json(foundTodo);
    })
    .catch(function (err) {
      res.send(err);
    });
};
exports.updateTodo = function (req, res) {
  db.Todo.findOneAndUpdate({ _id: req.params.todoId }, req.body, { new: true })
    .then(function (todo) {
      res.json(todo);
    })
    .catch(function (err) {
      res.send(err);
    });
};
exports.deleteTodo = function (req, res) {
  db.Todo.remove({ _id: req.params.todoId }, req.body)
    .then(function () {
      res.json({ message: "deleted: " + req.params.todoId });
    })
    .catch(function (err) {
      res.send(err);
    });
};
module.exports = exports;
