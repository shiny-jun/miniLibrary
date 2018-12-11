// 新增图书 1.获取豆瓣信息 2.入库
// https://developers.douban.com/wiki/?title=book_v2#get_isbn_book
// https://api.douban.com/v2/book/isbn/:name

const https = require('https')

module.exports = async (ctx) => {
  const {
    isbn,
    openId
  } = ctx.request.body
  if (isbn && openId) {
    let url = 'https://api.douban.com/v2/book/isbn/' + isbn
    const bookinfo = await getJSON(url)
    const rate = bookinfo.rating.average
    const {title, image, alt, publisher, summary, price} = bookinfo
    const tags = bookinfo.tags.map(v => {
        return `${v.title} ${v.count}`
    }).join(',')
    const author = bookinfo.author.join(',')
    console.log({ rate,title, image, alt, publisher, summary, price, tags, author})
  }
}

function getJSON(url) {
  return new Promise((reslove, reject) => {
    https.get(url, res => {
      let urlData = ''
      res.on('data', data => {
        urlData += data
      })
      res.on('end', data => {
        const bookinfo = JSON.parse(urlData)
        if (bookinfo.title) {
          reslove(bookinfo)
        }
        reject(bookinfo)
      })
    })
  })
}
