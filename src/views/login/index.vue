<template>
  <div class="login-container">
    <el-form ref="loginForm" class="login-form" :model="loginForm" :rules="loginRules" label-position="left" auto-complete="on">
      <h3 class="title">煎蛋采集数据管理后台</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input v-model="loginForm.username" name="username" autocomplete="on" type="text" placeholder="用户名"/>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input v-model="loginForm.password" name="password" autocomplete="on" :type="pwdType" placeholder="密码"/>
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="pwdType ==='password'?'eye':'eye-open'"/>
        </span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  name: 'Login',
  data() {
    var validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能少于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'jlccskw',
        password: 'skw12345'
      },
      loginRules: {
        username: [{ require: true, trigger: 'blur' }],
        password: [{ require: true, trigger: 'blur', validator: validatePassword }]
      },
      pwdType: 'password',
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    // ????????????
    // 这里进入页面就会进行监控
    $route: {
      handler: function(route, routeOld) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('Login', this.loginForm)
            .then(data => {
              this.loading = false
              this.$router.push({ path: this.redirect || '/' })
            })
            .catch(error => {
              console.log('error：', error)
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss"  lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      // 背景透明
      background: transparent;
      border: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      border-radius: 0px;
      // -webkit-appearance: none;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>


<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 550px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    width: 30px;
    display: inline-block;
    vertical-align: middle;
  }
  .title {
    font-size: 26px;
    font-weight: bold;
    color: $light_gray;
    text-align: center;
    margin: 0px auto 40px auto;
  }
  .show-pwd {
    color: $dark_gray;
    position: absolute;
    font-size: 16px;
    right: 10px;
    top: 7px;
    cursor: pointer;
    user-select: none;
  }
}
</style>