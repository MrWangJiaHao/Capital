<template>
  <div class="details">
    <el-card>
      <div class="details-title">
        <div class="details-title-name">{{ data.name }}</div>
        <div class="details-title-date">{{ data.createDate }}上线</div>
      </div>

      <div class="details-userinfo">
        <div class="details-userinfo-title">
          <div>发布人信息</div>
          <div :style="{ marginRight: '10px' }">
            <el-button type="primary" @click="submitMessage">发送站内信</el-button>
            <el-button type="success" @click="openNda">签订NDA</el-button>
          </div>
        </div>
        <div class="details-userinfo-card">
          <el-card>
            <div class="flex">
              <div class="details-userinfo-card-right">
                <el-row>
                  <el-col :span="6" class="left">
                    <div>发布者姓名</div>
                    <div>公司名称</div>
                  </el-col>
                  <el-col :span="18" class="right">
                    <div>{{ data.creator }}</div>
                    <div>{{ data.organname }}</div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-card>
        </div>
      </div>

      <div class="details-projectinfo">
        <el-collapse v-model="collapse">
          <el-collapse-item title="项目名称" name="0">
            <div>
              项目名称：
              <span>{{ data.name }}</span>
            </div>
            <div>
              项目描述：
              <span>{{ data.descinfo }}</span>
            </div>
          </el-collapse-item>
          <el-collapse-item title="项目概要" name="1">
            <div v-for="item in showData" :key="item.label">
              <span>{{ item.label }}：</span>
              <span>
                {{
                item.model === 'zonetype' || item.model === 'industry'
                ? ''
                : item.children
                ? item.children[data[item.model]]
                : data[item.model]
                }}
                <span
                  v-if="item.after && item.after.indexOf('unit') !== -1"
                >{{ data[item.after] === 1 ? '万' : '亿' }}</span>
                <span v-if="item.append">{{ item.append }}</span>
              </span>
              <span v-if="item.model === 'zonetype'">
                {{
                data[item.model]
                }}
              </span>
              <span v-if="item.model === 'industry'">
                <el-tag
                  v-for="_item in data[item.model].split(',')"
                  :key="_item"
                  :style="{ margin: '0px 10px 2px 0px' }"
                >{{ _item }}</el-tag>
              </span>
            </div>
          </el-collapse-item>
          <el-collapse-item
            title="保密文件"
            name="2"
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
      </div>

      <div class="details-table">
        <div style="margin-bottom:20px">
          <div class="details-table-title">同类项目</div>
          <el-table :data="similarlist">
            <el-table-column prop="propublisher" label="发布人" />
            <el-table-column prop="name" label="项目">
              <template slot-scope="scope">
                <el-button type="text" size="small">
                  <el-tag>{{ scope.row.name }}</el-tag>
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="industry" label="行业" />
            <el-table-column prop="type" label="类型" :formatter="formatterType" />
            <el-table-column prop="zonetype" label="地区" />
            <el-table-column prop="financeinfo" label="财务信息" />
          </el-table>
        </div>

        <div>
          <div class="details-table-title">发布人的其他项目</div>
          <el-table :data="propublisherlist">
            <el-table-column prop="propublisher" label="发布人" />
            <el-table-column prop="name" label="项目">
              <template slot-scope="scope">
                <el-button type="text" size="small">
                  <el-tag>{{ scope.row.name }}</el-tag>
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="industry" label="行业" />
            <el-table-column prop="type" label="类型" :formatter="formatterType" />
            <el-table-column prop="zonetype" label="地区" />
            <el-table-column prop="financeinfo" label="财务信息" />
          </el-table>
        </div>
      </div>
    </el-card>
    <el-dialog title="发送站内信" :visible="messageDialog" :before-close="closeMessage">
      <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="message"></el-input>
      <div class="message-submit">
        <el-button @click="messageDialog = false">取 消</el-button>
        <el-button type="primary" @click="sendMessage">发送</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible="ndaDialog" title="是否申请签署项目NDA" width="30%" :before-close="closeNda">
      <div :style="{ textAlign: 'right' }">
        <el-button @click="ndaDialog = false">取消</el-button>
        <el-button type="primary" @click="signNda">确认签署</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  created() {
    this.getDetails().then((res) => {
      this.data = res.data;
      this.areatype = res.data.areatype === 1 ? 'China' : 'Hai';
      this.flag = res.data.flag === 1 ? 'need' : 'sale';
      this.showData = this.$form[
        `${this.flag}Create${this.flag === 'sale' ? this.areatype : ''}${
          this.data.type
        }`
      ].list;
      this.getNdaStatus();
      this.getSimilarlist();
      this.getPropublisherlist();
      this.getFilelist();
    });
  },
  data() {
    return {
      ndaDialog: false,
      messageDialog: false,
      message: '',
      collapse: ['0', '1', '2'],
      similarlist: [],
      propublisherlist: [],
      data: {},
      areatype: '',
      flag: '',
      showData: [],
      fileList: [],
      typeMap: {
        1: '企业融资项目',
        2: '企业并购项目',
        3: 'PE,VC基金募资',
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
  methods: {
    async getNdaStatus() {
      const data = await this.$request.post('/system/tNdaNew/list');
      // console.log(data, 'list');
    },
    async signNda() {
      const data = await this.$request.post('/system/tNdaNew/add', {
        creator: sessionStorage.getItem('username'),
        proId: this.data.id,
      });
      if (data.code === 200) {
        this.$message.success('提交成功，请等待审核');
        this.ndaDialog = false;
      } else {
        this.$message.error('提交失败');
      }
    },
    openNda() {
      this.ndaDialog = true;
    },
    closeNda() {
      this.ndaDialog = false;
    },
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
    submitMessage() {
      console.log(this.data.creator, '发送站内信的人');
      if (this.data.creator === sessionStorage.getItem('username')) {
        this.$message.warning('您自己的项目不能发送站内信哦！');
        return;
      }
      this.messageDialog = true;
    },
    async sendMessage() {
      console.log(sessionStorage.getItem('username'), '要接受的人');
      const data = await this.$request.post('/system/tSendmessage/add', {
        pid: this.data.id,
        message: this.message,
        creator: sessionStorage.getItem('username'),
        reseruser: this.data.creator,
      });

      if (data.code === 200) {
        this.$message.success('发送成功');
        this.messageDialog = false;
        this.message = '';
      } else {
        this.$message.error(data.msg);
      }
    },
    closeMessage() {
      this.messageDialog = false;
    },
    formatterType(row) {
      return this.typeMap[row.type] || '--';
    },
    async getDetails() {
      return new Promise((resolve) => {
        const { id, type } = this.$route.params;
        resolve(this.$request.get(`/system/${type}/search/${id}`));
      });
    },
    // 同类项目
    async getSimilarlist() {
      const data = await this.$request.post('/system/pro/similarlist', {
        industry: this.data.industry,
      });
      this.similarlist = data.data.rows.filter(
        (item) => item.id !== this.data.id
      );
    },
    // 发布人的其他项目
    async getPropublisherlist() {
      const data = await this.$request.post('/system/pro/propublisherlist', {
        propublisher: this.data.propublisher,
      });
      this.propublisherlist = data.data.rows.filter(
        (item) => item.id !== this.data.id
      );
    },
    async getFilelist() {
      const data = await this.$request.post('/system/tFile/list', {
        buzid: this.data.secrecyfile,
      });
      this.fileList = data.data.rows;
      console.log(this.fileList, 'list');
    },
  },
};
</script>

<style lang="scss" scoped>
.details {
  padding: 30px;
  &-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &-name {
      width: 700px;
      font-size: 24px;
    }
    &-date {
      font-size: 14px;
      color: #999;
    }
  }
  &-tag {
    span {
      margin-right: 10px;
    }
  }
  &-userinfo {
    margin-top: 30px;
    &-title {
      color: #ff9d00;
      font-size: 16px;
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    &-card {
      .el-card {
        width: 100%;
      }
      &-left {
        text-align: center;
        width: 30%;
        border-right: 1px solid rgb(214, 214, 214);
      }
      &-right {
        width: 60%;
        padding-top: 10px;
        padding-left: 20px;
        .left {
          div {
            margin-bottom: 10px;
          }

          color: #999;
          font-size: 13px;
        }
        .right {
          div {
            margin-bottom: 10px;
          }
          font-size: 13px;
        }
      }
    }
  }
  &-projectinfo {
    margin-bottom: 20px;
  }
  &-table {
    padding-bottom: 80px;
    &-title {
      font-size: 16px;
      margin-bottom: 5px;
    }
  }
  .message-submit {
    padding-top: 20px;
    text-align: center;
  }
}
</style>
