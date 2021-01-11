/*
 * @author : cmx
 * @Date : 2021-01-11 15:13:54
 */
import HTTPException from "../exceptions/HTTPException"
import { StatusCodes } from "http-status-codes"
import { User } from "../modules/user"
import jwt from "jsonwebtoken"
import "dotenv/config"
const tokenValidate = async (req, res, next) => {
  const authorization = req.headers.authorization
  if (authorization) {
    const token = authorization.split(" ")[1]
    if (token) {
      try {
        const { id: userId } = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await User.findById(userId)
        if(user){
          res.json({
            success: true,
            data: user.toJSON(),
          })
        }
        else{
          next(new HTTPException(StatusCodes.UNAUTHORIZED, "无此用户"))
        }
      } catch (error) {
        next(error)
      }
    } else {
      next(new HTTPException(StatusCodes.UNAUTHORIZED, "token无效"))
    }
  } else {
    next(new HTTPException(StatusCodes.UNAUTHORIZED, "token未提供"))
  }
}
export { tokenValidate }
