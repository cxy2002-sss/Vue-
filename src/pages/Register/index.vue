<template>
  <div class="register-container">
    <!-- 注册内容 -->

    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div>
      <el-form  :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item  class="content" label="手机号:" prop="phone">
          <el-input style="margin-top: 0;width: 400px;"  v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item class="content" label="验证码:" prop="code">
          <el-input style="margin-top: 0; width: 400px;" v-model="ruleForm.code"></el-input>
          <el-button type="primary" @click="getCode">获取验证码</el-button>
        </el-form-item>
        <el-form-item class="content" label="密码:" prop="password">
          <el-input style="margin-top: 0; width: 400px;" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="content" label="确认密码:" prop="password1">
          <el-input style="margin-top: 0; width: 400px;" type="password" v-model="ruleForm.password1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="content">
          <el-checkbox v-model="ruleForm.agree" label="1">同意协议并注册《奇妙屋用户协议》</el-checkbox>
        </el-form-item>
        </el-form>
    </div>
      <div class="btn">
        <button @click="userRegister('ruleForm')">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机奇妙屋</li>
        <li>销售联盟</li>
        <li>奇妙屋社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Register',
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.password1 !== '') {
          this.$refs.ruleForm.validateField('password1');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        phone: '',
        code: '',
        password: '',
        password1: '',
        agree: true,
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min:0, message: '请输入长度为0到11的手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请先输入手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        password1: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
      }
    }
  },
  computed: {
    ...mapState({
      CODE: state => state.user.code
    })
  },
  methods: {
    async getCode() {
      try {
        const { phone } = this.ruleForm;
        phone && (await this.$store.dispatch('getCode', this.phone))
        this.ruleForm.code = this.CODE
      } catch (error) {
        alert(error.message)
      }
    },
    userRegister(formName) {
      const { phone, code, password, password1 } = this.ruleForm;
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            (phone && code && password == password1) && (await this.$store.dispatch('UserRegister', { phone, code, password }))
            this.$router.push({ name: 'login' })
          } catch (error) {
            alert(error.message)
            return false
          }
        }
      });


    },
  }
}
</script>

<style lang="less" scoped>
.register-container {
  
  .register {
    width: 1200px;
    height: 445px;
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

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
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