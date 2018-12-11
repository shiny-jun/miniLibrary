<template>
  <div class="rate">
    <span>☆☆☆☆☆</span>
    <div class="hollow" :style="style">★★★★★</div>
  </div>
</template>
<script>
export default {
  props: ["value"],
  computed: {
    style() {
      return `width:${this.value / 2.4}em`;
    }
  }
};
</script>
<style lang="scss" scoped>
.rate {
  position: relative;
  display: inline-block;
  font-size: 28rpx;
  .hollow {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    overflow: hidden;
  }
}
</style>
