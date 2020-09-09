<template>
  <div class="step5">
    <el-card class="card">
      <div class="flex">
        <div class="info">
          <i class="el-icon-success"></i> 提交成功！完整度越高，匹配结果越精准！
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  created() {
    this.setStatus(5);
  },
  methods: {
    ...mapActions('create', ['setStatus'])
  }
};
</script>

<style lang="scss">
.step5 {
  .card {
    padding: 20px 5px;
    margin: 0 auto;
    .info {
      position: relative;
      top: 10px;
      font-size: 20px;
      color: #666;
      letter-spacing: 0;
      line-height: 30px;
      text-align: center;
      margin-right: 20px;
      .el-icon-success {
        position: relative;
        top: 5px;
        font-size: 30px;
        color: rgb(7, 182, 7);
      }
    }
  }
}
</style>
