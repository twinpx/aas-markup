window.reportFormOZOStore = {
  hidden: [
    {
      name: 'element_id',
      value: 'idOZO',
    },
    {
      name: 'PROPERTY[447][0]',
      value: 'Поддержка Twin px Support',
    },
  ],
  controls: [
    {
      name: 'description',
      label: 'Текст',
      value:
        'Немодифицированное и модифицированное мнение в аудиторском заключении. Разделы «Существенная неопределенность в отнощшении непрерывности деятельности», «Важные обстоятельства» и «Прочие сведения» в аудиторском заключении. Обязанности аудитора, относящиеся к прочей информации, включенной в годовой отчет организации.',
      type: 'textarea',
    },
    {
      name: 'date',
      label: 'Выберите дату',
      value: '',
      type: 'date',
    },
    {
      name: 'start',
      label: 'Время начала',
      value: '10:00',
      type: 'text',
    },
    {
      name: 'end',
      label: 'Время окончания',
      value: '18:00',
      type: 'text',
    },
    {
      name: 'hours',
      label: 'Количество часов',
      value: '8 часов',
      type: 'text',
    },
    {
      name: 'tutor',
      label: 'Преподаватель',
      value: [
        {
          label: 'Иванус И.И.',
          code: 'ivanus',
        },
        {
          label: 'Сидоров Ф.А.',
          code: 'sidorov',
        },
        {
          label: 'Ковалевский С.Я.',
          code: 'kovalevsky',
        },
        {
          label: 'Розанов З.Ю.',
          code: 'rozanov',
        },
      ],
      selected: { label: 'Сидоров Ф.А.', code: 'sidorov' },
      type: 'select',
    },
    {
      name: 'type',
      label: 'Тип занятия',
      value: [
        {
          label: 'Очное',
          code: 'ochno',
        },
        {
          label: 'Заочное',
          code: 'zaochno',
        },
        {
          label: 'Дистанционное',
          code: 'distant',
        },
      ],
      selected: { label: 'Дистанционное', code: 'distant' },
      type: 'select',
    },
  ],
  formBlocks: [
    {
      title: 'Аудит особо значимых организаций 2017-2021',
      controls: [
        {
          name: 'FORM_CONTROL_5',
          value: 'value1',
          checked: true,
          title: 'Проводили ОЗО',
          text: 'Вы проводили аудит ОЗО с 2017 по 2021',
        },
        {
          name: 'FORM_CONTROL_5',
          value: 'value2',
          checked: false,
          title: 'Не проводили ОЗО',
          text: 'Вы не проводили аудит ОЗО с 2017 по 2021',
        },
      ],
    },
  ],
  audiOZOList: {
    title: 'Список организаций где был проведен аудит ОЗО',
    text: 'Перечислите все аудит ОЗО с 2017 по 2021 год. Все поля формы обязательны.',
    template: {
      controls: [
        {
          name: '179',
          label: 'Дата проведения аудита',
          value: '',
          type: 'date',
        },
        {
          name: '190',
          label: 'Год аудита',
          value: '',
          type: 'text',
        },
        {
          name: '180',
          label: 'Место фактического проведения аудита',
          value: '',
          type: 'text',
        },
        {
          name: '188',
          label: 'Тип ОЗО',
          value: '',
          type: 'text',
        },
        {
          name: '181',
          label: 'Наименования ОЗО',
          value: '',
          type: 'text',
        },
        {
          name: '182',
          label: 'ОГРН ОЗО',
          value: '',
          type: 'text',
        },
        {
          name: '183',
          label: 'Мнение, выраженное в аудиторском заключении',
          value: [
            {
              label: 'Положительное',
              code: 'positive',
            },
            {
              label: 'Отрицательное',
              code: 'negative',
            },
          ],
          selected: { label: 'Положительное', code: 'positive' },
          type: 'select',
        },
      ],
    },
    companies: [
      {
        id: 'companyId',
        hidden: [
          {
            name: 'infoblockId',
            value: 'companyId',
          },
        ],
        controls: [
          {
            name: '179',
            label: 'Дата проведения аудита',
            value: '31.05.2021',
            type: 'date',
          },
          {
            name: '190',
            label: 'Год аудита',
            value: '',
            type: 'text',
          },
          {
            name: '180',
            label: 'Место фактического проведения аудита',
            value: '',
            type: 'text',
          },
          {
            name: '188',
            label: 'Тип ОЗО',
            value: 'd',
            type: 'text',
          },
          {
            name: '181',
            label: 'Наименования ОЗО',
            value: 'Name',
            type: 'text',
          },
          {
            name: '182',
            label: 'ОГРН ОЗО',
            value: 'd',
            type: 'text',
          },
          {
            name: '183',
            label: 'Мнение, выраженное в аудиторском заключении',
            value: [
              {
                label:
                  'Положительное заключение с очень хорошим положительным отзывом о деятельности особо значимой компании',
                code: 'positive',
              },
              {
                label:
                  'Другое заключение с очень хорошим положительным отзывом о деятельности особо значимой компании',
                code: 'negative',
              },
            ],
            selected: {
              label:
                'Положительное заключение с очень хорошим положительным отзывом о деятельности особо значимой компании',
              code: 'positive',
            },
            type: 'select',
          },
        ],
      },
    ],
  },
  agreement: {
    name: 'FORM_AGREEMENT',
    value: 'Y',
    checked: false,
    text: 'Я принимаю <a href="/" target="_blank">условия Пользовательского соглашения</a> и даю своё согласие СРО ААС на обработку моей персональной информации на условиях, определенных Политикой конфиденциальности.',
    invalid: false,
  },
};
