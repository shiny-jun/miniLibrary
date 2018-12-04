<template>
  <div class="progressbar">
    <progress :percent="percent" activeColor="#ea5a49"/>
    <p>{{year}}已经过去了{{days}}天，{{percent}}%</p>
  </div>
</template>
<script>
export default {
  methods: {
    // 判断是不是闰年
    isLeapYear() {
      const year = new Date().getFullYear();
      if (year % 400 === 0) {
        return true;
      } else if (year % 4 === 0 && year % 100 !== 0) {
        return true;
      } else {
        return false;
      }
    },
    // 获取一年有多少天
    getDayOfYear() {
      return this.isLeapYear() ? 366 : 365;
    }
  },
  computed: {
    year() {
      return new Date().getFullYear();
    },
    days() {
      // 计算今年过了多少天
      let start = new Date(); // start今年的第一天
      start.setMonth(0);
      start.setDate(1);
      //今天的时间戳-今年第一天的时间戳
      let offset = new Date().getTime() - start.getTime();
      return parseInt(offset / 1000 / 60 / 60 / 24) + 1;
    },
    percent() {
      return (this.days * 100 / this.getDayOfYear()).toFixed(1);
    }
  }
};
</script>
<style lang="scss">
.progressbar {
  text-align: center;
  width: 100%;
  margin: 40rpx 0;
  progress {
    margin-bottom: 20rpx;
  }
}
</style>
