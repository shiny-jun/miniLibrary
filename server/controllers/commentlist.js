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
    .select('comments.*', 'csessioninfo.user_info')
    .join('csessioninfo', 'comments.openid', 'csessioninfo.open_id')
    .limit(size)
    .offset(Number(page) * size)
  let comments
  if (bookid) {
    // 根据图书id在图书详情页显示
    comments = await res.where('bookid', bookid)
  } else if (openid) {
    // 根据openid在我的评论页显示
    comments = await res.where('openid', openid)
  }
  // .orderBy('id','desc')
  ctx.state.data = {
    list: comments.map(v => {
      const info = JSON.parse(v.user_info)
      return Object.assign({}, v, {
        title: info.nickName,
        image: info.avatarUrl
      })
    })
  }
}
