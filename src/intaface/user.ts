/*
 * @author : cmx
 * @Date : 2021-01-08 16:18:03
 */
export default interface ItUser {
  userName: string
  password: string
  role: string,
  avatar:string,
  email:string,
  getToken:()=>string
}
