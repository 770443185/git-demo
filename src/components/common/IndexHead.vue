<template>
    <div class="i-header">
      <div class="logo" @click="() => this.$router.push('/home')">
        <img src="@/assets/logo_default.png" alt="logo" />
      </div>
      <div class="searchbox" @click='$router.push("/search")'>
        <van-icon name="search" />
        <span>年薪百万去人民广场相亲？</span>
      </div>
      <div class="userImg" @click="() => $router.push('/space')">
        <img v-if="user_Img != null" :src="user_Img" alt="" />
        <img v-else src="@/assets/user_default-img.jpg" alt="user" />
      </div>
      <div class="downLoad">
        <span>下载App</span>
      </div>
    </div>
</template>
<script>
export default {
  name : 'IndexHead',
  props: ["user_Img"],
};
</script>
<style>
.i-header {
  display: flex;
  padding: 0 3.2vw 0 4.8vw;
  height: 12.533vw;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}
.logo {
  width: 17.333vw;
  flex-basis: 17.333vw;
  overflow: hidden;
}
.logo img {
  display: block;
  width: 100%;
  transform: scale(1.4);
}
.searchbox {
  height: 6.667vw;
  width: 31.467vw;
  padding: 0 3.12vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #f4f4f4;
  border-radius: 3.2vw;
  font-size: 3.2vw;
}
.searchbox span {
  font-size: 3.2vw;
  color: #b1d0f4;
  overflow: hidden;
  width: 23.2vw;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 4.999px;
}
.userImg {
  width: 6.933vw;
  height: 6.933vw;
  overflow: hidden;
  border-radius: 50%;
}
.userImg img {
  display: block;
  width: 100%;
  height: 100%;
}
.downLoad {
  width: 22.667vw;
  height: 6.933vw;
  text-align: center;
  line-height: 6.933vw;
  color: #fff;
  background-color: #fb7299;
  font-size: 3.733vw;
  border-radius: 1.999px;
}
</style>
