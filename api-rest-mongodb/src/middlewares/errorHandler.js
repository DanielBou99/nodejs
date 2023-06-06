import mongoose from "mongoose";
import ErrorBase from "../errors/ErrorBase.js";
import IncorrectRequest from "../errors/IncorrectRequest.js";
import ErrorValidation from "../errors/ErrorValidation.js";
import NotFound from "../errors/NotFound.js";

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    new IncorrectRequest().sendRequest(res);
  } else if(error instanceof mongoose.Error.ValidationError) {
    new ErrorValidation(error).sendRequest(res);
  } else if (error instanceof NotFound) {
    error.sendRequest(res);
  } else {
    new ErrorBase().sendRequest(res);
  }
}

export default errorHandler;