<template>
  <div class="search-bar">
    <div class="search-wrapper">
      <input class="search-input" type="text" v-model="searchText" bindconfirm="search">
      <span class="reset" @click="reset" v-if="searchText">×</span>
    </div>
    <div class="search-btn">
      <button @click="search">搜索</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchText: ""
    };
  },
  methods: {
    search() {
      this.$emit("search", this.searchText);
    },
    reset(){
        this.searchText = ""
    }
  }
};
</script>
<style lang="scss" scoped>
.search-bar {
  padding: 10rpx;
  display: flex;
  background-color: #ea5149;
  height: 60rpx;
  .search-wrapper {
    flex: 5;
    position: relative;
    background-color: #ffffff;
    margin-right: 10rpx;
    border-radius: 10rpx;
    padding: 4rpx 10rpx;
    .search-input{
        font-size: 28rpx;
    }
    .reset {
      position: absolute;
      padding: 6rpx;
      right: 12rpx;
      top: 0rpx;
      color: #999999;
    }
  }
  .search-btn {
    flex: 1;
      height: 100%;
    button {
      font-size: 28rpx;
      padding: 0;
      height: 100%;
      background-color: transparent;
      color: #ffffff;
      border: 0;
      margin-top: -4rpx;
      &::after {
        border: 0;
      }
    }
  }
}
</style>
