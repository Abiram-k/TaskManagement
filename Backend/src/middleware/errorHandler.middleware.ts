import { Request, Response, NextFunction } from 'express';

export interface IError extends Error {
  statusCode?: number;
  message: string;
}

const errorHandler = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    statusCode: statusCode,
  });
};

export default errorHandler;
