<template>
  <div>
    <common-list :info="info" :list="list" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        title: '交易管理',
        content: {
          type: 'tabs'
        }
      },
      list: {
        cur: false,
        list: [
          { prop: 'user', title: '序号' },
          { prop: 'project', title: '标题' },
          { prop: 'busin', title: '类型', notshow: true },
          { prop: 'type', title: '项目所属人' },
          { prop: 'area', title: '日期' },
          {
            prop: 'status',
            title: '当前状态',
            template: {
              type: 'tag',
              status: 'success'
            }
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped></style>
