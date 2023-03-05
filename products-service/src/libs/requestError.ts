export class ResponseError extends Error {
  statusCode: number;
  description: string;
  constructor({ message, statusCode = 500, description = null }) {
    super();
    Error.captureStackTrace(this, ResponseError);

    this.message = message;
    this.statusCode = statusCode;
    this.description = description;
  }
}
