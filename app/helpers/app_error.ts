export default class AppError extends Error {
    static BAD_REQUEST = 400;
    static VALIDATION_FAIL = 400;
    static UNAUTHORIZED = 401;
    static FORBIDDEN = 403;
    static NOT_FOUND = 404;
    static UNPROCESSABLE_ENTITY = 422;
    static GENERIC_ERROR = 500;

    status: number;

    constructor(status = 500, ...params: any[]) {
        super(...params);


        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, AppError);
        }

        this.status = status;
        this.name = 'AppError';
    }

  static E_INVALID_CREDENTIALS() {
    return new this(this.UNAUTHORIZED, 'INVALID_CREDENTIALS');
  }

  static E_BAD_REQUEST(message?: string) {
    return new this(this.BAD_REQUEST, message || 'BAD_REQUEST');
  }

  static E_VALIDATION_FAIL(message?: string) {
    return new this(this.VALIDATION_FAIL, message || 'VALIDATION_FAIL');
  }

  static E_UNAUTHORIZED(message?: string) {
    return new this(this.UNAUTHORIZED, message || 'UNAUTHORIZED');
  }

  static E_UNPROCESSABLE_ENTITY(message?: string) {
    return new this(this.UNPROCESSABLE_ENTITY, message || 'UNPROCESSABLE_ENTITY');
  }

  static E_FORBIDDEN(message?: string) {
    return new this(this.FORBIDDEN, message || 'FORBIDDEN');
  }

  static E_NOT_FOUND(message?: string) {
    return new this(this.NOT_FOUND, message || 'NOT_FOUND');
  }

  static E_GENERIC_ERROR(message?: string) {
    return new this(this.GENERIC_ERROR, message || 'GENERIC_ERROR');
  }
}