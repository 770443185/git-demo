<template>
  <li class="commentOtherItemInfo" @click.stop='toParent'>
    <div class="commentUserinfo">
      <span>
        {{commentListInfo.userinfo.name}}
      </span>
      <div v-if='commentListInfo.parent_id != rootCommentInfo.comment_id'>
        回复
        <span>
          {{commentListInfo.parent_user_info.name}}:
        </span>
      </div>
    </div>
    <span>
      {{commentListInfo.comment_content}}
    </span>
  </li>
</template>
<script>
export default {
  name: "CommentCoverli",
  props: ["commentListInfo",'rootCommentInfo'],
  methods: {
    //给父组件 传递方法
    toParent(){
      this.$emit('CoverliClick')
    }
  },
};
</script>
<style>
.commentOtherItemInfo{
    font-size: 3.467vw;
    line-height: 4.267vw;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 1.6vw !important;
}
.commentOtherItemInfo .commentUserinfo{
  display: flex;
  align-items: center;
}
.commentOtherItemInfo .commentUserinfo div{
  white-space: nowrap;
}
.commentOtherItemInfo .commentUserinfo span{
  color: #5090cc;
  margin-right: 1.333vw;
  white-space: nowrap;
}
</style>
