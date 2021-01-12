/*
 * @author : cmx
 * @Date : 2021-01-08 18:06:44
 */
import { User } from "../modules/user"
import { validaterRegister } from "./../utils/validator"
import { StatusCodes } from "http-status-codes"
import HTTPException from "../exceptions/HTTPException"
// 注册用户
const registerModule = async (req, res, next) => {
  let { userName, password, confirmPassword, email } = req.body
  let { valid, errors } = validaterRegister(
    userName,
    password,
    confirmPassword,
    email
  )
  try {
    if (!valid) {
      throw new HTTPException(
        StatusCodes.UNPROCESSABLE_ENTITY,
        "用户提交数据不正确",
        errors
      )
    }
    let users = await User.findOne({ userName })
    if (users) {
      throw new HTTPException(StatusCodes.UNPROCESSABLE_ENTITY, "用户名重复")
    }
    let user = new User({ ...req.body })
    await user.save()
    res.json({
      success: true,
      message: "注册成功",
    })
  } catch (error) {
    next(error)
  }
}
// 登录校验
const loginMudule = async (req, res, next) => {
  let { userName, password } = req.body
  try {
    let users = await User.login(userName, password)
  if (!users) {
    throw new HTTPException(StatusCodes.UNAUTHORIZED, "登录失败，账号或者密码错误！",)
  } else {
    let token = await users.getToken()
    res.json({
      success:true,
      message:"登录成功",
      data:token
    })
    console.log(token)
  }
  } catch (error) {
    next(error)
  }
  
}

export { registerModule, loginMudule }
