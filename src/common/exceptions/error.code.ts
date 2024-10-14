export class ErrorCode {
  readonly status: number;
  readonly message: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}

export const UNAUTHORIZED = new ErrorCode(401, 'Unauthorized');
export const ENTITY_NOT_FOUND = new ErrorCode(404, 'Entity Not Found');
export const INTERNAL_SERVER_ERROR = new ErrorCode(
  500,
  'Internal Server Error',
);
