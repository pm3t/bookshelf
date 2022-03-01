const {addbookHandler,getAllbooksHandler,getbookByIdHandler,editbookByIdHandler, deletebookByIdHandler} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addbookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllbooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: ()=>{}
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: ()=>{}
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: ()=>{}
  }
];

module.exports = routes;
