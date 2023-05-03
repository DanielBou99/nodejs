import authors from "../models/Author.js";

class AuthorController {

  static getAll = (req, res) => {
    authors.find((err, authors) => {
      res.status(200).json(authors);
    });
  };

  static getById = (req, res) => {
    const id = req.params.id;
    authors.findById(id, (err, author) => {
      if (err) {
        res.status(400).send({message: `${err.message} - Error finding author by id`});
      } else {
        res.status(200).json(author);
      }
    });
  };

  static new = (req, res) => {
    let author = new authors(req.body);
    author.save((err) => {
      if (err) {
        res.status(500).send({message: `${err.message} - Error saving author`});
      } else {
        res.status(201).send(author.toJSON());
      }
    });
  };

  static update = (req, res) => {
    const id = req.params.id;
    authors.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if (!err) {
        res.status(200).send({message: 'author updated'})
      } else {
        res.status(500).send({message: `${err.message} - Error updating author`});
      }
    });
  };

  static delete = (req, res) => {
    const id = req.params.id;
    authors.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({message: 'author deleted'})
      } else {
        res.status(500).send({message: `${err.message} - Error deleting author`});
      }
    });
  };
  
}

export default AuthorController;
