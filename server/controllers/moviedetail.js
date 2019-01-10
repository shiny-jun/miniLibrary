
const https = require('https')

module.exports = async (ctx) => {
  const {
    id
  } = ctx.request.query
  let url = `https://api.douban.com/v2/movie/subject/${id}`
  
  const movie = await getJSON(url)

  if(movie){
      ctx.state.data = {
    movie,
    msg: 'success'
  }
  }else{
    ctx.state = {
        code : -1,
        data:{
            msg:'无数据'
        }
    }
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