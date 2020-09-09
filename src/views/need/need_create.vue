<template>
  <div class="need">
    <el-card class="need-create">
      <div slot="header" class="need-create-title">
        <span>{{ info.createTitle }}</span>
      </div>
      <div class="need-create-flex">
        <div
          class="cur need-create-box"
          v-for="item in info.createType"
          :key="item.key"
          @click="typevalue = item.key"
        >
          <div class="need-create-box-title">
            <span>{{ item.title }}</span>
            <span :class="typevalue === item.key ? 'icon-cur' : 'icon'">
              <i class="el-icon-success" />
            </span>
          </div>
          <div class="need-create-box-content">{{ item.content }}</div>
        </div>
      </div>
      <div class="need-create-btn black-btn" @click="create(typevalue)">
        下一步
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  methods: {
    create(type) {
      sessionStorage.setItem('formType', this.info.type);
      sessionStorage.setItem('formStatus', type);
      sessionStorage.setItem(
        'steps',
        '需求要素,需求信息,发布者信息,预览,发布成功'
      );

      sessionStorage.setItem('form', '{}');
      sessionStorage.setItem('fileList', '[]');
      sessionStorage.setItem('buzid', '');
      sessionStorage.setItem('detailsType', 'add');
      this.$router.push(this.info.url);
    }
  },
  data() {
    return {
      typevalue: '1',
      info: {
        type: 'needCreate',
        url: 'createdetail',
        createTitle: '请选择您要发布的需求方向',
        createType: [
          {
            key: '1',
            title: '国内投资',
            content: '国内参股或并购投资需求'
          },
          {
            key: '2',
            title: '跨境投资',
            content: '跨境参股或并购投资需求'
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.need-create {
  margin: 0 auto;
  width: 60%;
  margin-top: 80px;
  &-title {
    font-size: 20px;
  }
  &-flex {
    display: flex;
    justify-content: center;
  }
  &-box {
    padding: 10px;
    margin: 0 40px;
    height: 180px;
    width: 35%;
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
  &-btn {
    margin: 40px auto;
  }
}
</style>
