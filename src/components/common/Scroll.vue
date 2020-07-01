<template>
  <div class="wrapper" ref="wrapper">
    <van-pull-refresh v-if="pulldown" v-model="isLoading" @refresh="onRefresh">
      <slot></slot>
    </van-pull-refresh>
    <slot v-else></slot>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      scroll: null,
      isLoading: false,
    };
  },
  props: {
    top: {
      type: String,
      default: "0",
    },
    click: {
      type: Boolean,
      default: false,
    },
    pullup: {
      type: Boolean,
      default: false,
    },
    pulldown: {
      type: Boolean,
      default: false,
    },
    isRefresh:{
      type:Boolean,
      default :false,
    }
  },
  methods: {
    createWrapper() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: this.click,
        pullUpLoad: {
        threshold: 744
      }
      });

      //是否派发滚动到底部事件 用于上拉加载
      if (this.pullup) {
        this.scroll.on("touchEnd", (pos) => {
          if(pos.y<this.scroll.maxScrollY-50){
              this.$emit('loadMore')
          }
        });
      }

      

      //   //派发下拉刷新
      //   if (this.pulldown) {
      //     this.scroll.on("scroll", (pos) => {
      //       if (pos.y > 50) {
      //         console.log("释放刷新");
      //       }
      //     });
      //     this.scroll.on("touchEnd", (pos) => {
      //       if (pos.y > 50) {
      //         console.log("刷新中");
      //       }
      //     });
      //   }
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        console.log("刷新中");
      }, 1000);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.createWrapper();
      this.$refs.wrapper.style.height = "calc(100vh - " + this.top + ")";
    });
  },
  watch: {
    isRefresh(){
      console.log('dom结构 发生改变了')
      this.scroll.refresh();
    }
  },
};
</script>
<style>
.wrapper {
  overflow: hidden;
}
</style>
