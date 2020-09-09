<template>
  <div class="step2">
    <el-card>
      <el-form
        v-if="!isNeedCreate"
        :model="formData"
        label-position="top"
        label-width="80px"
        ref="form"
      >
        <el-form-item label="项目名称" required>
          <el-input
            props="name"
            :style="{ width: '50%' }"
            v-model="formData.name"
            placeholder="请输入项目名称, 不超过50个字"
            :maxlength="50"
          ></el-input>
        </el-form-item>

        <el-form-item label="项目描述以及投资亮点" class="info" required>
          <el-input
            :style="{ width: '30%' }"
            type="textarea"
            :rows="8"
            v-model="formData.descinfo"
          >
          </el-input>
        </el-form-item>
      </el-form>

      <el-form
        v-if="isNeedCreate"
        :model="formData"
        label-position="top"
        label-width="80px"
        ref="formData"
        :rules="rules"
      >
        <el-form-item
          v-for="item in needCreateForm"
          :key="item.label"
          :label="item.label"
        >
          <el-form-item v-if="item.type === 'inputRange'">
            <el-form-item :prop="item.startmodel">
              <el-input
                :min="0"
                type="number"
                v-model="formData[item.startmodel]"
                style="width:150px"
              />
            </el-form-item>
            <span :style="{ margin: '0px 10px' }">-</span>
            <el-form-item :prop="item.endmodel">
              <el-input
                v-model="formData[item.endmodel]"
                style="width:250px"
                :min="0"
                type="number"
              >
                <el-select
                  slot="append"
                  v-model="formData[item.model]"
                  placeholder="请选择"
                  style="width:100px"
                >
                  <el-option
                    v-for="(_item, _index) in item.select"
                    :key="_index"
                    :label="_item"
                    :value="_index + 1"
                  >
                  </el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </el-form-item>

          <el-form-item prop="financround" v-if="item.type === 'checkbox'">
            <el-checkbox-group v-model="formData.financround">
              <el-checkbox
                v-for="(_item, _index) in item.children"
                :key="_index + 1"
                :label="_item"
                >{{ _item }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
        </el-form-item>
      </el-form>

      <div class="flex" style="width:400px">
        <div class="black-btn" @click="fallback()">上一步</div>
        <div class="black-btn" @click="submitForm('formData')">
          下 一 步 / 保 存
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      formData: {
        financround: [],
        enterprisevaluaendunit: 1,
        enterprisevaluaunit: 1
      },
      isNeedCreate: sessionStorage.getItem('formType') === 'needCreate',
      needCreateForm: [
        {
          type: 'inputRange',
          label: `对融资和并购企业的营收规模要求(${
            sessionStorage.getItem('formStatus') === '1' ? '人民币' : '美元'
          })`,
          startmodel: 'revenuescalerequire',
          endmodel: 'revenuescalerequireend',
          select: ['万', '亿'],
          model: 'revenuescalerequireunit'
        },
        {
          type: 'inputRange',
          label: '对项目盈利要求',
          startmodel: 'projectprofitreq',
          endmodel: 'projectprofitreqend',
          select: ['万', '亿'],
          model: 'projectprofitrequnit'
        },
        {
          type: 'inputRange',
          label: `企业估值预期范围(${
            sessionStorage.getItem('formStatus') === '1' ? '人民币' : '美元'
          })`,
          startmodel: 'enterprisevaluastart',
          endmodel: 'enterprisevaluaend',
          select: ['万', '亿'],
          model: 'enterprisevaluaendunit'
        },
        {
          type: 'inputRange',
          label: '拟投资金额',
          startmodel: 'proposinvestmentstart',
          endmodel: 'proposinvestmentend',
          select: ['万', '亿'],
          model: 'enterprisevaluaunit'
        },
        {
          label: '拟投资轮次',
          type: 'checkbox',
          model: 'financround',
          children: [
            '控股收购',
            '天使轮',
            'A轮',
            'B轮',
            'C轮',
            'D轮以后',
            'Pre-IPO',
            '二级市场'
          ]
        }
      ],
      rules: {
        enterprisevaluastart: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        eenterprisevaluaend: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        enterprisevaluaend: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        proposinvestmentstart: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        proposinvestmentend: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        financround: [
          {
            type: 'array',
            required: true,
            message: '请选择拟投资轮次',
            trigger: 'change'
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions('create', ['setStatus']),
    fallback() {
      this.$router.push('step1');
    },
    submitForm(formName) {
      if (!this.isNeedCreate) {
        if (!this.formData.name || !this.formData.descinfo) {
          this.$message.warning('请输入完整的项目名称以及项目描述');
          return;
        }
      }
      const localform = JSON.parse(sessionStorage.getItem('form'));
      const params = {
        ...localform,
        ...this.formData
      };

      if (this.isNeedCreate) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            params.financround = this.formData.financround.join(',');
            sessionStorage.setItem('form', JSON.stringify(params));
            this.$router.push('step3');
          } else {
            return false;
          }
        });
      } else {
        delete params.financround;
        sessionStorage.setItem('form', JSON.stringify(params));
        this.$router.push('step3');
      }
    }
  },
  created() {
    this.formData = {
      ...this.formData,
      ...JSON.parse(sessionStorage.getItem('form'))
      // financround: JSON.parse(sessionStorage.getItem('form')).financround.split(
      //   ','
      // )
    };
    this.needCreateForm.forEach(item => {
      if (item.select) {
        this.formData = {
          ...this.formData,
          [item.select]: 1
        };
      }
    });
    this.setStatus(2);
  }
};
</script>

<style lang="scss">
.step2 {
  .el-textarea__inner {
    background: #eee !important;
  }
  .info {
    min-height: 160px;
    position: relative;
    .text {
      div {
        height: 20px;
      }
      position: absolute;
      top: 0;
      left: 31%;
    }
  }
  .el-form-item__content {
    display: flex;
  }
}
</style>
