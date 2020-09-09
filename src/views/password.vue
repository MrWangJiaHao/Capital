<template>
  <div class="password">
    <el-card class="card">
      <el-form label-width="80px" :model="form">
        <el-form-item label="原密码" required>
          <el-input v-model="form.oldpassword"></el-input>
        </el-form-item>
        <el-form-item
          label="新密码"
          required
          placeholder="密码不得小于6位数，必须包含大写和小写字母"
        >
          <el-input v-model="form.newpassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" required placeholder="请二次确认密码">
          <el-input v-model="form.confirmpassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="submit"
            >确认修改</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
var MD5 = require('md5.js');
export default {
  data() {
    return {
      form: {},
      passwordType: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/
    };
  },
  methods: {
    async submit() {
      if (
        !this.form.oldpassword ||
        !this.form.newpassword ||
        !this.form.confirmpassword
      ) {
        this.$message.error('请输入完整的信息');
        return;
      }

      if (this.form.confirmpassword !== this.form.newpassword) {
        this.$message.error('确认密码与新密码不符');
        return;
      }

      if (!this.passwordType.test(this.form.confirmpassword)) {
        this.$message.error('密码不得小于6位数，必须包含大写和小写字母');
        return;
      }

      if (
        new MD5().update(`${this.form.oldpassword}`).digest('hex') !==
        localStorage.getItem('password')
      ) {
        this.$message.error('原密码输入错误');
        return;
      }

      const data = await this.$request.post('/system/tUser/resetPwd', {
        id: localStorage.getItem('id'),
        password: this.form.confirmpassword
      });
      if (data.code === 200) {
        this.$message.success('修改成功');
        this.$router.push('/dashboard');
        localStorage.setItem('password', data.data.password);
        this.form = {};
      }
    }
  }
};
</script>

<style lang="scss">
.password {
  margin-top: 50px;
  .card {
    width: 40%;
    margin-top: 50px;
    margin: 0 auto;
    .el-form-item__label {
      width: 100px !important;
    }
    .el-button--medium {
      margin-left: 20px;
    }
    .el-input {
      width: 90%;
    }
  }
}
</style>
