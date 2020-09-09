import cleanDeep from 'clean-deep';

export default {
  data() {
    return {
      loading: false,
      list: [],
      params: {},
      url: '',
      pageSize: 10,
      total: 0,
      page: +this.$route.query.page || 1,
      searchForm: {},
      message: '此操作将删除该条目, 是否继续?',
      visible: false,
      title: '新建',
      form: {},
      selection: [],
      init: false
    };
  },
  computed: {
    condition() {
      return cleanDeep(this.searchForm);
    }
  },
  methods: {
    preAdd() {},
    preEdit() {},
    preDelete() {},
    preSearch() {},
    async delete() {},
    async submit() {},

    async load(params, url) {
      this.loading = true;
      this.list = [];
      params.page = this.page;
      let data;
      try {
        data = await this.$request.get(url, { params });
        this.list = data.list;
        this.loading = false;
        this.total = data.total;
      } catch (error) {
        this.loading = false;
      }
    },

    handleCurrentChange(page) {
      // this.page = page;
      // if (page === 1) {
      //   this.$router.replace({
      //     query: {}
      //   });
      // } else {
      //   this.$router.replace({
      //     query: {
      //       page
      //     }
      //   });
      // }
      this.page = page;
      this.load({ ...this.params, page }, this.url);
    },

    // loadHandle(params, url, page = 1) {
    //   this.page = 1
    //   this.loading = true;
    //   return this.load({ ...params, page }, url).finally(() => {
    //     this.loading = false;
    //   });
    // }
    // searchHandle() {
    //   this.preSearch();
    //   this.page = 1;
    //   this.loadHandle();
    // },
    // addHandle() {
    //   this.title = '新建';
    //   this.form = {};
    //   this.preAdd();
    //   this.visible = true;
    // },
    // editHandle(item) {
    //   this.title = '编辑';
    //   const data = JSON.parse(JSON.stringify(item));
    //   this.preEdit(data);
    //   this.form = data;
    //   this.visible = true;
    // },
    // deleteHandle(id) {
    //   this.preDelete();
    //   this.$confirm(this.message, '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       this.delete(id).then(() => {
    //         this.$message.success('删除成功');
    //         this.visible = false;
    //         this.loadHandle();
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       });
    //     });
    // },
    // resetHandle() {
    //   this.$refs.form.resetFields();
    //   this.visible = false;
    // },
    // submitHandle() {
    //   this.$refs.form.validate(valid => {
    //     if (valid) {
    //       this.submit().then(() => {
    //         this.$message.success('操作成功');
    //         this.visible = false;
    //         this.loadHandle();
    //       });
    //     } else {
    //       return false;
    //     }
    //   });
    // },
    selectionHandle(val) {
      this.selection = val;
    }
    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach(row => {
    //       this.$refs.table.toggleRowSelection(row);
    //     });
    //   } else {
    //     this.$refs.table.clearSelection();
    //   }
    // }
  }
  // mounted() {
  //   this.loadHandle().then(() => {
  //     this.init = true;
  //   });
  // }
};
