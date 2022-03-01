const { nanoid } = require('nanoid');
const books = require('./books');

const addbookHandler = (request, h) => {
  const { name,year,author,summary,publisher,pageCount,readPage,finished, reading } = request.payload;
  
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
      });

    response.code(400);
    return response;
  };
  if (readPage >= pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  };


  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newbook = {
    name,year,author,summary,publisher,pageCount,readPage,finished, reading, id, createdAt, updatedAt,
  };
  books.push(newbook);

  const isSuccess = books.filter((b) => b.id == id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: { bookId: id },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'gagal',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};


const getAllbooksHandler = (request,h) => {
  const response = h.response({
    status: 'success',
    data: { books },
  });
  response.code(200);
  return response;
};

const getbookByIdHandler = (request,h) => {
  const {bookid} = request.params;
  const book = books.filter((n)=>n.id===bookid)[0];

  if(book!==undefined){
    const response = h.response({
      status: 'success',
      data: { book },
    });
    response.code(200);
    return response;

  }
  else{
    const response = h.response({
      status: 'fail',
      message:'Buku tidak ditemukan',
    });
    response.code(404);
    return response;

  };

};

const editbookByIdHandler = (request,h) => {
  const {bookid} = request.params;
  const {name,year,author,summary,publisher,pageCount,readPage,finished, reading} = request.payload;

  //checkinput
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });

    response.code(400);
    return response;
  };
  if (readPage >= pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  };

  const updatedAt = new Date().toISOString();
  const index = books.findIndex((n)=> n.id===bookid);
  
  if(index!==-1){
    books[index] = {
      ...books[index],
      name,year,author,summary,publisher,pageCount,readPage,finished, reading,updatedAt
    };
    const response = h.response({
      status : 'success',
      message:'buku berhasil diperbaharui'
    });
    response.code(200)
    return response;
  }else{
    const response = h.response({
      status : 'fail',
      message:'gagal memperbaharui buku. Id tidak ditemukan'
    });
    response.code(404)
    return response;
  }
};

const deletebookByIdHandler = (request,h) => {
  const {bookid} = request.params;
  const index = books.findIndex((n)=> n.id===bookid);

  if(index!==-1){
   
    books.splice(index,1);
    const response = h.response({
      status : 'success',
      message:'buku berhasil dihapus'
    });
    response.code(200)
    return response;
  }else{
    const response = h.response({
      status : 'fail',
      message:'Buku gagal dihapus. Id tidak ditemukan'
    });
    response.code(404)
    return response;
  }  
}

module.exports = {addbookHandler,getAllbooksHandler,getbookByIdHandler,editbookByIdHandler,deletebookByIdHandler};
