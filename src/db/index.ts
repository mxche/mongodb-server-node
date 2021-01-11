/*
 * @author : cmx
 * @Date : 2021-01-07 15:55:17
 * desc:链接monog服务器
 */
import mongoos from "mongoose"
import 'dotenv/config'
import config from "../config.json"
export const init = () => {
  mongoos.connect(process.env.MONGP_URL, config.mongodbOptions).catch((error) => {
    console.log("connect error message" + error)
  })
  mongoos.connection.on("error", (error) => {
    console.log("mongodb error:" + error)
  })
  mongoos.connection.on("connected", () => {
    console.log("connected to mongodb  success:" + process.env.MONGP_URL)
  })
  mongoos.connection.on("disconnected", () => {
    console.log("mongodb disconnected:" + process.env.MONGP_URL)
  })
}
