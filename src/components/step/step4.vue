<template>
  <div class="step4">
    <el-card class="card1">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="我的项目名称" name="1">
          <div>
            项目名称：
            <span>{{ form.name }}</span>
          </div>
          <div>
            项目描述：
            <span>{{ form.descinfo }}</span>
          </div>
        </el-collapse-item>

        <el-collapse-item title="项目概要" name="2">
          <div v-for="item in $form[formtype].list" :key="item.label">
            <span>{{ item.label }}：</span>
            <span>
              {{
              item.model === 'zonetype' || item.model === 'industry'
              ? ''
              : item.children
              ? item.children[form[item.model]]
              : form[item.model]
              }}
              <span
                v-if="
                  item.after &&
                    (item.after.indexOf('unit') !== -1 ||
                      item.after.indexOf('Unit') !== -1)
                "
              >{{ form[item.after] === 1 ? '万' : '亿' }}</span>
              <span v-if="item.append">{{ item.append }}</span>
            </span>
            <span v-if="item.model === 'zonetype'">{{ form[item.model] }}</span>
            <span v-if="item.model === 'industry'">
              <el-tag
                v-for="_item in form[item.model].split('/')"
                :key="_item"
                :style="{ margin: '10px' }"
              >{{ _item }}</el-tag>
            </span>
          </div>
        </el-collapse-item>
        <el-collapse-item
          title="保密文件"
          name="6"
          v-loading="fileloading"
          element-loading-text="正在下载"
          element-loading-spinner="el-icon-loading"
        >
          <div>
            相关文档:
            <el-link
              v-for="item in fileList"
              :key="item.createDate"
              type="primary"
              :underline="false"
              :style="{ marginRight: '10px' }"
              @click="fileDownload({ url: item.url, filename: item.name })"
            >{{ item.name }}</el-link>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <el-card class="card2">
      <div>
        <div class="title">隐私设置</div>
        <div class="info">您上传的信息包括项目介绍、文件中心两部分。</div>
        <div class="info">项目介绍（包括简介Teaser文档）为所有网站会员可见。</div>
        <div class="info-important">文件中心可上传商业计划书（BP）、信息备忘录等进一步详细信息，您可将文件中心进行以下隐私设置：</div>
      </div>
      <el-divider></el-divider>
      <div>
        <el-radio-group v-model="form.projectprivacy">
          <div style="margin-bottom: 15px">
            <el-radio :label="1">所有用户申请签署NDA后，均自动审核通过，开放文件中心文档</el-radio>
          </div>
          <div>
            <el-radio :label="2">用户申请签署NDA后，需要我手动审核通过后，才开放文件中心文档</el-radio>
          </div>
        </el-radio-group>
      </div>
      <el-divider></el-divider>
      <div class="flex" style="width:400px">
        <div class="black-btn" @click="fallback()">上一步</div>
        <div class="black-btn" @click="submitForm('form')">提交审核</div>
      </div>
    </el-card>
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      formtype: `${sessionStorage.getItem('formType')}${sessionStorage.getItem(
        'formStatus'
      )}`,
      form: {
        projectprivacy: 1,
      },
      fileList: JSON.parse(sessionStorage.getItem('fileList')),
      activeNames: ['1', '2', '3', '4', '5', '6'],
      fileloading: false,
      needlist: [],
      salelist: [],
      formTypeMap: {
        saleCreateChina: 'tProject',
        saleCreateHai: 'tProjectout',
        needCreate:
          sessionStorage.getItem('formStatus') === '1' ? 'tneed' : 'tneedout',
      },
      transactionmodeMap: {
        1: '协议转让',
        2: '竞标',
        3: '司法拍卖',
        4: '其他',
      },
      islastyearprofitMap: {
        1: '盈利',
        2: '亏损',
        3: '盈亏平衡',
      },
    };
  },
  created() {
    this.setStatus(4);
    this.form = {
      ...JSON.parse(sessionStorage.getItem('form')),
      ...this.form,
    };
  },
  methods: {
    ...mapActions('create', ['setStatus']),
    async fileDownload({ url, filename }) {
      this.fileloading = true;
      const file = await this.$request.get(
        `/system/tFile/readFile?path=${url}`,
        { responseType: 'blob' }
      );
      const blob = new Blob([file]);
      const fileurl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = fileurl;
      link.download = filename;
      link.click();
      this.fileloading = false;
    },
    fallback() {
      this.$router.push('step3');
    },
    async submitForm() {
      const form = JSON.parse(sessionStorage.getItem('form'));
      const params = {
        ...this.form,
        ...form,
        type: sessionStorage.getItem('formStatus'),
        secrecyfile: sessionStorage.getItem('buzid'),
        projectprivacy: this.form.projectprivacy,
      };
      const url = `/system/${
        this.formTypeMap[sessionStorage.getItem('formType')]
      }/${sessionStorage.getItem('detailsType')}`;
      const data = await this.$request.post(url, {
        ...params,
      });

      if (data.code === 200) {
        sessionStorage.setItem('detailsType', '');
        this.$router.push('step5');
        if (sessionStorage.getItem('fowState') !== 2) {
          this.$message.warning(
            '谢谢提交。您尚未进行实名认证，请到资料设置中上传名片，进行实名认证，项目才能正常显示。'
          );
        }
      } else {
        this.$message({
          message: data.msg,
          type: 'error',
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.step4 {
  .card1 {
    margin-bottom: 40px;
    .el-collapse-item__content {
      div {
        color: #4c4c4c;
        margin-bottom: 5px;
      }
      span {
        color: black;
        font-weight: 400;
      }
      .info {
        padding-left: 10px;
        margin-bottom: 0;
        color: black;
      }
    }
  }
  .card2 {
    .title {
      font-size: 20px;
      color: #333;
      padding: 15px 0 25px 0;
      font-weight: 700;
    }
    .info {
      height: 40px;
      font-size: 16px;
      color: #666;
      line-height: 24px;
    }
    .info-important {
      font-size: 20px;
      color: #ff9d00;
      font-weight: 700;
    }
  }
}
</style>
