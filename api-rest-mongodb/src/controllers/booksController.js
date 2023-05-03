import books from "../models/Book.js";

class BookController {

  static getAll = (req, res) => {
    books.find()
      .populate('author')
      .exec((err, books) => {
        res.status(200).json(books);
      });
  };
  
  static getByPublisher = (req, res) => {
    const publisher = req.query.publisher;
    books.find({'publisher': publisher}, {}, (err, books) => {
      res.status(200).send(books);
    });
  };

  static getById = (req, res) => {
    const id = req.params.id;
    books.findById(id)
      .populate('author', 'name')
      .exec((err, book) => {
        if (err) {
          res.status(400).send({message: `${err.message} - Error finding book by id`});
        } else {
          res.status(200).json(book);
        }
      });
  };

  static new = (req, res) => {
    let book = new books(req.body);
    book.save((err) => {
      if (err) {
        res.status(500).send({message: `${err.message} - Error saving book`});
      } else {
        res.status(201).send(book.toJSON());
      }
    });
  };

  static update = (req, res) => {
    const id = req.params.id;
    books.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if (!err) {
        res.status(200).send({message: 'Book updated'})
      } else {
        res.status(500).send({message: `${err.message} - Error updating book`});
      }
    });
  };

  static delete = (req, res) => {
    const id = req.params.id;
    books.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({message: 'Book deleted'})
      } else {
        res.status(500).send({message: `${err.message} - Error deleting book`});
      }
    });
  };
  
}

export default BookController;
