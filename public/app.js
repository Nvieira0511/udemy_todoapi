

/*global $ */
$(document).ready(function () {
  $.getJSON("/api/todos").then(addTodos);

  $("#todoInput").keypress(function (event) {
    if (event.which == 13) {
      createTodo();
    }
  });

  $(".list").on("click", "span", function (event) {
    event.stopPropagation();
    removeTodo($(this).parent());
  });

  $(".list").on("click", "li", function () {
    updateTodo($(this));
  });
});
function updateTodo(todo) {
  var updateUrl = 'api/todos/' + todo.data('id');
  var isDone = !todo.data('completed');
  var updateData = {completed: isDone}
  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: updateData
  })
  .then(function(updatedTodo){
    console.log("here");
    console.log(updatedTodo);
    todo.toggleClass("done");
    todo.data("completed", isDone);
  })
}
function createTodo() {
  var userInput = $("#todoInput").val();
  $.post("/api/todos", { name: userInput })
    .then(function (newTodo) {
      console.log(newTodo);
      $("#todoInput").val("");
      addTodo(newTodo);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function addTodo(todo) {
  var newTodo = $("<li>" + todo.name + todo.completed + "<span>X</span></li>");
  newTodo.data("id", todo._id);
  newTodo.data("completed", todo.completed);
  if (todo.completed) {
    newTodo.addClass("done");
  } else {
    newTodo.addClass("task");
  }
  $(".list").append(newTodo);
}

function addTodos(todos) {
  todos.forEach(function (todo) {
    addTodo(todo);
  });
}
function removeTodo(todo) {
  var clickedId = todo.data("id");
  var deleteUrl = "/api/todos/" + clickedId;
  $.ajax({
    method: "DELETE",
    url: deleteUrl,
  })
    .then(function (data) {
      console.log(todo._id);
      todo.remove();
    })
    .catch(function (err) {
      console.log(err);
    });
}
