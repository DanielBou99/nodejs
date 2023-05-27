import ErrorBase from "./ErrorBase.js";

class IncorrectRequest extends ErrorBase {
  constructor(message = "Incorrect data requested") {
    super(message, 400);
  }
}
  
export default IncorrectRequest;