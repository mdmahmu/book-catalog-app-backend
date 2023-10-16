import { RequestHandler } from 'express';

const catchAsync =
  (fn: RequestHandler): RequestHandler =>
  async (req, res, next): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };

// const catchAsync = (fn: RequestHandler): RequestHandler => {
//   const asyncHandler: RequestHandler = async (
//     req,
//     res,
//     next
//   ): Promise<void> => {
//     try {
//       await fn(req, res, next);
//     } catch (error) {
//       next(error);
//     }
//   };
//   return asyncHandler;
// };

export default catchAsync;
