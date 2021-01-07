/*
 * @author : cmx
 * @Date : 2021-01-07 15:55:17
 * desc:链接monog服务器
 */
import mongoos from "mongoose"
import config from "../config.json"
export const init = () => {
  mongoos.connect(config.mongodbURL, config.mongodbOptions).catch((error) => {
    console.log("connect error message" + error)
  })
  mongoos.connection.on("error", (error) => {
    console.log("mongodb error:" + error)
  })
  mongoos.connection.on("connected", () => {
    console.log("connected to mongodb  success:" + config.mongodbURL)
  })
  mongoos.connection.on("disconnected", () => {
    console.log("mongodb disconnected:" + config.mongodbURL)
  })
}
