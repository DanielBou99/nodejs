import authors from "../models/Author.js";

class AuthorController {

  static getAll = async (req, res) => {
    try {
      const authorsResult = await authors.find();
      res.status(200).json(authorsResult);
    } catch (error) {
      res.status(500).json({message: "Error to find authors"});
    }
  };

  static getById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const authorResult = await authors.findById(id);

      if (authorResult !== null) {
        res.status(200).send(authorResult);
      } else {
        res.status(404).send({message: `${id} - ID Author not found.`});
      }
    } catch (error) {
      next(error);
    }
  };

  static new = async (req, res, next) => {
    try {
      let author = new authors(req.body);
      await author.save();
      res.status(201).send(author.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static update = async (req, res, next) => {
    try {
      const id = req.params.id;
      await authors.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: "author updated"});
    } catch (error) {
      next(error);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const id = req.params.id;
      await authors.findByIdAndDelete(id);
      res.status(200).send({message: "author deleted"});
    } catch (error) {
      next(error);
    }
  };
  
}

export default AuthorController;
