<template>
  <div class="container">
    <div class="userInfo">
      <img :src="userInfo.avatarUrl">
      <button open-type="getUserInfo" bindgetuserinfo="login" hover-class="none">{{userInfo.nickName}}</button>
    </div>
    <yearProgress></yearProgress>
    <button v-if="userInfo.openId" @click="scanBook" class="btn">添加图书</button>
  </div>
</template>
<script>
import qcloud from "wafer2-client-sdk";
import config from "@/config";
import { get, showSuccess } from "@/util";
import yearProgress from "@/components/yearProgress";
export default {
  components: { yearProgress },
  data() {
    return {
      userInfo: {
        avatarUrl: "../../../static/img/unlogin.png",
        nickName: "点击登录"
      }
    };
  },
  methods: {
    scanBook() {
      // 允许从相机和相册扫码
      wx.scanCode({
        success(res) {
          console.log(res);
        }
      });
    },
    login() {
      let user = wx.getStorageSync("userinfo");
      const _this = this;
      if (!user) {
        qcloud.setLoginUrl(config.loginUrl);
        qcloud.request({
          url: config.userUrl,
          login: true,
          success(userRes) {
            showSuccess("登录成功");
            wx.setStorageSync("userinfo", userRes.data.data);
            _this.userInfo = userRes.data.data;
          },
          fail: function(err) {
            console.log("登录失败", err);
          }
        });
      }
    }
  },
  onShow() {
    let userInfo = wx.getStorageSync("userinfo");
    if (userInfo) {
      this.userInfo = userInfo;
    }
  }
};
</script>
<style lang="scss">
.container {
  padding: 0 30rpx;
  .userInfo {
    margin-top: 100rpx;
    text-align: center;
    img {
      width: 150rpx;
      height: 150rpx;
      margin: 20rpx;
      border-radius: 50%;
    }
    button {
      background: transparent;
      font-size: 30rpx;
      //   border:none;
      &::after {
        border: 0;
      }
    }
  }
}
</style>
