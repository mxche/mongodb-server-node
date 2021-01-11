/*
 * @author : cmx
 * @Date : 2021-01-11 13:27:23
 */
import { Router } from "express"

import {registerModule,loginMudule} from '../controller/user'
// import orderController from '../controller/order'
// import goodsController from '../controller/goods'
const router = Router()
// 登录注册
router.post('/users/register',registerModule)
router.post('/users/login',loginMudule)
export = router