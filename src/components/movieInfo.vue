<template>
  <div class="movie-info">
    <!-- <div class="thumb">
      <img class="back" :src="info.images.large" mode="aspectFill">
      <img class="img" :src="info.images.large" mode="aspectFit">
      <div class="info">
        <div class="title">{{info.title}}</div>
        <div class="year">({{info.year}})</div>
      </div>
    </div>
    <div class="detail">
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
    </div>-->
    <div class="thumb">
      <img class="back" :src="info.images.large" mode="aspectFill">
      <div class="info">
        <img class="img" :src="info.images.large" mode="widthFix">
        <p class="title">{{info.title}}</p>
        <p class="year">({{info.year}})</p>
        <p class="detail">
          <span v-for="(item,index) in info.countries" :key="index">{{item}}</span>
          <span>/</span>
          <span v-for="(item,index) in info.genres" :key="index">{{item}}</span>
        </p>
        <p class="rating">评分：{{info.rating.average}}</p>
        <div style="color:#ff9900;">
          <rate :value="info.rating.average" size="40"></rate>
        </div>
      </div>
    </div>
    <div class="summary">
      <div class="title">电影简介</div>
      <p>{{info.summary}}</p>
    </div>
  </div>
</template>
<script>
import rate from "@/components/rate";

export default {
  props: ["info"],
  components: {
    rate
  },
  data() {
    return {
      image: ""
    };
  },
  created() {
    console.log(this.info);
  },
  computed: {
    userinfo() {
      return this.info.user_info || {};
    }
  }
};
</script>
<style lang="scss" scoped>
.movie-info {
  font-size: 28rpx;
  // .badge{
  //     display:inline-block;
  //     margin:10rpx;
  //     padding: 10rpx;
  //     border-radius:20rpx;
  //     border:1px #ea5A49 solid;
  //     color:#ea5A49;
  // }

  // .right {
  //   float: right;
  // }
  // .detail {
  //   padding: 10rpx 20rpx;
  //   .avatar {
  //     width: 40rpx;
  //     height: 40rpx;
  //     border-radius: 50%;
  //     vertical-align: middle;
  //   }
  // }
  .thumb {
    width: 750rpx;
    height: 350rpx;
    overflow: hidden;
    position: relative;
    background-color: #999999;
    .back {
      filter: blur(30rpx);
      width: 110%;
      position: relative;
      left: -30rpx;
      top: -30rpx;
      opacity: 0.5; // 透明度
    }
    .info {
      position: absolute;
      width: 100%;
      color: #ffffff;
      position: absolute;
      left: 0;
      top: 0;
      padding: 30rpx;
      .img {
        float: left;
        height: 280rpx;
        width: 200rpx;
        margin-right: 40rpx;
        vertical-align: middle;
        border-radius: 20rpx;
        box-shadow: #000000 0px 0px 20px 0px;
      }
      & > p {
        padding-bottom: 10rpx;
      }
      .title {
        font-size: 40rpx;
        font-weight: 600;
        padding-bottom: 30rpx;
      }
      .year {
        font-size: 30rpx;
        font-weight: 600;
      }
      .detail {
        span {
          padding-right: 10rpx;
        }
      }
      .author {
        font-size: 28rpx;
      }
    }
  }
  .summary {
    margin-top: 20rpx;
    padding: 0 30rpx;
    .title{
      font-size: 30rpx;
      font-weight: bold;
      padding: 10rpx 0;
    }
    p {
      text-indent: 2em;
      font-size: 28rpx;
    }
  }
}
</style>
