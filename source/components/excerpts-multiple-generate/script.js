window.onload = function () {
  if (!window.Vue && !window.Vuex) return;

  window.moderationSrcPath = '/template/images/';

  Vue.use(Vuex);

  const store = new Vuex.Store({
    state: window.excerptsMultipleGenerateStore,
    mutations: {
      changeChecked(state, payload) {
        state.employees[payload.itemIndex].checked = payload.checked;
      },
      changeSelect(state, payload) {},
      changeStatus(state, status) {
        state.status = status;
      },
      setGenerated(state, generated) {
        state.generated = generated;
      },
    },
  });

  Vue.component('v-select', VueSelect.VueSelect);

  //checkbox
  Vue.component('formControlCheckbox', {
    data() {
      return {
        checked: this.item.checked,
      };
    },
    props: ['itemIndex', 'item'],
    template: `
            <label class="b-poll__form-control" :class="[{'i-active': checked}]">
                <div class="b-poll__form-control__content">
                    <div class="b-poll__form-control__text"><b v-html="item.label"></b><span v-html="item.note"></span></div>
                </div>
                <div class="b-poll__checkbox"><input type="checkbox" :name="item.name" v-model="checked" :value="item.value" class="filled-in" @change="change()"><span></span></div>
            </label>
        `,
    methods: {
      change() {
        //commit mutation
        this.$store.commit('changeChecked', {
          checked: this.checked,
          itemIndex: this.itemIndex,
        });

        //change local storage
        /*let storageObj = {};
            if (window.localStorage.getItem(store.state.pollId)) {
              storageObj = JSON.parse(
                window.localStorage.getItem(store.state.pollId)
              );
            }
    
            storageObj[this.answer.value] = this.checked;
            window.localStorage.setItem(
              store.state.pollId,
              JSON.stringify(storageObj)
            );*/
      },
    },
  });

  //select
  Vue.component('formControlSelect', {
    data() {
      return {
        options: this.select.options,
        selectedOption: this.select.options[0],
      };
    },
    template: `
            <div class="b-float-label-select-vc">
                <label>Тип выписки</label>
                <v-select :options="options" :value="options[0]" class="form-control-select" @input="onSelect()" v-model="selectedOption"></v-select>
                <input type="hidden" :name="select.name" :value="selectedOption.code" ref="hiddenInput">
            </div>`,
    props: ['select'],
    methods: {
      onSelect() {
        //set select
        store.commit('changeSelect', {
          selected: this.selectedOption,
        });
        this.$refs.hiddenInput.value = this.selectedOption.code;
      },
    },
  });

  //checkbox
  Vue.component('formBottomPanel', {
    data() {
      return {};
    },
    computed: {
      checkedNum() {
        return this.$store.state.employees.filter(
          (employee) => employee.checked === true
        ).length;
      },
      num() {
        let word = this.declOfNum(this.checkedNum, [
          'выписка',
          'выписки',
          'выписок',
        ]);
        return `${this.checkedNum} ${word}`;
      },
    },
    template: `
            <transition name="slide-fade">
                <div class="b-poll__form-bottom-panel" v-if="checkedNum > 0">
                    <div class="b-poll__form-bottom-panel__left">
                        <div class="b-poll__form-bottom-panel__num">{{ num }}</div>
                        <div class="b-poll__form-bottom-panel__select">
                            <form-control-select :select="$store.state.bottomPanel.select"></form-control-select>
                        </div>
                    </div>
                    <div class="b-poll__form-bottom-panel__button">
                        <button class="btn btn-secondary" @click.prevent="clickBtn()">Сгенерировать выписки</button>
                    </div>
                </div>
            </transition>
        `,
    methods: {
      declOfNum(number, words) {
        return words[
          number % 100 > 4 && number % 100 < 20
            ? 2
            : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
        ];
      },
      clickBtn() {
        //show modal
        $('#getExcerptModal').modal('show');
        //show loading
        this.$store.commit('changeStatus', 'loading');
        //send request
        this.generate();
      },
      generate() {
        let formData = new FormData(
          document.getElementById('excerptsMultipleGenerateForm')
        );
        (async () => {
          do {
            try {
              let response = await fetch(
                window.excerptsMultipleGeneratePaths.response,
                {
                  //method: 'POST',
                  //body: formData,
                }
              );
              let result = await response.json();

              if (result.STATUS === 'LOADING') {
                await new Promise((r) => setTimeout(r, 15000));
              } else if (result.STATUS !== 'Y') {
                //hide modal
                $('#getExcerptModal').modal('hide');
                //hide loading
                this.$store.commit('changeStatus', '');
                //throw error
                throw new Error('Ошибка');
              } else if (result.GENERATED) {
                setTimeout(() => {
                  //mutate store
                  this.$store.commit('setGenerated', result.GENERATED);
                  //hide modal
                  $('#getExcerptModal').modal('hide');
                  //hide loading
                  this.$store.commit('changeStatus', '');
                }, 500);
                return;
              } else {
                break;
              }
            } catch (err) {
              throw err;
            }
          } while (true);
        })();
      },
    },
  });

  const App = {
    el: '#excerptsMultipleGenerateApp',
    store,
    template: `
        <div>
            <div v-if="$store.state.status === 'loading'" class="b-loading-status">
                <b>Идет генерация выписок, это займет длительное время...</b>
                <div class="circle-loader">
                    <div class="circle circle-1"></div>
                    <div class="circle circle-2"> </div>
                    <div class="circle circle-3"></div>
                    <div class="circle circle-4"></div>
                    <div class="circle circle-5"></div>
                </div>
            </div>
            <div v-else>
                <div v-if="$store.state.generated.fileURL">
                    <h2>Сгенерированная выписка</h2>
                    <div class="b-generated">
                        <div class="b-generated__left">
                            <a :href="$store.state.generated.archiveURL">Архив с выписками</a>
                            <span>{{ $store.state.generated.date }}</span>
                        </div>
                        <div class="b-generated__right">
                            <a :href="$store.state.generated.fileURL" :style="'background-image: url(' +  $store.state.generated.fileIcon + ')'">{{ $store.state.generated.size }}</a>
                        </div>
                    </div>
                </div>
                <div>
                    <h2>Список сотрудников согласно реестру</h2>
                    <form action="" method="POST" id="excerptsMultipleGenerateForm">
                        <form-control-checkbox v-for="(person, index) in $store.state.employees" v-key="person.id" :item="{label: person.name, note: person.ornz, name: 'user[]', value: person.id}" :itemIndex="index"></form-control-checkbox>
                        <form-bottom-panel></form-bottom-panel>
                    </form>
                </div>
            </div>
        </div>
      `,
    methods: {
      async sendRequest() {
        do {
          try {
            let response = await fetch(
              window.excerptsMultipleGeneratePaths.onMounted
            );
            let result = await response.json();
            if (result.STATUS === 'LOADING') {
              await new Promise((r) => setTimeout(r, 15000));
            } else if (result.STATUS !== 'Y') {
              //hide loading
              this.$store.commit('changeStatus', '');
              throw new Error('Ошибка');
            } else if (result.GENERATED) {
              setTimeout(() => {
                //mutate store
                this.$store.commit('setGenerated', result.GENERATED);
                //show loading
                this.$store.commit('changeStatus', '');
              }, 500);
              return;
            } else {
              break;
            }
          } catch (err) {
            throw err;
          }
        } while (true);
      },
    },
    mounted() {
      if (this.$store.state.status === 'loading') {
        this.sendRequest();
      }
    },
  };

  const app = new Vue(App);
};
