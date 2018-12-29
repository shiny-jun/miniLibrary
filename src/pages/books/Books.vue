<template>
  <div>
    <topSwiper :tops="tops" @bookDetail="bookDetail"></topSwiper>
    <card v-for="book in books" :key="book.id" :book="book" @bookDetail="bookDetail"></card>
    <p class="text-footer" v-if="!more">没有更多数据</p>
  </div>
</template>
<script>
import { get } from "@/util";
import card from "@/components/card";
import topSwiper from "@/components/topSwiper";
export default {
  components: {
    card,topSwiper
  },
  data() {
    return {
      books: [],
      page: 0,
      more: true,
      size:10,
      tops:[]
    };
  },
  methods: {
    async getList(init) {
      if (init) {
        this.page = 0;
        this.more = true;
      }
      wx.showNavigationBarLoading();
      const books = await get("/weapp/booklist", { size:this.size,page: this.page });
      console.log(books)
      if (books.list.length < this.size && this.page > 0) {
        this.more = false;
      }
      if (init) {
        this.books = books.list;
        wx.stopPullDownRefresh();
      } else {
        // 下拉刷新不能直接覆盖books而是累加
        this.books = this.books.concat(books.list);
      }
      wx.hideNavigationBarLoading();
    },
    async getTop(){
        const tops = await get('/weapp/booktop')
        this.tops = tops.list
    },
    bookDetail(book){ // 图书详情
        wx.navigateTo({ url: '/pages/detail/main?id='+book.id  });
    }
  },
  onPullDownRefresh() {
    this.getList(true);
    this.getTop()
  },
  onReachBottom() {
    if (!this.more) {
      return false;
    }
    this.page = this.page + 1;
    this.getList();
  },
  mounted() {
    this.getList(true);
    this.getTop()
  }
};
</script>
<style lang="scss" scoped>
</style>
