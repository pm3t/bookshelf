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
    path: '/books/{bookid}',
    handler: getbookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookid}',
    handler: editbookByIdHandler
  },
  {
    method: 'DELETE',
    path: '/books/{bookid}',
    handler: deletebookByIdHandler
  }
];

module.exports = routes;
