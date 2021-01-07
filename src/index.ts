import express from "express"
import config from "./config.json"
import cors from "cors"
import *as db from './db/index'
const app = express()
db.init()
// 中间件使用
app.use((req, res, next) => {
  // console.log(`${req.method},${req.path}`)
  next()
})
// 处理跨域
app.use(cors())
// 处理json数据
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// 处理静态文件
app.use(express.static("./static"))

app.get("/*", (req, res, next) => {
  // console.log(res,'res');
})

app.listen(config.port, () => {
  console.log(`API Server is running ${config.port} on port`)
})
