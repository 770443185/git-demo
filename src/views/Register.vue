<template>
    <div class="register">
        <common-head title="注册bilibli" />

        <common-input style="margin: 17px 0; border-top: 1px solid #E7E7E7; border-bottom: 1px solid #E7E7E7;"
            rules="^.{1,}$" type="text" placeholder="请输入昵称" label="昵称" @inputSuccess='val=>model.name=val'>
        </common-input>
        <common-input style="border-bottom: 1px solid #e7e7e7; border-top: 1px solid #e7e7e7;" rules="^.{6,16}$"
            type="text" placeholder="用户账号" label="账号" @inputSuccess='val=>model.userName=val'></common-input>
        <common-input style="border-bottom: 1px solid #e7e7e7;" rules="^.{6,16}$" type="password" placeholder="密码"
            label="密码" @inputSuccess='val=>model.password=val'></common-input>
        <common-input style="border-bottom: 1px solid #e7e7e7;" rules="^.{6,16}$" type="password" placeholder="确认密码"
            label="确认密码" @inputSuccess='val=>model.alignPwd=val'></common-input>
        <div class="buttonBox">
            <common-button value='注册' @buttonClick='registerClick' />
            <common-button value='登录' @buttonClick='()=>this.$router.push("/login")' />
        </div>
    </div>
</template>
<script>
    import CommonHead from "@/components/common/CommonHead";
    import CommonInput from "@/components/common/CommonInput";
    import CommonButton from '@/components/common/CommonButton'
    export default {
        data() {
            return {
                model: {
                    name: '',
                    userName: "",
                    password: '',
                    alignPwd: ''
                }
            }
        },
        components: {
            CommonHead,
            CommonInput,
            CommonButton
        },
        methods: {
            async fetchRegister() {
                const res=await this.$http.post('/register', {
                    name:this.model.name,
                    username:this.model.userName,
                    password:this.model.alignPwd
                })
                this.$toast.clear();
                if(res.data.code==200){
                    this.$toast.success(res.data.msg)
                    this.$router.push('/login')
                }else{
                    this.$toast.fail(res.data.msg)
                }
            },
            registerClick() {
                console.log('注册按钮被点击率')
                  if(this.model.name.trim()&&this.model.userName.trim()&&this.model.password.trim()&&this.model.alignPwd.trim()){
                      if(this.model.password.trim()==this.model.alignPwd.trim()){
                        this.$toast.loading({
                            message:'家中中',
                            forbidClick:true,
                            duration:0
                        });
                        this.fetchRegister();
                      }else{
                        this.$toast('两次密码不正确')
                      }
                  }else{
                    this.$toast('格式错误')
                  }
            }
        },
    };
</script>
<style>
    .register {
        background-color: #F4F4F4;
    }

    .buttonBox {
        display: flex;
        padding: 20px 0px;
        justify-content: space-around;
        align-items: center;
    }
</style>