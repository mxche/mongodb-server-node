/*
 * @author : cmx
 * @Date : 2021-01-08 17:03:00
 */
export default class HTTPException {
  constructor(
    public status: number,
    public message: string,
    public error?: any,
    public data?: any[],
  ) {
    this.status = status
    this.data = data
    this.message = message
    this.error = error
  }
}
