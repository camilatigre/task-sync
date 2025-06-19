import { AppError } from '../errors/app-error';

describe('AppError', () => {
  it('should create an AppError with message and statusCode', () => {
    const error = new AppError('Not found', 404);
    expect(error.message).toBe('Not found');
    expect(error.statusCode).toBe(404);
    expect(error.name).toBe('AppError');
  });

  it('should default statusCode to 500', () => {
    const error = new AppError('Something went wrong');
    expect(error.statusCode).toBe(500);
  });
});
