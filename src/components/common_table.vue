<template>
  <div class="dashboard-list" :style="{ width: list.width }">
    <div class="tables">
      <el-table :data="listdata.rows" size="medium" @row-click="change">
        <el-table-column
          v-for="item in list['list']"
          :key="item.prop"
          :prop="item.prop"
          :label="item.title"
        >
          <template slot-scope="scope">
            <div v-if="!item.template">
              <div>
                {{ scope.row[item.prop] ? scope.row[item.prop] : '--' }}
              </div>
            </div>
            <div v-else-if="item.template">
              <div v-if="item.template.type === 'params'">
                <div v-if="listdata.rows[scope.$index][item.template.data[0]]">
                  <span
                    v-for="(_item, index) in item.template.data"
                    :key="_item"
                  >
                    {{ listdata.rows[scope.$index][_item] }}
                    <span v-if="index !== item.template.data.length - 1">
                      -
                    </span>
                  </span>
                  <span>{{
                    listdata.rows[scope.$index][item.template.unit] === 1
                      ? '(万)'
                      : '(亿)'
                  }}</span>
                </div>
                <div v-if="!listdata.rows[scope.$index][item.template.data[0]]">
                  --
                </div>
              </div>
              <div v-if="item.template.type === 'type'">
                <div>{{ typeMap[scope.row[item.prop]] }}</div>
              </div>
              <div v-if="item.template.type === 'text-tag'">
                <div>{{ scope.row[item.prop] }}</div>
                <div>
                  <el-tag
                    v-if="listdata.rows[scope.$index].name"
                    :type="item.template.status"
                    >{{ listdata.rows[scope.$index].name }}</el-tag
                  >
                  <span v-if="!listdata.rows[scope.$index].name">--</span>
                </div>
              </div>
              <div v-if="item.template.type === 'industry'">
                <div>
                  <div
                    v-for="item in industryFormat(
                      listdata.rows[scope.$index].industry
                    )"
                    :key="item"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
              <div v-if="item.template.type === 'text'">
                <div v-if="scope.row[item.prop]" class="hign">
                  {{ scope.row[item.prop] }}
                </div>
                <span v-if="!scope.row[item.prop]">--</span>
              </div>
              <div v-if="item.template.type === 'tag'">
                <el-tag :type="item.template.status">{{
                  scope.row[item.prop]
                }}</el-tag>
              </div>
              <div class="op" v-if="item.template.type === 'op'">
                <el-button
                  v-for="_item in item.template.children"
                  :key="_item.text"
                  :type="_item.type"
                  @click="_item.fun('删除')"
                >
                  <i v-if="_item.icon" :class="_item.icon"></i>
                  {{ _item.text }}
                </el-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      v-if="listdata.total !== 0"
      :current-page="page"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="listdata.total"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  props: ['type', 'list', 'listdata', 'paginationFun'],
  data() {
    return {
      page: 1,
      typeMap: {
        1: '企业融资项目',
        2: '企业并购项目',
        3: 'PE,VC基金募资'
      }
    };
  },
  computed: {
    ...mapState('table', ['listData'])
  },
  methods: {
    ...mapActions('table', ['getlist']),
    industryFormat(industry) {
      const result = [];
      const tmparr = industry.split('/');
      tmparr.forEach(item => result.push(item.split(',')[1]));
      return result;
    },
    change(row) {
      if (!this.list.cur) {
        return;
      }
      const { id } = row;
      this.$router.push(`details/${this.type}/${id}`);
    },
    currentChange(e) {
      this.page = e;
      this.paginationFun(e);
    }
  }
};
</script>

<style lang="scss">
.dashboard-list {
  .title {
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &-text {
      font-size: 25px;
    }
    &-search {
      color: #ff9d00;
      font-weight: 700;
      font-size: 16px;
    }
  }
  .hign {
    font-size: 20px;
    color: #ff9d00;
  }
  .op {
    .el-button {
      margin-left: 0;
      margin-right: 5px;
    }
  }
}
</style>
