import {books} from "../models/index.js";
import NotFound from "../errors/NotFound.js";

class BookController {

  static getAll = async (req, res, next) => {
    try {
      const booksResult = await books.find()
        .populate("author")
        .exec();
      res.status(200).json(booksResult);
    } catch(error) {
      next(error);
    }

  };
  
  static getByPublisher = async (req, res, next) => {
    try {
      const publisher = req.query.publisher;
      const booksResult = await books.find({"publisher": publisher}, {});
      res.status(200).send(booksResult);
    } catch (error) {
      next(error);
    }
  };

  static getById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const bookResult = await books.findById(id)
        .populate("author", "name")
        .exec();

      if (bookResult !== null) {
        res.status(200).send(bookResult);
      } else {
        next(new NotFound("Book not found."));
      }
    } catch(error) {
      next(error);
    }
  };

  static new = async (req, res, next) => {
    try {
      let book = new books(req.body);
      const bookResult = await book.save();
      res.status(201).send(bookResult.toJSON());
    } catch(error) {
      next(error);
    }
  };

  static update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const bookResult = await books.findByIdAndUpdate(id, {$set: req.body});
      if (bookResult != null) {
        res.status(200).send({message: "Book updated."});
      } else {
        next(new NotFound("Book not found"));
      }
    } catch(error) {
      next(error);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const id = req.params.id;
      const bookResult = await books.findByIdAndDelete(id);
      if (bookResult != null) {
        res.status(200).send({message: "Book deleted."});
      } else {
        next(new NotFound("Book not found"));
      }
    } catch(error) {
      next(error);
    }
  };
  
}

export default BookController;
