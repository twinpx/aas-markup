window.appealDetailData = {
  form: {
    action: '',
    method: '',
  },
  select: {
    options: [
      {
        label: 'Ожидает проверки',
        code: '',
      },
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
        code: 'prop3',
      },
    ],
    selectedOption: {
      label: 'Ожидает проверки',
      code: '',
    },
    label: 'Статус обращения',
    codeToShowTextarea: 'prop2',
  },
  textarea: {
    invalid: false,
    name: 'message',
    value: '',
    label: 'Комментарий для сотрудников СРО ААС',
  },
  button: {
    text: 'Сохранить',
    message: 'Для отправки необходимо заполнить все поля.',
  },
};
