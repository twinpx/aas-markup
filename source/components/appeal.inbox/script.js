window.addEventListener('load', () => {
  if (!window.Vue && !window.Vuex) return;

  Vue.use(Vuex);

  const store = new Vuex.Store({
    state: {
      tableHtml: '',
      q: undefined,
      status: '',
      start: '',
      end: '',
      selectedOption: { label: 'Успешно' },
      page: '1',
      sorting: {
        field: '',
        sortType: '',
      },
    },
    mutations: {
      changeTableHtml(state, payload) {
        state.tableHtml = payload;
      },
      changeStatus(state, payload) {
        state.status = payload;
      },
      changeQuery(state, payload) {
        state.q = payload;
      },
      changeStart(state, payload) {
        state.start = payload;
      },
      changeEnd(state, payload) {
        state.end = payload;
      },
      changeSelectedOption(state, payload) {
        state.selectedOption = { label: payload };
      },
      changePage(state, payload) {
        state.page = payload;
      },
      changeSorting(state, payload) {
        state.sorting = payload;
      },
    },
  });

  Vue.component('v-select', VueSelect.VueSelect);
  Vue.component('date-picker', DatePicker);

  Vue.component('form-control-date', {
    template: `<div class="b-float-label" data-src="${window.moderationSrcPath}calendar.svg">
      <date-picker :lang="lang" v-model="dateRange" value-type="X" range format="DD.MM.YYYY" @open="openInput" @close="closeInput" @clear="closeInput" @input="inputDateRange"></date-picker>
      <label for="DATE" :class="{ active: isActive }">Дата</label>
    </div>`,
    data() {
      return {
        isActive: !!store.state.start,
        dateRange: [`${store.state.start}`, `${store.state.end}`],
        lang: {
          // the locale of formatting and parsing function
          formatLocale: {
            // MMMM
            months: [
              'Январь',
              'Февраль',
              'Март',
              'Апрель',
              'Май',
              'Июнь',
              'Июль',
              'Август',
              'Сентябрь',
              'Октябрь',
              'Ноябрь',
              'Декабрь',
            ],
            // MMM
            monthsShort: [
              'Янв',
              'Фев',
              'Мар',
              'Апр',
              'Май',
              'Июн',
              'Июл',
              'Авг',
              'Сен',
              'Окт',
              'Ноя',
              'Дек',
            ],
            // dddd
            weekdays: [
              'Воскресенье',
              'Понедельник',
              'Вторник',
              'Среда',
              'Четверг',
              'Пятница',
              'Суббота',
            ],
            // ddd
            weekdaysShort: ['Вск', 'Пнд', 'Втр', 'Сре', 'Чтв', 'Птн', 'Суб'],
            // dd
            weekdaysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            // first day of week
            firstDayOfWeek: 1,
            // first week contains January 1st.
            firstWeekContainsDate: 1,
            // format 'a', 'A'
            meridiem(h, _, isLowercase) {
              const word = h < 12 ? 'AM' : 'PM';
              return isLowercase ? word.toLocaleLowerCase() : word;
            },
            // parse ampm
            meridiemParse: /[ap]\.?m?\.?/i,
            // parse ampm
            isPM(input) {
              return `${input}`.toLowerCase().charAt(0) === 'p';
            },
          },
          // the calendar header, default formatLocale.weekdaysMin
          days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
          // the calendar months, default formatLocale.monthsShort
          months: [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
          ],
          // the calendar title of year
          yearFormat: 'YYYY',
          // the calendar title of month
          monthFormat: 'MMMM',
          // the calendar title of month before year
          monthBeforeYear: true,
        },
      };
    },
    methods: {
      openInput() {
        this.isActive = true;
      },
      closeInput() {
        if (!this.dateRange[0] && !this.dateRange[1]) {
          this.isActive = false;
        }
      },
      inputDateRange() {
        //reset page
        store.commit('changePage', 1);
        //set start&end
        store.commit('changeStart', this.dateRange[0]);
        store.commit('changeEnd', this.dateRange[1]);
        //render table
        this.$emit('rendertable');
        //set URL
        this.$emit('seturl');
      },
    },
  });

  Vue.component('form-control-status', {
    data() {
      return {
        options: window.selectData.options || [
          {
            label: 'Все',
            code: '',
          },
        ],
        selectedOption: store.state.selectedOption ||
          window.selectData.selected || {
            label: 'Все',
            code: '',
          },
      };
    },
    template: `<div><v-select :options="options" :value="options[0]" class="form-control-select" @input="onSelect()" v-model="selectedOption"></v-select></div>`,
    props: ['status'],
    methods: {
      onSelect() {
        //reset page
        store.commit('changePage', 1);
        //set status
        store.commit('changeStatus', this.selectedOption.code);
        //render table
        this.$emit('rendertable');
        //set URL
        this.$emit('seturl');
      },
    },
  });

  Vue.component('form-control-fio', {
    data() {
      return {
        inputText: '',
        hover: false,
        isActive: false,
      };
    },

    computed: {
      isClearable() {
        return this.inputText !== '' && this.hover ? true : false;
      },
    },

    template: `<div class="b-float-label" @mouseover="hover=true;" @mouseout="hover=false;">
      <input id="moderation-filter-fio" type="text" name="FIO" required="" autocomplete="off" v-model="inputText" @input="changeInput" @blur="blurInput($event)">
      <label for="moderation-filter-fio" :class="{active: isActive}">ФИО или ОРНЗ</label>
      <div class="b-input-clear" @click="clearInput($event)" v-show="isClearable"></div>
    </div>`,

    methods: {
      changeInput() {
        if (this.inputText.length >= 5) {
          this.getTableData();
        } else if (store.state.q) {
          store.commit('changeQuery', undefined);
          this.getTableData(false);
        }
      },
      blurInput(e) {
        if (e.target.value !== '') {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
      },
      clearInput(e) {
        e.preventDefault();
        this.inputText = '';
        this.isActive = false;
        this.getTableData();
      },
      getTableData(setQueryFlag) {
        //reset page
        store.commit('changePage', 1);
        //set query
        if (setQueryFlag !== false) {
          store.commit('changeQuery', this.inputText || undefined);
        }
        //render Table
        this.$emit('rendertable');
        //set URL
        this.$emit('seturl');
      },
    },
  });

  Vue.component('moderation-filter', {
    template: `<div id="moderation-filter">
        <div class="row">
          <div class="col-xl-2 col-12">
            <form-control-fio @rendertable="renderTable" @seturl="seturl" ref="fio"></form-control-fio>
          </div>

          <hr class="d-block d-xl-none w-100">
        
          <div class="col-xl-2 col-12">
            <form-control-fio @rendertable="renderTable" @seturl="seturl" ref="fio"></form-control-fio>
          </div>

          <hr class="d-block d-xl-none w-100">

          <div class="col-xl-2 col-12">
            <form-control-fio @rendertable="renderTable" @seturl="seturl" ref="fio"></form-control-fio>
          </div>

          <hr class="d-block d-xl-none w-100">

          <div class="col-xl-3 col-12">
            <form-control-status @rendertable="renderTable" @seturl="seturl" :status="$store.state.status"></form-control-status>
          </div>

          <hr class="d-block d-xl-none w-100">

          <div class="col-xl-3 col-12">
            <form-control-date @rendertable="renderTable" @seturl="seturl"></form-control-date>
          </div>
        </div>
      </div>`,
    methods: {
      renderTable() {
        //render table
        this.$emit('rendertable');
      },
      seturl() {
        this.$emit('seturl');
      },
    },
  });

  Vue.component('moderation-table', {
    data() {
      return {
        sorting: {
          field: '',
          sortType: '',
        },
      };
    },
    template: `<div id="moderation-table" class="b-registry-report">
      <div v-if="$store.state.tableHtml.rows">
        <table class="table">
          <thead>
            <tr>
              <th v-for="col in tableHtml.cols" :class="col.sortType" @click="sortTable($event, col.field, col.sortType)">{{col.title}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in tableHtml.rows" :data-id="row.data.id" :data-url="row.url" :title="row.title" :data-target="row.target">
              <td v-for="(value, name) in row.data" v-html="value" :class="sorting.field === name ? sorting.sortType : ''"></td>
            </tr>
          </tbody>
        </table>
        <hr>
        <div v-html="tableHtml.pagination" @click="clickPagination($event)"></div>
      </div>
      <div v-else>Нет данных.</div>
    </div>`,
    computed: {
      tableHtml() {
        const tableHtml = store.state.tableHtml;
        if (typeof tableHtml === 'object') {
          const sortedCol = tableHtml.cols.filter((col) => col.sortType);
          if (sortedCol.length) {
            this.sorting = {
              field: sortedCol[0].field,
              sortType: sortedCol[0].sortType,
            };
          }
        }
        return tableHtml;
      },
    },
    methods: {
      sortTable(e, field, sortType) {
        sortType = sortType === 'asc' ? 'desc' : 'asc';
        store.commit('changeSorting', { field, sortType });

        //render table
        this.$emit('rendertable');
        //set url
        this.$emit('seturl');
      },
      clickPagination(e) {
        e.preventDefault();
        if (e.target.getAttribute('href')) {
          //reset page
          let page = parseQuery(e.target.getAttribute('href')).PAGEN_1;
          store.commit('changePage', 1 * page);
          //render Table
          this.$emit('rendertable');
          //set URL
          this.$emit('seturl');
        }
      },
    },
  });

  const app = new Vue({
    el: '#moderation',
    store,
    methods: {
      renderTable() {
        (async () => {
          const requestObj = {};
          if (store.state.q) {
            requestObj.q = store.state.q;
          }
          if (store.state.status) {
            requestObj.status = store.state.status;
          }
          if (store.state.start) {
            requestObj.start = store.state.start;
          }
          if (store.state.end) {
            requestObj.end = store.state.end;
          }
          if (store.state.sorting.field) {
            requestObj.sortField = store.state.sorting.field;
          }
          if (store.state.sorting.sortType) {
            requestObj.sortType = store.state.sorting.sortType;
          }
          if (store.state.page) {
            requestObj.PAGEN_1 = store.state.page;
          }

          const response = await fetch(
            `${window.moderationScriptURL.getTable}${getQuery(requestObj)}`,
            {
              headers: {
                Authentication: 'secret',
              },
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          } else {
            let result = await response.json();
            store.commit('changeTableHtml', result);
          }
        })();
      },
      seturl() {
        const queryObj = {};
        if (store.state.q) {
          queryObj.q = store.state.q;
        }
        if (store.state.status) {
          queryObj.status = store.state.status;
        }
        if (store.state.start) {
          queryObj.start = store.state.start;
        }
        if (store.state.end) {
          queryObj.end = store.state.end;
        }
        if (store.state.sorting.field) {
          queryObj.sortField = store.state.sorting.field;
        }
        if (store.state.sorting.sortType) {
          queryObj.sortType = store.state.sorting.sortType;
        }
        if (store.state.page) {
          queryObj.PAGEN_1 = store.state.page;
        }

        window.history.pushState('', '', getQuery(queryObj));
      },
    },
    beforeMount() {
      //set store variables
      const queryObject = parseQuery(window.location.search);
      for (let key in queryObject) {
        switch (key) {
          case 'q':
            store.commit('changeQuery', queryObject[key] || undefined);
            break;
          case 'status':
            store.commit('changeStatus', queryObject[key] || '');
            break;
          case 'start':
            store.commit('changeStart', queryObject[key] || '');
            break;
          case 'end':
            store.commit('changeEnd', queryObject[key] || '');
            break;
          case 'sortField':
            store.commit('changeSorting', {
              field: queryObject.sortField || '',
              sortType: queryObject.sortType || '',
            });
            break;
          case 'sortType':
            store.commit('changeSorting', {
              field: queryObject.sortField || '',
              sortType: queryObject.sortType || '',
            });
            break;
          case 'PAGEN_1':
            store.commit('changePage', queryObject[key] || '');
            break;
        }
      }

      //set status to the select
      const selected = window.selectData.options.filter(
        (optionObj) => optionObj.code === store.state.status
      );
      store.commit('changeSelectedOption', selected[0].label);
    },
    mounted() {
      //get user fio
      if (store.state.q) {
        this.$refs.filter.$refs.fio.inputText = store.state.q;
        this.$refs.filter.$refs.fio.isActive = true;
      }
      //render the table
      this.renderTable();
    },
  });

  function getQuery(queryObject) {
    var result = [];
    for (var k in queryObject) {
      result.push(k + '=' + queryObject[k]);
    }
    return '?' + result.join('&');
  }

  function parseQuery(queryString) {
    var query = {};
    var pairs = (
      queryString[0] === '?' ? queryString.substr(1) : queryString
    ).split('&');
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
  }
});
