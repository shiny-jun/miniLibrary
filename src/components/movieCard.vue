<template>
  <!-- <a :href="detailUrl"> -->
  <div class="movie-card" @click="moiveDetail">
    <div class="poster">
      <img :src="topMovie.images.large" alt="poster" class="image" mode="aspectFill">
    </div>
    <div class="title">{{topMovie.title}}</div>
    <div class="right-bottom text-primary"><rate :value="topMovie.rating.average"></rate>{{topMovie.rating.average}}</div>
    
  </div>
  <!-- </a> -->
</template>

<script>
import rate from "@/components/rate";
export default {
  components: {
    rate
  },
  props: ["topMovie"],
  //   computed: {
  //     detailUrl() {
  //         return '/pages/detail/main?id='+this.book.id
  //     }
  //   },
  methods: {
    moiveDetail() {
      this.$emit("moiveDetail", this.topMovie);
    },
    preview() {
      wx.previewImage({
        current: this.book.image,
        urls: [this.book.image] //需要预览的图片链接列表,
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.movie-card {
  width: 31%;
  padding-right: 20rpx;
  padding-bottom: 46rpx;
  font-size: 28rpx;
  position: relative;
  &:nth-child(3n) {
    padding-right: 0rpx;
  }
  .poster {
    height: 300rpx;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .title{
    padding: 10rpx 0;
  }
  .right-bottom{
      position: absolute;
      bottom: 10rpx;
      right:20rpx;
  }
}
</style>
