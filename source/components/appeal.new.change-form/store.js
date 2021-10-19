window.appealNewChangeFormStore = {
  docsBlock: {
    title: '',
    items: [
      {
        id: '1234',
        title: 'Приложение № 8а — Справка-подтверждение',
        url: '/pages/news/',
        icon: '/template/images/doc.svg',
        data: [
          '654 Кб .doc',
          'Дата документа: 13 января 2020',
          'Дата публикации: 15 января 2020',
        ],
      },
      {
        id: '1235',
        title:
          'Постановление Правительства Российской Федерации от 16.02.2005 № 82 «Об утверждении Положения о порядке передачи информации в Федеральную службу по финансовому мониторингу адвокатами, нотариусами и лицами, осуществляющими предпринимательскую деятельность в сфере оказания юридических или бухгалтерских услуг»',
        url: '/pages/news/',
        icon: '/template/images/zip.svg',
        data: [
          '655 Кб .doc',
          'Дата документа: 14 января 2020',
          'Дата публикации: 16 февраля 2020',
        ],
      },
    ],
  },
  hidden: [
    {
      name: 'element_id',
      value: 'ID',
    },
    {
      name: 'PROPERTY[447][0]',
      value: 'Поддержка Twin px Support',
    },
  ],
  controls: [
    {
      property: '179',
      label: 'Краткое наименование*',
      type: 'text',
      required: true,
      value: '',
      completeBlock: {
        title: 'Текущие данные из реестра:',
        value: 'ООО «Компания»',
        comment:
          'Заполните это поле для того, чтобы Заполните это поле для того, чтобы Заполните это поле для того, чтобы…',
      },
    },
    {
      property: '180',
      label: 'Полное наименование*',
      type: 'text',
      required: true,
      value: '',
      completeBlock: {
        title: 'Текущие данные из реестра:',
        value: 'ООО «Компания + Я»',
      },
    },
    {
      property: '181',
      label: 'Телефон*',
      type: 'tel',
      required: true,
      value: '',
      completeBlock: {
        title: 'Текущие данные из реестра:',
        value: '+75647891231',
      },
    },
    {
      property: '182',
      label: 'Наименование на иностранном языке*',
      type: 'tel',
      required: true,
      value: '',
      completeBlock: {
        title: 'Текущие данные из реестра:',
        value: null,
      },
    },
    {
      multy: true,
      value: '',
      property: '183',
      type: 'url',
      label: 'Сайт*',
      completeBlock: {
        comment: 'Вы можете добавить несколько сайтов.',
      },
    },
    {
      value: '',
      property: '184',
      type: 'textarea',
      label: 'Комментарий для сотрудников СРО ААС',
      completeBlock: {
        title: 'Текущие данные из реестра:',
        value: '+75647891231',
        comment: 'Заполните это поле для того, чтобы…',
      },
    },
    {
      multy: true,
      value: '',
      property: '185',
      type: 'textarea',
      label: 'Сообщение*',
      completeBlock: {
        comment: 'Вы можете добавить несколько сообщений.',
      },
    },
    {
      multy: true,
      value: '',
      property: '186',
      type: 'date',
      label: 'Дата*',
      completeBlock: {
        comment: 'Вы можете добавить несколько дат.',
      },
    },
    {
      value: '',
      property: '186',
      type: 'date',
      label: 'Дата*',
      completeBlock: {
        title: 'Текущие данные из реестра:',
        value: '15.02.2021',
      },
    },
  ],
  autosaveTimeoutId: null,
  agreement: {
    name: 'FORM_AGREEMENT',
    value: 'Y',
    checked: false,
    text: 'Я принимаю <a href="/" target="_blank">условия Пользовательского соглашения</a> и даю своё согласие СРО ААС на обработку моей персональной информации на условиях, определенных Политикой конфиденциальности.',
    invalid: false,
  },
};
