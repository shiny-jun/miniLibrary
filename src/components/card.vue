<template>
  <!-- <a :href="detailUrl"> -->
    <div @click="bookDetail">
      <div class="book-card">
        <div class="thumb" @click.stop='preview'>
          <img :src="book.image" class="image" mode="aspectFit">
        </div>
        <div class="detail">
          <div class="row">
            <div class="right text-primary">
              {{book.rate}}
              <rate :value="book.rate"></rate>
            </div>
            <div class="left text-primary">{{book.title}}</div>
          </div>
          <div class="row">
            <div class="right text-primary">浏览量：{{book.count}}</div>
            <div class="left">{{book.author}}</div>
          </div>
          <div class="row">
            <div class="right">{{book.user_info.nickName}}</div>
            <div class="left">{{book.publisher}}</div>
          </div>
        </div>
      </div>
    </div>
  <!-- </a> -->
</template>

<script>
import rate from "@/components/rate";
export default {
  components: {
    rate
  },
  props: ["book"],
//   computed: {
//     detailUrl() {
//         return '/pages/detail/main?id='+this.book.id 
//     }
//   },
  methods: {
      bookDetail(){
        this.$emit('bookDetail',this.book)
      },
      preview(){
          wx.previewImage({
              current:this.book.image,
            urls: [this.book.image] //需要预览的图片链接列表,
          });
      }
  },
};
</script>

<style lang="scss" scoped>
.book-card {
  padding: 10rpx;
  overflow: hidden;
  margin-top: 10rpx 0;
  font-size: 28rpx;
  .thumb {
    width: 180rpx;
    height: 180rpx;
    float: left;
    margin: 0 auto;
    overflow: hidden;
    .image {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .detail {
    margin-left: 200rpx;
    .row {
      line-height: 40rpx;
      margin-bottom: 3px;
    }
    .right {
      float: right;
    }
    .left {
      margin-right: 160rpx;
    }
  }
}
</style>
