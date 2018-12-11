<script>

export default {
  async created() {

    // const res = await get('/weapp/demo')
    // console.log(123,res)
    // wx.request({
    //   url:config.host+'/weapp/demo',
    //   success:(res)=>{
    //     console.log(res)
    //   }
    // })
    console.log("小程序启动");
  }
};
</script>

<style lang="scss">
.text-primary{
    color: #ea5a49;
}
// 全局样式
.btn{
    color: white;
    background: #ea5a49;
    margin-bottom: 20rpx;
    padding-left:30rpx;
     border-radius: 4rpx;
     font-size: 32rpx;
     line-height: 80rpx;
     height: 80rpx;
     width: 100%;
     &:active{
         background: #fb5a49;
     }
}
</style>

