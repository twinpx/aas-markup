window.addEventListener('load', () => {
  if (!window.Vue && !window.Vuex) return;

  Vue.use(Vuex);

  const store = new Vuex.Store({
    state: {
      status: '',
      selectedOptionStatus: { label: 'Ожидает проверки' },
    },
    mutations: {
      changeProp(state, payload) {
        state[payload.prop] = payload.value;
      },
      changeSelectedOption(state, payload) {
        state[`selectedOption${payload.type}`] = { label: payload.label };
        console.log(state[`selectedOption${payload.type}`]);
      },
    },
  });

  Vue.component('v-select', VueSelect.VueSelect);

  Vue.component('form-control-status', {
    data() {
      return {
        options: window.selectStatusData.options || [
          {
            label: 'Ожидает проверки',
            code: '',
          },
        ],
        selectedOption: store.state.selectedOptionStatus ||
          window.selectStatusData.selected || {
            label: 'Ожидает проверки',
            code: '',
          },
      };
    },
    template: `<div class="form-control-wrapper">
      <v-select :options="options" :value="options[0]" class="form-control-select" @input="onSelect()" v-model="selectedOption"></v-select>
      <label>Статус обращения</label>
    </div>`,
    props: ['status'],
    methods: {
      onSelect() {
        //set status
        store.commit('changeProp', {
          prop: 'status',
          value: this.selectedOption.code,
        });
      },
    },
  });

  const app = new Vue({
    el: '#changeStatusForm',
    store,
    template: `
      <div>
        <form-control-status :status="$store.state.status"></form-control-status>
        <textarea></textarea>
        <button class="btn btn-secondary btn-lg" type="submit">Сохранить</button>
      </div>`,
    methods: {},
  });
});
