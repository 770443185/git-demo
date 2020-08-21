<template>
  <div>
    <IndexHead :user_Img="userInfoModel.user_img" />
    <van-tabs
      style="border-bottom: 0.267vw solid #eee; background-color: #fff; padding:0 1.333vw"
      type="line"
      color="#FB7299"
      v-model="currentTab"
      animated
    >
      <van-tab
        v-for="(category, index) in categorys"
        :title="category.title"
        :key="index"
        :name="index"
        titel-style="color:#FB7299"
      >
        <scroll
          top="24.267vw"
          :click="true"
          :pullup="true"
          :pulldown="true"
          @loadMore="loadMOre"
          :isRefresh='SrcollRefresh'
        >
          <div>
            <van-swipe
              class="my-swipe"
              :autoplay="3000"
              indicator-color="white"
              v-if="index == 0"
            >
              <van-swipe-item>1</van-swipe-item>
              <van-swipe-item>2</van-swipe-item>
              <van-swipe-item>3</van-swipe-item>
              <van-swipe-item>4</van-swipe-item>
            </van-swipe>
            <common-videodetail
              :categoryItems="category.List"
              style="overflow: hidden;"
            />
            <van-loading
              color="#FB7299"
              type="spinner"
              size="5.333vw"
              style="text-align: center; padding: 2.667vw;"
              v-if="category.loading && !category.finished"
              >加载中...</van-loading
            >
            <span
              v-if="category.finished"
              style="padding: 5.333vw; text-align: center; display: block; font-size: 13px; color: #999;"
              >没有更多了</span
            >
          </div>
        </scroll>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import IndexHead from "@/components/common/IndexHead.vue";
import CommonVideodetail from "@/components/common/CommonVideodetail.vue";
import Scroll from "@/components/common/Scroll.vue";
export default {
  name: "Home",
  data() {
    return {
      userInfoModel: {},
      categorys: [],
      currentTab: null,
      currented: [], //存储 进入过的tab  防止每次点击标签都会触发一次请求,
      SrcollRefresh:false,
    };
  },
  components: {
    IndexHead,
    CommonVideodetail,
    Scroll,
  },
  methods: {
    async fetchuserInfo() {
      const res = await this.$http.get("/user/" + sessionStorage.getItem("id"));
      this.userInfoModel = res.data[0];
    },
    async fetchCategory() {
      const res = await this.$http.get("/category");
      this.categorys.push(
        ...res.data.map((item) => {
          item.List = [];
          (item.loading = false), (item.finished = false), (item.page = 0);
          item.pagesize = 8;
          return item;
        })
      );
    },
    async fetchCategoryItem(item) {
      const res = await this.$http.get("/detail/" + item._id, {
        params: {
          page: item.page,
          pagesize: item.pagesize,
        },
      });
      if (res.data.length < 8) {
        item.finished = true;
      }
      item.List.push(...res.data);
      this.$nextTick(()=>{
        this.SrcollRefresh=!this.SrcollRefresh;
      })
    },
    loadMOre() {
      const category = this.categorys[this.currentTab];
      category.loading = true;
      category.page += 1;
      this.$nextTick(async ()=>{
        await this.fetchCategoryItem(category);
        category.loading = false;
      })
    },
  },
  activated() {
    this.fetchuserInfo();
  },
  created() {
    this.fetchCategory();
  },
  watch: {
    currentTab(val) {
      //判断 如果 没有访问过某个 标签 则发送请求
      if (this.currented.indexOf(val) == -1) {
        this.fetchCategoryItem(this.categorys[val]);
        // 发送完请求 标记存入访问过的数组中
        this.currented.push(val);
      }
    },
  },
};
</script>
<style>
.van-tabs__wrap {
  padding: 0 2.667vw;
}
.van-tab--active {
  color: #fb7299;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 5.333vw;
  line-height: 40vw;
  text-align: center;
  background-color: #39a9ed;
}

</style>
