const Todo =  require('../models/todo');

/**
 * List Todos
 */
exports.list = (req, h) => {
  return Todo.find({}).exec()
    .then((todo) => {
      return { todos: todo };
    }).catch((err) => {
      return { err: err };
    });
}

/**
 * Get Todo by ID
 */
exports.get = (req, h) => {  
  return Todo.findById(req.params.id).exec()
    .then((todo) => {
      if(!todo) {
        return { message: 'Itme not found' };
      }
      return { todo: todo };
    }).catch((err) => {
      return { err: err };
    });
}

/**
 * create new Todo
 */
exports.create = (req) => {
  const todoData = {
    id: req.payload.id,
    title: req.payload.title,
    content: req.payload.content,
  };

  return Todo.create(todoData)
    .then(todo => {
      return { message: "Created successfully", todo: todo };
    }).catch((err) => {
      return { err: err };
    });
}

/**
 * PUT | Update Todo by ID
 */
exports.update = (req) => {
  return Todo.findById(req.params.id).exec()
    .then(todo => {
      if (!todo) {
        return { err: 'Not Found!' };
      }

      todo.id = req.payload.id;
      todo.title = req.payload.title;
      todo.content = req.payload.content;
      todo.save();
    }).then(() => {
        return { message: "Updated Successfully" };
    }).catch(err => {
        return { err: err };
    });
}

/**
 * Delete toto by ID
 */
exports.remove = (req) => {
  return Todo.findById(req.params.id)
    .exec( (err, todo) => {
      if (err) return { dberror: err };
      if (!todo) return { message: 'Not Found' };

      todo.remove( err => {
        if (err) return { dberror: err };
        return { success: true };
      });
    });
}