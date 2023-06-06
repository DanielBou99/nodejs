import ErrorBase from "./ErrorBase.js";

class NotFound extends ErrorBase {
  constructor(message = "Endpoint not found") {
    super(message, 404);
  }
}

export default NotFound;