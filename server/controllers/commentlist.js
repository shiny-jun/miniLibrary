const {
    mysql
  } = require('../qcloud')
  module.exports = async (ctx) => {
    const {
      page,
      size,
      bookid
    } = ctx.request.query
    //   const size = 10
    const comments = await mysql('comments')
      .select('comments.*', 'csessioninfo.user_info')
      .join('csessioninfo', 'comments.openid', 'csessioninfo.open_id')
      .limit(size)
      .where('bookid', bookid)
      .offset(Number(page) * size)
    // .orderBy('id','desc')
    ctx.state.data = {
      list: comments.map(v => {
        const info = JSON.parse(v.user_info)
        return Object.assign({}, v, {
          title:info.nickName,
          image: info.avatarUrl
        })
      })
    }
  }