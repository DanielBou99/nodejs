import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { 
      type: String, 
      required: [true, "Author name is required"] 
    },
    country: {
      type: String,
      validate: {
        validator: (country) => {
          return country.toUpperCase() === "BRAZIL";
        },
        message: "The country {VALUE} is not allowed."
      }
    },
  },
  {
    versionKey: false
  }
);

const authors = mongoose.model("authors", authorSchema);

export default authors;
