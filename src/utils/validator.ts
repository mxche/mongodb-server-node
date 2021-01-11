/*
 * @author : cmx
 * @Date : 2021-01-11 10:01:16
 */
import validator from "validator"
import { UserDocument } from "../modules/user"
export interface RegisterInput extends Partial<UserDocument> {
  confirmPassword?: string
}
export interface validateResult {
  valid: Boolean
  errors: RegisterInput
}
export const validaterRegister =  (
  userName: string,
  password: string,
  confirmPassword?: string,
  email?: string
) => {
  let errors: RegisterInput = {}
  if (!userName || (userName && userName.length === 0)) {
    errors["userName"] = "用户名不能为空"
  }
  if (!password || (password && password.length === 0)) {
    errors["password"] = "密码不能为空"
  }
  if (!confirmPassword || (confirmPassword && confirmPassword.length === 0)) {
    errors["confirmPassword"] = "确认密码不能为空"
  }
  if (password && confirmPassword && password !== confirmPassword) {
    errors["confirmPassword"] = "两次密码输入不一致"
    errors["password"] = "两次密码输入不一致"
  }
  if (email && !validator.isEmail(email)) {
    errors["email"] = "邮箱不正确"
  }
  return { valid: Object.keys(errors).length === 0, errors }
}
