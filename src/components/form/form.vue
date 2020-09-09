<template>
  <el-form
    :rules="$form[formtype].rules"
    :model="form"
    label-position="top"
    label-width="80px"
    ref="form"
  >
    <el-form-item
      v-for="item in $form[formtype].list"
      :key="item.label"
      :label="item.label"
      :prop="item.model"
    >
      <el-radio-group
        v-if="item.type === 'radio'"
        v-model="form[item.model]"
        :prop="item.model"
      >
        <el-radio
          v-for="_item in Object.keys(item.children)"
          :key="_item"
          :label="Number(_item)"
          >{{ item.children[_item] }}</el-radio
        >
      </el-radio-group>

      <el-input
        v-if="item.type === 'input-number'"
        v-model="form[item.model]"
        controls-position="right"
        :min="0"
        :prop="item.model"
        style="width: 400px"
      >
        <el-select
          :style="{ width: '120px' }"
          v-model="form[item.after]"
          placeholder="请选择"
          slot="append"
        >
          <el-option label="万" :value="1">万</el-option>
          <el-option label="亿" :value="2">亿</el-option>
        </el-select>
      </el-input>

      <div v-if="item.type === 'range'">
        <el-input
          :type="item.inputtype"
          :style="{ width: '200px' }"
          v-model="form[item.startmodel]"
          placeholder="请输入金额"
        ></el-input
        >至
        <el-input
          :type="item.inputtype"
          :style="{ width: '200px' }"
          v-model="form[item.endmodel]"
          placeholder="请输入金额"
        ></el-input>
      </div>

      <el-cascader
        v-if="item.type === 'cascader'"
        :style="{ width: item.width }"
        placeholder="请选择"
        :props="{
          multiple:
            item.label === '行业分类' || item.label === '主要投资行业'
              ? true
              : false,
          checkStrictly:
            item.label === '行业分类' || item.label === '主要投资行业'
              ? true
              : false
        }"
        v-model="form[item.model]"
        :options="
          item.labeldetail === '国内区域分类'
            ? $chinaarea
            : item.label === '行业分类' || item.label === '主要投资行业'
            ? item.label === '主要投资行业'
              ? [{ label: '不限', value: '不限' }, ...$trade]
              : [...$trade]
            : $area
        "
        :show-all-levels="false"
        :prop="item.model"
        filterable
      ></el-cascader>

      <el-input
        v-if="item.type === 'input'"
        :type="item.inputtype"
        :rows="item.rows"
        :min="0"
        :style="{ width: item.width }"
        v-model="form[item.model]"
        :prop="item.model"
        :placeholder="item.placeholder"
      >
        <el-select
          v-if="item.select"
          :style="{ width: '100px' }"
          v-model="form[item.select.model]"
          slot="prepend"
          placeholder="请选择"
        >
          <el-option
            v-for="_item in Object.keys(item.select.children)"
            :key="_item"
            :label="item.select.children[_item]"
            :value="_item"
          ></el-option>
        </el-select>

        <el-select
          v-if="item.after"
          v-model="form[item.after]"
          slot="append"
          :style="{ width: '120px' }"
        >
          <el-option label="万" :value="1">万</el-option>
          <el-option label="亿" :value="2">亿</el-option>
        </el-select>

        <template v-if="item.prepend" slot="prepend">
          {{ item.prepend }}
        </template>
        <template v-if="item.append" slot="append">{{ item.append }}</template>
      </el-input>

      <el-select
        v-if="item.type === 'select'"
        v-model="form[item.model]"
        placeholder="请选择"
        :prop="item.model"
      >
        <el-option
          v-for="_item in Object.keys(item.children)"
          :key="_item"
          :label="item.children[_item]"
          :value="_item"
          >{{ item.children[_item] }}</el-option
        >
      </el-select>

      <el-checkbox
        v-if="item.show"
        class="is-show-data"
        :true-label="0"
        :false-label="1"
        v-model="form[item.show]"
        >不披露</el-checkbox
      >
    </el-form-item>

    <el-form-item>
      <div class="black-btn" @click="submitForm('form')">下一步 / 保存</div>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'conForm',
  data() {
    return {
      formtype: `${sessionStorage.getItem('formType')}${sessionStorage.getItem(
        'formStatus'
      )}`,
      form: {}
    };
  },
  created() {
    const tmpObj = {};
    this.$form[this.formtype].list.forEach(item => {
      if (
        item.type === 'number' ||
        item.type === 'input-number' ||
        item.type === 'input'
      ) {
        if (item.after) {
          tmpObj[item.after] = 1;
        }
      }
      if (item.select) {
        tmpObj[item.select.model] = '1';
      }
    });
    this.form = { ...tmpObj };
    if (
      !sessionStorage.getItem('formType') ||
      !sessionStorage.getItem('formStatus')
    ) {
      this.$router.push('/dashboard');
    }
    this.form = {
      ...this.form,
      ...JSON.parse(sessionStorage.getItem('form')),
      industry: JSON.parse(sessionStorage.getItem('form')).industry
        ? JSON.parse(sessionStorage.getItem('form')).industry.split('/')
        : [],
      zonetype: JSON.parse(sessionStorage.getItem('form')).zonetype
        ? JSON.parse(sessionStorage.getItem('form')).zonetype.split('/')
        : []
    };
  },
  computed: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          sessionStorage.setItem(
            'form',
            JSON.stringify({
              ...this.form,
              industry: this.form.industry.join('/'),
              zonetype: this.form.zonetype.join('/')
            })
          );
          this.$router.push('/createdetail/step2');
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.el-textarea__inner {
  background: #fff6e9 !important;
  border: 1px solid #f9e5c9;
}
</style>
