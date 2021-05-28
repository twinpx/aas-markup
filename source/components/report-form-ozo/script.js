window.onload = function () {
  if (!window.Vue && !window.Vuex) return;

  const store = Vuex.createStore({
    state() {
      return window.reportFormOZOStore;
    },
    mutations: {
      changeChecked(state, payload) {
        state.formBlocks[0].controls[payload.index].value = payload.value;
      },
      changeRadio(state, payload) {
        state.formBlocks[1].controls[payload.index].value = payload.value;
      },
    },
  });

  const App = {
    template: `
      <collapse-block-1></collapse-block-1>
      <collapse-block-2></collapse-block-2>
    `,
  };

  const app = Vue.createApp(App);
  app.use(store);

  //checkbox
  app.component('formControlCheckbox', {
    data() {
      return {
        checked: this.control.value,
      };
    },
    props: ['index', 'control'],
    template: `<label class="b-form-control-vc" :class="{'i-active': checked}">
      <div class="b-form-control-vc__content">
        <div class="b-form-control-vc__text"><b v-html="control.title"></b><span v-html="control.text"></span></div>
      </div>
      <div class="b-checkbox-vc"><input type="checkbox" :name="control.name" v-model="checked" :value="control.value" class="filled-in" @change="change()"><span></span></div>
    </label>`,
    methods: {
      change() {
        //set control change
        store.commit('changeChecked', {
          index: this.index,
          value: this.control.value,
        });
      },
    },
  });

  //radio
  app.component('formControlRadio', {
    data() {
      return {
        checked: this.control.value,
      };
    },
    props: ['index', 'control'],
    template: `<label class="b-form-control-vc" :class="{'i-active': checked}">
      <div class="b-form-control-vc__content">
        <div class="b-form-control-vc__text"><b v-html="control.title"></b><span v-html="control.text"></span></div>
      </div>
      <div class="b-radio-vc"><input type="radio" :name="control.name" :checked="checked" :value="control.value" class="with-gap" @change="change"><span></span></div>
    </label>
    `,
    methods: {
      change(e) {
        //highlight
        if (e.target.checked) {
          e.target
            .closest('.row')
            .querySelectorAll('label')
            .forEach(function (label) {
              //set inactive
              label.classList.remove('i-active');
            });
          e.target.closest('label').classList.add('i-active');
        }

        //set question as active
        store.commit('changeRadio', {
          index: this.index,
          value: this.control.value,
        });

        //set checked
        this.checked = true;

        //show the form if it is the first radio
        this.$emit('set-form-active', this.index);
      },
    },
  });

  //collapse block 1
  app.component('collapseBlock1', {
    data() {
      return {
        slide: true,
        open: true,
      };
    },
    template: `
    <div class="b-collapse-vc" :class="{slide: slide, open: open}">
      <div class="b-collapse-vc__head" @click.stop.prevent="toggleBody()">
        <a href="" @click.prevent>
          <i>{{$store.state.formBlocks[0].title}}</i>
          <i class="text-danger">Не заполнены обязательные поля</i>
        </a>
        <span></span>
      </div>
      <div class="b-collapse-vc__body">
        <form-control-checkbox v-for="(control, index) in $store.state.formBlocks[0].controls" :index="index" :control="control"></form-control-checkbox>
      </div>
    </div>
    `,
    methods: {
      toggleBody() {
        //set slide class for the main div
        this.slide = !this.slide;
        //slide body
        this.open = !this.open;
      },
    },
  });

  //collapse block 1
  app.component('collapseBlock2', {
    data() {
      return {
        slide: true,
        open: true,
        formIsActive: false,
      };
    },
    template: `
    <div class="b-collapse-vc" :class="{slide: slide, open: open}">
      <div class="b-collapse-vc__head" @click.stop.prevent="toggleBody()">
        <a href="" @click.prevent>
          <i>{{$store.state.formBlocks[1].title}}</i>
          <i class="text-danger">Не заполнены обязательные поля</i>
        </a>
        <span></span>
      </div>
      <div class="b-collapse-vc__body">
        <div class="row">
          <div class="col-6" v-for="(control, index) in $store.state.formBlocks[1].controls">
            <form-control-radio :index="index" :control="control" @set-form-active="setFormActive"></form-control-radio>
          </div>
        </div>
        <div v-if="formIsActive">Form</div>
      </div>
    </div>
    `,
    methods: {
      toggleBody() {
        //set slide class for the main div
        this.slide = !this.slide;
        //slide body
        this.open = !this.open;
      },
      setFormActive(index) {
        this.formIsActive = !index;
      },
    },
  });

  app.mount('#reportFormOZO');
};
