const {
  mysql
} = require('../qcloud')

module.exports = async (ctx) => {
  const top = await mysql('books')
    .select('id', 'title', 'image', 'count')
    .orderBy('count', 'desc')
    .limit(9)
    top.forEach(item => {
        item.count = parseInt(item.count)
    })
    ctx.state.data={
        list:top
    }
}
