const {
  mysql
} = require('../qcloud')
module.exports = async (ctx) => {
  const {
    page,
    size,
    bookid,
    openid
  } = ctx.request.query
  //   const size = 10
  const res = mysql('comments')
    // .limit(size)
    // .offset(Number(page) * size)
  let comments
  if (bookid) {
    // 根据图书id在图书详情页显示
    comments = await res.select('comments.*', 'csessioninfo.user_info').where('bookid', bookid).join('csessioninfo', 'comments.openid', 'csessioninfo.open_id')
    ctx.state.data = {
      list: comments.map(v => {
        const info = JSON.parse(v.user_info)
        return Object.assign({}, v, {
          nickName: info.nickName,
          image: info.avatarUrl
        })
      })
    }
  } else if (openid) {
    // 根据openid在我的评论页显示
    comments = await res.select('comments.*', 'books.title', 'csessioninfo.user_info').where('comments.openid', openid).join('csessioninfo', 'comments.openid', 'csessioninfo.open_id').join('books', 'comments.bookid', 'books.id')
    ctx.state.data = {
      list: comments
      .map(v => {
        const info = JSON.parse(v.user_info)
        return Object.assign({}, v, {
          nickName: info.nickName,
          image: info.avatarUrl
        })
      })
    }
  }
  // .orderBy('id','desc')
  
}
