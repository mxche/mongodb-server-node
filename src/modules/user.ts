/*
 * @author : cmx
 * @Date : 2021-01-08 17:41:49
 */
import { Document, Model, model, Schema } from "mongoose"
import ItUser from "../intaface/user"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import "dotenv/config"
export interface UserDocument extends ItUser, Document {}
export interface UserModel extends Model<UserDocument> {
  login: (userName: string, password: string) => UserDocument | null
}
export const UserSachema: Schema<UserDocument> = new Schema(
  {
    userName: {
      type: String,
      required: true,
      // minlength:[6,'最小长度不能小于6位'],
      // maxlength:[10,'最大长度不能大于10位']
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "customer"],
      require: true,
    },
  },
  {
    collection: "user",
    versionKey: false,
    validateBeforeSave: true,
    timestamps: {
      createdAt: "create_at",
      updatedAt: "update_at",
    },
  }
)
UserSachema.set("toJSON", {
  transform: function (_doc: any, result: any) {
    result.id = result._id
    delete result._id
    delete result.__v
    delete result.password
    delete result.createdAt
    delete result.updatedAt
    return result
  },
})
UserSachema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }
  try {
    this.password = await bcryptjs.hash(this.password, 10)
    next()
  } catch (error) {
    next(error)
  }
})
UserSachema.static(
  "login",
  async function (this: any, userName: string, password: string) {
    let user = await this.findOne({ userName })
    if (user) {
      const match = await bcryptjs.compare(password, user.password)
      if (match) {
        return user
      } else {
        return null
      }
    } else {
      return null
    }
  }
)
UserSachema.methods.getToken = function (this: UserDocument) {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "24h",
  })
}

export const User: UserModel = model<UserDocument, UserModel>(
  "User",
  UserSachema
)
