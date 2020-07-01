<template>
  <div class="searchHot">
    <p class="title">大家都在搜</p>
    <div class="tagBox">
      <span class="tagItem" v-for="(tag, index) in tags" :key="index" @click='$emit("hotClick",tag)'>
        {{ tag }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tags: ["高天野", "FPX", "特朗普", "选煤", "金克拉", "陈睿"],
    };
  },
};
</script>
<style>
.searchHot {
  padding: 4vw 12px 5.333vw;
  background-color: #fff;
}
.searchHot .title {
  color: #999;
  font-size: 14px;
  font-weight: 400;
}
.searchHot .tagBox {
  display: flex;
  flex-wrap: wrap;
}
.tagBox .tagItem {
  font-size: 13px;
  height: 34.001px;
  line-height: 33px;
  padding: 0 12px;
  color: #505050;
  border: 0.267vw solid #ccc;
  border-radius: 17px;
  margin-right: 10px;
  margin-top: 12px;
}
</style>
