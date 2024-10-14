import {
  ENTITY_NOT_FOUND,
  ErrorCode,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} from './error.code';

export class ServiceException extends Error {
  readonly errorCode: ErrorCode;

  constructor(errorCode: ErrorCode, message?: string) {
    if (!message) {
      message = errorCode.message;
    }
    super(message);
    this.errorCode = errorCode;
  }
}

export const EntityNotFoundException = (message?: string): ServiceException => {
  return new ServiceException(ENTITY_NOT_FOUND, message);
};

export const UnauthorizedException = (message?: string): ServiceException => {
  return new ServiceException(UNAUTHORIZED, message);
};
export const InternalServerErrorException = (
  message?: string,
): ServiceException => {
  return new ServiceException(INTERNAL_SERVER_ERROR, message);
};
