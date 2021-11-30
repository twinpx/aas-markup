window.appealNewChangeFormStore = {
  hidden: [
    {
      name: 'APPEAL_ID',
      value: 112332,
    },
    {
      name: 'FORM_ID',
      value: 107300,
    },
  ],
  docsBlock: null,
  controlsBlock: {
    title:
      '\u0414\u0430\u043d\u043d\u044b\u0435 \u0434\u043b\u044f \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f',
    text: '',
    controls: [
      {
        property: 37,
        word: 'PROPERTY',
        sort: 0,
        label:
          '\u0421\u0435\u0440\u0438\u044f \u043f\u0430\u0441\u043f\u043e\u0440\u0442\u0430 *',
        type: 'text',
        required: true,
        value: '',
        multy: false,
        pattern: null,
        completeBlock: {
          title: '',
          value: '',
          comment: '',
        },
      },
      {
        property: 38,
        word: 'PROPERTY',
        sort: 1,
        label:
          '\u041d\u043e\u043c\u0435\u0440 \u043f\u0430\u0441\u043f\u043e\u0440\u0442\u0430 *',
        type: 'text',
        required: true,
        value: '',
        multy: false,
        pattern: null,
        completeBlock: {
          title: '',
          value: '',
          comment: '',
        },
      },
      {
        property: 39,
        word: 'PROPERTY',
        sort: 2,
        label:
          '\u0414\u0430\u0442\u0430 \u0432\u044b\u0434\u0430\u0447\u0438 *',
        type: 'date',
        required: true,
        value: '',
        multy: false,
        pattern: null,
        completeBlock: {
          title: '',
          value: '',
          comment: '',
        },
      },
      {
        property: 40,
        word: 'PROPERTY',
        sort: 3,
        label: '\u041a\u0435\u043c \u0432\u044b\u0434\u0430\u043d *',
        type: 'text',
        required: true,
        value: '',
        multy: false,
        pattern: null,
        completeBlock: {
          title: '',
          value: '',
          comment: '',
        },
      },
      {
        property: 41,
        word: 'PROPERTY',
        sort: 4,
        label:
          '\u041a\u043e\u0434 \u043f\u043e\u0434\u0440\u0430\u0437\u0434\u0435\u043b\u0435\u043d\u0438\u044f *',
        type: 'text',
        required: true,
        value: '',
        multy: false,
        pattern: null,
        completeBlock: {
          title: '',
          value: '',
          comment: '',
        },
      },
    ],
  },
  confirmDocsBlock: {
    title:
      '\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u044e\u0449\u0438\u0435 \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u044b',
    text: '',
    items: [
      {
        id: 0,
        checked: true,
        title:
          '\u041f\u0430\u043a\u0435\u0442 \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u043e\u0432 1',
        text: '\u003Cul\u003E\u003Cli\u003E\u041f\u0430\u0441\u043f\u043e\u0440\u0442 \u0430\u0443\u0434\u0438\u0442\u043e\u0440\u0430 (\u0440\u0430\u0437\u0432\u043e\u0440\u043e\u0442 \u0441 \u0444\u043e\u0442\u043e)\u003C/li\u003E\u003Cli\u003E\u041f\u0430\u0441\u043f\u043e\u0440\u0442 \u0430\u0443\u0434\u0438\u0442\u043e\u0440\u0430 (\u0440\u0430\u0437\u0432\u043e\u0440\u043e\u0442 \u0441 \u0430\u043a\u0442\u0443\u0430\u043b\u044c\u043d\u044b\u043c \u0430\u0434\u0440\u0435\u0441\u043e\u043c \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438)\u003C/li\u003E\u003C/ul\u003E',
        name: 'FIELDS_ATTACHE',
        value: 0,
        controls: [
          {
            property: 39,
            word: 'FILES[0]',
            label:
              '\u041f\u0430\u0441\u043f\u043e\u0440\u0442 \u0433\u0440\u0430\u0436\u0434\u0430\u043d\u0438\u043d\u0430 \u0420\u0424 (\u0440\u0430\u0437\u0432\u043e\u0440\u043e\u0442 \u0441 \u0444\u043e\u0442\u043e) *',
            type: 'file',
            multy: null,
            maxSize: 10240000,
            required: true,
            filename: '',
            value: '',
            default:
              '\u003Ca href\u003E\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043b\u003C/a\u003E (pdf, jpg, jpeg, png, doc, docx, \u0434\u043e 10\u041c\u0411)',
            ext: ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'],
            completeBlock: {
              comment:
                '\u041f\u0430\u0441\u043f\u043e\u0440\u0442 \u0430\u0443\u0434\u0438\u0442\u043e\u0440\u0430 (\u0440\u0430\u0437\u0432\u043e\u0440\u043e\u0442 \u0441 \u0444\u043e\u0442\u043e)',
            },
          },
          {
            property: 41,
            word: 'FILES[0]',
            label:
              '\u041f\u0430\u0441\u043f\u043e\u0440\u0442 \u0433\u0440\u0430\u0436\u0434\u0430\u043d\u0438\u043d\u0430 \u0420\u0424 (\u0440\u0430\u0437\u0432\u043e\u0440\u043e\u0442 \u0441 \u0430\u043a\u0442\u0443\u0430\u043b\u044c\u043d\u044b\u043c \u0430\u0434\u0440\u0435\u0441\u043e\u043c \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438) *',
            type: 'file',
            multy: null,
            maxSize: 10240000,
            required: true,
            filename: '',
            value: '',
            default:
              '\u003Ca href\u003E\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043b\u003C/a\u003E (pdf, jpg, jpeg, png, doc, docx, \u0434\u043e 10\u041c\u0411)',
            ext: ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'],
            completeBlock: {
              comment:
                '\u041f\u0430\u0441\u043f\u043e\u0440\u0442 \u0430\u0443\u0434\u0438\u0442\u043e\u0440\u0430 (\u0440\u0430\u0437\u0432\u043e\u0440\u043e\u0442 \u0441 \u0430\u043a\u0442\u0443\u0430\u043b\u044c\u043d\u044b\u043c \u0430\u0434\u0440\u0435\u0441\u043e\u043c \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438)',
            },
          },
        ],
      },
    ],
  },
  autosaveTimeoutId: null,
  autosave: 5000,
  agreement: {
    name: 'FORM_AGREEMENT',
    value: 'Y',
    checked: false,
    text: '\u042f \u043f\u0440\u0438\u043d\u0438\u043c\u0430\u044e \u003Ca href=\u0022/privacy/\u0022 target=\u0022_blank\u0022\u003E\u0443\u0441\u043b\u043e\u0432\u0438\u044f \u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u043e\u0433\u043e \u0441\u043e\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u044f\u003C/a\u003E \u0438 \u0434\u0430\u044e \u0441\u0432\u043e\u0451 \u0441\u043e\u0433\u043b\u0430\u0441\u0438\u0435 \u0421\u0420\u041e \u0410\u0410\u0421 \u043d\u0430 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0443 \u043c\u043e\u0435\u0439 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u043e\u0439 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438 \u043d\u0430 \u0443\u0441\u043b\u043e\u0432\u0438\u044f\u0445, \u043e\u043f\u0440\u0435\u0434\u0435\u043b\u0435\u043d\u043d\u044b\u0445 \u041f\u043e\u043b\u0438\u0442\u0438\u043a\u043e\u0439 \u043a\u043e\u043d\u0444\u0438\u0434\u0435\u043d\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u0438.',
    invalid: false,
  },
  url: {
    autosave:
      '/local/components/twinpx/journal.new/templates/.default/autosave.php',
    fileUpload:
      '/local/components/twinpx/journal.new/templates/.default/fileupload.php',
  },
};
/*window.appealNewChangeFormStore = {
  hidden: [
    {
      name: 'APPEAL_ID',
      value: 112060,
    },
    {
      name: 'FORM_ID',
      value: 107141,
    },
  ],
  docsBlock: null,
  controlsBlock: {
    title: 'Данные для изменения',
    text: '',
    controls: [
      {
        property: 22,
        word: 'PROPERTY',
        sort: 0,
        label: 'Номер телефона с кодом города *',
        type: 'number',
        required: true,
        value: ['1231231321313213213132'],
        multy: true,
        pattern: '^([+]?[\\s0-9]+)?(\\d{3}|[(]?[0-9]+[)])?([-]?[\\s]?[0-9])+$',
        completeBlock: {
          title: '',
          value: '',
          comment: 'Номер телефона организации с кодом города',
        },
      },
    ],
  },
  confirmDocsBlock: null,
  autosaveTimeoutId: 1289,
  autosave: 5000,
  agreement: {
    name: 'FORM_AGREEMENT',
    value: 'Y',
    checked: false,
    text: 'Я принимаю <a href="/privacy/" target="_blank">условия Пользовательского соглашения</a> и даю своё согласие СРО ААС на обработку моей персональной информации на условиях, определенных Политикой конфиденциальности.',
    invalid: false,
  },
};*/
/*window.appealNewChangeFormStore = {
  hidden: [
    {
      name: 'APPEAL_ID',
      value: 110402,
    },
    {
      name: 'FORM_ID',
      value: 107168,
    },
  ],
  docsBlock: {
    title: 'Документы необходимые для внесения изменения',
    text: '',
    items: [
      {
        id: 5983,
        title:
          'Актуальный список учредителей (участников, акционеров). Приложение № 6а.',
        url: '/upload/iblock/f7c/Prilozhenie-_-6a.docx',
        icon: '/local/templates/aas/images/doc.svg',
        data: ['90.78 Кб .docx'],
      },
    ],
  },
  controlsBlock: {
    title: 'Данные для изменения',
    text: 'Подробное описание заполнения формы с <a href="">пояснением</a> о том, какие поля надо заполнять и как они должны выглядеть. Описанием может быть довольно большим.',
    controls: [
      {
        property: '178',
        word: 'PROPERTY',
        sort: '',
        label: 'Текст*',
        type: 'textarea',
        required: false,
        value: '',
        completeBlock: {
          title: 'Текущие данные из реестра:',
          value: 'Текущие данные',
          comment:
            'Заполните это поле для того, чтобы Заполните это поле для того, чтобы Заполните это поле для того, чтобы…',
        },
      },
      {
        property: '179',
        word: 'PROPERTY',
        sort: '',
        label: 'Краткое наименование*',
        type: 'text',
        required: false,
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
        word: 'WORD',
        label: 'Полное наименование*',
        type: 'text',
        required: false,
        value: '',
        completeBlock: {
          title: 'Текущие данные из реестра:',
          value: 'ООО «Компания + Я»',
        },
      },
      {
        property: '181',
        word: 'WORD',
        label: 'Телефон',
        type: 'tel',
        required: false,
        pattern: '^([+]?[\\s0-9]+)?(\\d{3}|[(]?[0-9]+[)])?([-]?[\\s]?[0-9])+$',
        value: '',
        completeBlock: {
          title: 'Текущие данные из реестра:',
          value: '+75647891231',
        },
      },
      {
        property: '182',
        word: 'WORD',
        label: 'Наименование на иностранном языке*',
        type: 'tel',
        required: false,
        value: '',
        completeBlock: {
          title: 'Текущие данные из реестра:',
          value: null,
        },
      },
      {
        multy: true,
        value: [''],
        property: '183',
        word: 'WORD',
        type: 'url',
        label: 'Сайт*',
        completeBlock: {
          comment: 'Вы можете добавить несколько сайтов.',
        },
      },
      {
        multy: true,
        value: [''],
        property: '184',
        word: 'QUALITY',
        type: 'textarea',
        required: false,
        label: 'Сообщение*',
        completeBlock: {
          comment: 'Вы можете добавить несколько сообщений.',
        },
      },
      {
        multy: true,
        value: [''],
        property: '185',
        word: 'QUANTITY',
        type: 'date',
        required: false,
        label: 'Дата*',
        completeBlock: {
          comment: 'Вы можете добавить несколько дат.',
        },
      },
    ],
  },
  confirmDocsBlock: {
    title: 'Подтверждающие документы',
    text: '',
    items: [
      {
        id: 0,
        checked: true,
        title: 'Пакет документов 1',
        text: '<ul><li>Актуальный список учредителей (участников, акционеров). Заполненное Приложение № 6а.</li><li>Актуальная выписка из реестра акционеров</li></ul>',
        name: 'FIELDS_ATTACHE',
        value: 0,
        controls: [
          {
            multy: 5,
            property: 4,
            word: 'FILES[0]',
            label: 'Заполненное Приложение № 6а *',
            type: 'file',
            required: true,
            filename: [''],
            value: [''], //file id
            default: '<a href>Выберите файл</a> или перетащите в поле',
            ext: [''],
            maxSize: 1e7,
            completeBlock: {
              comment:
                'Актуальный список учредителей (участников, акционеров). Заполненное Приложение № 6а.',
            },
            pattern: '',
          },
          {
            //draft
            multy: 2,
            property: 7,
            word: 'FILES[0]',
            label: 'Устав компании *',
            type: 'file',
            required: true,
            filename: [
              'Устав ОАО "Аудит Стрит.pdf',
              'Устав ОАО "Audit street.pdf',
            ],
            value: ['852', '456'], //file id
            default: '<a href>Выберите файл</a> или перетащите в поле',
            ext: ['pdf'],
            maxSize: 10e6,
            completeBlock: {
              comment:
                'Актуальный список учредителей (участников, акционеров). Заполненное Приложение № 6а.',
            },
            pattern: '',
          },
          {
            property: 5,
            word: 'FILES[0]',
            label: 'Актуальная выписка из реестра акционеров *',
            type: 'file',
            required: true,
            filename: '',
            value: '',
            default: '<a href>Выберите файл</a> или перетащите в поле',
            ext: [''],
            maxSize: 1000,
            completeBlock: {
              comment: 'Актуальная выписка из реестра акционеров',
            },
            pattern: '',
          },
          {
            property: 6,
            word: 'FILES[0]',
            label: 'Актуальная выписка 2 из реестра акционеров *',
            type: 'file',
            required: true,
            filename: '',
            value: '',
            default: '<a href>Выберите файл</a> или перетащите в поле',
            ext: [''],
            maxSize: 1e5,
            completeBlock: {
              comment: 'Актуальная выписка из реестра акционеров',
            },
            pattern: '',
          },
        ],
      },
    ],
  },
  autosaveTimeoutId: 1666,
  autosave: 5000,
  agreement: {
    name: 'FORM_AGREEMENT',
    value: 'Y',
    checked: false,
    text: 'Я принимаю <a href="/privacy/" target="_blank">условия Пользовательского соглашения</a> и даю своё согласие СРО ААС на обработку моей персональной информации на условиях, определенных Политикой конфиденциальности.',
    invalid: false,
  },
  url: {
    autosave: '/components/appeal.new.change-form/autosave.json',
    fileUpload: '/components/appeal.new.change-form/fileupload.json',
    img: '/template/images/',
  },
};*/

