const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

let books =[];
app.get('/getBooksapi', (req, res) => {
  console.log('inside the getBooksapi');
  res.json(books);
  
});
app.post('/addNewBooksapi', (req, res) => {
  console.log("inside the addNewBookapi");
  console.log('the list of books from the postman is :',req.body)
  
    if(req.body.id && req.body.title && req.body.author) {
      try{
      const newBook = {
        id: req.body.id,
        title: req.body.title,
        author: req.body.author
      };
      books.push(newBook);
      res.json(books);
    }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  else {
    res.status(400).json({ error: 'Invalid book data' });
  }

  console.log('the list of books after adding the new book is :',books);
});

app.put('/updateBooksapi', (req, res) => {
  console.log('inside the updateBookapi');
  const { id, title, author } = req.body;
  const bookIndex = books.findIndex(book => book.id === id);
  if (bookIndex !== -1) {
    books[bookIndex] = { id, title, author };
    res.json(books);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
  console.log('the list of books after updating the book is :',books);
});
app.delete('/deleteBooksapi', (req, res) => {
  console.log('inside the deleteBooksapi');
  const { id } = req.body;
  books = books.filter(book => book.id !== id);
  console.log('the list of books after deleting the book is :',books);
  res.json(books);
});