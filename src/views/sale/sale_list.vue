<template>
  <div class="salelist">
    <div class="title">我的管理</div>
    <el-divider></el-divider>
    <el-table :data="listdata.rows">
      <el-table-column prop="id" label="序号" />
      <el-table-column prop="name" label="标题" />
      <el-table-column prop="type" label="类型" :formatter="formatterType" />
      <el-table-column prop="propublisher" label="项目所属人" />
      <el-table-column prop="createDate" label="日期" />
      <el-table-column
        prop="fowState"
        label="当前状态"
        :formatter="formatFowState"
      />
      <el-table-column prop="op" label="编辑">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="editFun(scope.row)"
            :style="{ marginRight: '10px' }"
          >
            编辑
          </el-button>
          <el-popconfirm
            title="确认删除此项目"
            @onConfirm="deleteFun(scope.row)"
          >
            <div>
              <el-button type="danger" size="mini">确认</el-button>
            </div>
            <el-button slot="reference" type="danger" size="mini">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  created() {
    this.getListData();
  },
  data() {
    return {
      listdata: [],
      info: {
        title: '我的管理',
        content: {
          type: 'btn'
        }
      },
      typeMap: {
        1: '企业融资项目',
        2: '企业并购项目',
        3: 'PE,VC基金募资'
      },
      fowStateMap: {
        1: '待审核',
        2: '审核通过',
        3: '审核未通过'
      }
    };
  },
  methods: {
    async editFun(row) {
      this.$router.push('createdetail');
      sessionStorage.setItem(
        'form',
        JSON.stringify({
          ...row,
          financround: Number(row.financround),
          islastyearprofit: String(row.islastyearprofit),
          profittype: String(row.profittype)
        })
      );
      sessionStorage.setItem(
        'formType',
        row.areatype === 1 ? 'saleCreateChina' : 'saleCreateHai'
      );
      sessionStorage.setItem('formStatus', row.type);
      sessionStorage.setItem('detailsType', 'edit');
    },
    async deleteFun(row) {
      const data = await this.$request.post('/system/tProject/remove', {
        ids: row.id
      });
      if (data.code === 200) {
        this.$message.success('删除成功');
      }
      this.getListData();
    },
    async getListData() {
      const data = await this.$request.post('/system/pro/list', {
        propublisher: sessionStorage.getItem('username')
      });
      this.listdata = data.data;
    },
    formatterType(row) {
      return this.typeMap[row.type] || '--';
    },
    formatFowState(row) {
      return this.fowStateMap[row.fowState] || '--';
    }
  }
};
</script>

<style lang="scss" scoped>
.salelist {
  padding: 15px;
  .title {
    font-size: 20px;
  }
}
</style>
