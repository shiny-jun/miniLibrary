// var http = require("http")

// var opt = {
//   host: 'api.douban.com',
//   method: 'Get',
//   path: '/v2/movie/search?q=a&start=0&count=30',
//   headers: {
//     // "Content-Type": 'application/json'
//   }
// }
// var body = '';
// console.log(opt)
// var req = http.request(opt, function (res) {
//   console.log("Got response: " + res.statusCode);
//   res.on('data', function (d) {
//     body += d;
//   }).on('end', function () {
//     console.log(res.headers)
//     console.log(body)
//   });
// }).on('error', function (e) {
//   console.log("Got error: " + e.message);
// })
// req.end();

// module.exports = async main(ctx) => {
//       const {
//         page,
//         size,
//         openid
//       } = ctx.request.query
//       //   const size = 10

//       ctx.state.data = {
//         body
//       }
//     }


const https = require('https')

module.exports = async (ctx) => {
  const {
    start,
    count,
    search
  } = ctx.request.query
  utfSearch = encodeURI(encodeURI(search)) //utf-8转码
  let url = `https://api.douban.com/v2/movie/search?q=${utfSearch}&start=${start}&count=${count}`

  const movies = await getJSON(url)

  ctx.state.data = {
    movies,
    msg: 'success'
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