/*{
  docsBlock: {
    title: 'Документы необходимые для внесения изменения',
    text: 'Some text',
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
  controlsBlock: {
    title: 'Данные для изменения',
    text: 'Подробное описание заполнения формы с <a href="">пояснением</a> о том, какие поля надо заполнять и как они должны выглядеть. Описанием может быть довольно большим.',
    controls: [
      {
        property: '178',
        word: 'PROPERTY',
        sort: '',
        label: 'Текст*',
        type: 'textarea',
        required: false,
        value: '',
        completeBlock: {
          title: 'Текущие данные из реестра:',
          value: 'Текущие данные',
          comment:
            'Заполните это поле для того, чтобы Заполните это поле для того, чтобы Заполните это поле для того, чтобы…',
        },
      },
      {
        property: '179',
        word: 'PROPERTY',
        sort: '',
        label: 'Краткое наименование*',
        type: 'text',
        required: false,
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
        word: 'WORD',
        label: 'Полное наименование*',
        type: 'text',
        required: false,
        value: '',
        completeBlock: {
          title: 'Текущие данные из реестра:',
          value: 'ООО «Компания + Я»',
        },
      },
      {
        property: '181',
        word: 'WORD',
        label: 'Телефон*',
        type: 'tel',
        required: false,
        value: '',
        completeBlock: {
          title: 'Текущие данные из реестра:',
          value: '+75647891231',
        },
      },
      {
        property: '182',
        word: 'WORD',
        label: 'Наименование на иностранном языке*',
        type: 'tel',
        required: false,
        value: '',
        completeBlock: {
          title: 'Текущие данные из реестра:',
          value: null,
        },
      },
      {
        multy: true,
        value: [''],
        property: '183',
        word: 'WORD',
        type: 'url',
        label: 'Сайт*',
        completeBlock: {
          comment: 'Вы можете добавить несколько сайтов.',
        },
      },
      {
        multy: true,
        value: [''],
        property: '184',
        word: 'QUALITY',
        type: 'textarea',
        required: false,
        label: 'Сообщение*',
        completeBlock: {
          comment: 'Вы можете добавить несколько сообщений.',
        },
      },
      {
        multy: true,
        value: [''],
        property: '185',
        word: 'QUANTITY',
        type: 'date',
        required: false,
        label: 'Дата*',
        completeBlock: {
          comment: 'Вы можете добавить несколько дат.',
        },
      },
    ],
  },
  confirmDocsBlock: {
    title: 'Подтверждающие документы',
    text: 'Выберите подходящий для вас пакет подтверждающих документов.',
    items: [
      {
        id: '7845',
        checked: false,
        title: 'Пакет документов 1',
        text: '<ul><li>Приказ об увольнении или соглашение о расторжении трудового договора,</li><li>Справка-подтверждение (Приложение № 8а)</li></ul>',
        name: 'confirm-docs',
        value: 'block1',
        controls: [
          {
            property: '187',
            word: 'FILE',
            label: 'Устав в новой редакции или изменения к Уставу*',
            type: 'file',
            required: true,
            filename: '',
            value: '',
            default: '<a href>Выберите файл</a> или перетащите в поле',
            ext: ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'],
            completeBlock: {
              comment: 'Комментарий который поясняет ограничения.',
            },
          },
          {
            property: '188',
            word: 'FILE',
            label: 'Актуальная выписка из ЕГРЮЛ*',
            type: 'file',
            filename: '',
            value: '',
            default: '<a href>Выберите файл</a> или перетащите в поле',
            ext: ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'],
            completeBlock: {
              comment: 'Другой комментарий который поясняет ограничения.',
            },
          },
        ],
      },
      {
        id: '7846',
        checked: false,
        title: 'Пакет документов 1',
        text: '<ul><li>Приказ об увольнении или соглашение о расторжении трудового договора,</li><li>Справка-подтверждение (Приложение № 8а)</li></ul>',
        name: 'confirm-docs',
        value: 'block1',
        controls: [
          {
            property: '189',
            word: 'FILE',
            label: 'Устав в новой редакции или изменения к Уставу*',
            type: 'file',
            required: true,
            filename: 'Программа БЧ-2021.pdf',
            value: '123',
            default: '<a href>Выберите файл</a> или перетащите в поле',
            ext: ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'],
            completeBlock: {
              comment: 'Комментарий который поясняет ограничения.',
            },
          },
          {
            property: '190',
            word: 'FILE',
            label: 'Актуальная выписка из ЕГРЮЛ*',
            type: 'file',
            filename: '',
            value: '',
            default: '<a href>Выберите файл</a> или перетащите в поле',
            ext: ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'],
            completeBlock: {
              comment: 'Другой комментарий который поясняет ограничения.',
            },
          },
        ],
      },
    ],
  },
  autosaveTimeoutId: null,
  autosave: 5000,
  agreement: {
    name: 'FORM_AGREEMENT',
    value: 'Y',
    checked: false,
    text: 'Я принимаю <a href="/" target="_blank">условия Пользовательского соглашения</a> и даю своё согласие СРО ААС на обработку моей персональной информации на условиях, определенных Политикой конфиденциальности.',
    invalid: false,
  },
};
*/
