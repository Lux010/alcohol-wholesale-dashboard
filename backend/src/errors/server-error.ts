import { CustomError } from "./custom-error";

export class ServerError extends CustomError {
  statusCode = 500;

  constructor(public message: any) {
    super(JSON.stringify(message));

    Object.setPrototypeOf(this, ServerError.prototype);
  }

  serializeErrors() {
    return [{ message: JSON.stringify(this.message) }];
  }
}
