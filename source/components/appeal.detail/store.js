window.appealDetailData = {
  form: {
    action: '',
    method: '',
    fetchCurrentStatus: '/components/appeal.detail/response.json',
    fileUpload: '/components/appeal.detail/fileupload.json',
  },
  select: {
    name: 'STATUS',
    options: [
      {
        label: 'В работе',
        code: 'prop1',
      },
      {
        label: 'Отклонено',
        code: 'prop2',
      },
      {
        label: 'Выполнено',
        code: 'prop4',
      },
    ],
    selectedOption: {
      label: '-',
      code: '',
    },
    label: 'Статус обращения',
  },
  textarea: {
    showForStatus: ['prop1', 'prop2'],
    invalid: false,
    name: 'message',
    value: '',
    label: 'Комментарий для сотрудников СРО ААС',
  },
  files: [
    {
      showForStatus: ['prop3', 'prop4'],
      type: 'file',
      multy: false,
      maxSize: 102400000,
      required: false,
      filename: '',
      default: '<a href>Выберите файл</a> (pdf, до 100МБ)',
      ext: ['pdf'],

      invalid: false,
      name: 'file',
      value: '',
      label:
        'Устав в новой редакции или изменения к Уставу (в случае внесения изменений в Устав)',
    },
    {
      showForStatus: ['prop1'],
      type: 'file',
      multy: false,
      maxSize: 102400000,
      required: false,
      filename: '',
      default: '<a href>Выберите файл</a> (pdf, до 100МБ)',
      ext: ['pdf'],

      invalid: false,
      name: 'file',
      value: '',
      label:
        'Устав в новой редакции или изменения к Уставу (в случае внесения изменений в Устав)',
    },
  ],
  button: {
    name: 'statusConfirm',
    text: 'Сохранить',
    confirm: 'Сохранить',
    dismiss: 'Отменить',
    message: 'Для отправки необходимо заполнить все поля.',
  },
  modal: {
    html: '<h3 class="text-center">Вы хотите отредактировать отчет?</h3><hr><p>Вы переходите в режим редактирования отчета. После внесения изменений в отчет вам необходимо сдать его, нажав на кнопку «Сдать отчет».</p><p>До тех пор, пока вы повторно не отправите отчет, он будет находиться в статусе «Необходимо сдать».</p><hr>',
  },
  alert: {
    html: '<h3 class="text-center">Статус обращения был уже изменён другим сотрудником</h3><hr><p>Ваши изменения не могут быть сохранены. Пожалуйста, перезагрузите детальную страницу обращения, чтобы увидеть новый статус.</p><p>Ваши изменения не будут сохранены.</p><hr>',
    button: 'Понятно',
  },
};
