<template>
  <div>
    <book-info :info="info"></book-info>
    <div class="comment">
      <textarea v-model="comment" class="textarea" :maxlength="100" placeholder="请输入图书短评"></textarea>
      <div class="location">地理位置：
        <switch :checked="location" type="switch" color="#ea5a49" @change="getGeo"/>
        <span class="text-primary">{{location}}</span>
      </div>
      <div class="phone">手机型号：
        <switch :checked="phone" type="switch" color="#ea5a49" @change="getPhone"/>
        <span class="text-primary">{{phone}}</span>
      </div>
      <button class="btn" @click="addComment">评论</button>
    </div>
  </div>
</template>
<script>
import { get, post, showModal, showSuccess } from "@/util";
import bookInfo from "@/components/bookInfo";
export default {
  components: {
    bookInfo
  },
  data() {
    return {
      bookid: "",
      userinfo: {},
      info: {},
      comment: "",
      location: "",
      phone: ""
    };
  },
  mounted() {
    this.bookid = this.$root.$mp.query.id;
    this.getDetail();
    const userinfo = wx.getStorageSync("userinfo");
    if (userinfo) {
      this.userinfo = userinfo;
    }
  },
  methods: {
    async getDetail() {
      const info = await get("/weapp/bookdetail", { id: this.bookid });
      wx.setNavigationBarTitle({
        title: info.title
      });
      this.info = info;
    },
    getGeo(e) {
      // qG4loFFdoTinNKFLfT8YcTL7fvF7szUG
      const ak = "qG4loFFdoTinNKFLfT8YcTL7fvF7szUG";
      let url = "http://api.map.baidu.com/geocoder/v2/";
      if (e.target.value) {
        wx.getLocation({
          type: "wgs84", //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标,
          success: res => {
            console.info("getLocation success: ", res);

            wx.request({
              url, //开发者服务器接口地址",
              data: {
                location: `${res.latitude},${res.longitude}`,
                output: "json",
                ak
              }, //请求的参数",
              // method: 'GET',
              // dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
              success: res => {
                console.log(res);
                if (res.data.status == 0) {
                  this.location = res.data.result.addressComponent.city;
                } else {
                  this.location = "位置地点";
                }
              },
              fail: () => {},
              complete: () => {}
            });
          },
          fail: () => {
            console.log("getLocation failed");
          }
        });
      } else {
        this.location = "";
      }
    },
    getPhone(e) {
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync();
        console.log(phoneInfo);
        this.phone = phoneInfo.model;
      } else {
        // 没选中
        this.phone = "";
      }
    },
    async addComment() {
      // 上传评论内容、手机型号、地理位置、图书id、用户openid
      if (!this.comment) {
        wx.showToast({
          title: "请输入评论",
          icon: "none",
          duration: 1500,
          mask: false,
          success: result => {
            return;
          }
        });
      }
      const data = {
        openid: this.userinfo.openId,
        bookid: this.bookid,
        comment: this.comment,
        phone: this.phone,
        location: this.location
      };
      try {
          await post("/weapp/addcomment", data);
        showSuccess("评论成功");
        this.comment = "";
      } catch (e) {
        showModal("失败", e.msg);
      }
      console.log(data);
    }
  }
};
</script>
<style lang="scss" scoped>
.comment {
  margin-top: 20rpx;
  .textarea {
    background: #eee;
    padding: 10rpx;
    border-radius: 4rpx;
    width: 100vw;
    height: 200rpx;
  }
  .location,
  .phone {
    margin-top: 20rpx;
    padding: 10rpx 20rpx;
  }
}
</style>
