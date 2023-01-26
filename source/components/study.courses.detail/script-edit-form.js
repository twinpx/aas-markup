window.onload = function () {
  if (!window.Vue && !window.Vuex) return;

  window.moderationSrcPath = '/template/images/';

  Vue.use(Vuex);
  Vue.use(VueScrollTo);

  const store = new Vuex.Store({
    state: window.editStudyCourseStore,
    mutations: {
      changeSelect(state, payload) {
        state.controls[payload.controlIndex].selected = payload.selected;
      },
      changeDate(state, payload) {
        state.controls[payload.controlIndex].value = payload.value;
      },
      changeTextControl(state, payload) {
        if (
          state.controls[payload.controlIndex].type === 'time' &&
          payload.time
        ) {
          switch (payload.time) {
            case 'start':
              state.controls[payload.controlIndex].controls[0].value =
                payload.value;
              break;
            case 'end':
              state.controls[payload.controlIndex].controls[1].value =
                payload.value;
              break;
          }
        } else {
          state.controls[payload.controlIndex].value = payload.value;
        }
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
    props: ['formControl', 'formControlIndex', 'time'],
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
          controlIndex: this.formControlIndex,
          value: this.controlValue,
          time: this.time,
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
    props: ['formControl', 'formControlIndex'],
    template: `
      <div class="b-float-label" :class="{invalid: isInvalid}">
        <textarea :id="'PROPERTY_'+formControl.name" :name="'PROPERTY['+formControl.name+']'" autocomplete="off" required="required" @blur="blurControl()" @input="inputControl()" v-model="controlValue"></textarea>
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
          controlIndex: this.formControlIndex,
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
    props: ['formControl', 'formControlIndex'],
    methods: {
      onSelect() {
        //set select
        store.commit('changeSelect', {
          controlIndex: this.formControlIndex,
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
    props: ['formControl', 'formControlIndex'],
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
          controlIndex: this.formControlIndex,
          value: this.date,
        });
      },
    },
  });

  //submit button
  Vue.component('submitButton', {
    data() {
      return {};
    },
    template: `
      <div class="b-edit-study-course-modal__submit row">
        <div class="col-sm-6">
          <input type="submit" name="iblock_submit" class="btn btn-secondary btn-lg" value="Сохранить" :disabled="isDisabled">
        </div>
        <div class="col-sm-6">
          <div class="btn btn-lg btn-light" data-dismiss="modal">Отменить</div>
        </div>
      </div>
    `,
    computed: {
      isDisabled() {
        let requireds = true;

        requireds = this.$store.state.controls.every((control) => {
          if (control.type === 'time') {
            return control.controls.every((c) => !!c.value);
          }
          return !!control.value;
        });

        return !requireds;
      },
    },
    methods: {},
  });

  const App = {
    el: '#editStudyCourseForm',
    store,
    template: `
      <div>
        <hidden-fields></hidden-fields>

        <div v-for="(formControl, formControlIndex) in $store.state.controls">
          <form-control-textarea v-if="formControl.type==='textarea'" :formControl="formControl" :formControlIndex="formControlIndex"></form-control-textarea>
          <form-control-date v-else-if="formControl.type==='date'" :formControl="formControl" :formControlIndex="formControlIndex"></form-control-date>
          <form-control-select v-else-if="formControl.type==='select'" :formControl="formControl" :formControlIndex="formControlIndex"></form-control-select>
          <div class="row" v-else-if="formControl.type==='time'">
            <div class="col-sm-4">
              <form-control :formControl="formControl.controls[0]" :formControlIndex="formControlIndex" time="start"></form-control>
            </div>
            <div class="col-sm-4">
              <form-control :formControl="formControl.controls[1]" :formControlIndex="formControlIndex" time="end"></form-control>
            </div>
          </div>
          <form-control v-else :formControl="formControl" :formControlIndex="formControlIndex"></form-control>
        </div>

        <!--<collapse-block-2></collapse-block-2>-->

        <hr>

        <submit-button></submit-button>

      </div>
    `,
    methods: {},
    mounted() {},
  };

  const app = new Vue(App);
};
