<template>
  <div>
    <common-editbutton
      text="头像"
      style="margin-top: 5.333vw; position: relative;;"
    >
      <img
        v-if="userInfo.user_img == null"
        src="../../assets/user_default-img.jpg"
        alt=""
      />
      <img v-else :src="userInfo.user_img" alt="" />
      <van-uploader
        :after-read="afterRead"
        slot="uploadImg"
        style="position: absolute; right: 1.333vw; top: 2.667vw; opacity: 0; z-index:99;"
        preview-size="12.267vw"
      />
    </common-editbutton>
    <common-editbutton
      @editButtonClick="dialogShow['name'] = true"
      text="昵称"
      :value="userInfo.name"
    />
    <common-editbutton text="UID" :value="userInfo.id" />
    <common-editbutton
      @editButtonClick="dialogShow['sex'] = true"
      text="性别"
      :value="sexInfo"
    />
    <common-editbutton
      @editButtonClick="dialogShow['user_desc'] = true"
      text="个性签名"
      :value="userInfo.uesr_desc"
    />
    <space-button
      text="退出登录"
      style="border-top: 0.267vw solid #eee; margin-top: 5.333vw;"
      @spacebuttonClick="clearToken"
    />
    <space-button text="返回空间" @spacebuttonClick="back" />

    <van-dialog
      v-model="dialogShow['name']"
      title="昵称"
      @confirm="changeInput('name')"
      show-cancel-button
      @cancel="userInfoModel.name = userInfo.name"
    >
      <van-field v-model="userInfoModel.name" autofocus />
    </van-dialog>
    <van-action-sheet
      v-model="dialogShow['sex']"
      :actions="actions"
      @select="sexSelect"
    />
    <van-dialog
      v-model="dialogShow['user_desc']"
      title="个性签名"
      show-cancel-button
      @confirm="changeInput('user_desc')"
      @cancel="userInfoModel.user_desc = userInfo.user_desc"
    >
      <van-field v-model="userInfoModel.user_desc" autofocus type="textarea" />
    </van-dialog>
  </div>
</template>
<script>
import CommonEditbutton from "@/components/common/CommonEditbutton.vue";
import SpaceButton from "@/components/space/SpaceButton.vue";
export default {
  props: ["userInfo"],
  data() {
    return {
      dialogShow: {
        name: false,
        sex: false,
        user_desc: false,
      },
      userInfoModel: {
        name: this.userInfo.name,
        sex: "",
        user_desc: this.userInfo.user_desc,
      },
      actions: [{ name: '男',value:0 }, { name: '女',value:1 },{ name: '保密',value:null }],
    };
  },
  computed: {
      sexInfo(){
          if(this.userInfo.gender==null){
              return '保密'
          }else if(this.userInfo.gender==0){
              return '男'
          }else{
              return '女'
          }
      }
  },
  components: {
    CommonEditbutton,
    SpaceButton,
  },
  methods: {
    clearToken() {
      sessionStorage.clear();
      location.reload();
    },
    back() {
      this.$parent.isChange = false;
    },

    afterRead(file) {
      const formData = new FormData();
      formData.append("file", file.file);
      this.$emit("updataImg", formData);
    },
    changeInput(val) {
      this.$parent.userInfoModel[val]=this.userInfoModel[val];
      this.$emit('changeComfirm')
    },
    sexSelect(item){
        this.$parent.userInfoModel.gender=item.value
        this.dialogShow.sex = false;
        this.$emit('changeComfirm')
    }
  },
};
</script>
