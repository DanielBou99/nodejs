import mongoose from "mongoose";
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

  static getById = async (req, res) => {
    try {
      const id = req.params.id;
      const authorResult = await authors.findById(id);

      if (authorResult !== null) {
        res.status(200).send(authorResult);
      } else {
        res.status(404).send({message: `${id} - ID Author not found.`});
      }
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        res.status(400).send({message: "Incorrect ID requested"});  
      } else {
        res.status(500).send({message: `${error.message} - Server Error`});
      }       
    }
  };

  static new = async (req, res) => {
    try {
      let author = new authors(req.body);
      await author.save();
      res.status(201).send(author.toJSON());
    } catch (error) {
      res.status(500).send({message: `${error.message} - Error saving author`});
    }
  };

  static update = async (req, res) => {
    try {
      const id = req.params.id;
      await authors.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: "author updated"});
    } catch (error) {
      res.status(500).send({message: `${error.message} - Error updating author`});
    }
  };

  static delete = async (req, res) => {
    try {
      const id = req.params.id;
      await authors.findByIdAndDelete(id);
      res.status(200).send({message: "author deleted"});
    } catch (error) {
      res.status(500).send({message: `${error.message} - Error deleting author`});
    }
  };
  
}

export default AuthorController;
