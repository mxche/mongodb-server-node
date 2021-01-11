import express from "express"
import config from "./config.json"
import cors from "cors"
import * as db from "./db/index"
import HTTPException from "./exceptions/HTTPException"
import {errorMiddleWare} from "./middlewares/errorMiddleware"
import {tokenValidate} from './utils/tokenValidate'
const app = express()
db.init()

// 路由校验token
app.get('/users/validate',tokenValidate)
// 处理跨域
app.use(cors())
// 处理json数据
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// 处理静态文件
app.use(express.static("./static"))

app.use('/api/',require('./router/api'))
// 当走完所有路由未匹配到进入处理错误请求函数
app.use((req, res, next) => {
  const error: HTTPException = new HTTPException(404, "未分配路由")
  next(error)
})
app.use(errorMiddleWare)

app.listen(config.port, () => {
  console.log(`API Server is running ${config.port} on port`)
})
