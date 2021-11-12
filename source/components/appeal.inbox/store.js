window.appealIndexStore = {
  timeout: 2000,
  paths: {
    getTable: '/components/appeal.inbox/table.json',
    getNewNum: '/components/appeal.inbox/newNum.json',
    src: '/template/images/',
  },
  filter: {
    controls: [
      {
        code: 'id',
        count: 1,
        type: 'fio',
        label: 'Номер (ID)',
      },
      {
        code: 'object',
        count: 3,
        type: 'fio',
        label: 'Объект изменений',
      },
      {
        code: 'author',
        count: 3,
        type: 'fio',
        label: 'Автор (ФИО, ОРНЗ)',
      },
      {
        code: 'status',
        type: 'select',
        label: 'Статус обращения',
        options: [
          {
            label: 'Все',
            code: '',
          },
          {
            label: 'Новые',
            code: 'prop1',
          },
          {
            label: 'Отклоненные',
            code: 'prop2',
          },
          {
            label: 'В работе',
            code: 'prop3',
          },
          {
            label: 'Выполненые',
            code: 'prop4',
          },
        ],
        selected: {
          label: 'Все',
          code: '',
        },
      },
    ],
  },
};

window.selectData = {
  name: 'status',
  options: [
    {
      label: 'Все',
      code: '',
    },
    {
      label: 'Новые',
      code: 'prop1',
    },
    {
      label: 'Отклоненные',
      code: 'prop2',
    },
    {
      label: 'В работе',
      code: 'prop3',
    },
    {
      label: 'Выполненые',
      code: 'prop4',
    },
  ],
  selected: {
    label: 'Все',
    code: '',
  },
};
