<template>
  <div class="Commendbox">
    <common-video
      v-for="(video, index) in videoList"
      :videoInfo="video"
      :key="index"
    />
  </div>
</template>
<script>
import CommonVideo from "@/components/common/CommonVideo";
export default {
  props: ["videoList"],
  components: {
    CommonVideo,
  },
};
</script>
<style>
    .Commendbox{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        background-color: #fff;
        padding: 0.267vw
    }
</style>
