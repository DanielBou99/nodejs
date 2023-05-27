import IncorrectRequest from "./IncorrectRequest.js";

class ErrorValidation extends IncorrectRequest {
  constructor(error) {
    const errorsMessages = Object.values(error.errors)
      .map(error => error.message)
      .join("; ");
    super(`Error: ${errorsMessages}`);
  }
}
  
export default ErrorValidation;