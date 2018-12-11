// 新增图书 1.获取豆瓣信息 2.入库
// https://developers.douban.com/wiki/?title=book_v2#get_isbn_book
// https://api.douban.com/v2/book/isbn/:name

const https = require('https')
const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const {
    isbn,
    openid
  } = ctx.request.body
  console.log(isbn,openid)
  if (isbn && openid) {
    // 查询是否已存在该图书
    const findRes = await mysql('books').select().where('isbn', isbn)
    if(findRes.length){
        ctx.state = {
            code : -1,
            data:{
                msg:'图书已存在'
            }
        }
        return
    }
    let url = 'https://api.douban.com/v2/book/isbn/' + isbn
    const bookinfo = await getJSON(url)
    const rate = bookinfo.rating.average
    const {title, image, alt, publisher, summary, price} = bookinfo
    console.log(bookinfo)

    const tags = bookinfo.tags.map(v => {
        return `${v.title} ${v.count}`
    }).join(',')
    const author = bookinfo.author.join(',')
    // 入库
    try{
        await mysql('books').insert({
        isbn, openid,rate,title, image, alt, publisher, summary, price, tags, author
    })
    ctx.state.data = {
        title,
        msg:'success'
    }
    }catch(e){
        ctx.state = {
            code:-1,
            data:{
                msg:'新增失败'+e.sqlMessage
            }
        }
    }
    
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
