/*
 * @author : cmx
 * @Date : 2021-01-12 09:47:11
 */
import { Model, Schema, model, Document } from "mongoose"
import ItGoods from "../intaface/goods"
export interface GoodsDocument extends ItGoods, Document {}

export const GoodsSchema: Schema<GoodsDocument> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    unit_price: {
      type: Number,
      required: true,
    },
    pic: {
      type: String,
      required: true,
    },
  },
  {
    collection: "goods",
    versionKey: false,
    validateBeforeSave: true,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
)

GoodsSchema.set("toJSON", {
  transform: function (_doc: any, result: any) {
    result.id = result._id
    delete result._id
    return result
  },
})
export const Goods: Model<GoodsDocument> = model<GoodsDocument>(
  "Goods",
  GoodsSchema
)
