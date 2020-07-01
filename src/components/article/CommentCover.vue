<template>
  <li class="CommentItem" v-if="commentItemInfo.userinfo">
    <div class="item_userImg">
      <img
        v-if="commentItemInfo.userinfo && commentItemInfo.userinfo.user_img"
        :src="commentItemInfo.userinfo.user_img"
        alt=""
      />
      <img v-else src="../../assets/user_default-img.jpg" alt="" />
    </div>
    <div class="itemInfo">
      <div class="item_username">
        <span>
          {{ commentItemInfo.userinfo.name }}
        </span>
        <em>
          {{ commentItemInfo.comment_date }}
        </em>
        <div class="commentgood">
          <van-icon name="good-job-o" />
          <em>1.4万</em>
        </div>
      </div>
      <p class="item_content">
        {{ commentItemInfo.comment_content }}
      </p>
      <ul
        v-if="
          commentItemInfo && !commentItemInfo.isUnfold && childList.length != 0
        "
        class="item_otherList"
      >
        <li
          v-for="(childItem, index) in childList.slice(0, 3)"
          :key="index"
          @click="$emit('replyClick', childItem)"
        >
          <span class="otherUser"> {{ childItem.userinfo.name }}: </span>
          <em class="ohterContent">
            {{ childItem.comment_content }}
          </em>
        </li>

        <li
          v-if="childList.length > 3 && commentItemInfo.isUnfold == false"
          class="last"
          @click="$emit('unfoldChange')"
        >
          <span>共{{ childList.length }}条回复<van-icon name="arrow"/></span>
        </li>
      </ul>
      <ul v-if="commentItemInfo.isUnfold" class="item_otherList_two">
        <comment-coverli
          v-for="(childListItem, index) in childList"
          :key="index"
          :commentListInfo="childListItem"
          :rootCommentInfo="commentItemInfo"
          @CoverliClick="$emit('replyClick', childListItem)"
        />
      </ul>
      <span class="comment_reply" @click="$emit('replyClick', commentItemInfo)">
        回复
      </span>
    </div>
  </li>
</template>
<script>
import CommentCoverli from "@/components/article/CommentCoverli";
export default {
  data() {
    return {
      childList: [],
    };
  },
  props: ["commentItemInfo"],
  components: {
    CommentCoverli,
  },

  methods: {
    childFilter(arr) {
      if (arr.length == 0) {
        return;
      }
      arr.forEach((item) => {
        this.childList.push(item);
        this.childFilter(item.child);
      });
    },
    searchParent(id) {
      let od = parseInt(id);
      for (let i = 0; i < this.childList.length; i++) {
        if (this.childList[i].comment_id == od) console.log(this.childList[i]);
        return this.childList[i];
      }
    },
  },
  created() {
    this.childFilter(this.commentItemInfo.child);
    this.childList = this.childList.sort(function(a, b) {
      return a.comment_id - b.comment_id;
    });
  },
};
</script>
<style>
.CommentItem {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 3.2vw;
  border-bottom: 1px solid #e7e7e7;
}
.CommentItem .item_userImg {
  width: 8vw;
  height: 8vw;
  margin-top: 0.533vw;
  flex-shrink: 0;
}
.item_userImg img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.CommentItem .itemInfo {
  flex: 1;
  margin-left: 4vw;
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-all;
  position: relative;
}
.CommentItem .itemInfo .comment_reply {
  position: absolute;
  right: 0;
  top: 9.333vw;
  font-size: 3.467vw;
  color: #5090cc;
}
.CommentItem .itemInfo .item_username {
  position: relative;
}
.CommentItem .itemInfo .item_username > span,
.CommentItem .itemInfo .item_username > em {
  display: block;
}
.CommentItem .itemInfo .item_username > span {
  font-size: 3.467vw;
  line-height: 3.467vw;
  color: #757575;
}
.CommentItem .itemInfo .item_username > em {
  font-size: 3.2vw;
  line-height: 3.2vw;
  color: #999;
  margin-top: 1.867vw;
}
.CommentItem .itemInfo .item_username .commentgood {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 4.267vw;
  color: #999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.CommentItem .itemInfo .item_username .commentgood em {
  font-size: 3.2vw;
}
.CommentItem .itemInfo .item_content {
  margin-top: 2.4vw;
  font-size: 3.467vw;
  color: #212121;
  white-space: pre-line;
  word-break: break-word;
  min-height: 4vw;
}
.CommentItem .itemInfo .item_otherList {
  margin-top: 2.667vw;
  padding: 2.667vw;
  background-color: #f4f4f4;
  color: #212121;
  border-radius: 4px;
}
.CommentItem .itemInfo .item_otherList_two {
  margin-top: 2.667vw;
  padding: 2.667vw;
  background-color: #f4f4f4;
  color: #212121;
  border-radius: 4px;
}
.item_otherList li:first-child {
  margin-top: 0;
}
.item_otherList li {
  margin-top: 1.6vw;
}
.item_otherList li .otherUser {
  color: #5090cc;
  font-size: 3.467vw;
}
.item_otherList li .ohterContent {
  color: #212122;
  font-size: 3.467vw;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 4.267vw;
}
.item_otherList li.last {
  margin-top: 2.133vw;
  font-size: 3.2vw;
  line-height: 3.2vw;
  color: #5090cc;
  display: flex;
}
.item_otherList li.last span {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
