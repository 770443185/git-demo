<template>
  <div class="login">
    <common-head title="登录bilibli" style="position: relative;">
      <div class="right">
        {{ LoginModel }}
      </div>
    </common-head>

    <common-input
      style="margin: 4.533vw 0 0; border-top: 0.267vw solid #E7E7E7; border-bottom: 0.267vw solid #E7E7E7;"
      rules="^.{6,}$"
      type="text"
      placeholder="请输入账号"
      label="账号"
      @inputSuccess="(val) => (model.username = val)"
    >
    </common-input>
    <common-input
      style="border-bottom: 0.267vw solid #e7e7e7; "
      rules="^.{6,}$"
      type="password"
      placeholder="请输入密码"
      label="密码"
      @inputSuccess="(val) => (model.password = val)"
    ></common-input>
    <div class="loginButtonbox">
      <common-button
        value="登录"
        style="width: 44vw;"
        @buttonClick="checked"
      />
      <common-button
      value="注册"
      style="width: 44vw;"
      @buttonClick="()=>this.$router.push('/register')"
    />
    </div>
  </div>
</template>
<script>
import CommonHead from "@/components/common/CommonHead";
import CommonInput from "@/components/common/CommonInput";
import CommonButton from "@/components/common/CommonButton";
export default {
  data() {
    return {
      model: {
        username: "",
        password: "",
      },
      LoginModel: "手机登录",
    };
  },
  components: {
    CommonHead,
    CommonInput,
    CommonButton,
  },
  methods: {
    async fetchLogin() {
        const res=await this.$http.post('/login',this.model)
        this.$toast.clear();
        if(res.data.code==200){
            this.$toast.success(res.data.msg)
            sessionStorage.setItem('token',res.data.token);
            sessionStorage.setItem('id',res.data.id)
            this.$router.push('/home');
            // this.$router.go(-1)
        }else{
            this.$toast.fail(res.data.msg)
        }
    },
    checked() {
      if (this.model.username.trim() && this.model.password.trim()) {
        this.$toast.loading({
          message: "登陆中",
          forbidClick: true,
          duration: 0,
        });
        this.fetchLogin();
      } else {
        this.$toast.fail("密码或账号不能为空");
      }
    },
  },
};
</script>
<style>
 .login{
     background: #F4F4F4;
 }
.loginButtonbox {
  padding: 20px 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.right {
  position: absolute;
  right: 5.333vw;
  top: 50%;
  transform: translateY(-50%);
  font-size: 3.2vw;
}
</style>
