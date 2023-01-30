window.studyCourseCreateStore = {
  submitStepURL: '/components/study.courses.create/submit-step.json',
  steps: [
    {
      id: '123qwe',
      active: true,
      visited: true,
      title: 'Шаг 1. Общие данные',
      description: 'Внесите общие обязательные данные для создания курса.',
      controls: [
        {
          name: 'COURSE_NAME',
          label: 'Название курса',
          value: '',
          type: 'text',
        },
        {
          name: 'COURSE_DESCRIPTION',
          label: 'Текст',
          value: '',
          type: 'textarea',
        },
      ],
      button: {
        text: 'Продолжить',
        type: 'continue',
      },
    },
    {
      id: '223qwe',
      visited: true,
      title: 'Шаг 2. Названия блоков',
      description:
        'Введите название блоков занятий для удобства восприятия расписания.<br>Блоком занятий может быть группа объединяя одой темой или датой проведения.<br><b>Пример:</b> Бухгалтерский учет и отчетность или Блок 1… и т.д.',
    },
    {
      id: '323qwe',
      title: 'Шаг 3. Занятия',
      description: 'Добавьте для каждого блока занятия.',
    },
  ],
};
