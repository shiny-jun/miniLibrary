<template>
  <div>
    <searchBar @search="search"></searchBar>
    <div class="title text-primary">高分电影</div>
    <div class="card-wrapper">
      <movieCard v-for="(topMovie,index) in topMovies" :key="index" :topMovie="topMovie"></movieCard>
    </div>
    <div class="text-footer" v-if="!topMovies.length">暂时还未添加数据</div>
    <div class="text-footer" v-if="!more">没有更多数据</div>
  </div>
</template>
<script>
import { get } from "@/util";
import movieCard from "@/components/movieCard";
import searchBar from "@/components/searchBar";

export default {
  components: {
    movieCard,
    searchBar
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
    async getmovies(init) {
      wx.showNavigationBarLoading();
      let res = await get("/weapp/topmovie", {
        count: this.size,
        start: this.count
      });
      if (
        res.movies.subjects.length < this.size &&
        Math.floor(this.count / this.size) > 0
      ) {
        this.more = false;
      }
      if (init) {
        this.topMovies = res.movies.subjects;
        wx.stopPullDownRefresh();
      } else {
        // 下拉刷新不能直接覆盖books而是累加
        this.topMovies = this.topMovies.concat(res.movies.subjects);
      }
      wx.hideNavigationBarLoading();
    },
    // bookDetail(book){ // 图书详情
    //     wx.navigateTo({ url: '/pages/detail/main?id='+book.id  });
    // }
    search(searchText) {
      wx.navigateTo({ url: "/pages/movieSearch/main?search=" + searchText });
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.count = 0;
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
        this.count = 0;
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
.title {
  font-size: 32rpx;
  font-weight: bold;
  padding-left: 20rpx;
  padding-top: 20rpx;
}
</style>
