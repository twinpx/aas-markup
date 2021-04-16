window.pollStore = {
  groups: [
    {
      id: '123',
      title: 'Раздел с вопросами',
      description:
        'Описание раздела может быть очень коротким,<br>а может иметь <a href="">инструкцию</a>.',
      questions: [
        {
          id: '234',
          isActive: false,
          title: 'Где чаще всего покупают молочные продукты?',
          description: 'Описание вопроса',
          type: 'radio',
          answers: [
            {
              name: 'place',
              value: 'supermarket',
              label: 'в супермаркетах',
              note: 'Вариант без картинки',
              checked: false,
            },
            {
              name: 'place',
              value: 'farmstore',
              label: 'в фермерских магазинах',
              note: 'Очень короткое пояснение вопроса.',
              img: '/upload/events/2.jpeg',
              checked: true,
            },
            {
              name: 'place',
              value: 'localstore',
              label: 'в магазинах у дома',
              note: 'Очень длинное пояснение вопроса.',
              img: '/upload/events/1.jpeg',
              checked: false,
            },
          ],
        },
        {
          id: '345',
          isActive: false,
          title: 'Выберите лучшего аудитора',
          description: 'Лучший аудитор будет награждён грамотой.',
          type: 'checkbox',
          allowed: 5,
          checkedNum: 0,
          answers: [
            {
              name: 'bestauditor[]',
              value: '22006051514',
              label: 'Абабкова Светлана Сергеевна',
              note:
                'Общество с ограниченной ответственностью<br>"Русская аудиторская компания"',
              img: '/upload/events/1.jpeg',
              checked: true,
            },
            {
              name: 'bestauditor[]',
              value: '21206072733',
              label: 'Абазалиев Рашид Хыйсаевич',
              note: 'Вариант без картинки',
              checked: true,
            },
            {
              name: 'bestauditor[]',
              value: '21606077507',
              label: 'Абакумова Галина Игоревна',
              note:
                'Общество с ограниченной ответственностью "Аудиторская фирма "Сфера содействия бизнесу"',
              img: '/upload/events/1.jpeg',
              checked: false,
            },
            {
              name: 'bestauditor[]',
              value: '22006051514',
              label: 'Абабкова Светлана Сергеевна',
              note:
                'Общество с ограниченной ответственностью "Русская аудиторская компания"',
              img: '/upload/events/1.jpeg',
              checked: false,
            },
            {
              name: 'bestauditor[]',
              value: '21206072733',
              label: 'Абазалиев Рашид Хыйсаевич',
              note: '13.09.1964',
              img: '/upload/events/2.jpeg',
              checked: false,
            },
            {
              name: 'bestauditor[]',
              value: '21606077507',
              label: 'Абакумова Галина Игоревна',
              note:
                'Общество с ограниченной ответственностью "Аудиторская фирма "Сфера содействия бизнесу"',
              img: '/upload/events/1.jpeg',
              checked: true,
            },
          ],
        },
      ],
    },
  ],
};
