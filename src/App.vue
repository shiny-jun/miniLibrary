<script>
import { get, showSuccess } from "./util";
import qcloud from "wafer2-client-sdk";
import config from "./config";
export default {
  async created() {
    let user = wx.getStorageSync("userinfo");
    if (!user) {
      qcloud.setLoginUrl(config.loginUrl);
      qcloud.login({
        success: function(userinfo) {
          console.log("登录成功", userinfo);
          showSuccess("登录成功");
          // wx.setStorageSync("userinfo", userinfo)
        },
        fail: function(err) {
          console.log("登录失败", err);
        }
      });
    } else {

    }

    // const res = await get('/weapp/demo')
    // console.log(123,res)
    // wx.request({
    //   url:config.host+'/weapp/demo',
    //   success:(res)=>{
    //     console.log(res)
    //   }
    // })
    console.log("小程序启动");
  }
};
</script>

<style>
</style>
