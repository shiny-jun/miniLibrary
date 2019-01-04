<template>
  <div>
    <card v-for="book in books" :key="book.id" :book="book" @bookDetail="bookDetail"></card>
    <div v-if="!books.length">暂时还未添加图书</div>
  </div>
</template>
<script>
import { get } from "@/util";
import card from "@/components/card";

export default {
  components: {
    card
  },
  data() {
    return {
      books: [],
      userinfo: {},
      page: 0,
      size: 10
    };
  },
  methods: {
    init() {
      wx.showNavigationBarLoading();
      this.getBooks();
    },
    async getBooks() {
      const books = await get("/weapp/booklist", {
        page: this.page,
        size: this.size,
        openid: this.userinfo.openId
      });
      this.books = books.list;
      wx.hideNavigationBarLoading();
    },
    bookDetail(book){ // 图书详情
        wx.navigateTo({ url: '/pages/detail/main?id='+book.id  });
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.init();
    wx.stopPullDownRefresh();
  },
  onShow() {
    if (!this.userinfo.openid) {
      let userinfo = wx.getStorageSync("userinfo");
      if (userinfo) {
        this.userinfo = userinfo;
        this.init();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
