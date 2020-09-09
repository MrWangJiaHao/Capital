<template>
  <div class="common-list">
    <div class="common-list-title">{{ info.title }}</div>
    <el-divider></el-divider>
    <div class="common-list-table">
      <common-table
        v-if="info.content.type === 'btn'"
        :list="list"
        :listdata="listdataExtra"
      />
      <el-tabs
        v-if="info.content.type === 'tabs'"
        v-model="tabsValue"
        @tab-click="handleClick"
      >
        <el-tab-pane label="我发出的" name="sendList">
          <common-table :list="list" :listdata="listdata" />
        </el-tab-pane>
        <el-tab-pane label="我收到的" name="recivList">
          <common-table :list="acceptlist" :listdata="listdata" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  props: ['info', 'list', 'listdataExtra'],
  mounted() {
    this.handleClick({ name: 'sendList' });
  },
  data() {
    return {
      tabsValue: 'sendList',
      listdata: [],
      acceptlist: {
        cur: false,
        list: this.list.list.filter(item => !item.notshow)
      }
    };
  },
  methods: {
    async handleClick(e) {
      const data = await this.$request.post(`/system/pro/${e.name}`);
      this.listdata = data.data;
    }
  }
};
</script>

<style lang="scss" scoped>
.common-list {
  padding: 15px;
  &-title {
    font-size: 18px;
  }
  &-content {
    margin-bottom: 20px;
    &-btn {
      width: 120px;
      height: 34px;
      line-height: 34px;
      margin: 0px;
    }
  }
}
</style>
