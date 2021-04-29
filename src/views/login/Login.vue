<template>
  <div class="login-page">
    <div class="login-box">
      <h2>欢迎来到论坛请登录</h2>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        label-width="50px"
        class="form-container"
        width="width"
        :rules="loginFormRule"
      >
        <el-form-item prop="studentCode">
          <el-input
            v-model="loginForm.studentCode"
            prefix-icon="el-icon-user"
            maxlength="10"
            show-word-limit
            clearable
          >
            <template slot="prepend">学号</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            prefix-icon="el-icon-lock"
            clearable
          >
            <template slot="prepend">
              密码
            </template>
          </el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="vertify_code">
          <el-input
            v-model="loginForm.vertify_code"
            placeholder="验证码"
            prefix-icon="el-icon-key"
            clearable
          >
            <template slot="append">
              <div
                class="login-code"
                @click="refreshCode"
                title="看不清？点击切换"
              >
                <vertify-code :identifyCode="identifyCode"></vertify-code>
              </div>
            </template>
          </el-input>
        </el-form-item>
        <div class="btn-gourp">
          <el-button type="primary" plain @click="login" :disabled="!agree"
            >登录</el-button
          >
          <el-tooltip
            class="item"
            effect="dark"
            content="没有账号，去注册？"
            placement="bottom"
          >
            <router-link tag="el-button" to="/register">注册</router-link>
          </el-tooltip>
        </div>
      </el-form>
      <el-checkbox v-model="agree"
        >点击代表你必须遵守法律法规来发表你的所有观点</el-checkbox
      >
    </div>
  </div>
</template>

<script>
import VertifyCode from "@/components/Vertifycode/VertifyCode"
export default {
  components: {
    VertifyCode,
  },
  data() {
    return {
      identifyCodes: "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789",
      identifyCode: "",
      loginForm: {
        studentCode: "2111902279",
        password: "yk1995815",
        vertify_code: "",
      },
      agree: false,
      loginFormRule: {
        studentCode: [
          { required: true, message: "请输入学号", trigger: "blur" },
          { min: 10, max: 10, message: "学号必须是十位", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, max: 15, message: "密码长度请在八位以上", trigger: "blur" },
        ],
        vertify_code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { required: true, validator: this.validateCode, change: "blur" },
        ],
      },
    }
  },
  created() {
    this.refreshCode()
    this.loginForm.vertify_code = this.identifyCode
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) {
          return
        }
        const { data: res } = await this.$http.post("login", this.loginForm)
        if (res.err_code !== 0) {
          this.$message({
            type: "error",
            message: res.msg,
            offset: 100,
            center: true,
            showClose: true,
            duration: 2000,
          })
        } else {
          this.$message({
            type: "success",
            message: "登录成功",
            center: true,
            duration: 500
          })
          window.sessionStorage.setItem("token", res.token)
          this.$router.push("/home")
        }
      })
    },
    // 验证码
    randomNum(min, max) {
      const res = Math.floor(Math.random() * (max - min) + min)
      return res
    },
    // 生成随机验证码
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ]
      }
      // console.log('identifyCode: ' + this.identifyCode)
    },
    // 验证码刷新
    refreshCode() {
      this.identifyCode = ""
      this.makeCode(this.identifyCodes, 4)
    },
    // 验证码输入校验自己写
    validateCode(rule, value, callback) {
      if (value.toLowerCase() !== this.identifyCode.toLowerCase()) {
        callback(new Error("验证码验证错误！"))
      } else {
        callback()
      }
    },
  },
}
</script>
<style lang="less" scoped>
.login-page {
  width: 100%;
  height: 100%;
  // background: url(https://picsum.photos/1920/937);
  background-color: #eee;
  background-size: 100%;
}
.login-box {
  width: 8rem;
  height: 11rem;
  // background-color: #eee;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0.25rem 0.5rem;
  padding-top: 2rem;
  box-sizing: border-box;
  border: 1px solid #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  h2 {
    font-size: 0.5rem;
    width: 100%;
    text-align: center;
    margin: 0;
    margin-bottom: 1rem;
  }
  .el-form-item {
    margin-bottom: 0.8rem;
  }
  .btn-gourp {
    float: right;
  }
  .el-checkbox {
    width: 100%;
    text-align: center;
    margin-top: 1rem;
  }
}

/deep/ .el-form-item__content {
  margin-left: 0 !important;
}
</style>
