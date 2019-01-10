<template>
  <div class="bookinfo">
    <!-- <div class="thumb">
      <img class="back" :src="info.images.large" mode="aspectFill">
      <img class="img" :src="info.images.large" mode="aspectFit">
      <div class="info">
        <div class="title">{{info.title}}</div>
        <div class="author">{{info.author}}</div>
      </div>
    </div>
    <div class="detail">
      <img :src="userinfo.img" mode="aspectFit" class="avatar">
      {{userinfo.nickName}}
      <div class="right text-primary">
        {{info.rating.average}}分
        <rate :value="info.rating.average"></rate>
      </div>
    </div>
    <div class="detail">
      {{info.publisher}}
      <div class="right">{{info.price}}</div>
    </div>
    <div class="tags">
        <div class="badge" v-for="(tag, index) in info.tags" :key="index">{{tag}}</div>
    </div>
    <div class="summary">
        <p v-for="(sum, index) in info.summary" :key="index">{{sum}}</p>
    </div> -->
  </div>
</template>
<script>
import rate from "@/components/rate";

export default {
  props: ["info"],
  components: {
    rate
  },
  created () {
    console.log(this.info)
  },
  computed: {
    userinfo() {
      return this.info.user_info || {};
    }
  }
};
</script>
<style lang="scss" scoped>
.bookinfo {
  font-size: 28rpx;
  .badge{
      display:inline-block;
      margin:10rpx;
      padding: 10rpx;
      border-radius:20rpx;
      border:1px #ea5A49 solid;
      color:#ea5A49;
  }
  .summary{
      margin-top:20rpx;
      padding:0 30rpx;
      p{
          text-indent:2em;
          font-size:28rpx;
      }
  }
  .right {
    float: right;
  }
  .detail {
    padding: 10rpx 20rpx;
    .avatar {
      width: 40rpx;
      height: 40rpx;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .thumb {
    width: 750rpx;
    height: 500rpx;
    overflow: hidden;
    position: relative;
    .back {
      filter: blur(30rpx);
      width: 100%;
    }
    .img {
      position: absolute;
      width: 100%;
      height: 300rpx;
      left: 0;
      top: 30rpx;
    }
    .info {
      color: #ffffff;
      position: absolute;
      width: 100%;
      left: 0;
      top: 330rpx;
      text-align: center;
      .title {
        font-size: 40rpx;
      }
      .author {
        font-size: 28rpx;
      }
    }
  }
}
</style>
