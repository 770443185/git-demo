<template>
  <form action="/">
    <van-search
      v-model="inputVal"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />
  </form>
</template>
<script>
export default {
  data() {
    return {
      inputVal: "",
    };
  },
  methods: {
    onCancel() {
      this.inputVal=''
      this.$router.back(-1);
    },
    onSearch() {
      if(this.inputVal==''){
          this.$toast.fail('不能为空')
          return 
      }
      this.$emit('addHis',this.inputVal)
      this.$toast.fail('没有接口')
      this.inputVal=''
    },
  },
};
</script>
<style>
.van-search__action {
  color: #ffafc9 !important;
}
</style>
