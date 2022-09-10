var mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://127.0.0.1:27017/todo-api");
mongoose.Promise = Promise;
module.exports.Todo = require("./todo");
