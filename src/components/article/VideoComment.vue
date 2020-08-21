<template>
  <div class="commentsBox">
    <p class="comments">
      评论 (<span>4070</span>)
    </p>
    <div class="commentUser">
      <div class="user_pic">
        <img v-if="myuser.user_img" :src="myuser.user_img" alt="" />
        <img v-else src="../../assets/user_default-img.jpg" alt="" />
      </div>
      <div class="sendbox">
        <input
          type="text"
          name=""
          placeholder="说点什么吧"
          id=""
          @focus="inputFocus"
          v-model='commentConetent'
          ref='sendInput'
        />
      </div>
      <div class="sendbtn disable" @click.enter='sendMsg()' ref='sendBtn'>
        <span>发送</span>
      </div>
    </div>
    <ul class="commontList">
      <comment-cover
        v-for="(commentItem, index) in commentList"
        :commentItemInfo="commentItem"
        :key="index"
        @unfoldChange='commentItem.isUnfold=true'
        @replyClick='replyRoot'
      />
    </ul>
  </div>
</template>
<script>
import CommentCover from "@/components/article/CommentCover.vue";
export default {
  data() {
    return {
      commentList: [],
      rawData:[],
      commentConetent:'',
      PostCom :{
        comment_content:'',
        comment_date:'',
        parent_id:null,
        article_id:null,
      },
    };
  },
  props: ["myuser"],
  components: {
    CommentCover,
  },
  methods: {
    inputFocus() {
      if (
        !this.myuser ||
        !sessionStorage.getItem("id") ||
        !sessionStorage.getItem("token")
      ) {
        this.$toast.fail("请先登录");
        this.$refs.sendInput.blur();
        return;
      }
    },
    async fetchVideoComment() {
      const res = await this.$http.get("/comment/" + this.$route.params.id);
      this.commentList = this.commentsMap(res.data).map(item=>{
          item.isUnfold=false;
          return item;
      });
    },
    commentsMap(data) {
      function fn(meat) {
        let arr = [];
        data.forEach((item) => {
          if (item.parent_id == meat) {
            arr.push(item);
            item.child = fn(item.comment_id);
          }
        });
        return arr;
      }
      return fn(null);
    },
    //发送消息
    async sendMsg(){
      if(this.commentConetent==''){
        // 如果输入框为空 点击发送无效 
        return
      }
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '发送中',
      });
      this.PostCom.article_id=this.$route.params.id;
      this.PostCom.comment_content=this.commentConetent;
      // this.PostCom.parent_id=parentComment_id
      let date = new Date();
      let m=date.getMonth() +1;
      let d=date.getDate();
      if(m<10){
        m='0'+m;
      }
      if(d<10){
        d='0'+d;
      }
      this.PostCom.comment_date=m+'-'+d;
      await this.$http.post('/comment_post/' + sessionStorage.getItem('id'),this.PostCom);

      this.commentConetent=''
      this.$refs.sendInput.placeholder='说点什么吧'

      //发送完消息 给 parent_id 初始化
      this.PostCom.parent_id=null;

      //刷新页面
      // this.fetchVideoComment();

      this.$toast.clear();
    },
    // 回复一级消息
    replyRoot(parent){
      this.$refs.sendInput.focus();
      this.PostCom.parent_id=parent.comment_id;
      this.$refs.sendInput.placeholder='回复"'+parent.userinfo.name+'"';
    }
  },
  watch: {
    //监听输入框的状态 如果为空 更改点击按钮样式
    commentConetent(val){
      this.$refs.sendBtn.classList.toggle('disable',val=='');
    }
  },
  created() {
    this.fetchVideoComment();
  },
};
</script>
<style>
.commentsBox .comments {
  font-size: 4.267vw;
  color: #212121;
  padding: 10.667vw 2.667vw 2.667vw;
  background-color: #fff;

}
.commentsBox .comments span{
  color: #999;
}
.commentsBox .commentUser {
  padding: 2.667vw 2.667vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}
.commentsBox .commentUser .sendbtn{
  font-size: 3.2vw;
  height: 8vw;
  padding: 0 1.333vw;
  line-height: 8vw;
  background-color: #F25D8E;
  color: #fff;
  border-radius: 1.333vw;
  margin-left: 1.333vw;
}
.commentsBox .commentUser .disable{
  background-color: #ddd !important;
}
.commentUser .user_pic {
  width: 8vw;
  height: 8vw;
}
.user_pic img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.commentUser .sendbox {
  background-color: #f4f4f4;
  flex: 1;
  border-radius: 3.467vw;
  height: 8vw;
  font-size: 3.2vw;
  padding-left: 5.333vw;
  margin-left: 4vw;
}
.sendbox input {
  display: block;
  border: none;
  width: 100%;
  height: 100%;
  background-color: transparent;
}
.commontList {
  background-color: #fff;
}
</style>
