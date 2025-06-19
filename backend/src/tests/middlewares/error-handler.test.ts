import { errorHandler } from '../../middlewares/error-handler';
import { AppError } from '../../errors/app-error';
import { Request, Response } from 'express';

describe('errorHandler middleware', () => {
  const mockReq = {} as Request;
  const mockNext = jest.fn();

  const getMockRes = () => {
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    return { status, json };
  };

  it('should handle AppError and return correct status and message', () => {
    const res = getMockRes() as unknown as Response;
    const error = new AppError('Not Found', 404);

    errorHandler(error, mockReq, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.status(404).json).toHaveBeenCalledWith({
      message: 'Not Found',
      statusCode: 404,
    });
  });

  it('should handle unknown errors and return 500', () => {
    const res = getMockRes() as unknown as Response;
    const unknownError = new Error('Something went wrong');

    errorHandler(unknownError as any, mockReq, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status(500).json).toHaveBeenCalledWith({
      message: 'Something went wrong',
      statusCode: 500,
    });
  });

  it('should return default message if none is provided', () => {
    const res = getMockRes() as unknown as Response;
    const error = new AppError('', 400);

    errorHandler(error, mockReq, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status(400).json).toHaveBeenCalledWith({
      message: 'Internal Server Error',
      statusCode: 400,
    });
  });
});
