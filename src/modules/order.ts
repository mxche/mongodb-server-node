/*
 * @author : cmx
 * @Date : 2021-01-11 19:19:59
 */
import { Model, Schema, model, Document } from "mongoose"
import ItOrder from "../intaface/order"
export interface OrderDocument extends ItOrder, Document {}

export const OrderSchema: Schema<OrderDocument> = new Schema(
  {
    order_no: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "需要用户id"],
    },
    goodsItem: {
      type: [
        {
          item: {
            type: Schema.Types.ObjectId,
            ref: "Goods",
          },
          unit_price: {
            type: Number,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["未开始", "进行中", "暂停中", "已结束"],
      required: true,
      default: "未开始",
    },
  },
  {
    collection: "orders",
    versionKey: false,
    validateBeforeSave: true,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
)
OrderSchema.set("toJSON", {
  transform: function (_doc: any, result: any) {
    result.id = result._id
    delete result._id
    return result
  },
})
export const Order: Model<OrderDocument> = model<OrderDocument>(
  "Order",
  OrderSchema
)
