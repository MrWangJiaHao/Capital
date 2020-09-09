<template>
  <div>
    <el-card :style="{ 'padding-bottom': '20px' }">
      <div>
        <comForm />
      </div>
    </el-card>
  </div>
</template>

<script>
import comForm from '../form/form';
import { mapState, mapActions } from 'vuex';
export default {
  components: { comForm },
  computed: {
    ...mapState('form', ['formtype'])
  },
  created() {
    this.setStatus(1);
  },
  methods: {
    ...mapActions('create', ['setStatus'])
  }
};
</script>

<style lang="scss" scoped></style>
