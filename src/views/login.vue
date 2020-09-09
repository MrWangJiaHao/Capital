<template>
  <div class="login">
    <div class="login-center">
      <div class="login-center-logo">
        <img src="logo.png" />
      </div>
      <div class="login-center-writing">
        <i />
        <span>让投资对接更简单</span>
        <i />
      </div>
      <el-card class="login-center-form">
        <el-form :model="form" ref="form">
          <div class="login-center-form-text">
            {{ status ? '登录' : '注册' }}
          </div>

          <el-form-item v-for="(item, index) in list" :key="item.label + index">
            <el-input
              v-model="form[item.label]"
              :placeholder="item.placeholder"
              :prefix-icon="
                !item.password ? 'el-icon-user-solid' : 'el-icon-s-goods'
              "
              :show-password="item.password"
              @keyup.enter.native="submitForm('form')"
            >
              <el-button slot="append" v-if="item.yzm" @click="getYzm"
                >获取验证码</el-button
              >
            </el-input>
          </el-form-item>

          <div v-if="status" class="cur login-center-form-password">
            <span @click="forget" v-if="logintype === 'password'"
              >忘记密码</span
            >
            <span v-if="logintype !== 'password'"></span>
            <span @click="phone">{{
              logintype === 'password' ? '手机号登录' : '密码登录'
            }}</span>
          </div>
          <div v-if="!status" class="login-center-form-deal">
            <el-checkbox v-model="agree"
              >我同意《用户注册协议详细条款》</el-checkbox
            >
          </div>
          <el-form-item>
            <el-button
              class="login-center-form-login"
              :style="{
                background: `${
                  status ? '#ff9d00' : agree ? '#ff9d00' : '#b3b3b3'
                }`
              }"
              type="primary"
              @click="submitForm('form')"
              >{{ status ? '登录' : '注册' }}</el-button
            >
          </el-form-item>
          <el-divider class="login-center-form-other">社交账号登录</el-divider>
          <div class="center-flex">
            <a
              class="cur login-center-form-weixin"
              type="primary"
              href="https://open.weixin.qq.com/connect/qrconnect?appid=wxd6f8d85e7dd8b3e3&redirect_uri=https%3A%2F%2Faccount.chinamerger.com%2Fmwaccount%2Faccount%2Fregister!wenxinLogin.action&response_type=code&scope=snsapi_login&state=go_back#wechat_redirect"
            >
              <img src="weixin.png" />微信
            </a>
          </div>
        </el-form>
      </el-card>
      <el-card class="login-center-sign">
        <div class="cur login-center-sign-box" @click="goFun">
          {{ status ? '还没有投航汇账户？10秒免费注册' : '已有账户？' }}
          <i class="el-icon-arrow-right" />
          <el-button class="login-center-sign-btn" type="primary">{{
            status ? '注册' : '登录'
          }}</el-button>
        </div>
      </el-card>
      <div v-if="true" class="center-flex">
        <div class="login-center-code">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAAe1BMVEUzMzM3NzczMzMzMzMzMzMzMzM1NTU0NDQ2NjYyMjIxMTEzMzMzMzMyMjIzMzMzMzMzMzM0NDQyMjIzMzMzMzMzMzMzMzMzMzMyMjIyMjI0NDQ0NDQyMjIzMzMzMzMzMzMzMzMxMTEyMjIzMzM0NDQxMTE0NDQ0NDQ2NjYdTaCmAAAAJ3RSTlMVAfLb7uESWBszBvWoZfnio185uLBq0MucXFkoH+Z0clAqwYtKRCfSf1RQAAAA+ElEQVQY03XQ2Y7DIAyFYR9wIRBo9i7TfTbz/k84IQm9m19Csr4LhCEpMRFL6X8+ddaeIysixfFsbXda2MK5CrvMO1TOwa7sRELhIOLenMbCYyr8cQ3t5Ff2UxuuHwtHD3hqMjeU57gw7+YaySxNnnlmZlY51sbobWQms0UGMPSuegcQzcfAz6zqep9TjSE+wKkAq2oSuencnokOn6+nDpdJ6+2BMI0i4CVHfO9PwLLOOD7yOt49j6G/p6Hvt+XXP6k1elnauC18GQ5yG4bM+L3Qxh74Se1ydzvFGB/MmUHdvf3qupkl5WTlPg04JyFdOpoqs4zoRP4A+4Edfesc4hIAAAAASUVORK5CYII="
          />
          投航汇手机版
        </div>
      </div>
      <div class="login-center-trade">© 2020 投航汇 All rights reserved</div>
      <div class="login-center-trade">沪ICP备20002967号-1</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login-com',
  created() {
    // sessionStorage.removeItem('token');
  },
  data() {
    return {
      agree: false,
      status: true,
      statusdetail: '',
      passwordType: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/,
      logintype: 'password',
      form: {},
      list: [
        {
          label: 'name',
          placeholder: '电子邮箱/手机',
          password: false
        },
        {
          label: 'password',
          placeholder: '密码',
          password: true
        }
      ]
    };
  },
  methods: {
    goFun() {
      this.status = !this.status;
      if (this.status) {
        this.list = [
          {
            label: 'name',
            placeholder: '电子邮箱/手机',
            password: false
          },
          {
            label: 'password',
            placeholder: '密码',
            password: true
          }
        ];
      } else {
        this.list = [
          {
            label: 'phone',
            placeholder: '手机号，需与名片一致',
            password: false
          },
          {
            label: 'password',
            placeholder: '密码不得小于6位数，必须包含大写和小写字母',
            password: true
          },
          {
            label: 'name',
            placeholder: '请输入用户名',
            password: false
          }
        ];
      }
    },
    forget() {
      this.list = [
        {
          label: 'name',
          placeholder: '电子邮箱/手机'
        },
        {
          label: 'yzm',
          placeholder: '获取验证码',
          yzm: true
        },
        {
          label: 'password',
          placeholder: '请输入新密码',
          password: true
        }
      ];
    },
    phone() {
      if (this.logintype === 'password') {
        this.logintype = 'phone';
        this.list = [
          {
            label: 'name',
            placeholder: '电子邮箱/手机'
          },
          {
            label: 'password',
            placeholder: '获取验证码',
            yzm: true
          }
        ];
      } else {
        this.logintype = 'password';
        this.list = [
          {
            label: 'name',
            placeholder: '电子邮箱/手机',
            password: false
          },
          {
            label: 'password',
            placeholder: '密码',
            password: true
          }
        ];
      }
    },
    async login() {
      const data = await this.$request.post('/system/tUser/login', {
        ...this.form
      });
      if (data.code === 200 || data.code === 9004) {
        sessionStorage.setItem('username', this.form.name);
        sessionStorage.setItem('id', data.data.id);
        sessionStorage.setItem('password', data.data.password);
        sessionStorage.setItem('token', data.data.token);
        sessionStorage.setItem('fowState', data.data.fowState);
        this.$router.push('/index');
      } else {
        this.$message({
          message: data.msg,
          type: 'error'
        });
      }
    },
    async submitForm(formName) {
      if (this.status) {
        if (this.form.name && this.form.password) {
          this.login();
        } else {
          this.$message({
            message: '请输入完整的登录信息',
            type: 'error'
          });
        }
      } else {
        if (!/^1[34578]\d{9}$/.test(this.form.phone)) {
          this.$message.error('请输入正确的手机号格式');
          return;
        }
        if (!this.passwordType.test(this.form.password)) {
          this.$message.error('密码不得小于6位数，必须包含大写和小写字母');
          return;
        }
        if (this.form.name && this.form.password && this.form.phone) {
          if (!this.agree) {
            return;
          }
          const data = await this.$request.post('/system/tUser/add', {
            ...this.form
          });
          if (data.code === 200) {
            this.login();
          } else {
            this.$message({
              message: data.msg,
              type: 'error'
            });
          }
        } else {
          this.$message({
            message: '请输入完整的登录信息',
            type: 'error'
          });
        }
      }
    },
    async getYzm() {
      try {
        const data = await this.$request.post('/system/tUser/getSms', {
          phone: '15011137131'
        });
        /* eslint-disable no-console */
        console.log(data);
      } catch (err) {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
