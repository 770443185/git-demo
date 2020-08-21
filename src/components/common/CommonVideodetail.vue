<template>
  <div class="video_wrap">
    <common-video
      v-for="(categoryItem, index) in categoryItems"
      :key="index"
      :videoInfo="categoryItem"
    />
  </div>
</template>
<script>
import CommonVideo from "@/components/common/CommonVideo.vue";
export default {
  props: ["categoryItems"],
  components:{
      CommonVideo,
  },
};
</script>
<style>
.video_wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
  min-height: calc( 100vh - 24vw);
}
</style>
