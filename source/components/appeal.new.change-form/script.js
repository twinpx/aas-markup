window.onload = function () {
  if (!window.Vue && !window.Vuex) return;

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
        let control = state.controlsBlock.controls.find(
          (control) => control.property === payload.property
        );
        if (!control) {
          control = state.confirmDocsBlock.items
            .map((item) => {
              return item.controls.find(
                (control) => control.property === payload.property
              );
            })
            .find((elem) => elem);
        }

        //multy
        if (control.multy && payload.index !== undefined) {
          if (!control.value) {
            control.value = [];
          }
          if (!control.value[payload.index]) {
            control.value.push({
              id: parseInt(Math.random() * 100000, 10),
            });
          }
          Vue.set(control.value[payload.index], 'val', payload.value);
        } else {
          Vue.set(control, 'value', payload.value);
        }
      },
      setFile(state, payload) {
        const item = state.confirmDocsBlock.items.find(
          (item) => item.id === payload.id
        );
        const control = item.controls.find(
          (control) => control.property === payload.property
        );
        if (control.multy) {
          Vue.set(control.filename, payload.controlIndex, payload.filename);
          Vue.set(control.value[payload.controlIndex], 'val', payload.value);
        } else {
          Vue.set(control, 'filename', payload.filename);
          Vue.set(control, 'value', payload.value);
        }
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
        <div v-for="(formControl, controlIndex) in control.controls">
          <form-control-multy v-if="formControl.multy" :formControl="formControl" fieldsetBlockIndex="0" :controlIndex="controlIndex" :controlId="control.id" @autosave="autosave"></form-control-multy>
          <form-control-file v-else :formControl="formControl" fieldsetBlockIndex="0" :controlIndex="controlIndex" :controlId="control.id" @autosave="autosave"></form-control-file>
        </div>
        
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
              `${this.$store.state.url.autosave}?name=${this.control.name}&value=${this.control.value}&element_id=${store.state.reportId}`
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
          ? this.formControl.value[this.controlIndex].val
          : this.formControl.value,
        isActive: this.formControl.multy
          ? this.formControl.value[this.controlIndex].val === ''
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
            <input :data-pattern="formControl.pattern" :data-required="formControl.required" ref="input" :id="formControl.word+'_'+formControl.property+'_'+fieldsetBlockIndex" type="text" :name="formControl.word+'['+formControl.property+']['+fieldsetBlockIndex+']'" autocomplete="off" @blur="blurControl()" @input="inputControl()" v-model="controlValue">
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
        if (
          (this.formControl.required && this.controlValue === '') ||
          (this.formControl.pattern &&
            this.controlValue !== '' &&
            !new RegExp(this.formControl.pattern, 'ig').test(this.controlValue))
        ) {
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
        filenameLocal: this.formControl.multy
          ? this.formControl.filename[this.controlIndex]
          : this.formControl.filename,
        required: this.formControl.required,
        name: `${this.formControl.word}[${this.formControl.property}][${this.fieldsetBlockIndex}]`,
        id: `${this.formControl.word}_${this.formControl.property}_${this.fieldsetBlockIndex}`,
        icon: `<g transform="translate(-4.461)">
          <g transform="translate(4.461)">
            <g>
              <path d="M21.844,6.573v15.88A1.547,1.547,0,0,1,20.3,24H6.008a1.546,1.546,0,0,1-1.547-1.547V1.547A1.546,1.546,0,0,1,6.008,0H15.27Z" transform="translate(-4.461)" class="a"/>
            </g>
            <path d="M20.036,8.289l5.677,2.339v-2.2l-3.218-.951Z" transform="translate(-8.33 -1.858)" class="b"/>
            <path d="M25.416,6.573H20.389a1.546,1.546,0,0,1-1.547-1.547V0Z" transform="translate(-8.033)" class="c"/>
          </g>
          <path d="M18.117,19.012l-2.85-2.85a.555.555,0,0,0-.785,0l-2.85,2.85a.555.555,0,0,0,.785.784l1.9-1.9v5.024a.555.555,0,1,0,1.109,0V17.894l1.9,1.9a.555.555,0,0,0,.785-.784Z" transform="translate(-1.741 -3.974)" class="d"/>
        </g>`,
      };
    },
    template: `
    <div>
      <div class="row align-items-center">
        <div class="col-lg-6 col-12">
          <span class="b-float-label-file__clear" @click.prevent="clearInputFile" v-if="isClearable"></span>
          <div class="b-float-label--file" :class="{'filled': isFilled, 'invalid': !!invalid}" ref="controlFile" >
            <span class="b-float-label-file__label">{{ formControl.label }}</span>

            <svg xmlns="http://www.w3.org/2000/svg" width="17.383" height="24" viewBox="0 0 17.383 24" v-html="icon"></svg>

            <input type="file" :data-value="fileid" :data-required="required" :name="name" :id="id" @change="uploadFile($refs.inputFile.files)" ref="inputFile" />
            <label :for="id" class="active" v-html="label" ref="dropzone" ></label>
          </div>
        </div>
        <hr class="hr--xs d-block d-lg-none w-100">
        <div class="col-lg-6 col-12 small" v-if="!formControl.multy || !controlIndex">
          <div v-if="formControl.completeBlock && formControl.completeBlock.comment" class="text-muted b-complete-comment">{{ formControl.completeBlock.comment }}</div>
        </div>
      </div>
      <hr class="hr--sl">
    </div>
    `,
    props: {
      formControl: Object,
      fieldsetBlockIndex: [Number, String],
      controlIndex: {
        type: [Number, String],
        required: true,
        default() {
          return 0;
        },
      },
      controlId: [Number, String],
    },
    emits: ['autosave', 'timeoutAutosave'],
    computed: {
      isClearable() {
        return !!this.filenameLocal;
      },
      isFilled() {
        return !!this.filenameLocal;
      },
      fileid() {
        return typeof this.formControl.value === 'object'
          ? this.formControl.value[this.controlIndex]
          : this.formControl.value;
      },
      invalid() {
        if (this.files[0] && this.files[0].size && this.files[0].name) {
          if (this.files[0].size >= this.formControl.maxSize) {
            this.files = [];
            return `Размер файла превышает ${this.formatSize(
              this.formControl.maxSize
            )}`;
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
        if (
          this.formControl.multy &&
          this.formControl.filename[this.controlIndex]
        ) {
          return this.formControl.filename[this.controlIndex];
        } else if (!this.formControl.multy && this.formControl.filename) {
          return this.formControl.filename;
        }
        return this.formControl.default;
      },
      filename() {
        return this.filenameLocal;
      },
    },
    methods: {
      uploadFile(files) {
        this.files = files;
        //invalid and label change
        setTimeout(() => {
          if (this.invalid) {
            this.$refs.inputFile.value = '';
            //this.files = [];

            //set value
            store.commit('setFile', {
              id: this.controlId,
              property: this.formControl.property,
              filename: '',
              controlIndex: this.controlIndex,
              value: '',
            });

            this.filenameLocal = this.formControl.multy
              ? this.formControl.filename[this.controlIndex]
              : this.formControl.filename;
          } else {
            this.sendData({
              [this.name]: this.files[0],
              FILEID:
                typeof this.formControl.value === 'object'
                  ? this.formControl.value[this.controlIndex].val
                  : this.formControl.value,
            });
          }
        }, 0);
      },
      clearInputFile() {
        this.files = [];
        this.$refs.inputFile.value = '';
        this.sendData({
          [this.name]: 'DELETE',
          FILEID:
            typeof this.formControl.value === 'object'
              ? this.formControl.value[this.controlIndex].val
              : this.formControl.value,
        });
        //set value
        store.commit('setFile', {
          id: this.controlId,
          property: this.formControl.property,
          filename: '',
          controlIndex: this.controlIndex,
          value: '',
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
      formatSize(length) {
        var i = 0,
          type = ['б', 'Кб', 'Мб', 'Гб', 'Тб', 'Пб'];
        while ((length / 1000) | 0 && i < type.length - 1) {
          length /= 1000;
          i++;
        }
        return parseInt(length) + ' ' + type[i];
      },
      async sendData(data) {
        try {
          const url = this.$store.state.url.fileUpload;
          const formData = new FormData();
          Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
          });

          const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
              Authentication: 'secret',
            },
          });
          const fileObject = /*{
            STATUS: 'Y',
            ID: '123',
          };
          //*/ await response.json();
          if (fileObject && fileObject.STATUS === 'Y') {
            //set value
            store.commit('setFile', {
              id: this.controlId,
              property: this.formControl.property,
              filename: this.files[0] ? this.files[0].name : '',
              controlIndex: this.controlIndex,
              value: this.files[0] ? fileObject.ID : '',
            });

            this.filenameLocal = this.formControl.multy
              ? this.formControl.filename[this.controlIndex]
              : this.formControl.filename;

            setTimeout(() => {
              this.$refs.inputFile.value = '';
            }, 100);
          }
          this.$emit('timeoutAutosave');
        } catch (err) {
          throw err;
        }
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
        this.uploadFile(e.dataTransfer.files);
      });
    },
  });

  //form control textarea
  Vue.component('formControlTextarea', {
    data() {
      return {
        controlValue: this.formControl.multy
          ? this.formControl.value[this.controlIndex].val
          : this.formControl.value,
        isActive: this.formControl.multy
          ? this.formControl.value[this.controlIndex].val === ''
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
      return {
        length: this.formControl.value.length,
      };
    },
    props: ['formControl', 'fieldsetBlockIndex', 'controlIndex', 'controlId'],
    emits: ['autosave', 'timeoutAutosave'],
    template: `
      <div>
        <hr class="hr--line hr--xxl" style="margin-top: 0;">
        <div v-if="formControl.type==='file'">
          <transition-group name="list" tag="div" >
            <div v-for="(valueObject, idx) in formControl.value" :key="valueObject.id" class="multy-control-wrapper">
              <form-control-file :formControl="formControl" :fieldsetBlockIndex="idx" :controlIndex="idx" :controlId="controlId" @autosave="autosave"></form-control-file>
              <div v-if="formControl.value.length > 1" @click="remove(idx)" class="multy-control-wrapper__remove btn-delete"></div>
            </div>
          </transition-group>
        </div>
        <div v-else-if="formControl.type==='date'">
          <transition-group name="list" tag="div" >
            <div v-for="(valueObject, idx) in formControl.value" :key="valueObject.id" class="multy-control-wrapper">
              <form-control-date :formControl="formControl" :fieldsetBlockIndex="idx" :controlIndex="idx" @autosave="autosave" @timeoutAutosave="timeoutAutosave"></form-control-date>
              <div v-if="formControl.value.length > 1" @click="remove(idx)" class="multy-control-wrapper__remove btn-delete"></div>
            </div>
          </transition-group>
        </div>
        <div v-else-if="formControl.type==='textarea'">
          <transition-group name="list" tag="div" >
            <div v-for="(valueObject, idx) in formControl.value" :key="valueObject.id" class="multy-control-wrapper">
              <form-control-textarea :formControl="formControl" :fieldsetBlockIndex="idx" :controlIndex="idx" @autosave="autosave" @timeoutAutosave="timeoutAutosave"></form-control-textarea>
              <div v-if="formControl.value.length > 1" @click="remove(idx)" class="multy-control-wrapper__remove btn-delete"></div>
            </div>
          </transition-group>
        </div>
        <div v-else>
          <transition-group name="list" tag="div" >
            <div v-for="(valueObject, idx) in formControl.value" :key="valueObject.id" class="multy-control-wrapper">
              <form-control :formControl="formControl" :fieldsetBlockIndex="idx" :controlIndex="idx" :required="formControl.required" @autosave="autosave" @timeoutAutosave="timeoutAutosave"></form-control>
              <div v-if="formControl.value.length > 1" @click="remove(idx)" class="multy-control-wrapper__remove btn-delete"></div>
            </div>
          </transition-group>
        </div>
        <button class="btn btn-success btn-md" :class="{disabled: isBtnDisabled}" @click.prevent="add">Добавить</button>
        <hr class="hr--line hr--xxl">
      </div>
    `,
    computed: {
      isBtnDisabled() {
        if (typeof this.formControl.multy === 'number') {
          return this.length >= this.formControl.multy;
        } else {
          return false;
        }
      },
    },
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
        this.length = this.formControl.value.length;
        this.autosave();
      },
      remove(idx) {
        if (this.formControl.type === 'file') {
          this.formControl.filename.splice(idx, 1);
        }
        this.formControl.value.splice(idx, 1);
        this.length = this.formControl.value.length;
      },
    },
    beforeMount() {
      const newValue = this.formControl.value.map((val) => {
        return {
          id: parseInt(Math.random() * 100000, 10),
          val,
        };
      });
      this.formControl.value = newValue;
    },
  });

  //form control date
  Vue.component('formControlDate', {
    template: `
    <div>
      <div class="row align-items-center">
        <div class="col-lg-6 col-12">
        <div class="b-float-label" data-src="${store.state.url.img}calendar.svg" :class="{invalid: isInvalid}">
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
        let controlsPatternFlag = true;
        if (
          this.$store.state.controlsBlock &&
          this.$store.state.controlsBlock.controls
        ) {
          //required
          const requiredControls =
            this.$store.state.controlsBlock.controls.filter(
              (control) => control.required
            );
          controlsFlag = requiredControls.every((control) => {
            if (control.multy) {
              return control.value.every((value) => value.val !== '');
            } else {
              return control.value !== '';
            }
          });
          //width pattern
          const patternControls =
            this.$store.state.controlsBlock.controls.filter(
              (control) => control.pattern
            );
          controlsPatternFlag = patternControls.every((control) => {
            if (control.multy) {
              return control.value.every(
                (value) =>
                  value.val === '' ||
                  new RegExp(control.pattern, 'ig').test(value.val)
              );
            } else {
              return (
                control.value === '' ||
                new RegExp(control.pattern, 'ig').test(control.value)
              );
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
            ? requiredConfirm.every((control) =>
                control.value
                  ? control.value.every((value) => value.val !== '')
                  : control.value !== ''
              )
            : false;
        }

        //checkbox
        const checkboxFlag = this.checked;

        return !(
          controlsFlag &&
          controlsPatternFlag &&
          confirmDocsFlag &&
          checkboxFlag
        );
      },
    },
    methods: {
      clickContinue() {
        const control = Array.from(
          document.querySelector('.b-appeal-new-change-form form').elements
        ).find((elem) => {
          let isRequired = elem.classList.contains('mx-input')
            ? elem.closest('.mx-datepicker').getAttribute('data-required')
            : elem.getAttribute('data-required');

          if (
            elem.getAttribute('type') === 'file' &&
            !elem
              .closest('.b-form-control-vc')
              .querySelector('input[type=radio]').checked
          ) {
            isRequired = false;
          }

          const value =
            elem.getAttribute('type') === 'file'
              ? elem.getAttribute('data-value')
              : elem.value;

          const pattern = elem.getAttribute('data-pattern');

          if (pattern && value !== '') {
            return !new RegExp(pattern, 'ig').test(value);
          } else {
            return (
              isRequired &&
              elem.tagName.toLowerCase() !== 'button' &&
              elem.getAttribute('type') !== 'hidden' &&
              value === ''
            );
          }
        });

        if (!control) return;

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
        //autosave whole form
        clearTimeout(store.state.autosaveTimeoutId);
        store.commit(
          'changeAutosaveTimeoutId',
          setTimeout(() => {
            this.autosave();
          }, this.$store.state.autosave)
        );
      },
      autosave(form, cnt) {
        form = form || document.querySelector('.b-appeal-new-change-form form');
        let counter = cnt || 0;

        //send request
        (async () => {
          try {
            const formData = new FormData(form);
            if (this.$store.state.confirmDocsBlock) {
              let files = [];
              this.$store.state.confirmDocsBlock.items.forEach((item) => {
                item.controls.forEach((control) => {
                  if (typeof control.value === 'object') {
                    files = files.concat(
                      control.value.filter((el) => !!el.val).map((el) => el.val)
                    );
                  } else if (control.value) {
                    files = files.concat([control.value]);
                  }
                });
              });
              formData.append('FILES', files);
            }

            let response = await fetch(`${this.$store.state.url.autosave}`, {
              method: 'POST',
              body: formData,
            });
            let result = await response.json();
            if (result.STATUS !== 'Y' && counter < 3) {
              this.autosave(form, ++counter);
            } else if (
              result.CONTROLS &&
              result.CONTROLS.length &&
              this.$store.state.confirmDocsBlock
            ) {
              let cont;
              result.CONTROLS.forEach((control) => {
                this.$store.state.confirmDocsBlock.items.forEach((item) => {
                  cont =
                    item.controls.find(
                      (contr) => contr.property === control.property
                    ) || cont;
                });
                if (cont) {
                  cont.value = control.value;
                }
              });
            }
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
