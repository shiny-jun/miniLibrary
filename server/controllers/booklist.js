const {
  mysql
} = require('../qcloud')
module.exports = async (ctx) => {
  const {
    page,
    size,
    openid
  } = ctx.request.query
  //   const size = 10
  const mysqlSelect = mysql('books')
    .select('books.*', 'csessioninfo.user_info')
    .join('csessioninfo', 'books.openid', 'csessioninfo.open_id')
    .orderBy('books.id', 'desc')
    .limit(size)
    .offset(Number(page) * size)
  let books
  if (openid) {
    books = await mysqlSelect.where('books.openid', openid)
  } else {
    books = await mysqlSelect
  }
  books.forEach(item => {
    item.count = parseInt(item.count)
  })
  ctx.state.data = {
    list: books.map(v => {
      const info = JSON.parse(v.user_info)
      return Object.assign({}, v, {
        user_info: {
          nickName: info.nickName
        }
      })
    })
  }
}
