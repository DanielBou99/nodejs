import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  id: { type: String },
  title: { 
    type: String, 
    required: [true, "Book title is required"] 
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "authors", required: [true, "Author is required"] 
  },
  publisher: { 
    type: String, 
    required: [true, "Publisher is required"] 
  },
  pages: { type: Number },
});

const books = mongoose.model("books", bookSchema);

export default books;
