<template>
  <div class="swiper">
    <swiper
      :indicator-dots="true"
      indicator-color="#ea5a49"
      :autoplay="true"
      interval="4000"
      duration="1000"
      :circular="true"
    >
      <div v-for="(top,index) in imgUrls" :key="index">
        <swiper-item>
          <img
            v-for="(img,index2) in top"
            :key="index2"
            class="slide-image"
            mode="aspectFit"
            :src="img.image"
            @click="bookDetail(img)"
          >
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>
<script>
export default {
  props: ["tops"],
  computed: {
    imgUrls() {
      // 用chunk函数
      let res = this.tops;
      return [res.slice(0, 3), res.slice(3, 6), res.slice(6)];
    }
  },
   methods:{
       bookDetail(book){
        this.$emit('bookDetail',book)
      }
   }
};
</script>
<style lang="scss" scoped>
.swiper{
    margin-top: 5px;
    .slide-image{
        width: 33.3%;
        height: 250rpx;
    }
}
</style>

