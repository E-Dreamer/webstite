import Koa from 'koa'
// import fs from 'fs'
// import path from 'path'
const app = new Koa()

app.listen(9000, () => {
  console.log('server is listening in 9000')
})
