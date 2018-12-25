<template>
  <div>
    <book-info :info="info"></book-info>
  </div>
</template>
<script>
import { get } from "@/util";
import bookInfo from "@/components/bookInfo";
export default {
  components: {
    bookInfo
  },
  data() {
    return {
      bookid: "",
      info: {}
    };
  },
  mounted() {
    this.bookid = this.$root.$mp.query.id;
    this.getDetail();
  },
  methods: {
    async getDetail() {
      const info = await get("/weapp/bookdetail", { id: this.bookid });
      wx.setNavigationBarTitle({
        title: info.title
      });
      this.info = info;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
