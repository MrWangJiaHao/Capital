<template>
  <div class="step3">
    <el-card>
      <el-form
        v-if="!isNeedCreate"
        :model="form"
        label-position="top"
        label-width="80px"
        ref="form"
      >
        <el-form-item label="项目保密信息/文件">
          <div class="info">
            本文件中心供您上传项目保密级信息/文件。可设置自动审核通过或同意保密协议后可见。
          </div>
          <el-checkbox v-model="form.isNDA" :true-label="1" :false-label="2"
            >使用投航汇标准在线NDA（意向）</el-checkbox
          >
          <el-divider direction="vertical"></el-divider>
          <el-link
            type="primary"
            :underline="false"
            href="https://www.chinamerger.com/chinaMerger/public/NDA.pdf"
            target="_blank"
            >查看文件</el-link
          >
        </el-form-item>
        <el-divider></el-divider>

        <el-form-item label="上传保密文件（Data Room）">
          <div class="flex">
            <el-table
              :data="filelist"
              style="{width: 80px}"
              v-loading="uploadloading"
            >
              <el-table-column prop="name" label="文件名" />
              <el-table-column prop="creator" label="文档所有人" />
              <el-table-column prop="createDate" label="上传时间" />
              <el-table-column
                prop="size"
                label="文件大小"
                :formatter="formatSize"
              />
              <el-table-column prop="op" label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="danger"
                    size="mini"
                    @click="deleteFun(scope.row)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin-left:20px">
              <el-upload
                class="upload"
                ref="upload"
                :action="url"
                :show-file-list="false"
                :on-progress="beforeupload"
                :on-success="upload"
                :data="{ token, buzid }"
                multiple
              >
                <el-button
                  class="upload"
                  slot="trigger"
                  size="small"
                  type="primary"
                  style="width: 150px"
                  >上传文档</el-button
                >
              </el-upload>
              <el-card class="box-card">
                <div style="padding-left:14px">文档可能包括</div>
                <div>{{ buzid }}</div>
                <div><i class="el-icon-success"></i> 商业计划书 BP</div>
                <div><i class="el-icon-success"></i> 信息备忘录IM</div>
                <div><i class="el-icon-success"></i> 其他材料</div>
              </el-card>
            </div>
          </div>
        </el-form-item>
      </el-form>

      <el-form v-if="isNeedCreate">
        <el-form-item label="投资方介绍" style="width:500px">
          <el-input
            type="textarea"
            :rows="10"
            placeholder="关于投资方背景和投资需求的进一步介绍"
            v-model="form.investorintrodu"
          >
          </el-input
        ></el-form-item>
      </el-form>

      <div class="flex" style="width:400px">
        <div class="black-btn" @click="fallback()">上一步</div>
        <div class="black-btn" @click="submitForm('form')">
          下 一 步 / 保 存
        </div>
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
      uploadloading: false,
      buzid: '',
      token: sessionStorage.getItem('token'),
      isNeedCreate: sessionStorage.getItem('formType') === 'needCreate',
      form: {},
      url:
        process.env.NODE_ENV === 'development'
          ? '/api/system/tFile/add'
          : 'http://47.104.211.178:9187/api/system/tFile/add',
      filelist: []
    };
  },
  created() {
    this.setStatus(3);
    this.getFileList();
    this.form = { ...JSON.parse(sessionStorage.getItem('form')) };
    this.filelist = [...JSON.parse(sessionStorage.getItem('fileList'))];
    this.buzid = sessionStorage.getItem('buzid');
  },
  methods: {
    ...mapActions('create', ['setStatus']),
    formatSize(rows) {
      return `${(rows ? +rows.size : '').toFixed(2)}kb`;
    },
    upload(response, file, fileList) {
      if (response.code !== 200) {
        this.$message.error('上传的格式不支持');
        this.uploadloading = false;
        return;
      }
      const tmpFilelist = this.filelist;
      tmpFilelist.push(response.data);
      this.filelist = tmpFilelist;
      sessionStorage.setItem('buzid', this.filelist[0].buzid);
      this.buzid = sessionStorage.getItem('buzid');
      this.uploadloading = false;
    },
    beforeupload() {
      console.log(this.buzid);
      this.uploadloading = true;
    },
    async deleteFun(row) {
      this.uploadloading = true;
      const tmpFilelist = this.filelist;
      const data = await this.$request.post('/system/tFile/remove', {
        id: row.id
      });
      if (data.code === 200) {
        this.$message.success('删除成功');
        this.filelist = tmpFilelist.filter(item => {
          return item.id !== row.id;
        });
      }
      this.uploadloading = false;
    },
    async getFileList() {
      const data = await this.$request.post('/system/tFile/list');
      console.log(data,"step3");
    },
    fallback() {
      this.$router.push('step2');
    },
    submitForm() {
      if (this.isNeedCreate) {
        if (!this.form.investorintrodu) {
          this.$message.warning('请填写投资方介绍');
          return;
        }
      }
      const localform = JSON.parse(sessionStorage.getItem('form'));
        console.log(localform)
      return
      const params = {
        ...localform,
        ...this.form
      };
      sessionStorage.setItem('form', JSON.stringify(params));
      sessionStorage.setItem('fileList', JSON.stringify(this.filelist));
      this.$router.push('step4');
    }
  }
};
</script>

<style lang="scss" scoped>
.step3 {
  .upload {
    width: 150px;
    height: 40px;
    font-size: 18px;
    margin-bottom: 20px;
  }
  .info {
    font-size: 13px;
    position: relative;
    top: -14px;
    height: 14px;
  }
  .el-icon-success {
    color: rgb(115, 204, 14);
  }
}
</style>
