<template>
  <div>
    <index-head :user_Img="userInfoModel.user_img" />
    <Scroll :click="true" :pulldown="false" top="12.533vw">
      <div class="content">
        <video-play :videourl="videoInfoModel" />
        <dl class="videoinfo" :key="videoID">
          <dt>
            <div class="info-name">
              <em v-if='videoInfoModel.category'
                ><van-icon name="fire" />{{ videoInfoModel.category.title }}</em
              >
              <span>
                {{ videoInfoModel.name }}
              </span>
            </div>
            <div class="info-desc">
              <div class="up-name">
                <van-icon name="manager" />
                <em>
                  {{ videoInfoModel.userinfo.name }}
                </em>
              </div>
              <div class="video-info">
                <span class="watch">231万次观看</span>
                <span class="danmu">1.2万弹幕</span>
                <span class="time">
                  {{ videoInfoModel.date }}
                </span>
              </div>
            </div>
          </dt>
          <dd>
            <div class="video_option">
              <span
                @click="attentionChange"
                :class="{ collection: isAttention }"
              >
                <van-icon name="good-job" />
                <em>点赞</em>
              </span>
              <span
                @click="fetchChangeCollection"
                :class="{ collection: isCollection }"
              >
                <van-icon name="star" />
                <em>收藏</em>
              </span>
              <span>
                <van-icon name="down" />
                <em>下载</em>
              </span>
            </div>
            <div class="hd_change">
              <span>
                <van-icon name="vip-card" />
                <em>清晰度</em>
              </span>
            </div>
          </dd>
        </dl>
        <video-commend :videoList="commends" />
        <video-comment :myuser="userInfoModel" />
      </div>
    </Scroll>
  </div>
</template>
<script>
import IndexHead from "@/components/common/IndexHead";
import VideoPlay from "@/components/article/VideoPlay";
import VideoCommend from "@/components/article/VideoCommend";
import VideoComment from "@/components/article/VideoComment";
import Scroll from "@/components/common/Scroll";
export default {
  data() {
    return {
      userInfoModel: {
        user_img: null,
      },
      videoID: this.$route.params.id,
      videoInfoModel: {
        name: "哥哥哥来玩",
        userinfo: {
          name: "bilibili",
        },
        date: "不知道呢",
      },
      commends: [],
      isCollection: false,
      isAttention: false,
    };
  },
  components: {
    IndexHead,
    VideoPlay,
    VideoCommend,
    VideoComment,
    Scroll,
  },
  methods: {
    async fetchUserInfo() {
      const res = await this.$http.get("/user/" + sessionStorage.getItem("id"));
      for (let key in res.data[0]) {
        this.userInfoModel[key] = res.data[0][key];
      }
    },
    async fetchVideoInfo() {
      const res = await this.$http.get("/article/" + this.$route.params.id);
      for (let key in res.data[0]) {
        this.videoInfoModel[key] = res.data[0][key];
      }
    },
    async fetchCommend() {
      const res = await this.$http.get("/commend");
      this.commends = res.data;
    },
    //收藏/取消收藏
    async fetchChangeCollection() {
      if (!sessionStorage.getItem("token")) {
        this.$toast.fail("请先登录");
        return;
      }
      this.isCollection = !this.isCollection;
      await this.$http.post("/collection/" + sessionStorage.getItem("id"), {
        article_id: this.$route.params.id,
      });
    },
    //判断是否被用户收藏
    async checkCollection() {
      if (!sessionStorage.getItem("token")) {
        return;
      }
      const res = await this.$http.get(
        "/collection/" + sessionStorage.getItem("id"),
        {
          params: {
            article_id: this.$route.params.id,
          },
        }
      );
      if (res.data.success == false) {
        this.isCollection = false;
      } else {
        this.isCollection = true;
      }
    },
    //关注(点赞)/取消关注(点赞)
    async attentionChange() {
      if (!sessionStorage.getItem("token")) {
        this.$toast.fail("请先登录");
        return;
      }
      this.isAttention = !this.isAttention;
      const res = await this.$http.post(
        "/sub_scription/" + sessionStorage.getItem("id"),
        {
          sub_id: this.videoInfoModel.userid,
        }
      );
      console.log(res);
    },
    //检测用户是否关注(点赞)
    async checkAttention() {
      if (!sessionStorage.getItem("token")) {
        return;
      }
      const res = await this.$http.get(
        "/sub_scription/" + sessionStorage.getItem("id"),
        {
          params: {
            sub_id: this.videoInfoModel.userid,
          },
        }
      );
      console.log(res);
      if (res.data.success == false) {
        this.isAttention = false;
      } else {
        this.isAttention = true;
      }
    },
    async fetchAlldate() {
      await this.fetchVideoInfo();
      await this.fetchCommend();
      await this.fetchUserInfo();
      this.checkCollection();
      this.checkAttention();
    },
  },
  created() {
    this.fetchAlldate();
  },
  watch: {
    $route() {
      this.fetchAlldate();
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
};
</script>

<style>
.videoinfo {
  background-color: #fff;
  overflow: hidden;
  border-bottom: 1.001px solid #eee;
}
.videoinfo dt {
  margin: 4vw 0 0;
  padding: 0 3.2vw;
}
.info-name {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4.267vw;
  color: #212121;
  height: 6.4vw;
}
.info-name em {
  width: 12.8vw;
  height: 5.333vw;
  border-radius: 12px;
  line-height: 5.333vw;
  color: #fb7299;
  text-align: center;
  line-height: 5.333vw;
  background-color: #f4f4f4;
  margin-right: 1.067vw;
  font-size: 3.2vw;
}
.info-name span {
  width: 86.667vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.info-desc {
  margin-top: 2.133vw;
  font-size: 3.2vw;
  color: #999999;
  display: flex;
  align-items: center;
}
.info-desc .up-name {
  margin-right: 4.8vw;
  display: flex;
  color: #212121;
}
.info-desc .video-info span {
  margin-right: 4.267vw;
}
.videoinfo dd {
  padding: 10.999px 12px;
  color: #999;
  font-size: 19.999px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.video_option {
  display: flex;
}
.videoinfo dd span {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 19.999px;
}
.video_option span.collection {
  color: #fb7299;
}
.videoinfo dd span em {
  font-size: 12px;
  margin-left: 4.999px;
}
.hd_change span {
  margin-right: 0 !important;
}
</style>
