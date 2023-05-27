class ErrorBase extends Error {
  constructor(message = "Server Intern Error", status = 500) {
    super();
    this.message = message;
    this.status = status;
  }

  sendRequest(res) {
    res.status(this.status).send({
      message: this.message,
      status: this.status
    });
  }
}

export default ErrorBase;