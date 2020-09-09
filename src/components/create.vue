<template>
  <div class="create">
    <el-card class="create-card">
      <div class="create-card-title">{{info.title}}</div>
      <div class="create-card-content">
        <p v-for="item in info.content" :key="item">{{item}}</p>
      </div>
      <div class="black-btn" @click="show = true">立即创建</div>
    </el-card>
    <el-dialog
      :title="info.createTitle"
      custom-class="create-dialog"
      :visible="show"
      :width="info.createType.length === 2 ? '40%':'60%'"
      :before-close="close"
    >
      <div class="create-dialog-flex">
        <div
          class="cur create-dialog-box"
          v-for="item in info.createType"
          :key="item.key"
          @click="typevalue = item.key"
        >
          <div class="create-dialog-box-title">
            <span>{{item.title}}</span>
            <span :class="typevalue === item.key ? 'icon-cur' : 'icon'">
              <i class="el-icon-success" />
            </span>
          </div>
          <div class="create-dialog-box-content">{{item.content}}</div>
        </div>
      </div>
      <div class="black-btn" @click="create(typevalue)">下一步</div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['info', 'create'],
  data() {
    return {
      show: false,
      typevalue: '1'
    };
  },
  methods: {
    close() {
      this.show = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.create {
  .create-card {
    width: 50%;
    padding: 10px;
    margin: 0 auto;
    margin-top: 30px;
    &-title {
      margin: 20px 0;
      font-size: 30px;
      color: #777;
      font-weight: bold;
    }
    &-content {
      p {
        font-size: 14px;
        margin: 10px 0px;
      }
    }
  }
  .create-dialog {
    &-flex {
      display: flex;
      justify-content: center;
    }
    &-box {
      padding: 10px;
      margin: 0 20px;
      width: 40%;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 6px rgba(0, 0, 0, 0.2);
      .el-radio {
        width: 100%;
      }
      &-title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-left: 20px;
        font-size: 18px;
        .icon {
          font-size: 22px;
        }
        .icon-cur {
          font-size: 22px;
          color: #67c23a;
        }
      }
      &-content {
        height: 100px;
        width: 90%;
        margin: 0 auto;
        margin-top: 10px;
        padding: 5px 10px;
        border: 1px solid rgba(146, 146, 146, 0.452);
      }
    }
  }
}
</style>
