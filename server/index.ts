import Koa from 'koa'
const app = new Koa()
console.log(app.env)
app.listen(9900, () => {
  console.log('Server running on port 9900')
})
