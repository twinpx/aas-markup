window.editStudyCourseStore = {
  submitURL: '/components/study.courses.detail/submitResponse.json',
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
      controls: [
        { name: 'start', label: 'Время начала', value: '10:00' },
        { name: 'end', label: 'Время окончания', value: '18:00' },
      ],
      type: 'time',
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
};
