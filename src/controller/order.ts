/*
 * @author : cmx
 * @Date : 2021-01-11 13:35:13
 */
import { Order } from "./../modules/order"
// 创建订单
const orderCreateModule = async (req, res, next) => {
  let order = new Order(req.body)
  order.order_no = "" + Date.now()
  order.amount = 0
  order.goodsItem.forEach((v) => (order.amount += v.unit_price * v.quantity))
  try {
    let result = await order.save()
    if (result) {
      res.json({
        success: true,
        data: result.toJSON(),
        message: "创建订单成功",
      })
    }
  } catch (error) {
    next(error)
  }
}
// 获取订单列表
const getOrderListModule = async (req, res, next) => {
  let q: any = {}
  try {
    if (req.body.userId) {
      q.user = req.body.userId
    }
    let query = Order.find(q).sort({ create_at: -1 })
    query.populate([
      { path: "user", select: "userName" },
      { path: "goods.item", select: "name unit pic" },
    ])
    let order = await query.exec()
    res.json({
      success: true,
      message: "获取订单列表成功",
      data: order,
    })
  } catch (error) {
    next(error)
  }
}
// 查询订单详情(一个)
const getOrderDetailsModule = async (req, res, next) => {
  let query = Order.findById(req.params.id)
  try {
    query.populate({ path: "user", select: "userName" })
    query.populate({ path: "goodsItem.item", select: "name pic unit " })
    let order = await query.exec()
    res.json({
      success: true,
      message: "获取详情数据成功",
      data: order,
    })
  } catch (error) {
    next(error)
  }
}
const changeOrderStatus = async (req, res, next) => {
  if (req.body.status) {
    try {
      let order = await Order.findByIdAndUpdate(
        req.params.id,
        { $set: { status: req.body.status } },
        { runValidators: true, new: true }
      )
      res.json({
        success: true,
        message: "修改状态成功",
        data: order,
      })
    } catch (error) {
      next(error)
    }
  } else {
    res.json({
      success: false,
      error: "需要一个状态id",
    })
  }
}

export {
  orderCreateModule,
  getOrderListModule,
  getOrderDetailsModule,
  changeOrderStatus,
}
