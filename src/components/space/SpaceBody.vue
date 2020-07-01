<template>
    <div class="spaceBody">
        <div class="tab">
            <span @click='currentTab=1' :class='{"active" : currentTab==1}' >动态</span>
            <span @click='currentTab=2' :class='{"active" : currentTab==2}' >视频</span>
        </div>
        <div v-if='currentTab==1' class="tabBody">
            <div class="bodyItem">
                <div class="Item-userInfo">
                    <div class="userInfo_img">
                        <img v-if='userInfoModel.user_img' :src="userInfoModel.user_img" alt="">
                        <img v-else src="../../assets/user_default-img.jpg" alt="">
                    </div>
                    <div class="userInfo_desc">
                        <span>
                            {{userInfoModel.name}}
                        </span>
                        <em>2019-06-02</em>
                    </div>
                </div>
                <p class="Item-content">
                    <a href="#">#动态卡片装扮#</a>
                    我正在使用"喂看见耳朵啦"卡片装扮，你也一起来试试吧~
                </p>
                <div class="itemFooter">
                    <span><van-icon size='20' style="margin-right: 1.867vw;" name="share" />转发</span>
                    <span><van-icon size='20' style="margin-right: 1.867vw;" name="chat-o" />评论</span>
                    <span><van-icon size='20' style="margin-right: 1.867vw;" name="good-job-o" />赞</span>
                </div>
            </div>
        </div>
        <div v-else class="myVideoBox">
            <div class="myVideoNull">
                <img src="../../assets/noContent.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            currentTab:1,
        }
    },
    props:['userInfoModel']
}
</script>
<style>
.spaceBody .tab{
    display: flex;
    align-items: center;
    font-size: 3.467vw;
    color: #757575;
    border-bottom: 0.267vw solid #eee;
    padding: 0 3.2vw;
    height: 10.667vw;
    background-color: #fff;
}
.spaceBody .tab span{
    margin-right: 8.533vw;
}
.spaceBody .tab span.active{
    color: #fb7299 !important;
}
.spaceBody .tabBody .bodyItem{
    padding: 3.733vw 3.2vw 3.2vw;
    background-color: #fff;
}
.spaceBody .tabBody .bodyItem .Item-userInfo{
    display: flex;
    align-items: center;
    padding-bottom: 3.733vw;
}
.spaceBody .tabBody .bodyItem .Item-userInfo .userInfo_img{
    width: 10.667vw;
    height: 10.667vw;
    margin-right: 1.6vw;
}
.userInfo_img img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.spaceBody .tabBody .bodyItem .Item-userInfo .userInfo_desc{
    height: 10.667vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 3.2vw;
    color: #999;
}
.tabBody .bodyItem .Item-userInfo .userInfo_desc span{
    font-size: 4vw;
    color: #212122;
}
.tabBody .bodyItem .Item-content{
    font-size: 4.267vw;
    color: #212121;
    padding-bottom: 3.733vw;
    line-height: 5.867vw;
}
.tabBody .bodyItem .Item-content a{
    color: #5090cc;
}
.tabBody .bodyItem .itemFooter{
    font-size: 3.467vw;
    color: #757575;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.tabBody .bodyItem .itemFooter span{
    display: flex;
    align-items: center;
    width: max-content;
    justify-content: space-between;
}
.spaceBody .myVideoBox{
    padding: 22.66667vw 0 4.26667vw;
    text-align: center;
    background-color: #fff;
}
.spaceBody .myVideoBox img{
    max-width: 100%;
    width: 74.66667vw;
    margin-bottom: 4vw;
}
</style>
