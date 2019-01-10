<template>
  <div class="rate">
    <span class="bottom" :style="style2">★★★★★</span>
    <div class="hollow" :style="style">★★★★★</div>
  </div>
</template>
<script>
export default {
  props: ["value","size"],
  computed: {
    style() {
      if(this.size){
        return `width:${this.value / 2.4}em;font-size:${this.size}rpx;`;
      }else{
        return `width:${this.value / 2.4}em`;
      }
    },
    style2(){
      if(this.size){
        return `font-size:${this.size}rpx;`;
      }else{
        return
      }
    }
  }
};
</script>
<style lang="scss">
.rate {
  position: relative;
  display: inline-block;
  font-size: 28rpx;
  .bottom{
    color: #cccccc;
  }
  .hollow {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    overflow: hidden;
  }
}
</style>
