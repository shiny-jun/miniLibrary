const { mysql } = require('../qcloud')
module.exports = async (cxt) => {
    const books = await mysql('books').select('*')
    // .orderBy('id','desc')
    cxt.state.data = {
        list: books
    }
}