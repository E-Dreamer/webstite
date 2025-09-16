type DBType = {
  dbName: string
  port: number
  user: string
  password: string
  host: string
}
// 数据库配置
const database: DBType = {
  dbName: 'website',
  port: 3306,
  user: 'root',
  password: '123456',
  host: 'localhost',
}
export default {
  database,
}
