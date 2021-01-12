/*
 * @author : cmx
 * @Date : 2021-01-11 13:27:23
 */
import { Router } from "express"

import {registerModule,loginMudule} from '../controller/user'
import {orderCreateModule,getOrderListModule,getOrderDetailsModule,changeOrderStatus} from '../controller/order'
import {goodsGetListModule} from '../controller/goods'
const router = Router()
// 登录注册
router.post('/users/register',registerModule)
router.post('/users/login',loginMudule)
// 订单创建
router.post('/orders/create_order',orderCreateModule)
// 获取订单列表
router.post('/orders/getOrderList',getOrderListModule)
// 获取订单详情
router.post('/orders/getOrderDetail/:id',getOrderDetailsModule)
// 修改订单状态
router.post('/orders/getOrderDetail/:id/change_status',changeOrderStatus)
// 商品信息
router.post('/goods/getList',goodsGetListModule)
export = router