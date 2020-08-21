<template>
  <div class="videobox" @click='$router.push("/article/"+videoInfo.id)'>
    <dl>
      <dt class="img_pic" >
        <img v-if="videoInfo.img" :src="videoInfo.img" alt="" />
        <img v-else src="../../assets/user_default-img.jpg" alt="" />
        <p class="videoInfo">
          <span>
            <van-icon name="video-o" />
            <em>400万</em>
          </span>
          <span>
            <van-icon name="comment-o" />
            <em>4.8万</em>
          </span>
        </p>
      </dt>
      <dd>
        <span>
          {{ videoInfo.name }}
        </span>
      </dd>
    </dl>
  </div>
</template>
<script>
export default {
  props: ["videoInfo"],
};
</script>
<style>
.videobox {
  padding: 2.133vw 1.333vw;
  width: 45.867vw;
}
.videobox dl {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.videobox dl dd {
  text-align: left;
  width: 100%;
  margin-top: 1.6vw;
  font-size: 3.2vw;
  color: #212121;
  line-height: 4.8vw;
}
.img_pic {
  position: relative;
  height: 25.867vw;
  width: 45.867vw;
}
.img_pic img {
  width: 100%;
  height: 100%;
}
.img_pic .videoInfo {
  position: absolute;
  width: calc(100% - 3.2vw);
  padding: 1.333vw 1.6vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 4.267vw;
  bottom: 0;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);
  color: #fff;
}
.videoInfo span em {
  font-size: 3.2vw;
  margin-left: 1.333vw;
}
.videoInfo span {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
