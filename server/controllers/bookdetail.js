const {
  mysql
} = require('../qcloud')

module.exports = async (ctx) => {
  const {
    id
  } = ctx.request.query
  const detail = await mysql('books')
  .select('books.*', 'csessioninfo.user_info')
    .join('csessioninfo', 'books.openid', 'csessioninfo.open_id')
    .where('id', id)
  const info = JSON.parse(detail[0].user_info)
    ctx.state.data = Object.assign({}, detail[0], {
      user_info:{
          nickName:info.nickName,
          img:info.avatarUrl
      }
  })
  await mysql('books')
    .where('id', id)
    .increment('count', 1) // count累加
}
