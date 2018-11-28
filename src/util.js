// 工具函数库
import config from './config'

export function get (url,data) {
    return new Promise((reslove,reject) => {
        wx.request({
            // data:
            url:config.host+url,
            success:(res)=>{
                if(res.data.code == 0){
                    reslove(res.data.data)
                } else {
                    reject(res.data)
                }
            }
        })
    })
}

export function showSuccess(text){
    wx.showToast({
        title: text,
        content: 'success',
        // success (res) {
        //   if (res.confirm) {
        //     console.log('用户点击确定')
        //   } else if (res.cancel) {
        //     console.log('用户点击取消')
        //   }
        // }
      })
}