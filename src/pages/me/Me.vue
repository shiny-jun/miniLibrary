<template>
  <div class="container">
    <div class="userInfo">
      <img :src="userInfo.avatarUrl">
      <button open-type="getUserInfo" @getuserinfo="login" hover-class="none">{{userInfo.nickName}}</button>
    </div>
    <yearProgress></yearProgress>
    <button @click="scanBook" class="btn">添加图书</button>
  </div>
</template>
<script>
import qcloud from "wafer2-client-sdk";
import config from "@/config";
import { post, showSuccess } from "@/util";
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
    async addBook(isbn) {
        const res = await post("/weapp/addbook", {
          isbn,
          openId: this.userInfo.openId
        });
        if(res.code === 0 && res.data.title){
            showSuccess('添加成功',`${res.data.title}添加成功`)
        }
    },
    scanBook() {
      // 允许从相机和相册扫码
      let _this = this
      wx.scanCode({
        success(res) {
          if (res.result) {
            _this.addBook(res.result);
          }
        //   console.log(res);
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
