window.onload = function () {
  if (!window.Vue && !window.Vuex) return;

  Vue.use(Vuex);

  const store = new Vuex.Store({
    state: window.reportFormOZOStore,
    mutations: {
      changeChecked(state, payload) {
        state.formBlocks[0].controls[payload.index].value = payload.value;
      },
      changeRadio(state, payload) {
        state.formBlocks[1].controls[payload.index].value = payload.value;
      },
      addCompany(state, payload) {
        let newCompany = state.audiOZOList.companies.slice(-1)[0];
        newCompany.controls = newCompany.controls.map(control => {
          //control.value = '';
          return control;
        });
        state.audiOZOList.companies.push( newCompany );
      },
      removeCompany(state, payload) {
        state.audiOZOList.companies.splice(payload.index, 1);
      },
    },
  });

  //checkbox
  Vue.component('formControlCheckbox', {
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
  Vue.component('formControlRadio', {
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
  Vue.component('collapseBlock1', {
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
  Vue.component('collapseBlock2', {
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
        <div v-if="formIsActive">
          <h3>Список организаций, где был проведен аудит ОЗО</h3>
          <p>Перечислите все аудит ОЗО с 2017 по 2021 год. Все поля формы обязательны.</p>

          <div class="b-add-fieldset-block">

            <div class="b-add-fieldset-block__item show visible" v-for="(company, index) in $store.state.audiOZOList.companies">
              <h4>Организация {{index+1}}</h4>
              <hr>
              <div class="b-add-fieldset-block__wrapper" data-hl="17">

                <div v-for="formControl in company.controls" class="b-add-fieldset-block__control" key="formControl">

                  <form-control-date v-if="formControl.type==='date'" :formControl="formControl" :fieldsetBlockIndex="index"></form-control-date>
                  <form-control-select v-else-if="formControl.type==='select'" :formControl="formControl" :fieldsetBlockIndex="index"></form-control-select>
                  <form-control v-else :formControl="formControl" :fieldsetBlockIndex="index"></form-control>

                </div>
                <hr class="hr--xl hr--line">
                <a class="btn-delete" href="" v-if="index>0" @click.prevent="deleteFieldsetBlock(index)"></a>
                <hr class="d-block d-xl-none">
              </div>
            </div>
            <button class="btn btn-success btn-md" @click.prevent="addFieldsetBlock()">Добавить</button>
          </div>

        </div>
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
      addFieldsetBlock() {
        //add company
        store.commit('addCompany');
      },
      deleteFieldsetBlock(index) {
        //remove company
        store.commit('removeCompany', {index: index});
      },
    },
  });

  //form control
  Vue.component('formControl', {
    data() {
      return {
        controlValue: this.formControl.value,
        isActive: this.formControl.value === '' ? false : true
      };
    },
    props: [ 'formControl', 'fieldsetBlockIndex' ],
    template: `
      <div class="b-float-label">
        <input :id="'PROPERTY_'+formControl.name+'_'+fieldsetBlockIndex" type="text" :name="'PROPERTY['+formControl.name+']['+fieldsetBlockIndex+']'" autocomplete="off" required="" @blur="blurControl()" v-model="controlValue">
        <label :for="'PROPERTY_'+formControl.name+'_'+fieldsetBlockIndex" :class="{active: isActive}">{{formControl.label}} *</label>
      </div>
    `,
    methods: {
      blurControl() {
        if ( this.controlValue !== '' ) {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
      }
    },
  });

  //form control select
  Vue.component('formControlSelect', {
    data() {
      return {};
    },
    props: [ 'formControl', 'fieldsetBlockIndex' ],
    template: `
      <div class="b-float-label">
        <input :id="'PROPERTY_'+formControl.name+'_'+fieldsetBlockIndex" type="text" :name="'PROPERTY['+formControl.name+']['+fieldsetBlockIndex+']'" :value="formControl.value" autocomplete="off" required="">
        <label :for="'PROPERTY_'+formControl.name+'_'+fieldsetBlockIndex">{{formControl.label}} *</label>
      </div>
    `,
    methods: {
    },
  });

  //form control date
  Vue.component('formControlDate', {
    data() {
      return {};
    },
    props: [ 'formControl', 'fieldsetBlockIndex' ],
    template: `
      <div class="b-float-label">
        <input :id="'PROPERTY_'+formControl.name+'_'+fieldsetBlockIndex" type="text" :name="'PROPERTY['+formControl.name+']['+fieldsetBlockIndex+']'" :value="formControl.value" autocomplete="off" required="">
        <label :for="'PROPERTY_'+formControl.name+'_'+fieldsetBlockIndex">{{formControl.label}} *</label>
      </div>
    `,
    methods: {
    },
  });

  const App = {
    el: '#reportFormOZO',
    store,
    template: `
      <collapse-block-1></collapse-block-1>
      <collapse-block-2></collapse-block-2>
    `,
  };
  
  const app = new Vue(App);
};
