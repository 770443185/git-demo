<template>
  <div class="detail-wrap">
    <div class="Detail">
      <div class="userImg-big">
        <img v-if='userInfo.user_img' :src="userInfo.user_img" alt="" />
        <img v-else src="../../assets/user_default-img.jpg" alt="" />
      </div>
      <div class="userDetail">
        <ul class="top">
          <li>
            <span>5</span>
            <em>粉丝</em>
          </li>
          <li>
            <span>5</span>
            <em>粉丝</em>
          </li>
          <li>
            <span>5</span>
            <em>粉丝</em>
          </li>
        </ul>
        <div class="changebutton" @click='$emit("changeClick")'>
          <span>编辑资料</span>
        </div>
      </div>
    </div>
    <div class="userInfo">
        <div class="username">
            <span v-if='userInfo.name'>{{userInfo.name}}</span>
            <span v-else>华灯璀璨</span>
        </div>
        <div class="userdesc">
            <span v-if='userInfo.user_desc'>
                {{ userInfo.user_desc }}
            </span>
            <span v-else >这个人很神秘 什么都没写</span>
        </div>
    </div>
  </div>
</template>
<script>
export default {
    props:{
        userInfo:{
            required:true,
            type:Object
        }
    },
};
</script>
<style>
.detail-wrap {
  background: #fff;
  border-bottom: 1px solid #e7e7e7;
}
em {
  font-style: normal;
}
.Detail {
  padding: 0 5.333vw;
  background-color: #fff;
  z-index: 2;
  display: flex;
  justify-content: space-between;
}
.userImg-big {
  width: 23.733vw;
  height: 23.733vw;
}
.userImg-big img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform: translateY(-1.707vw);
}
.userDetail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.userDetail .top {
  display: flex;
  justify-content: center;
  align-items: center;
}
.top li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3.2vw;
  width: 19.2vw;
  height: 8.8vw;
}
.top li em {
  color: #999;
}
.top li:nth-child(2) {
  position: relative;
}
.top li:nth-child(2)::after,
.top li:nth-child(2)::before {
  content: "";
  display: block;
  width: 0.267vw;
  height: 4.533vw;
  background-color: #e7e7e7;
  position: absolute;
  top: 2.533vw;
}
.top li:nth-child(2)::after{
    right: 0;
}
.top li:nth-child(2)::before{
    left: 0;
}
.Detail .changebutton {
  width: 58.4vw;
  height: 7.733vw;
  text-align: center;
  line-height: 7.733vw;
  border: 0.267vw solid #fb7299;
  margin-top: 3.2vw;
  font-size: 3.2vw;
  border-radius: 1.06667vw;
  color: #fb7299;
}
.userInfo{
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}
.userInfo .username{
    font-size: 4.8vw;
    height: 9.067vw;
    line-height: 9.067vw;
}
.userInfo .userdesc{
    font-size: 3.2vw;
    margin-top: 2.133vw;
    color:#999;
}
</style>
