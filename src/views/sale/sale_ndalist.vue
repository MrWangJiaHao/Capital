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
          { prop: 'id', title: '序号' },
          { prop: 'name', title: '项目标题' },
          { prop: 'type', title: '项目类型', notshow: true },
          { prop: 'updateDate', title: '项目修改时间' },
          {
            prop: 'status',
            title: '操作',
            template: {
              type: 'op',
              children: [
                {
                  icon: '',
                  text: '已发布',
                  type: 'primary',
                  fun: this.edit
                }
              ]
            }
          }
        ]
      }
    };
  },
  methods: {
    edit() {}
  }
};
</script>

<style lang="scss" scoped></style>
