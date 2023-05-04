import books from "../models/Book.js";

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
        res.status(404).send({message: `${id} - ID book not found.`});
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
      await books.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: "Book updated"});
    } catch(error) {
      next(error);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const id = req.params.id;
      await books.findByIdAndDelete(id);
      res.status(200).send({message: "Book deleted"});
    } catch(error) {
      next(error);
    }
  };
  
}

export default BookController;
