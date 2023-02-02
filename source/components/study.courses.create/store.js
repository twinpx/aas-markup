window.studyCourseCreateStore = {
  submitStepURL: '/components/study.courses.create/urls/submit-step.json',
  addBlockURL: '/components/study.courses.create/urls/add-block.json',
  deleteBlockURL: '/components/study.courses.create/urls/delete-block.json',
  addLessonURL: '/components/study.courses.create/urls/add-lesson.json',
  deleteLessonURL: '/components/study.courses.create/urls/delete-block.json',
  ornzControlURL: '/components/study.courses.create/urls/ornz-control.json',
  courseId: 'course123',
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
      blocks: [
        {
          id: 'block123',
          controls: [
            {
              name: 'BLOCK_TITLE',
              label: 'Название блока',
              value: 'Документооборот и бухгалтерия',
              type: 'text',
            },
            {
              name: 'PROGRAMM',
              label: 'Программа СРО ААС',
              type: 'ornz',
              value: '',
            },
          ],
        },
        {
          id: 'block124',
          controls: [
            {
              name: 'BLOCK_TITLE',
              label: 'Название блока',
              value: 'Бухгалтерский учет и отчетность',
              type: 'text',
            },
            {
              name: 'PROGRAMM',
              label: 'Программа СРО ААС',
              type: 'ornz',
              value: '',
            },
          ],
        },
      ],
      button: {
        text: 'Продолжить',
        type: 'continue',
      },
    },
    {
      id: '323qwe',
      visited: true,
      title: 'Шаг 3. Занятия',
      description: 'Добавьте для каждого блока занятия.',
      blocks: [
        {
          id: 'block123',
          lessons: [
            {
              id: 'lesson123',
              controls: [
                {
                  name: 'LESSON_TITLE',
                  label: 'Название занятия',
                  value:
                    'Немодифицированное и модифицированное мнение в аудиторском заключении. Разделы «Существенная неопределенность в отнощшении непрерывности деятельности», «Важные обстоятельства» и «Прочие сведения» в аудиторском заключении. Обязанности аудитора, относящиеся к прочей информации, включенной в годовой отчет организации.',
                  type: 'textarea',
                },
                {
                  name: 'LESSON_DATE',
                  label: 'Выберите дату',
                  value: '',
                  type: 'date',
                },
                {
                  name: 'TEACHER_NAME',
                  label: 'Преподаватель',
                  value: '',
                  type: 'text',
                },
                {
                  name: 'LESSON_TYPE',
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
                {
                  name: 'LESSON_ADDRESS',
                  label: 'Адрес занятия',
                  value: '',
                  type: 'text',
                },
                {
                  name: 'LESSON_START',
                  label: 'Время начала',
                  value: '10:00',
                  type: 'time',
                },
                {
                  name: 'LESSON_END',
                  label: 'Время окончания',
                  value: '18:00',
                  type: 'time',
                },
                {
                  name: 'LESSON_HOURS',
                  label: 'Количество часов',
                  value: '',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          id: 'block124',
          lessons: [
            {
              id: 'lesson123',
              controls: [
                {
                  name: 'LESSON_TITLE',
                  label: 'Название занятия',
                  value:
                    'Разделы «Существенная неопределенность в отнощшении непрерывности деятельности», «Важные обстоятельства» и «Прочие сведения».',
                  type: 'textarea',
                },
                {
                  name: 'LESSON_DATE',
                  label: 'Выберите дату',
                  value: '22.05.2023',
                  type: 'date',
                },
                {
                  name: 'TEACHER_NAME',
                  label: 'Преподаватель',
                  value: 'Ковалевский Ярослав',
                  type: 'text',
                },
                {
                  name: 'LESSON_TYPE',
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
                {
                  name: 'LESSON_ADDRESS',
                  label: 'Адрес занятия',
                  value: '',
                  type: 'text',
                },
                {
                  name: 'LESSON_START',
                  label: 'Время начала',
                  value: '10:00',
                  type: 'time',
                },
                {
                  name: 'LESSON_END',
                  label: 'Время окончания',
                  value: '18:00',
                  type: 'time',
                },
                {
                  name: 'LESSON_HOURS',
                  label: 'Количество часов',
                  value: '',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
      button: {
        text: 'Сохранить',
        type: 'save',
      },
    },
  ],
};
