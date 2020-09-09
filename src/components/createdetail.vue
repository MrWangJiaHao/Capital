<template>
  <div class="createdetail">
    <div class="createdetail-steps">
      <el-steps :active="status" finish-status="success" align-center>
        <el-step v-for="item in steps" :key="item" :title="item"></el-step>
      </el-steps>
    </div>
    <div
      v-if="this.status !== 5 && this.status !== 4"
      class="createdetail-info"
    >
      附注：建议填列尽可能详细信息 <span>以帮助潜在投资者了解项目匹配度</span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      active: 1,
      steps: sessionStorage.getItem('steps').split(','),
      isNeedCreate: sessionStorage.getItem('formType') === 'needCreate'
    };
  },
  created() {
    if (!this.steps) {
      this.$router.push('/dashboard');
    }
  },
  computed: {
    ...mapState('create', ['status'])
  }
};
</script>

<style lang="scss" scoped>
.createdetail {
  padding: 40px;
  &-steps {
    width: 60%;
    margin-bottom: 40px;
  }
  &-info {
    color: #999999;
    span {
      color: #fe9e2c;
    }
  }
}
</style>
