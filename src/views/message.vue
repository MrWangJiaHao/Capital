<template>
  <div class="message">
    <div class="message-title">消息列表</div>
    <el-divider></el-divider>
    <div v-loading="loading">
      <el-card v-for="(item, index) in messageList" :key="index" class="box-card message-card">
        <el-avatar
          size="large"
          :style="{ background: '#FE9D2B', fontSize: '24px' }"
        >{{ item.creator }}</el-avatar>
        <div class="message-pro">{{ item.pro }}</div>
        <div class="message-name">
          {{ item.createBy }}
          <div v-if="item.no" class="message-new">站内信未回复</div>
        </div>
        <div class="message-info">{{ item.message }}</div>
        <div class="message-time">{{ item.createDate }}</div>
        <div class="message-reply">
          <span @click="reply(item)">去回复 &gt;</span>
        </div>
      </el-card>
      <el-dialog
        :title="`${this.data.pid}`"
        :visible="dialogVisible"
        width="50%"
        :before-close="handleClose"
      >
        <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="message"></el-input>
        <div class="message-submit">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sendMessage">发送</el-button>
        </div>
        <div>
          <el-card v-for="item in messageHistory" :key="item.createDate" class="message-details">
            <div style="display: flex">
              <div>
                <el-avatar
                  width="80"
                  size="large"
                  :style="{
                    background: `${
                      username === item.reseruser ? '#FE9D2B' : 'red'
                    }`,
                    fontSize: '24px'
                  }"
                >{{ item.reseruser }}</el-avatar>
              </div>
              <div class="message-details-info">
                <div style="font-size: 20px">
                  {{ item.reseruser }}
                  <span class="message-details-info-date">
                    {{
                    item.createDate
                    }}
                  </span>
                </div>
                <div class="message-details-info-message">{{ item.message }}</div>
              </div>
            </div>
          </el-card>
        </div>
      </el-dialog>
      <div class="message-none" v-if="messageList.length === 0">暂无消息</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  created() {
    this.getMessageList();
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      message: '',
      messageList: [],
      data: {},
      messageHistory: [],
      username: sessionStorage.getItem('username'),
      pidArr: [],
    };
  },
  methods: {
    async reply(data) {
      this.data = data;
      const list = await this.$request.post('/system/tSendmessage/list', {
        pid: this.data.pid,
      });
      const tmpMessagelist = list.data.rows.filter((item) => {
        return item.creator === this.data.creator;
      });
      this.messageHistory = tmpMessagelist;
      this.dialogVisible = true;
    },
    async sendMessage() {
      const data = await this.$request.post('/system/tReceivemessage/add', {
        pid: this.data.pid,
        message: this.message,
        reseruser: sessionStorage.getItem('username'),
      });
      let Json = {};
      Json['reseruser'] = data.data.reseruser;
      Json['message'] = data.data.message;
      Json['createDate'] = data.data.createDate;
      this.messageHistory.push(Json);
      if (data.code === 200) {
        this.$message.success('发送成功');
        this.messageDialog = false;
        this.message = '';
      } else {
        this.$message.error(data.msg);
      }
    },
    handleClose() {
      this.dialogVisible = false;
    },
    async getMessageList() {
      this.loading = true;
      const { data } = await this.$request.post(
        '/system/tSendmessage/alondlist'
      );
      let { rows } = data;
      rows.sort((a, b) => {
        return -a.pid + b.pid;
      });
      let res = new Map();
      this.pidArr = rows.filter(
        (item) => !res.has(item['pid']) && res.set(item['pid'], item)
      );
      this.messageList = this.pidArr;
      this.getHuoquXiaoXi();
      this.loading = false;
    },
    async getHuoquXiaoXi() {
      const { data } = await this.$request.post('/system/index/prolist', {});
      let { rows } = data;
      console.log(rows.tProjectou);
    },
  },
};
</script>

<style lang="scss" scoped>
.message {
  padding: 15px;
  &-title {
    font-size: 18px;
  }
  &-card {
    margin-bottom: 15px;
    position: relative;
    padding-left: 100px;
    height: 140px;
    .el-avatar--large {
      position: absolute;
      left: 20px;
      height: 80px;
      width: 80px;
      line-height: 80px;
    }
  }
  &-pro {
    font-size: 20px;
    font-weight: 500;
  }
  &-name {
    position: relative;
    font-size: 12px;
    color: #333;
    margin-top: 5px;
    font-weight: 700;
  }
  &-info {
    font-size: 14px;
    color: rgb(105, 105, 105);
    margin-top: 5px;
  }
  &-time {
    font-size: 12px;
    color: #a5a5a5;
    margin-top: 15px;
    display: inline-block;
  }
  &-none {
    font-size: 20px;
    text-align: center;
    margin-top: 50px;
  }
  &-reply {
    span {
      cursor: pointer;
    }
    text-align: right;
    font-size: 14px;
    font-weight: 500;
    color: #ff9d00;
  }
  &-new {
    position: absolute;
    text-align: center;
    width: 100px;
    right: 10px;
    top: 0;
    font-weight: normal;
    font-size: 12px;
    border-radius: 40px;
    padding: 3px 0;
    color: white;
    box-shadow: 0 0 5px #ffb900;
    font-weight: 600;
    background: #ffb900;
    animation: anni 0.5s infinite alternate;
  }
  .message-details {
    margin-top: 10px;
    .el-avatar--large {
      height: 80px;
      width: 80px;
      line-height: 80px;
    }
    &-info {
      width: 100%;
      margin-left: 20px;
      &-date {
        color: #737373;
        margin-left: 30px;
        font-size: 14px;
      }
      &-message {
        margin: 10px 100px 0px 0px;
        border-radius: 10px;
        background: #eee;
        padding: 10px;
        color: #5f5f5f;
      }
    }
  }
  .message-submit {
    padding-top: 20px;
    text-align: center;
    margin-bottom: 30px;
  }
}
@keyframes anni {
  from {
    background: #ffb900;
  }
  to {
    background: #ffd970;
  }
}
</style>
