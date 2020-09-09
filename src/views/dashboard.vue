<template>
  <div class="dashboard">
    <div class="search">
      <el-input
        placeholder="请输入关键词"
        v-model="search.input"
        @keyup.enter.native="getAlllist(1, search.project)"
      >
        <el-button
          slot="append"
          class="searchbtn"
          @click="getAlllist(1, search.project)"
          >搜索</el-button
        >
      </el-input>
    </div>
    <div class="project">
      <el-radio-group
        size="medium"
        v-model="search.project"
        @change="getAlllist"
      >
        <el-radio-button :label="2">跨境项目</el-radio-button>
        <el-radio-button :label="1">国内项目</el-radio-button>
      </el-radio-group>
    </div>
    <div class="list" v-loading="loading">
      <el-card class="salelist">
        <div class="title">
          <span class="title-text"
            >发现项目:{{ proListData.total || 0 }}条</span
          >
        </div>
        <common-table
          :type="search.project === 1 ? 'tProject' : 'tProjectout'"
          :list="search.project === 1 ? inlandList : foreignList"
          :listdata="proListData"
          :paginationFun="getProlist"
        />
      </el-card>
      <el-card class="needlist">
        <div class="title">
          <span class="title-text"
            >发现需求:{{ needListData.total || 0 }}条</span
          >
        </div>
        <common-table
          :type="search.project === 1 ? 'tneed' : 'tneedout'"
          :list="needList"
          :listdata="needListData"
          :paginationFun="getNeedlist"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getAlllist(1);
  },
  data() {
    return {
      timeout: null,
      proListData: {},
      needListData: {},
      loading: false,
      search: {
        input: '',
        select: '企业',
        project: 2
      },
      inlandList: {
        cur: true,
        list: [
          { prop: 'creator', title: '发布人' },
          { prop: 'name', title: '项目' },
          { prop: 'industry', title: '行业', template: { type: 'industry' } },
          { prop: 'type', title: '类型', template: { type: 'type' } },
          { prop: 'zonetype', title: '地区' },
          { prop: 'financeinfo', title: '财务信息', template: { type: 'text' } }
        ]
      },
      foreignList: {
        cur: true,
        list: [
          { prop: 'creator', title: '发布人' },
          { prop: 'name', title: '项目' },
          { prop: 'industry', title: '行业', template: { type: 'industry' } },
          { prop: 'type', title: '类型', template: { type: 'type' } },
          { prop: 'financround', title: '融资轮次' },
          { prop: 'financeinfo', title: '财务信息', template: { type: 'text' } }
        ]
      },
      needList: {
        cur: true,
        list: [
          { prop: 'propublisher', title: '发布人' },
          { prop: 'need', title: '需求', template: { type: 'text-tag' } },
          { prop: 'industry', title: '行业' },
          { prop: 'zonetype', title: '地区' },
          {
            prop: 'investmentscaleend',
            title: '拟投资规模',
            template: {
              type: 'params',
              data: ['investmentscalestart', 'investmentscaleend'],
              unit: 'enterprisevaluaunit'
            }
          }
        ]
      }
    };
  },
  methods: {
    async getAlllist() {
      this.getProlist(1);
      this.getNeedlist(1);
    },
    async getProlist(pageNum = 1) {
      this.loading = true;
      const proList = await this.$request.post('/system/index/prolist', {
        pageNum: `${pageNum}`,
        areatype: this.search.project,
        pageSize: '10',
        name: this.search.input,
        fowState: 2
      });
      this.proListData = proList.data;
      this.loading = false;
    },
    async getNeedlist(pageNum = 1) {
      this.loading = true;
      const needList = await this.$request.post('/system/index/needlist', {
        pageNum,
        areatype: this.search.project,
        pageSize: '10',
        name: this.search.input,
        fowState: 2
      });
      this.needListData = needList.data;
      this.loading = false;
    }
  }
};
</script>

<style lang="scss">
.dashboard {
  .search {
    margin-top: 30px;
    .el-select .el-input {
      width: 100px;
    }
    .el-input--small .el-input__inner {
      font-size: 16px;
      height: 44px;
    }
    .el-input-group__append {
      text-align: center;
      background-color: #1b8bcf;
      color: white;
      width: 6%;
      font-size: 18px;
    }
  }
  .project {
    margin-top: 20px;
  }
  .list {
    margin-top: 30px;
    .salelist {
      margin-bottom: 20px;
    }
    .title {
      padding: 10px;
      &-text {
        font-size: 25px;
      }
    }
  }
}
</style>
