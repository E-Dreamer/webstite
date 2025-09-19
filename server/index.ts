import Koa from 'koa'
import './config/config.ts'
const app = new Koa()
console.log(app.env)
app.listen(9900, () => {
  console.log('Server running on port 9900')
})
