<template>
  <div class="comment-list">
    <div class="page-title">评论</div>
    <div v-for="(comment, index) in comments" :key="index" class="comment" @click="handleClick(comment)">
      <div class="user">
        <div class="right">
          {{comment.location||"未知地点"}}
          <span class="text-primary">--</span>
          {{comment.phone||"未知型号"}}
        </div>
        <div class="inline">
          <img :src="comment.image" mode="aspectFit" class="avatar">
          {{comment.title}}
        </div>
      </div>
      <div class="content">{{comment.comment}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["comments",'type'],
  methods: {
    handleClick(item){
      if(this.type === 'user'){
        wx.navigateTo({
          url: '/pages/detail/main?id='+item.bookid,
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.comment-list {
  background-color: #eee;
  font-size: 14px;
  .comment {
    background: #fff;
    margin-bottom: 20rpx;
    padding: 10rpx 40rpx;
    .content {
      margin: 20rpx 0;
    }
  }
  .user {
    .avatar {
      width: 40rpx;
      height: 40rpx;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
}
</style>
