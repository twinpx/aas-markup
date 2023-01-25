window.onload = function () {
  if (!window.Vue && !window.Vuex) return;

  window.moderationSrcPath = '/template/images/';

  Vue.use(Vuex);
  Vue.use(VueScrollTo);

  const store = new Vuex.Store({
    state: window.reportFormOZOStore,
    mutations: {
      changeChecked(state, payload) {
        state.formBlocks[0].controls[payload.index].checked = payload.checked;
      },
      changeRadio(state, payload) {
        state.formBlocks[1].controls.forEach(
          (control) => (control.checked = false)
        );
        state.formBlocks[1].controls[payload.index].checked = true;
      },
      changeSelect2(state, payload) {
        state.formBlocks[2].controls[payload.index].selected = payload.selected;
      },
      addCompany(state, payload) {
        //add fields
        let newCompany = {};
        newCompany.id = payload.companyId;
        newCompany.hidden = payload.hidden.map((elem) => {
          return { name: elem.name, value: elem.value };
        });
        newCompany.controls = [];
        state.audiOZOList.template.controls.forEach((control) => {
          if (control.type === 'text' || control.type === 'date') {
            newCompany.controls.push({
              name: control.name,
              label: control.label,
              value: '',
              type: control.type,
            });
          } else if (control.type === 'select') {
            let v = [];
            control.value.forEach((val) => {
              v.push({
                label: val.label,
                code: val.code,
              });
            });

            newCompany.controls.push({
              name: control.name,
              label: control.label,
              value: v,
              selected: v[0],
              type: control.type,
            });
          }
        });
        state.audiOZOList.companies.push(newCompany);
      },
      removeCompany(state, payload) {
        state.audiOZOList.companies.splice(payload.index, 1);
      },
      changeSelect(state, payload) {
        state.audiOZOList.companies[payload.fieldsetBlockIndex].controls[
          payload.controlIndex
        ].selected = payload.selected;
      },
      changeDate(state, payload) {
        state.audiOZOList.companies[payload.fieldsetBlockIndex].controls[
          payload.controlIndex
        ].value = payload.value;
      },
      changeTextControl(state, payload) {
        state.audiOZOList.companies[payload.fieldsetBlockIndex].controls[
          payload.controlIndex
        ].value = payload.value;
      },
      setInvalid(state, payload) {
        switch (payload) {
          case '#collapse1':
            state.formBlocks[0].invalid = true;
            break;
          case '#collapse2':
            state.formBlocks[1].invalid = true;
            break;
          case '#agreement':
            state.agreement.invalid = true;
            break;
        }
      },
    },
  });

  Vue.component('v-select', VueSelect.VueSelect);
  Vue.component('date-picker', DatePicker);

  //hidden fields
  Vue.component('hiddenFields', {
    data() {
      return {};
    },
    template: `
      <div>
        <input v-for="field in $store.state.hidden" :key="generateKey()" type="hidden" :name="field.name" :value="field.value">
      </div>
    `,
    methods: {
      toggleBody() {
        //set slide class for the main div
        this.slide = !this.slide;
        //slide body
        this.open = !this.open;
      },
      generateKey() {
        return Date.now() * Math.random();
      },
    },
  });

  //checkbox
  Vue.component('formControlCheckbox', {
    data() {
      return {
        checked: this.control.checked,
      };
    },
    props: ['index', 'control'],
    template: `<label class="b-form-control-vc" :class="{'i-active': checked}">
      <div class="b-form-control-vc__content">
        <div class="b-form-control-vc__text"><b v-html="control.title"></b><span v-html="control.text"></span></div>
      </div>
      <div class="b-checkbox-vc"><input type="checkbox" :name="control.name" v-model="checked" class="filled-in" @change="change()"><span></span></div>
    </label>`,
    methods: {
      change() {
        //set control change
        store.commit('changeChecked', {
          index: this.index,
          checked: this.checked,
        });
      },
    },
  });

  //select
  Vue.component('formControlSelect2', {
    data() {
      return {
        options: this.control.value || [
          {
            label: '',
            code: '',
          },
        ],
        selectedOption: this.control.selected || {
          label: '',
          code: '',
        },
      };
    },
    template: `<div class="b-float-label-select-vc">
      <v-select :options="options" :value="options[0]" class="form-control-select" @input="onSelect()" v-model="selectedOption"></v-select>
      <input type="hidden" :name="control.name" :value="selectedOption.code" ref="hiddenInput">
    </div>`,
    props: ['control', 'index'],
    methods: {
      onSelect() {
        //set select
        store.commit('changeSelect2', {
          index: this.index,
          selected: this.selectedOption,
        });
        this.$refs.hiddenInput.value = this.selectedOption.code;
      },
    },
  });

  //collapse block 2
  Vue.component('collapseBlock2', {
    data() {
      return {
        slide: true,
        open: true,
        formIsActive: store.state.formBlocks[1].controls[0].checked,
      };
    },
    template: `
    <div class="b-collapse-vc" :class="{slide: slide, open: open}" id="collapse2">
        <div class="b-collapse-vc__body" v-if="slide">
            <div v-show="formIsActive">
                  <hr>
                  <div class="b-add-fieldset-block__wrapper">

                    <input v-for="(hiddenField, hiddenIndex) in company.hidden" :key="generateKey(hiddenIndex)" type="hidden" :name="hiddenField.name" :value="hiddenField.value">

                    <div v-for="(formControl, controlIndex) in company.controls" class="b-add-fieldset-block__control" :key="generateKey(controlIndex)">
                      <form-control-date v-if="formControl.type==='date'" :formControl="formControl" :fieldsetBlockIndex="0" :controlIndex="controlIndex" :required="formIsActive"></form-control-date>
                      <form-control-select v-else-if="formControl.type==='select'" :formControl="formControl" :fieldsetBlockIndex="0" :controlIndex="controlIndex" :required="formIsActive"></form-control-select>
                      <form-control v-else :formControl="formControl" :fieldsetBlockIndex="0" :controlIndex="controlIndex" :required="formIsActive" ></form-control>
                    </div>

                  </div>

            </div>
        </div>
    </div>
    `,
    methods: {
      //transition
      enter: function (el, done) {
        Velocity(el, 'slideDown', {
          easing: 'ease',
          duration: 500,
        });
      },
      leave: function (el, done) {
        Velocity(el, 'slideUp', {
          easing: 'ease',
          duration: 500,
        });
      },

      toggleBody() {
        //set slide class for the main div
        this.slide = !this.slide;
        //slide body
        this.open = !this.open;
      },
      setFormActive(index) {
        this.formIsActive = !index;
      },
      generateKey(index) {
        return Date.now() * Math.random() + index;
      },
    },
  });

  //form control
  Vue.component('formControl', {
    data() {
      return {
        controlValue: this.formControl.value,
        isActive: this.formControl.value === '' ? false : true,
        isInvalid: false,
      };
    },
    props: ['formControl'],
    template: `
      <div class="b-float-label" :class="{invalid: isInvalid}">
        <input :id="'PROPERTY_'+formControl.name" type="text" :name="'PROPERTY['+formControl.name+']'" autocomplete="off" required="required" @blur="blurControl()" @input="inputControl()" v-model="controlValue">
        <label :for="'PROPERTY_'+formControl.name" :class="{active: isActive}">{{formControl.label}} *</label>
      </div>
    `,
    methods: {
      inputControl() {
        //validate
        if (!!this.controlValue) {
          this.isInvalid = false;
        }
        //set value
        store.commit('changeTextControl', {
          name: this.formControl.name,
          value: this.controlValue,
        });
      },
      blurControl() {
        if (this.controlValue !== '') {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
        //validate
        if (this.required && !this.controlValue) {
          this.isInvalid = true;
        } else {
          this.isInvalid = false;
        }
      },
    },
  });

  //form control textarea
  Vue.component('formControlTextarea', {
    data() {
      return {
        controlValue: this.formControl.value,
        isActive: this.formControl.value === '' ? false : true,
        isInvalid: false,
      };
    },
    props: ['formControl'],
    template: `
      <div class="b-float-label" :class="{invalid: isInvalid}">
        <textarea :id="'PROPERTY_'+formControl.name" :name="'PROPERTY['+formControl.name+']'" autocomplete="off" required="required" @blur="blurControl()" @input="inputControl()" v-model="controlValue"></textarea>
        <label :for="'PROPERTY_'+formControl.name" :class="{active: isActive}">{{formControl.label}}</label>
      </div>
    `,
    methods: {
      inputControl() {
        //validate
        if (!!this.controlValue) {
          this.isInvalid = false;
        }
        //set value
        store.commit('changeTextControl', {
          name: this.formControl.name,
          value: this.controlValue,
        });
      },
      blurControl() {
        if (this.controlValue !== '') {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
        //validate
        if (this.required && !this.controlValue) {
          this.isInvalid = true;
        } else {
          this.isInvalid = false;
        }
      },
    },
  });

  //form control select
  Vue.component('form-control-select', {
    data() {
      return {
        options: this.formControl.value || [
          {
            label: '',
            code: '',
          },
        ],
        selectedOption: this.formControl.selected || {
          label: '',
          code: '',
        },
      };
    },
    template: `<div class="b-float-label-select-vc" ref="selectTemplate">
      <label class="active">{{formControl.label}} *</label>
      <v-select :options="options" :value="options[0]" class="form-control-select" @input="onSelect()" v-model="selectedOption"></v-select>
      <input type="hidden" :name="'PROPERTY['+formControl.name+']'" :value="selectedOption.code" ref="hiddenInput">
    </div>`,
    props: ['formControl'],
    methods: {
      onSelect() {
        //set select
        store.commit('changeSelect', {
          name: this.formControl.name,
          selected: this.selectedOption,
        });
        this.$refs.hiddenInput.value = this.selectedOption.code;
      },
    },
  });

  //form control date
  Vue.component('form-control-date', {
    template: `<div class="b-float-label" data-src="${window.moderationSrcPath}calendar.svg" :class="{invalid: isInvalid}">
      <date-picker :lang="lang" :input-attr="inputAttr" valueType="format" v-model="date" value-type="X" format="DD.MM.YYYY" @open="openInput" @close="closeInput" @clear="closeInput" @input="inputDate" @blur="blurInput"></date-picker>
      <label :for="'PROPERTY_'+formControl.name" :class="{ active: isActive }">{{formControl.label}}</label>
    </div>`,
    data() {
      return {
        inputAttr: {
          id: `PROPERTY_${this.formControl.name}`,
          name: `PROPERTY[${this.formControl.name}]`,
        },
        isActive: !!this.formControl.value,
        isInvalid: false,
        date: this.formControl.value,
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
    props: ['formControl'],
    methods: {
      openInput() {
        this.isActive = true;
      },
      closeInput() {
        if (!this.date) {
          this.isActive = false;
          this.isInvalid = true;
        }
      },
      blurInput() {
        //validate
        if (!this.date) {
          this.isInvalid = true;
        } else {
          this.isInvalid = false;
        }
      },
      inputDate() {
        if (this.date) {
          this.isInvalid = false;
        }
        store.commit('changeDate', {
          name: this.formControl.name,
          value: this.date,
        });
      },
    },
  });

  //submit button
  Vue.component('submitButton', {
    data() {
      return {
        checked: store.state.agreement.checked,
      };
    },
    template: `
      <div class="b-report-form-ozo__submit">
        <input type="submit" name="iblock_submit" class="btn btn-secondary btn-lg" value="Сдать отчет" :disabled="isDisabled">
      </div>
    `,
    computed: {
      isDisabled() {
        return false;
        let requireds = true;
        if (store.state.formBlocks[1].controls[0].checked === true) {
          requireds = store.state.audiOZOList.companies.every((company) => {
            return company.controls.every((control) => !!control.value);
          });
        }

        return !(
          store.state.formBlocks[0].controls.some(
            (control) => control.checked === true
          ) &&
          store.state.formBlocks[1].controls.some(
            (control) => control.checked === true
          ) &&
          requireds &&
          this.checked
        );
      },
    },
    methods: {
      clickContinue() {
        let elem;
        if (
          !store.state.formBlocks[0].controls.some(
            (control) => control.checked === true
          )
        ) {
          elem = '#collapse1';
        } else if (
          !store.state.formBlocks[1].controls.some(
            (control) => control.checked === true
          )
        ) {
          elem = '#collapse2';
        } else {
          store.state.audiOZOList.companies.forEach((company, index) => {
            company.controls.forEach((control) => {
              if (!control.value && !elem) {
                elem = `#company${index}`;
              }
            });
          });
        }

        if (!elem && !store.state.agreement.checked) {
          elem = '#agreement';
        }

        //scroll to
        if (elem && document.querySelector(elem)) {
          this.$scrollTo(elem, 500, {
            offset: -180,
          });

          //highlight invalid
          store.commit('setInvalid', elem);
        }
      },
    },
  });

  const App = {
    el: '#editStudyCourseForm',
    store,
    template: `
      <div>
        <hidden-fields></hidden-fields>

        <div v-for="formControl in $store.state.controls">
          <form-control-textarea v-if="formControl.type==='textarea'" :formControl="formControl"></form-control-textarea>
          <form-control-date v-if="formControl.type==='date'" :formControl="formControl"></form-control-date>
          <form-control-select v-else-if="formControl.type==='select'" :formControl="formControl"></form-control-select>
          <form-control v-else :formControl="formControl"></form-control>
        </div>

        <!--<collapse-block-2></collapse-block-2>-->

        <hr class="hr--lg">

        <submit-button></submit-button>

      </div>
    `,
    methods: {},
    mounted() {},
  };

  const app = new Vue(App);
};
