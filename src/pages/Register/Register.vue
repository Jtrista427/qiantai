<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>

      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px" label-position="right"
        class="demo-ruleForm">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model.number="ruleForm.phone"></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="code">
          <el-input v-model.number="ruleForm.code"></el-input>

          <el-button @click="getcode">获取验证码</el-button>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.passwordSure" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-checkbox>同意协议并注册《尚品汇用户协议》</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      const reg = /^1\d{10}/;
      if (!reg.test(this.ruleForm.phone)) {
        callback(new Error("请输入十一位数字"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.password !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (value != this.$store.state.user.code) {
        callback(new Error("验证码错误"));
      } else {
        callback();
      }
    };

    return {
      // 收集表单数据
      ruleForm: {
        phone: "",
        code: "",
        password: "",
        passwordSure: "",
        isChecked: 0,
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        passwordSure: [{ validator: validatePass2, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }],
        isChecked: [{ validator: this.isChecked == 1, trigger: "blur" }],
      },
    };
  },
  methods: {
    async getcode() {
      try {
        const { phone } = this.ruleForm;
        phone && (await this.$store.dispatch("user/getCode", phone));
        this.ruleForm.code = this.$store.state.user.code;
        console.log(this.ruleForm.code);
      } catch (error) {
        alert(error);
      }
    },
    async userRegister() {
      const { phone, code, password, passwordSure } = this.ruleForm;
      try {
        if (phone && password === passwordSure && code) {
          let result = await this.$store.dispatch("user/userRegister", {
            phone,
            code,
            password,
          });
          if (result) this.$router.push("/login");
        }
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 500px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    /deep/ .el-form {
      margin-left: 300px;
    }

    /deep/ .el-color-picker__icon,
    .el-input,
    .el-textarea {
      width: 40%;
      margin-top: 20px;
    }

    /deep/ .el-form-item__label {
      margin-top: 20px;
      margin-left: 20px;
    }

    /deep/ .el-button--primary {
      background-color: #e1251b;
      border: #e1251b;
      margin-left: 150px;
    }

    /deep/ .el-button--default {
      margin-left: 5px;
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>