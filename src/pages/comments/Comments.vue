<template>
  <div class="container">
    <commentList type="user" v-if="userinfo.openId" :comments="comments"></commentList>
  </div>
</template>
<script>
import { get } from "@/util";
import commentList from "@/components/commentList";

export default {
  data() {
    return {
      comments: [],
      userinfo: {},
      page: 0,
      size: 10
    };
  },
  components: {
    commentList
  },
  methods: {
    init() {
      wx.showNavigationBarLoading();
      this.getComments();
    },
    async getComments() {
      const comments = await get("/weapp/commentuser", {
        page: this.page,
        size: this.size,
        openid: this.userinfo.openId
      });
      this.comments = comments.list
      wx.hideNavigationBarLoading();
    }
  },
  // 下拉刷新
  onPullDownRefresh(){
    this.init()
    wx.stopPullDownRefresh()
  },
  onShow() {
    if (!this.userinfo.openid) {
      let userinfo = wx.getStorageSync("userinfo");
      if (userinfo) {
        this.userinfo = userinfo;
        this.init();
      }
    }
  }
};
</script>
<style>
</style>
