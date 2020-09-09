module.exports = {
  saleCreateChina1: {
    list: [
      {
        type: 'radio',
        model: 'role',
        label: '我在项目中的角色',
        children: {
          1: '企业股东或管理层',
          2: '财务顾问'
        }
      },
      {
        type: 'radio',
        model: 'financmode',
        label: '融资方式',
        children: {
          1: '增资',
          2: '老股转让'
        }
      },
      {
        type: 'radio',
        model: 'financround',
        label: '融资轮次',
        children: {
          1: '天使轮',
          2: 'A轮',
          3: 'B轮',
          4: 'C轮',
          5: 'D轮以后',
          6: 'Pre-IPO',
          7: '二级市场'
        }
      },
      {
        type: 'input',
        inputtype: 'number',
        width: '350px',
        model: 'financmoney',
        label: '拟融资金额',
        after: 'financmoneyunit'
      },
      {
        type: 'cascader',
        width: '500px',
        model: 'industry',
        label: '行业分类',
        options: '$trade'
      },
      {
        type: 'cascader',
        width: '350px',
        model: 'zonetype',
        label: '区域分类',
        labeldetail: '国内区域分类',
        options: '$area'
      },
      {
        type: 'input',
        inputtype: 'number',
        width: '350px',
        model: 'specificshareratio',
        label: '拟出让的股权比例',
        prepend: '具体股比',
        append: '%'
      },
      {
        type: 'input-number',
        model: 'quasisellProjectMoney',
        label: '拟出让项目的整体估值',
        after: 'quasisellProjectUnit',
        show: 'isquasisellProject'
      },
      {
        type: 'select',
        model: 'islastyearprofit',
        label: '上一财年是否盈利',
        children: {
          1: '盈利',
          2: '亏损',
          3: '盈亏平衡'
        }
      },
      {
        type: 'input',
        inputtype: 'number',
        model: 'profitmonty',
        label: '盈利情况',
        width: '350px',
        after: 'profitunit',
        show: 'isprofitdisclosure',
        select: {
          width: '120px',
          model: 'profittype',
          children: {
            1: '净利润',
            2: 'EBITDA'
          }
        }
      },
      {
        type: 'input',
        inputtype: 'number',
        width: '300px',
        model: 'lastfinancialinfo',
        label: '上一财年公司简要财务信息',
        after: 'lastfinancialinfounit',
        prepend: '收入',
        show: 'isquasisellProject'
      }
    ],
    rules: {
      role: [{ required: true, message: '请选择', trigger: 'change' }],
      financmode: [{ required: true, message: '请选择', trigger: 'change' }],
      financround: [{ required: true, message: '请选择', trigger: 'change' }],
      financmoney: [{ required: true, message: '请输入', trigger: 'blue' }],
      industry: [{ required: true, message: '请选择', trigger: 'change' }],
      zonetype: [{ required: true, message: '请选择', trigger: 'change' }],
      specificshareratio: [
        { required: true, message: '请输入', trigger: 'blur' }
      ],
      quasisellProjectMoney: [
        { required: true, message: '请输入', trigger: 'blur' }
      ],
      islastyearprofit: [
        { required: true, message: '请选择', trigger: 'change' }
      ],
      financmoneyunit: [{ required: true, message: '请输入', trigger: 'blur' }],
      profitmonty: [
        { required: true, message: '请输入正确格式', trigger: 'blur' }
      ],
      lastfinancialinfo: [
        { required: true, message: '请输入正确格式', trigger: 'blur' }
      ]
    }
  },
  saleCreateChina2: {
    list: [
      {
        type: 'radio',
        model: 'role',
        label: '我在项目中的角色',
        children: {
          1: '企业股东或管理层',
          2: '财务顾问'
        }
      },
      {
        type: 'cascader',
        width: '500px',
        model: 'industry',
        label: '行业分类',
        options: '$trade'
      },
      {
        type: 'cascader',
        width: '350px',
        model: 'zonetype',
        label: '区域分类',
        labeldetail: '国内区域分类',
        options: '$area'
      },
      {
        type: 'input',
        inputtype: 'number',
        width: '350px',
        model: 'specificshareratio',
        label: '拟出让的股权比例',
        prepend: '具体股比',
        append: '%'
      },
      {
        type: 'input-number',
        model: 'quasisellProjectMoney',
        label: '拟出让项目的整体估值',
        after: 'quasisellProjectUnit',
        show: 'isquasisellProject'
      },
      {
        type: 'select',
        model: 'islastyearprofit',
        label: '上一财年是否盈利',
        children: {
          1: '盈利',
          2: '亏损',
          3: '盈亏平衡'
        }
      },
      {
        type: 'input',
        inputtype: 'number',
        model: 'profitmonty',
        width: '350px',
        label: '盈利情况',
        after: 'profitunit',
        show: 'isprofitdisclosure',
        select: {
          width: '120px',
          model: 'profittype',
          children: {
            1: '净利润',
            2: 'EBITDA'
          }
        }
      },
      {
        type: 'input',
        inputtype: 'number',
        width: '350px',
        model: 'lastfinancialinfo',
        label: '上一财年公司简要财务信息',
        after: 'lastfinancialinfounit',
        prepend: '收入',
        show: 'islastfinancialinfo'
      }
    ],
    rules: {
      role: [{ required: true, message: '请选择', trigger: 'change' }],
      industry: [{ required: true, message: '请选择', trigger: 'change' }],
      zonetype: [{ required: true, message: '请选择', trigger: 'change' }],
      specificshareratio: [
        { required: true, message: '请输入', trigger: 'blue' }
      ],
      quasisellProjectMoney: [
        { required: true, message: '请选择', trigger: 'change' }
      ],
      islastyearprofit: [
        { required: true, message: '请选择', trigger: 'change' }
      ],
      profitmonty: [{ required: true, message: '请输入', trigger: 'blue' }],
      lastfinancialinfo: [
        { required: true, message: '请输入', trigger: 'blur' }
      ]
    }
  },
  saleCreateChina3: {
    list: [
      {
        type: 'radio',
        model: 'role',
        label: '我在项目中的角色',
        children: {
          3: '基金GP',
          4: '基金LP',
          2: '财务顾问'
        }
      },
      {
        type: 'radio',
        model: 'fundrais',
        label: '募资方式',
        children: {
          1: '增资',
          2: '原有LP份额转让'
        }
      },
      {
        type: 'cascader',
        width: '500px',
        model: 'industry',
        label: '主要投资行业',
        options: '$trade'
      },
      {
        type: 'cascader',
        width: '350px',
        model: 'zonetype',
        label: '区域分类',
        labeldetail: '国内区域分类',
        options: '$area'
      },
      {
        type: 'input-number',
        model: 'hisraisemoney',
        label: '历史累计募集资金人民币',
        after: 'hisraisemoneyunit'
      },
      {
        type: 'input-number',
        model: 'epicycleproposedmoney',
        label: '本轮拟募资总金额',
        after: 'epicycleproposedmoneyunit'
      },
      {
        type: 'input-number',
        model: 'epicyclealreadyamount',
        label: '本轮已获得承诺出资金额',
        after: 'epicyclealreadyamountunit'
      },
      {
        type: 'input-number',
        model: 'capitalcontribumoney',
        label: '可出资额度',
        after: 'capitalcontribuunit'
      },
      {
        type: 'input',
        width: '200px',
        inputtype: 'number',
        model: 'projectirrmoney',
        label: '项目IRR',
        append: '%'
      },
      {
        type: 'input',
        width: '200px',
        inputtype: 'number',
        model: 'funddpl',
        label: '基金DPI',
        append: '%'
      }
    ],
    rules: {
      role: [{ required: true, message: '请选择', trigger: 'change' }],
      fundrais: [{ required: true, message: '请选择', trigger: 'change' }],
      industry: [{ required: true, message: '请选择', trigger: 'change' }],
      zonetype: [{ required: true, message: '请选择', trigger: 'change' }],
      hisraisemoney: [{ required: true, message: '请输入', trigger: 'blur' }],
      epicycleproposedmoney: [
        { required: true, message: '请输入', trigger: 'blur' }
      ],
      epicyclealreadyamount: [
        { required: true, message: '请输入', trigger: 'blur' }
      ],
      capitalcontribumoney: [
        { required: true, message: '请输入', trigger: 'blur' }
      ],
      projectirrmoney: [{ required: true, message: '请输入', trigger: 'blur' }],
      funddpl: [{ required: true, message: '请输入', trigger: 'blur' }]
    }
  },
  saleCreateHai1: {
    list: [
      {
        type: 'radio',
        model: 'role',
        label: '我在项目中的角色',
        children: {
          1: '企业股东或管理层',
          2: '财务顾问'
        }
      },
      {
        type: 'cascader',
        width: '500px',
        model: 'industry',
        label: '行业分类',
        options: '$trade'
      },
      {
        type: 'cascader',
        width: '350px',
        model: 'zonetype',
        label: '区域分类',
        options: '$area'
      },
      {
        type: 'select',
        label: '币种',
        model: 'currency',
        children: {
          1: '美元',
          2: '欧元',
          3: '日元'
        }
      },
      {
        type: 'input',
        inputtype: 'number',
        width: '350px',
        model: 'specificshareratio',
        label: '拟出让的股权比例',
        prepend: '具体股比',
        append: '%'
      },
      {
        type: 'input-number',
        inputtype: 'number',
        model: 'projectprice',
        label: '项目估值',
        width: '350px',
        after: 'projectpriceunit',
        show: 'isprojectpricedisclosure'
      },
      {
        type: 'select',
        model: 'islastyearprofit',
        label: '上一财年是否盈利',
        children: {
          1: '盈利',
          2: '亏损',
          3: '盈亏平衡'
        }
      },
      {
        type: 'input',
        inputtype: 'number',
        model: 'profitmonty',
        label: '盈利情况',
        width: '350px',
        after: 'profitunit',
        show: 'isprofitdisclosure',
        select: {
          width: '80px',
          model: 'profittype',
          children: {
            1: '净利润',
            2: 'EBITDA'
          }
        }
      },
      {
        type: 'input',
        inputtype: 'number',
        width: '300px',
        model: 'lastfinancialinfo',
        label: '上一财年公司简要财务信息',
        after: 'lastfinancialinfounit',
        prepend: '收入',
        show: 'isquasisellProject'
      }
    ],
    rules: {
      role: [{ required: true, message: '请选择', trigger: 'change' }],
      industry: [{ required: true, message: '请选择', trigger: 'change' }],
      zonetype: [{ required: true, message: '请选择', trigger: 'change' }],
      currency: [{ required: true, message: '请选择', trigger: 'change' }],
      specificshareratio: [
        { required: true, message: '请输入', trigger: 'blur' }
      ],
      projectprice: [{ required: true, message: '请输入', trigger: 'blur' }],
      islastyearprofit: [
        { required: true, message: '请输入', trigger: 'blur' }
      ],
      profitmonty: [{ required: true, message: '请输入', trigger: 'blur' }],
      lastfinancialinfo: [
        { required: true, message: '请输入', trigger: 'blur' }
      ]
    }
  },
  saleCreateHai2: {
    list: [
      {
        type: 'radio',
        model: 'role',
        label: '我在项目中的角色',
        children: {
          1: '企业股东或管理层',
          2: '财务顾问'
        }
      },
      {
        type: 'cascader',
        width: '500px',
        model: 'industry',
        label: '行业分类',
        options: '$trade'
      },
      {
        type: 'cascader',
        width: '350px',
        model: 'zonetype',
        label: '区域分类',
        options: '$area'
      },
      {
        type: 'select',
        label: '币种',
        model: 'currency',
        children: {
          1: '美元',
          2: '欧元',
          3: '日元'
        }
      },
      {
        type: 'input',
        inputtype: 'number',
        width: '350px',
        model: 'specificshareratio',
        label: '拟出让的股权比例',
        prepend: '具体股比',
        append: '%'
      },
      {
        type: 'input',
        inputtype: 'number',
        model: 'projectprice',
        label: '项目估值',
        width: '350px',
        after: 'projectpriceunit',
        show: 'isprojectpricedisclosure'
      },
      {
        type: 'select',
        model: 'islastyearprofit',
        label: '上一财年是否盈利',
        children: {
          1: '盈利',
          2: '亏损',
          3: '盈亏平衡'
        }
      },
      {
        type: 'input',
        inputtype: 'number',
        model: 'profitmonty',
        label: '盈利情况',
        width: '350px',
        after: 'profitunit',
        show: 'isprofitdisclosure',
        select: {
          width: '120px',
          model: 'profittype',
          children: {
            1: '净利润',
            2: 'EBITDA'
          }
        }
      },
      {
        type: 'input',
        inputtype: 'number',
        width: '300px',
        model: 'lastfinancialinfo',
        label: '上一财年公司简要财务信息',
        after: 'lastfinancialinfounit',
        prepend: '收入',
        show: 'isquasisellProject'
      }
    ],
    rules: {
      role: [{ required: true, message: '请选择', trigger: 'change' }],
      industry: [{ required: true, message: '请选择', trigger: 'change' }],
      zonetype: [{ required: true, message: '请选择', trigger: 'change' }],
      currency: [{ required: true, message: '请选择', trigger: 'change' }],
      specificshareratio: [
        { required: true, message: '请选择', trigger: 'blur' }
      ],
      projectprice: [{ required: true, message: '请选择', trigger: 'blur' }],
      islastyearprofit: [
        { required: true, message: '请选择', trigger: 'blur' }
      ],
      profitmonty: [{ required: true, message: '请选择', trigger: 'blur' }],
      lastfinancialinfo: [
        { required: true, message: '请选择', trigger: 'blur' }
      ]
    }
  },
  needCreate1: {
    list: [
      {
        type: 'radio',
        model: 'role',
        label: '我的角色',
        children: {
          6: '上市公司',
          7: 'PE或VC投资基金',
          8: '并购基金',
          2: '财务顾问'
        }
      },
      {
        type: 'radio',
        model: 'investtactful',
        label: '投资策略',
        children: {
          1: '控股并购',
          2: '少数股权投资',
          3: '两者兼有'
        }
      },
      {
        type: 'input',
        model: 'name',
        label: '需求名称',
        placeholder: '注：请为您的需求输入一个名称，不超过50个字'
      },
      {
        type: 'input',
        inputtype: 'textarea',
        model: 'descinfo',
        width: '350px',
        rows: 10,
        label: '描述',
        placeholder: `需求描述是必填项,不能低于150字并且不能超过40000字
清晰明确的需求描述
可以让用户更了解你的需求。
对拟投资企业的要求，
如标的大小、
盈利能力、
细分行业,
技术等要求。`
      },
      {
        type: 'cascader',
        width: '500px',
        model: 'industry',
        label: '行业分类',
        options: '$trade'
      },
      {
        type: 'cascader',
        width: '350px',
        model: 'zonetype',
        label: '区域分类',
        labeldetail: '国内区域分类',
        options: '$area'
      }
    ],
    rules: {
      role: [{ required: true, message: '请选择', trigger: 'change' }],
      investtactful: [{ required: true, message: '请选择', trigger: 'change' }],
      name: [{ required: true, message: '请选择', trigger: 'blur' }],
      descinfo: [{ required: true, message: '请选择', trigger: 'blur' }],
      industry: [{ required: true, message: '请选择', trigger: 'change' }],
      zonetype: [{ required: true, message: '请选择', trigger: 'change' }]
    }
  },
  needCreate2: {
    list: [
      {
        type: 'radio',
        model: 'role',
        label: '我的角色',
        children: {
          6: '上市公司',
          7: 'PE或VC投资基金',
          8: '并购基金',
          2: '财务顾问'
        }
      },
      {
        type: 'radio',
        model: 'investtactful',
        label: '投资策略',
        children: {
          1: '控股并购',
          2: '少数股权投资',
          3: '两者兼有'
        }
      },
      {
        type: 'input',
        model: 'name',
        label: '需求名称',
        placeholder: '注：请为您的需求输入一个名称，不超过50个字'
      },
      {
        type: 'input',
        inputtype: 'textarea',
        model: 'descinfo',
        width: '350px',
        rows: 10,
        label: '描述',
        placeholder: `需求描述是必填项,不能低于150字并且不能超过40000字
清晰明确的需求描述
可以让用户更了解你的需求。
对拟投资企业的要求,
如标的大小、
盈利能力、
细分行业,
技术等要求。`
      },
      {
        type: 'cascader',
        width: '500px',
        model: 'industry',
        label: '行业分类',
        options: '$trade'
      },
      {
        type: 'cascader',
        width: '350px',
        model: 'zonetype',
        label: '区域分类',
        options: '$area'
      }
    ],
    rules: {
      role: [{ required: true, message: '请选择', trigger: 'change' }],
      investtactful: [{ required: true, message: '请选择', trigger: 'change' }],
      name: [{ required: true, message: '请选择', trigger: 'blur' }],
      descinfo: [{ required: true, message: '请选择', trigger: 'blur' }],
      industry: [{ required: true, message: '请选择', trigger: 'change' }],
      zonetype: [{ required: true, message: '请选择', trigger: 'change' }]
    }
  }
};
