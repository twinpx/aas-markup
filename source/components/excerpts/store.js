window.excerptStore = {
  blocks: [
    {
      head: 'Упрощенная выписка 2',
      btnUrl: '/components/excerpts/getExcerpt.json',
      title: 'Упрощенная выписка &quot;СРО ААС&quot; 8',
      date: '20 марта 2021',
      state: 'excerpt',
      files: {
        pdf: {
          url: '/upload/example.pdf',
          size: '8.07 Мб',
        },
        'pdf-sig': {
          pdf: {
            url: '/upload/example.pdf',
            size: '8.07 Мб',
          },
          sig: {
            url: '/pages/excerpt2/',
            size: '1.07 Мб',
          },
        },
      },
    },
    {
      head: 'Упрощенная выписка 3',
      btnUrl: '/components/excerpts/getExcerpt.json',
      state: 'empty',
    },
    {
      head: 'Упрощенная выписка 4',
      btnUrl: '/components/excerpts/getExcerpt.json',
      state: 'loading',
    },
  ],
};
