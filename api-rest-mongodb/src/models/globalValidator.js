import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
  validator: (value) => value !== "",
  message: ({path}) =>  `Blank field ${path} is not allowed`
});
