import {books, authors} from "../models/index.js";
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
  
  static getByFilter = async (req, res, next) => {
    try {
      const search = await processSearch(req.query);
      if (search != null) {
        const booksResult = await books.find(search).populate("author");
        res.status(200).send(booksResult);
      } else {
        res.status(200).send([]);
      }
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

async function processSearch(params) {
  const { publisher, title, minPages, maxPages, authorName } = params;
  let search = {};
  if (publisher) search.publisher = publisher;
  if (title) search.title = { $regex: title, $options: "i" };
  if (minPages || maxPages) search.pages = {};
  if (minPages) search.pages.$gte = minPages;
  if (maxPages) search.pages.$lte = maxPages;
  if (authorName) {
    const author = await authors.findOne({name: authorName});
    if (author != null) {
      search.author = author._id;
    } else {
      search = null;
    }
  }
  return search;
}

export default BookController;
