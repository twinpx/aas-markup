window.onload = function () {
  if (!window.Vue && !window.Vuex) return;

  window.moderationSrcPath = '/template/images/';

  Vue.use(Vuex);
  Vue.use(VueScrollTo);

  const store = new Vuex.Store({
    state: window.appealNewChangeFormStore,
    mutations: {
      changeChecked(state, payload) {
        state.formBlocks[0].controls[payload.index].checked = payload.checked;
      },
      changeRadio(state, payload) {
        state.confirmDocsBlock.items.forEach((item) => {
          item.checked = false;
        });
        state.confirmDocsBlock.items[payload.index].checked = true;
      },
      changeControl(state, payload) {
        const control = state.controlsBlock.controls.find(
          (control) => control.property === payload.property
        );
        //multy
        if (control.multy && payload.index !== undefined) {
          if (!control.value) {
            control.value = [];
          }
          const value = control.value.map((el) => el);
          value[payload.index] = payload.value;
          control.value = value;
        } else {
          control.value = payload.value;
        }
      },
      setFile(state, payload) {
        const item = state.confirmDocsBlock.items.find(
          (item) => item.id === payload.id
        );
        const control = item.controls.find(
          (control) => control.property === payload.property
        );
        control.filename = payload.filename;
      },
      changeAutosaveTimeoutId(state, payload) {
        state.autosaveTimeoutId = payload;
      },
    },
  });

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
      generateKey() {
        return Date.now() * Math.random();
      },
    },
  });

  //radio
  Vue.component('formControlRadioWithControls', {
    data() {
      return {
        checked: this.control.checked,
      };
    },
    props: ['index', 'control', 'blockFlag'],
    template: `<div class="b-form-control-vc" :class="{'i-active': $store.state.confirmDocsBlock.items[index].checked, 'i-block': blockFlag}">
      <label :class="{'i-active': checked}" class="b-form-control-vc__top">
        <div class="b-form-control-vc__content">
          <div class="b-form-control-vc__text"><b v-if="!blockFlag" v-html="control.title"></b><span v-html="control.text"></span></div>
        </div>
        
        <div class="b-radio-vc"><input type="radio" :name="control.name" :checked="checked" :value="control.value" class="with-gap" @change="change"><span></span></div>
      </label>
      <div class="b-form-control-vc__fields" v-show="blockFlag || $store.state.confirmDocsBlock.items[index].checked">
        <hr class="hr--line">
        <form-control-file v-for="(formControl, controlIndex) in control.controls" :formControl="formControl" fieldsetBlockIndex="0" :controlIndex="controlIndex" :controlId="control.id" @autosave="autosave"></form-control-file>
      </div>
    </div>
    `,
    methods: {
      autosave() {},
      change(e) {
        //highlight
        /*if (e.target.checked) {
          e.target
            .closest('.row')
            .querySelectorAll('label')
            .forEach(function (label) {
              //set inactive
              label.classList.remove('i-active');
            });
          e.target.closest('label').classList.add('i-active');
        }*/

        //set checked
        this.checked = true;

        //set question as active
        this.$store.commit('changeRadio', {
          index: this.index,
        });

        //show the form if it is the first radio
        this.$emit('set-form-active', this.index);

        //autosave
        (async () => {
          try {
            let response = await fetch(
              `${window.appealNewChangeFormPaths.autosave}?name=${this.control.name}&value=${this.control.value}&element_id=${store.state.reportId}`
            );
            let result = await response.json();
            if (result.STATUS !== 'Y') {
              throw new Error('Ошибка автосохранения');
            }
          } catch (err) {
            throw err;
          }
        })();
        //autosave whole form
        this.$emit('autosave');
      },
    },
  });

  //data to change
  Vue.component('dataToChange', {
    data() {
      return {};
    },
    template: `
    <div>
      <h2>{{ $store.state.controlsBlock.title }}</h2>
      <p v-html="$store.state.controlsBlock.text"></p>
      <hr class="hr--sl">
      <div v-for="(formControl, controlIndex) in $store.state.controlsBlock.controls" :key="formControl.id">
        <form-control-multy v-if="formControl.multy" :formControl="formControl" :controlIndex="controlIndex" @autosave="autosave" @timeoutAutosave="timeoutAutosave"></form-control-multy>
        <form-control-date v-else-if="formControl.type==='date'" :formControl="formControl" fieldsetBlockIndex="0" :controlIndex="controlIndex"  @autosave="autosave" @timeoutAutosave="timeoutAutosave"></form-control-date>
        <form-control-textarea v-else-if="formControl.type==='textarea'" :formControl="formControl" fieldsetBlockIndex="0" :controlIndex="controlIndex" @autosave="autosave" @timeoutAutosave="timeoutAutosave"></form-control-textarea>
        <form-control v-else :formControl="formControl" fieldsetBlockIndex="0" :controlIndex="controlIndex" @autosave="autosave" @timeoutAutosave="timeoutAutosave"></form-control>
      </div>
    </div>
    `,
    emits: ['autosave', 'timeoutAutosave'],
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
      generateKey(index) {
        return Date.now() * Math.random() + index;
      },
      autosave() {
        this.$emit('autosave');
      },
      timeoutAutosave() {
        this.$emit('timeoutAutosave');
      },
    },
  });

  //form control
  Vue.component('formControl', {
    data() {
      return {
        controlValue: this.formControl.multy
          ? this.formControl.value[this.controlIndex]
          : this.formControl.value,
        isActive: this.formControl.multy
          ? this.formControl.value[this.controlIndex] === ''
            ? false
            : true
          : this.formControl.value === ''
          ? false
          : true,
        isInvalid: false,
      };
    },
    props: ['formControl', 'fieldsetBlockIndex', 'controlIndex'],
    emits: ['autosave', 'timeoutAutosave'],
    template: `
    <div>
      <div class="row align-items-center">
        <div class="col-lg-6 col-12">
          <div class="b-float-label" :class="{invalid: isInvalid}">
            <input :data-required="formControl.required" ref="input" :id="formControl.word+'_'+formControl.property+'_'+fieldsetBlockIndex" type="text" :name="formControl.word+'['+formControl.property+']['+fieldsetBlockIndex+']'" autocomplete="off" @blur="blurControl()" @input="inputControl()" v-model="controlValue">
            <label ref="label" :for="formControl.word+'_'+formControl.property+'_'+fieldsetBlockIndex" :class="{active: isActive}">{{formControl.label}}</label>
          </div>
        </div>
        <hr class="hr--xs d-block d-lg-none w-100" v-if="!formControl.multy || !controlIndex">
        <div class="col-lg-6 col-12 small" v-if="!formControl.multy || !controlIndex">
          <span class="text-muted" v-if="this.formControl.completeBlock && this.formControl.completeBlock.title">{{ this.formControl.completeBlock.title }}</span>
          <span v-if="this.formControl.completeBlock && this.formControl.completeBlock.title">
            <a v-if="this.formControl.completeBlock.value" class="b-complete-link" ref="link" href="" @click.prevent="clickLink">
              {{ this.formControl.completeBlock.value }}
              <span class="icon" style="background-image: url( '/template/images/copy.svg' );"></span>
            </a>
            <span v-else class="text-muted">Пусто.</span>
          </span>
          <div v-if="this.formControl.completeBlock && this.formControl.completeBlock.comment" class="text-muted b-complete-comment">{{ this.formControl.completeBlock.comment }}</div>
        </div>
      </div>
      <hr class="hr--sl">
    </div>
    `,
    methods: {
      clickLink() {
        this.controlValue = this.formControl.completeBlock.value;
        this.isActive = true;
        this.validate();
        //if tel
        //autosave
        this.$emit('autosave');
        //restartFormAutosaveTimeout();
      },
      inputControl() {
        //validate
        if (!!this.controlValue) {
          this.isInvalid = false;
        }
        //set value
        let payload = {
          property: this.formControl.property,
          value: this.controlValue,
        };
        if (this.formControl.multy) {
          payload.index = this.controlIndex;
        }
        store.commit('changeControl', payload);
        //autosave
        this.$emit('timeoutAutosave');
        //restartFormAutosaveTimeout();
      },
      blurControl() {
        if (this.controlValue !== '') {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
        this.validate();
        //autosave
        this.$emit('autosave');
      },
      validate() {
        if (this.formControl.required && !this.controlValue) {
          this.isInvalid = true;
        } else {
          this.isInvalid = false;
        }
      },
    },
  });

  //form control
  Vue.component('formControlFile', {
    data() {
      return {
        isActive: true,
        files: [],
      };
    },
    template: `
    <div>
      <hr class="hr--sl">
      <div class="row align-items-center">
        <div class="col-lg-6 col-12">
          <span class="b-float-label-file__close" @click.prevent="clearInputFile" v-if="formControl.filename"></span>
          <div class="b-float-label--file" :class="{'filled': isFilled, 'invalid': !!invalid}" ref="controlFile" >
            <span class="b-float-label-file__label">{{ formControl.label }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12.297" height="12.43" viewBox="0 0 12.297 12.43" >
              <g transform="translate(0.501 0.5)">
                <path class="a" d="M-22097.062,1042.255v4.312h11.3v-4.312" transform="translate(22097.063 -1035.136)" />
                <path class="a" d="M0,0,3.144,3.163,6.19,0" transform="translate(8.623 3.163) rotate(180)" />
                <path class="b" d="M0,0V8.273" transform="translate(5.565 8.376) rotate(180)" />
              </g>
            </svg>
            <input type="file" :data-required="formControl.required" :name="formControl.word+'['+formControl.property+']['+fieldsetBlockIndex+']'" :id="formControl.word+'_'+formControl.property+'_'+fieldsetBlockIndex" @change="uploadFile()" ref="inputFile" />
            <label :for="formControl.word+'_'+formControl.property+'_'+fieldsetBlockIndex" class="active" v-html="label" ref="dropzone" ></label>
            <input type="hidden" :name="formControl.word+'-FILENAME['+formControl.property+']['+fieldsetBlockIndex+']'" :value="filename" />
          </div>
        </div>
        <hr class="hr--xs d-block d-lg-none w-100">
        <div class="col-lg-6 col-12 small">
          <div v-if="this.formControl.completeBlock && this.formControl.completeBlock.comment" class="text-muted b-complete-comment">{{ this.formControl.completeBlock.comment }}</div>
        </div>
      </div>
    </div>
    `,
    props: ['formControl', 'fieldsetBlockIndex', 'controlIndex', 'controlId'],
    computed: {
      isFilled() {
        return !!this.formControl.filename;
      },
      invalid() {
        if (this.files[0] && this.files[0].size && this.files[0].name) {
          if (this.files[0].size >= 1e7) {
            this.files = [];
            return 'Размер файла превышает 10 Мбайт.';
          }

          const filename = this.files[0].name;
          const lastIndex = filename.lastIndexOf('.');
          const regExp = new RegExp(this.formControl.ext.join('|'));

          if (!regExp.test(filename.substring(lastIndex + 1).toLowerCase())) {
            this.files = [];
            return `Прикладывайте файлы ${this.formControl.ext
              .map((w) => w.toUpperCase())
              .join(', ')}.`;
          }
        }
        return '';
      },
      label() {
        if (this.invalid) {
          return this.invalid;
        }
        if (this.files[0] && this.files[0].name) {
          return this.files[0].name;
        }
        if (this.formControl.filename) {
          return this.formControl.filename;
        }
        return this.formControl.default;
      },
      filename() {
        return this.formControl.filename;
      },
    },
    methods: {
      uploadFile() {
        this.files = this.$refs.inputFile.files;
        //invalid and label change
        setTimeout(() => {
          if (this.invalid) {
            this.$refs.inputFile.value = '';
          }

          //set value
          store.commit('setFile', {
            id: this.controlId,
            property: this.formControl.property,
            filename: this.invalid ? '' : this.files[0].name,
          });
        }, 0);
      },
      clearInputFile() {
        this.files = [];
        store.commit('setFile', {
          id: this.controlId,
          property: this.formControl.property,
          filename: '',
        });
      },
      cancelEvent(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      },
      getCoords(elem) {
        let box = elem.getBoundingClientRect();

        return {
          top: box.top + scrollY,
          left: box.left + scrollX,
        };
      },
    },

    mounted() {
      //drag&drop file
      const dropZone = this.$refs.dropzone;
      const controlFile = this.$refs.controlFile;
      if (!dropZone) {
        return;
      }
      dropZone.addEventListener('drag', this.cancelEvent);
      dropZone.addEventListener('dragstart', this.cancelEvent);
      dropZone.addEventListener('dragend', this.cancelEvent);
      dropZone.addEventListener('dragover', this.cancelEvent);
      dropZone.addEventListener('dragenter', this.cancelEvent);
      dropZone.addEventListener('dragleave', this.cancelEvent);
      dropZone.addEventListener('drop', this.cancelEvent);

      dropZone.addEventListener('dragover', () => {
        controlFile.classList.add('dragover');
      });
      dropZone.addEventListener('dragenter', () => {
        controlFile.classList.add('dragover');
      });
      dropZone.addEventListener('dragleave', (e) => {
        let dx = e.pageX - this.getCoords(dropZone).left;
        let dy = e.pageY - this.getCoords(dropZone).top;
        if (
          dx < 0 ||
          dx > dropZone.clientWidth ||
          dy < 0 ||
          dy > dropZone.clientHeight
        ) {
          controlFile.classList.remove('dragover');
        }
      });

      dropZone.addEventListener('drop', (e) => {
        controlFile.classList.remove('dragover');
        controlFile.classList.add('filled');
        this.files = e.dataTransfer.files;
        dropZone.innerHTML = this.files[0].name;
      });
    },
  });

  //form control textarea
  Vue.component('formControlTextarea', {
    data() {
      return {
        controlValue: this.formControl.multy
          ? this.formControl.value[this.controlIndex]
          : this.formControl.value,
        isActive: this.formControl.multy
          ? this.formControl.value[this.controlIndex] === ''
            ? false
            : true
          : this.formControl.value === ''
          ? false
          : true,
        isInvalid: false,
      };
    },
    props: ['formControl', 'fieldsetBlockIndex', 'controlIndex'],
    emits: ['autosave', 'timeoutAutosave'],
    template: `
    props: ['formControl', 'fieldsetBlockIndex', 'controlIndex'],
    <div>
      <div class="row align-items-center">
        <div class="col-lg-6 col-12">
          <div class="b-float-label" :class="{invalid: isInvalid}">
            <textarea :data-required="formControl.required" ref="input" :id="formControl.word+'_'+formControl.property+'_'+fieldsetBlockIndex" :name="formControl.word+'['+formControl.property+']['+fieldsetBlockIndex+']'" autocomplete="off" @blur="blurControl()" @input="inputControl()" v-model="controlValue"></textarea>
            <label ref="label" :for="formControl.word+'_'+formControl.property+'_'+fieldsetBlockIndex" :class="{active: isActive}">{{formControl.label}}</label>
          </div>
        </div>
        <hr class="hr--xs d-block d-lg-none w-100" v-if="!formControl.multy || !controlIndex">
        <div class="col-lg-6 col-12 small" v-if="!formControl.multy || !controlIndex">
          <span class="text-muted" v-if="formControl.completeBlock && formControl.completeBlock.title">{{ formControl.completeBlock.title }}</span>
          <span v-if="formControl.completeBlock && formControl.completeBlock.title">
            <a v-if="formControl.completeBlock.value" class="b-complete-link" ref="link" href="" @click.prevent="clickLink">
              {{ formControl.completeBlock.value }}
              <span class="icon" style="background-image: url( '/template/images/copy.svg' );"></span>
            </a>
            <span v-else class="text-muted">Пусто.</span>
          </span>
          <div v-if="formControl.completeBlock && formControl.completeBlock.comment" class="text-muted b-complete-comment">{{ formControl.completeBlock.comment }}</div>
        </div>
      </div>
      <hr class="hr--sl">
    </div>
    `,

    methods: {
      clickLink() {
        this.controlValue = this.formControl.completeBlock.value;
        this.isActive = true;
        this.validate();
        //if tel
        //autosave
        this.$emit('autosave');
      },
      inputControl() {
        //validate
        if (!!this.controlValue) {
          this.isInvalid = false;
        }
        //set value
        let payload = {
          property: this.formControl.property,
          value: this.controlValue,
        };
        if (this.formControl.multy) {
          payload.index = this.controlIndex;
        }
        store.commit('changeControl', payload);
        //autosave
        this.$emit('timeoutAutosave');
      },
      blurControl() {
        if (this.controlValue !== '') {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
        this.validate();
        //autosave
        this.$emit('autosave');
      },
      validate() {
        if (this.formControl.required && !this.controlValue) {
          this.isInvalid = true;
        } else {
          this.isInvalid = false;
        }
      },
    },
  });

  //form control multy
  Vue.component('formControlMulty', {
    data() {
      return {};
    },
    props: ['formControl', 'fieldsetBlockIndex', 'controlIndex'],
    emits: ['autosave', 'timeoutAutosave'],
    template: `
      <div>
        <hr class="hr--line hr--xxl" style="margin-top: 0;">
        <div v-if="formControl.type==='date'">
          <div v-for="(control, idx) in formControl.value.length" :key="generateKey(idx)" class="multy-control-wrapper">
            <form-control-date :formControl="formControl" :fieldsetBlockIndex="control-1" :controlIndex="idx" @autosave="autosave" @timeoutAutosave="timeoutAutosave"></form-control-date>
            <div v-if="formControl.value.length > 1" @click="remove(idx)" class="multy-control-wrapper__remove btn-delete"></div>
          </div>
        </div>
        <div v-else-if="formControl.type==='textarea'">
          <div v-for="(control, idx) in formControl.value.length" :key="generateKey(idx)" class="multy-control-wrapper">
            <form-control-textarea :formControl="formControl" :fieldsetBlockIndex="control-1" :controlIndex="idx" @autosave="autosave" @timeoutAutosave="timeoutAutosave"></form-control-textarea>
            <div v-if="formControl.value.length > 1" @click="remove(idx)" class="multy-control-wrapper__remove btn-delete"></div>
          </div>
        </div>
        <div v-else>
          <div v-for="(control, idx) in formControl.value.length" :key="generateKey(idx)" class="multy-control-wrapper">
            <form-control :formControl="formControl" :fieldsetBlockIndex="control-1" :controlIndex="idx" :required="formControl.required" @autosave="autosave" @timeoutAutosave="timeoutAutosave"></form-control>
            <div v-if="formControl.value.length > 1" @click="remove(idx)" class="multy-control-wrapper__remove btn-delete"></div>
          </div>
        </div>
        
        <button class="btn btn-success btn-md" @click.prevent="add">Добавить</button>
        <hr class="hr--line hr--xxl">
      </div>
    `,
    methods: {
      generateKey(controlIndex) {
        return Math.round(new Date().getTime() * Math.random()) + controlIndex;
      },
      autosave() {
        this.$emit('autosave');
      },
      timeoutAutosave() {
        this.$emit('timeoutAutosave');
      },
      validate() {
        if (this.formControl.required && !this.controlValue) {
          this.isInvalid = true;
        } else {
          this.isInvalid = false;
        }
      },
      add() {
        this.$store.commit('changeControl', {
          property: this.formControl.property,
          index: this.formControl.value.length,
          value: '',
        });
        this.autosave();
      },
      remove(idx) {
        this.formControl.value.splice(idx, 1);
      },
    },
  });

  //form control date
  Vue.component('formControlDate', {
    template: `
    <div>
      <div class="row align-items-center">
        <div class="col-lg-6 col-12">
        <div class="b-float-label" data-src="${window.moderationSrcPath}calendar.svg" :class="{invalid: isInvalid}">
          <date-picker :data-required="formControl.required" :lang="lang" :input-attr="inputAttr" valueType="format" v-model="date" value-type="X" format="DD.MM.YYYY" @open="openInput" @close="closeInput" @clear="closeInput" @input="inputDate" @blur="blurInput"></date-picker>
          <label :for="formControl.word+'_'+formControl.property+'_'+fieldsetBlockIndex" :class="{ active: isActive }">{{formControl.label}}</label>
        </div>
        </div>
        <hr class="hr--xs d-block d-lg-none w-100" v-if="!formControl.multy || !controlIndex">
        <div class="col-lg-6 col-12 small" v-if="!formControl.multy || !controlIndex">
          <span class="text-muted" v-if="this.formControl.completeBlock && this.formControl.completeBlock.title">{{ this.formControl.completeBlock.title }}</span>
          <span v-if="this.formControl.completeBlock && this.formControl.completeBlock.title">
            <a v-if="this.formControl.completeBlock.value" class="b-complete-link" ref="link" href="" @click.prevent="clickLink">
              {{ this.formControl.completeBlock.value }}
              <span class="icon" style="background-image: url( '/template/images/copy.svg' );"></span>
            </a>
            <span v-else class="text-muted">Пусто.</span>
          </span>
          <div v-if="this.formControl.completeBlock && this.formControl.completeBlock.comment" class="text-muted b-complete-comment">{{ this.formControl.completeBlock.comment }}</div>
        </div>
      </div>
      <hr class="hr--sl">
    </div>`,
    data() {
      return {
        inputAttr: {
          id: `${this.formControl.word}_${this.formControl.property}_${this.fieldsetBlockIndex}`,
          name: `${this.formControl.word}[${this.formControl.property}][${this.fieldsetBlockIndex}]`,
        },
        isActive: this.formControl.multy
          ? this.formControl.value[this.controlIndex] === ''
            ? false
            : true
          : this.formControl.value === ''
          ? false
          : true,
        isInvalid: false,
        date: this.formControl.multy
          ? this.formControl.value[this.controlIndex]
          : this.formControl.value,
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
    props: ['formControl', 'fieldsetBlockIndex', 'controlIndex'],
    emits: ['autosave'],
    methods: {
      clickLink() {
        this.date = this.formControl.completeBlock.value;
        this.isActive = true;
        //autosave
        this.autosave();
      },
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
        if (this.formControl.required && !this.date) {
          this.isInvalid = true;
        } else {
          this.isInvalid = false;
        }
      },
      inputDate() {
        if (!!this.date) {
          this.isInvalid = false;
        }
        //set value
        let payload = {
          property: this.formControl.property,
          value: this.date,
        };
        if (this.formControl.multy) {
          payload.index = this.controlIndex;
        }
        store.commit('changeControl', payload);
        //autosave
        this.autosave();
      },
      autosave() {
        this.$emit('autosave');
      },
    },
  });

  //submit button
  Vue.component('submitButton', {
    data() {
      return {
        checked: this.$store.state.agreement.checked,
      };
    },
    template: `
      <div>
        <div class="b-checkbox" id="agreement" :class="{invalid: $store.state.agreement.invalid}">
          <label>
            <input class="filled-in" type="checkbox" required="" :name="$store.state.agreement.name" :value="$store.state.agreement.value" :checked="checked" v-model="checked"><span v-html="$store.state.agreement.text"></span>
          </label>
        </div>
        <hr class="hr--lg">
        <div class="b-appeal-new-change-form__submit">
          <a href="#" class="btn btn-secondary btn-lg" data-toggle="modal" data-target="#submitConfirmModal" :disabled="isDisabled">Отправить</a>
          <small class="text-muted">Вы не закончили заполнение обязательных полей. <a href="#" @click.prevent="clickContinue">Продолжить</a></small>
        </div>
      </div>
    `,
    computed: {
      isDisabled() {
        //controls
        let controlsFlag = true;
        if (
          this.$store.state.controlsBlock &&
          this.$store.state.controlsBlock.controls
        ) {
          const requiredControls =
            this.$store.state.controlsBlock.controls.filter(
              (control) => control.required
            );
          controlsFlag = requiredControls.every((control) => {
            if (control.multy) {
              return control.value.every((value) => !!value);
            } else {
              return !!control.value;
            }
          });
        }

        //confirm docs
        let confirmDocsFlag = true;
        if (
          this.$store.state.confirmDocsBlock &&
          this.$store.state.confirmDocsBlock.items
        ) {
          const checked = this.$store.state.confirmDocsBlock.items.find(
            (item) => item.checked === true
          );

          const requiredConfirm = checked
            ? checked.controls.filter((control) => control.required)
            : undefined;

          confirmDocsFlag = requiredConfirm
            ? requiredConfirm.every((control) => !!control.value)
            : false;
        }

        //checkbox
        const checkboxFlag = this.checked;

        return !(controlsFlag && confirmDocsFlag && checkboxFlag);
      },
    },
    methods: {
      clickContinue() {
        const control = Array.from(
          document.querySelector('.b-appeal-new-change-form form').elements
        ).find((elem) => {
          const isRequired = elem.classList.contains('mx-input')
            ? elem.closest('.mx-datepicker').getAttribute('data-required')
            : elem.getAttribute('data-required');

          if (
            elem.getAttribute('type') === 'file' &&
            !elem.parentNode.querySelector('input[type=radio]').checked
          ) {
            isRequired = false;
          }

          const value =
            elem.getAttribute('type') === 'file'
              ? elem.parentNode.querySelector('input[type=hidden]').value
              : elem.value;

          return (
            isRequired &&
            elem.tagName.toLowerCase() !== 'button' &&
            elem.getAttribute('type') !== 'hidden' &&
            value === ''
          );
        });

        window.scrollTo({
          top: control.getBoundingClientRect().top + window.scrollY - 120,
          behavior: 'smooth',
        });

        setTimeout(() => {
          control.focus();
        }, 1000);
      },
    },
  });

  //document block
  Vue.component('docsBlock', {
    template: `
    <div>
      <h2 v-if="$store.state.docsBlock.title">{{$store.state.docsBlock.title}}</h2>
      <p v-if="$store.state.docsBlock.text" v-html="$store.state.docsBlock.text"></p>
      <div class="b-docs-block" v-if="$store.state.docsBlock.items.length">
        <div class="b-docs-block__item" href="/pages/news/" v-for="(item, index) in $store.state.docsBlock.items" :key="item.id">
          <hr v-if="index !== 0">
          <div class="b-docs-block__body">
            <a class="b-docs-block__icon" :href="item.url" :style="'background-image: url( ' + item.icon + ' );'"></a>
            <span class="b-docs-block__text">
              <a :href="item.url">{{item.title}}</a>
              <span class="b-docs-block__data" v-if="item.data.length">
                <span class="text-muted" v-for="data in item.data" :key="data">{{data}}</span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>`,
  });

  //confirm document block
  Vue.component('confirmDocsBlock', {
    template: `
    <div>
      <h2 v-if="$store.state.confirmDocsBlock.title">{{ $store.state.confirmDocsBlock.title }}</h2>
      <p v-if="$store.state.confirmDocsBlock.items.length !== 1 && $store.state.confirmDocsBlock.text" v-html="$store.state.confirmDocsBlock.text"></p>
      <div v-for="(doc, index) in $store.state.confirmDocsBlock.items">
        <form-control-radio-with-controls :index="index" :control="doc" :blockFlag="$store.state.confirmDocsBlock.items.length === 1"></form-control-radio-with-controls>
        <hr>
      </div>
    </div>`,
  });

  const App = {
    el: '#appealNewChangeForm',
    store,
    template: `
      <div>

        <hidden-fields v-if="$store.state.hidden"></hidden-fields>

        <div v-if="$store.state.docsBlock && $store.state.docsBlock.items.length">
          <docs-block @timeoutAutosave="timeoutAutosave" @autosave="autosave"></docs-block>
          <hr class="hr--lg">
        </div>

        <div v-if="$store.state.controlsBlock && $store.state.controlsBlock.controls.length">
          <data-to-change @timeoutAutosave="timeoutAutosave" @autosave="autosave"></data-to-change>
          <hr class="hr--lg">
        </div>

        <div v-if="$store.state.confirmDocsBlock && $store.state.confirmDocsBlock.items.length">
          <confirm-docs-block @timeoutAutosave="timeoutAutosave" @autosave="autosave"></confirm-docs-block>
          <hr class="hr--lg">
        </div>

        <submit-button @timeoutAutosave="timeoutAutosave" @autosave="autosave"></submit-button>

      </div>
    `,
    methods: {
      timeoutAutosave() {
        console.log('timeoutAutosave');
        //autosave whole form
        clearTimeout(store.state.autosaveTimeoutId);
        store.commit(
          'changeAutosaveTimeoutId',
          setTimeout(() => {
            this.autosave();
          }, 5000)
        );
      },
      autosave(form, cnt) {
        form = form || document.querySelector('.b-appeal-new-change-form form');
        let counter = cnt || 0;

        //send request
        (async () => {
          try {
            let response = await fetch(
              `${window.appealNewChangeFormPaths.autosave}`
              //{ method: 'POST', body: new FormData(form) }
            );
            let result = await response.json();
            if (result.STATUS !== 'Y' && counter < 3) {
              this.autosave(form, ++counter);
            }
            console.log('sent', result.STATUS);
          } catch (err) {
            throw err;
          }
        })();
      },
    },
    mounted() {
      this.timeoutAutosave();
    },
  };

  const app = new Vue(App);
};
