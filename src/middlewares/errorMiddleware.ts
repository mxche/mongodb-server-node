/*
 * @author : cmx
 * @Date : 2021-01-08 16:57:30
 * @desc: 错误处理中间件
 */
import { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"
import HTTPException from "../exceptions/HTTPException"
export  const errorMiddleWare = (
  err: HTTPException,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message,
    error: err.error,
  })
}
