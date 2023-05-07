import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  console.log(error);
  if (error instanceof mongoose.Error.CastError) {
    res.status(400).send({message: "Incorrect data requested"});
  } else if(error instanceof mongoose.Error.ValidationError) {
    const errorsMessages = Object.values(error.errors)
      .map(error => error.message)
      .join("; ");
    res.status(400).send({message: `Error: ${errorsMessages}`});
  } else {
    res.status(500).send({message: `${error.message} - Server Error`});
  }    
}

export default errorHandler;