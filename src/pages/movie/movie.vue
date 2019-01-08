<template>
  <div>
    <div class="card-wrapper">
      <movieCard v-for="(topMovie,index) in topMovies" :key="index" :topMovie="topMovie"></movieCard>
    </div>
    <div class="text-footer" v-if="!topMovies.length">暂时还未添加图书</div>
    <div class="text-footer" v-if="!more">没有更多数据</div>
  </div>
</template>
<script>
import { get } from "@/util";
import movieCard from "@/components/movieCard";

export default {
  components: {
    movieCard
  },
  data() {
    return {
      topMovies: [],
      userinfo: {},
      more: true,
      size: 30,
      count: 0
    };
  },
  methods: {
    getmovies(init) {
      wx.showNavigationBarLoading();
      let url = `http://t.yushu.im/v2/movie/top250?start=${this.count}&count=${this.size}`; // 把豆瓣官方的api.douban.com改为t.yushu.im
      wx.request({
        url, //开发者服务器接口地址",
        method: "get",
        // params: {
        //   start: 0,
        //   count: this.count-1
        // },
        success: res => {
          if (res.data.subjects.length < this.size && Math.floor(this.count/this.size) > 0) {
            this.more = false;
          }
          if (init) {
            this.topMovies = res.data.subjects;
            wx.stopPullDownRefresh();
          } else {
            // 下拉刷新不能直接覆盖books而是累加
            this.topMovies = this.topMovies.concat(res.data.subjects);
          }
          console.log(res);
        },
        fail: () => {},
        complete: () => {}
      });
      wx.hideNavigationBarLoading();
    }
    // bookDetail(book){ // 图书详情
    //     wx.navigateTo({ url: '/pages/detail/main?id='+book.id  });
    // }
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.count = 0
    this.getmovies(true);
    wx.stopPullDownRefresh();
  },
  // 上拉加载
  onReachBottom() {
    if (!this.more) {
      return false;
    }
    this.count = this.count + this.size;
    this.getmovies();
  },
  onShow() {
    if (!this.userinfo.openid) {
      let userinfo = wx.getStorageSync("userinfo");
      if (userinfo) {
        this.userinfo = userinfo;
        this.getmovies(true);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.card-wrapper {
  display: flex;
  flex-wrap: wrap;
  // justify-content: center;
  padding: 44rpx;
}
</style>
