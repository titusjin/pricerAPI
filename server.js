'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');

const TodoController =  require('./controllers/todoController');

/* Need to modified */
const MongoDBUrl = 'mongodb://localhost:27017/todoapi';

const server = new Hapi.Server({
  port: 3001,
  host: 'localhost'
});

server.route({
  method: 'GET',
  path: '/todos',
  handler: TodoController.list
});

server.route({
  method: 'GET',
  path: '/todos/{id}',
  handler: TodoController.get
});
server.route({
  method: 'POST',
  path: '/todos',
  handler: TodoController.create
});

server.route({
  method: 'PUT',
  path: '/todos/{id}',
  handler: TodoController.update
});

server.route({
  method: 'DELETE',
  path: '/todos/{id}',
  handler: TodoController.remove
});

(async () => {
  try {  
    await server.start();
    // Connect to Mongo through Mongoose
    mongoose
      .connect(MongoDBUrl, {})
      .then(() => { 
          console.info(`Connected to Mongo server`) 
        }, err => { 
          console.log(err) 
      });
  }
  catch (err) {  
    console.error(err)
  }
})();