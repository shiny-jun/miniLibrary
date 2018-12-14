const {
  mysql
} = require('../qcloud')
module.exports = async (cxt) => {
  const books = await mysql('books')
    .select('books.*', 'csessioninfo')
    .join('csessioninfo', 'books.openid', 'csessioninfo.open_id')
    .orderBy('books.id', 'desc')
  // .orderBy('id','desc')
  cxt.state.data = {
    list: books.map(v => {
      const info = JSON.parse(v.user_info)
      return Object.assign({},v,{
          user_info:{
              nickName:info.nickName
          }
      })
    })
  }
}
