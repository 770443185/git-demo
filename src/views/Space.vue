<template>
  <div>
    <index-head :user_Img="userInfoModel.user_img" />
    <transition name="fadeLeft" mode="out-in">
      <div v-if="!isChange">
        <div class="banner">
          <img src="@/assets/bannerTop_new.png" alt="" />
        </div>
        <user-detail
          :userInfo="userInfoModel"
          @changeClick="$nextTick(() => (isChange = true))"
          kty="out"
        />
        <space-body :userInfoModel='userInfoModel'   />
      </div>
      <change-info
        @changeComfirm="Userupdata"
        :userInfo="userInfoModel"
        v-else
        @updataImg="fetchImgdata"
        key="in"
      />
    </transition>
  </div>
</template>
<script>
import IndexHead from "@/components/common/IndexHead.vue";
import UserDetail from "@/components/space/UserDetail.vue";
import ChangeInfo from "@/components/space/ChangeInfo.vue";
import SpaceBody from '@/components/space/SpaceBody.vue'
export default {
  name: "Space",
  data() {
    return {
      userInfoModel: {},
      isChange: false,
    };
  },
  components: {
    IndexHead,
    UserDetail,
    ChangeInfo,
    SpaceBody,
  },
  methods: {
    async fetchUserInfo() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: "loading..",
      });
      const res = await this.$http.get("/user/" + sessionStorage.getItem("id"));
      this.userInfoModel = res.data[0];
      this.$toast.clear();
    },
    async fetchImgdata(data) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "上传中",
      });
      const res = await this.$http.post("/upload", data);
      this.$toast.clear();
      this.userInfoModel.user_img = res.data.url;
      this.Userupdata();
    },
    async Userupdata() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: "上传中",
      });
      await this.$http.post(
        "/update/" + sessionStorage.getItem("id"),
        this.userInfoModel
      );
      this.$toast.clear();
    },
  },
  created() {
    // this.isChange=false;
    if (
      sessionStorage.getItem("token") == null ||
      sessionStorage.getItem("id") == null
    ) {
      this.$router.push("/login");
    } else {
      this.fetchUserInfo();
    }
  },
};
</script>
<style>
.banner {
  height: 25.6vw;
  overflow: hidden;
}
.banner img {
  width: 100%;
}
/* 过渡效果 */
/* .fadeLeft-enter {
  opacity: 0;
}
.fadeLeft-enter-to {
  opacity: 1;
}
.fadeLeft-leave {
  transform: translateX(0);
}
.fadeLeft-leave-to {
  transform: translateX(100%);
} */
/* .fadeLeft-enter-acitve {
  transition: all 0.5s;
}
.fadeLeft-leave-active {
  transition: all 0.5s;
} */
.fadeLeft-enter-acitve {
  animation: fadeIn .5s;
}
.fadeLeft-leave-active {
  animation: fadeOut .5s;
}
@keyframes fadeIn{
  from {
    transform: translateX(-100%);
  }to{
    transform: translateX(0);
  }
}
@keyframes fadeOut{
  from {
    transform: translateX(0);
  }to{
    transform: translateX(100%);
  }
}
</style>
