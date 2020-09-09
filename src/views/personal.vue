<template>
  <div class="personal">
    <el-card class="card" v-loading="loading">
      <el-tabs v-model="tabsValue">
        <el-tab-pane label="基本资料设置" name="base">
          <div class="personal-info">
            <div>
              <span class="personal-info-span">手机： {{ form.phone }}</span
              ><el-button v-if="false" type="primary">重新绑定手机</el-button>
            </div>
            <div v-if="false">
              <span class="personal-info-span">邮箱： {{ form.email }}</span>
              <el-button type="primary">重新绑定邮箱：</el-button>
            </div>
            <div v-if="false">
              <span class="personal-info-span"> 微信： xjhdq13123123</span>
              <el-button type="primary"> 微信解绑</el-button>
            </div>
            <div v-if="false">微信名称:</div>
          </div>
          <el-divider></el-divider>
          <div>
            <el-form label-width="80px" :model="form" label-position="left">
              <el-form-item label="真实姓名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="职务">
                <el-input v-model="form.post"></el-input>
              </el-form-item>
              <el-form-item label="公司/机构名称">
                <el-input v-model="form.organname"></el-input>
              </el-form-item>
              <el-form-item label="所在地">
                <el-input v-model="form.address"></el-input>
              </el-form-item>
              <el-form-item label="详细地址">
                <el-input v-model="form.addr"></el-input>
              </el-form-item>
              <el-form-item label="固定电话">
                <el-input v-model="form.fixed"></el-input>
              </el-form-item>
              <el-form-item label="邮政编码">
                <el-input v-model="form.postoffice"></el-input>
              </el-form-item>
              <el-form-item label="企业/机构网">
                <el-input v-model="form.enterprise"></el-input>
              </el-form-item>
              <el-form-item label="自我介绍">
                <el-input
                  v-model="form.introduce"
                  type="textarea"
                  :rows="5"
                ></el-input>
              </el-form-item>
              <el-form-item label="角色描述">
                <el-select
                  v-model="form.role"
                  placeholder="请选择"
                  style="{width:50%}"
                >
                  <el-option
                    v-for="(item, index) in options"
                    :key="index"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div class="submit">
              <div class="black-btn" @click="submit">提交</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="实名验证" name="second">
          <div class="authen">
            <div class="authen-title">
              上传名片完成实名认证，开启智能撮合新时代！
              <el-tag effect="dark" :type="fowStateMap[fowState]">
                {{
                  fowState === '1'
                    ? '待认证'
                    : fowState === '2'
                    ? '已认证'
                    : '认证未通过'
                }}
              </el-tag>
            </div>
            <div class="flex">
              <div>
                <el-image
                  :style="{ width: '400px' }"
                  :src="imgurl"
                  error="暂未认证"
                ></el-image>
              </div>
              <div class="authen-info">
                <div>通过实名认证的条件：</div>
                <div>○ 上传真实的名片</div>
                <div>○ 名片上的手机或邮箱与注册信息一致</div>
                <div>○ 名片格式支持gif、jpg、jpeg、png</div>
                <div>如不一致，请点击更新个人资料进行修改 选择名片</div>
                <div>
                  <el-upload
                    accept="image/gif, image/jpeg, image/png, image/jpg"
                    :action="url"
                    :show-file-list="false"
                    :on-success="upload"
                  >
                    <el-button size="medium" type="primary"
                      >选择名片并提交</el-button
                    >
                  </el-upload>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      fowStateMap: {
        1: 'warning',
        2: 'success',
        3: 'danger'
      },
      imgurl: '',
      loading: false,
      form: {},
      tabsValue: 'base',
      options: [
        '我是买家或买家代理',
        '我是卖家或卖家代理',
        '我在找金融服务机构',
        '我是金融服务机构',
        '我是政府部门/协会'
      ],
      fowState: sessionStorage.getItem('fowState'),
      url:
        process.env.NODE_ENV === 'development'
          ? '/api/system/tFile/fileUpload'
          : 'http://47.104.211.178:9187/api/system/tFile/fileUpload'
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async upload(response, file, fileList) {
      if (response.code !== 200) {
        this.$message.error(response.msg);
        return;
      }
      const data = await this.$request.get(
        `/system/tFile/readFile?path=${response.data}`,
        { responseType: 'blob' }
      );
      await this.$request.post('/system/tUser/edit', {
        ...this.form,
        idcardPositive: `${response.data}`,
        busLicense: '',
        idcardSide: ''
      });
      this.imgurl = window.URL.createObjectURL(data);
      this.getUserInfo();
    },
    async submit() {
      const data = await this.$request.post('/system/tUser/edit', {
        ...this.form
      });
      if (data.code === 200) {
        this.$message.success('修改成功');
        sessionStorage.setItem('username', data.data.name);
        this.getUserInfo();
      }
    },
    async getUserInfo() {
      this.loading = true;
      const data = await this.$request.get(
        `/system/tUser/search/${sessionStorage.getItem('id')}`
      );
      this.form = data.data;
      const image = await this.$request.get(
        `/system/tFile/readFile?path=${data.data.idcardPositive}`,
        { responseType: 'blob' }
      );
      this.imgurl = window.URL.createObjectURL(image);
      this.loading = false;
    }
  }
};
</script>

<style lang="scss">
.personal {
  margin-top: 50px;
  .card {
    width: 80%;
    padding: 0 100px;
    margin: 0 auto;
  }
  .el-form-item__label {
    width: 120px !important;
  }
  .el-input {
    width: 70%;
  }
  .el-textarea {
    width: 70%;
  }
  .el-select {
    width: 50%;
  }
  .submit {
    text-align: center;
  }
  &-info {
    font-size: 16px;
    font-weight: bold;
    .el-button--small {
      font-size: 16px;
    }
    &-span {
      margin-right: 50px;
    }
    div {
      margin: 20px 0px;
    }
  }
  .authen {
    &-title {
      font-size: 18px;
      font-weight: bold;
      margin: 30px 0;
    }
    &-info {
      padding-left: 20px;
      font-size: 18px;
      font-weight: 500;
      div {
        margin: 10px;
      }
    }
  }
}
</style>
