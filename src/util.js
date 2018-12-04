// 工具函数库
import config from './config'

export function get(url, data) {
  return new Promise((reslove, reject) => {
    wx.request({
      // data:
      url: config.host + url,
      success: (res) => {
        if (res.data.code == 0) {
          reslove(res.data.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}

export function showSuccess(text) {
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

export function login(userInfo, callback, reset) {
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      if (res.code) {
        //存用户信息
        wx.setStorageSync('userInfo', userInfo)
        // 扫面二维码进入
        // let Scene = wx.getStorageSync('scene')
        let userInfoStr = JSON.stringify(userInfo);
        console.log(userInfoStr)
        // wx.request({
        //   url: api.WxUnionId,
        //   data: {
        //     appid: 'xxx', //测试
        //     secret: 'xxx',
        //     js_code: res.code,
        //     grant_type: 'authorization_code',
        //     userInfo: userInfoStr,
        //     scene: Scene //这个是我们的业务逻辑的参数 忽略
        //   },
        //   method: 'POST',
        //   header: {
        //     'content-type': 'application/x-www-form-urlencoded'
        //   },
        //   success: callback
        // })
      } else {

      }
    }
  })
}
