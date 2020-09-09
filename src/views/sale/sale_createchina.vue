<template>
  <div>
    <create :info="info" :create="create" />
  </div>
</template>

<script>
export default {
  methods: {
    create(type) {
      sessionStorage.setItem('formType', this.info.type);
      sessionStorage.setItem('formStatus', type);
      sessionStorage.setItem(
        'steps',
        '项目要素,项目信息,项目保密信息/文件,预览,发布成功'
      );
      sessionStorage.setItem('form', '{}');
      sessionStorage.setItem('fileList', '[]');
      sessionStorage.setItem('buzid', '');
      sessionStorage.setItem('detailsType', 'add');
      this.$router.push(this.info.url);
    }
  },
  data() {
    return {
      info: {
        type: 'saleCreateChina',
        url: '/createdetail',
        title: '发布国内企业融资和并购项目',
        content: [
          '您上传的信息包括项目介绍、文件中心两部分。',
          '其中，项目介绍为网站会员可见，您可根据项目具体保密需求披露可见信息。',
          '文件中心可上传商业计划书（BP）、信息备忘录等进一步详细信息，',
          '您可将文件中心设置为网站会员可见或通过保密协议审核后方可浏览。'
        ],
        createTitle: '请选择您要发布的项目类型',
        createType: [
          {
            key: '1',
            title: '企业融资项目',
            content: '拟进行少数股权融资。可通过增资或老股转让方式'
          },
          {
            key: '2',
            title: '企业并购项目',
            content: '拟出让企业绝对或相对控股权。'
          },
          {
            key: '3',
            title: 'PE、VC基金募资',
            content:
              '私募股权和风险投资基金向母基金等合格投资人募资项目。可通过LP增资或份额转让方式。'
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped></style>
