import { NextFunction, Request, Response } from "express";

const asyncErrorHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Error) => {
      return res.status(500).json({
        message: err.message || "Internal Server Error",
      });
    });
  };
};

export default asyncErrorHandler;
