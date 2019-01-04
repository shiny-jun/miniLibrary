<template>
  <div>
    <card v-for="book in books" :key="book.id" :book="book"></card>
    <div v-if="!books.length">暂时还未添加图书</div>
  </div>
</template>
<script>
import { get } from "@/util";
import card from "@/components/card";

export default {
  components: {
    card
  },
  data() {
    return {
      books: [],
      userinfo: {},
      page: 0,
      size: 10
    };
  },
  methods: {
    init() {
      wx.showNavigationBarLoading();
      this.getmovies();
    },
    getmovies() {
      // const topMovies = await get("", {
      //   start:0,
      //   count:25
      // });
      let url = "http://api.douban.com/v2/movie/top250";
            wx.request({
              url, //开发者服务器接口地址",
              method:'get',
              params: {
                start:0,
                count:25
              }, //请求的参数",
              // method: 'GET',
              // dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
              success: res => {
                console.log(res);
                // if (res.data.status == 0) {

                // }
              },
              fail: () => {},
              complete: () => {}
            });
      // this.topMovies = topMovies;
      wx.hideNavigationBarLoading();
    },
    // bookDetail(book){ // 图书详情
    //     wx.navigateTo({ url: '/pages/detail/main?id='+book.id  });
    // }
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.init();
    wx.stopPullDownRefresh();
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
<style lang="scss" scoped>
</style>
