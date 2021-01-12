/*
 * @author : cmx
 * @Date : 2021-01-11 13:35:28
 */
import { Goods } from "../modules/good"
// 查询商品信息
const goodsGetListModule = async (req, res, next) => {
  let query = {}
  try {
    if (req.body.name) {
      query["name"] = { $regex: req.body.name, $options: "i" }
    }
    res.json({
      success: true,
      message: "获取商品信息成功",
      data: await Goods.find(query).sort({
        unit_price: req.body.order ? parseInt(req.body.order) : -1,
      }),
    })
  } catch (error) {
    next(error)
  }
}
export { goodsGetListModule }
