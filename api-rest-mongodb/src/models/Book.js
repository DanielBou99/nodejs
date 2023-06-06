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
    required: [true, "Publisher is required"],
    enum: {
      values: ["Casa do Codigo", "Saraiva"],
      message: "The publisher {VALUE} is not allowed"
    }
  },
  pages: { 
    type: Number,
    min: [10, "The number of pages must be between 10 and 5000. Pages: {VALUE}"],
    max: [5000, "The number of pages must be between 10 and 5000. Pages: {VALUE}"]
  },
});

const books = mongoose.model("books", bookSchema);

export default books;
