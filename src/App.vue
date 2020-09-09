<template>
  <router-view></router-view>
</template>

<script>
export default {
  data() {
    return {
      id: sessionStorage.getItem('id')
    };
  },
  created() {
    this.getUserInfo(this.id);
  },
  methods: {
    async getUserInfo(id) {
      if (id) {
        const data = await this.$request.get(`/system/tUser/search/${id}`);
        sessionStorage.setItem('fowState', data.data.fowState);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
