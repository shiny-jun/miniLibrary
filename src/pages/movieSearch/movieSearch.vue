<template>
  <div>
    <div class="card-wrapper" v-if="searchMovies.length">
      <movieCard v-for="(searchMovie,index) in searchMovies" :key="index" :topMovie="searchMovie"></movieCard>
    </div>
    <div class="text-footer" v-else>没有关于“{{search}}”的电影</div>
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
      searchMovies: [],
      userinfo: {},
      search:'',
      more: true,
      size: 30,
      count: 0
    };
  },
  methods: {
    async getmovies(init) {
      wx.showNavigationBarLoading();
      const res = await get("/weapp/searchmovie", { count: this.size, start: this.count, search: this.search });
      if (
        res.movies.subjects.length < this.size &&
        Math.floor(this.count / this.size) > 0
      ) {
        this.more = false;
      }
      if (init) {
        this.searchMovies = res.movies.subjects;
        wx.stopPullDownRefresh();
      } else {
        // 下拉刷新不能直接覆盖books而是累加
        this.searchMovies = this.searchMovies.concat(res.movies.subjects);
      }
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
    this.more= true
    this.search = this.$root.$mp.query.search
    wx.setNavigationBarTitle({
        title: '关于：'+this.search
      });
    if (!this.userinfo.openid) {
      let userinfo = wx.getStorageSync("userinfo");
      if (userinfo) {
        this.userinfo = userinfo;
        this.count = 0
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
