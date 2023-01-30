window.onload = function () {
  if (!window.Vue && !window.Vuex) return;

  window.moderationSrcPath = '/template/images/';

  Vue.use(Vuex);
  Vue.use(VueScrollTo);

  const store = new Vuex.Store({
    state: {
      ...window.studyCourseCreateStore,
      loading: false,
      error: '',
    },
    mutations: {
      changeProp(state, payload) {
        state[payload.prop] = payload.value;
      },
      setStepActive(state, payload) {
        state.steps.forEach((step, i) => {
          Vue.set(step, 'active', i === payload);
        });
      },
      setStepVisited(state, payload) {
        Vue.set(state.steps[payload], 'visited', true);
      },
      changeTextControl(state, payload) {
        const control =
          state.steps[payload.stepIndex].controls[payload.controlIndex];
        if (control.type === 'time' && payload.time) {
          switch (payload.time) {
            case 'start':
              control.controls[0].value = payload.value;
              break;
            case 'end':
              control.controls[1].value = payload.value;
              break;
          }
        } else {
          control.value = payload.value;
        }
      },
    },
    getters: {
      activeStepIndex(state) {
        return state.steps.findIndex((step) => step.active);
      },
    },
  });

  Vue.component('v-select', VueSelect.VueSelect);
  Vue.component('date-picker', DatePicker);

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
        <input :id="'PROPERTY_'+formControl.name" type="text" :name="'PROPERTY['+formControl.name+']'" autocomplete="off" required="required" @blur="blurControl()" @input="inputControl()" v-model="controlValue" ref="input">
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
          stepIndex: this.$store.getters.activeStepIndex,
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
    mounted() {
      if (this.time) {
        IMask(this.$refs.input, {
          mask: '00:00',
        });
      }
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
          stepIndex: this.$store.getters.activeStepIndex,
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
      <v-select :searchable="false" :options="options" :value="options[0]" class="form-control-select" @input="onSelect()" v-model="selectedOption"></v-select>
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

  //navigation
  Vue.component('wizardNavigation', {
    data() {
      return {};
    },
    template: `
      <div class="b-scc-nav">
        <div class="b-scc-nav__item" v-for="(step, stepIndex) in $store.state.steps" :class="{'b-scc-nav__item--active': step.active, 'b-scc-nav__item--visited': step.visited}">
          <a href="" @click.prevent="changeStep(stepIndex)">{{ step.title }}</a>
        </div>
      </div>
    `,
    methods: {
      changeStep(stepIndex) {
        this.$store.commit('setStepActive', stepIndex);
        this.$store.commit('setStepVisited', stepIndex);
      },
    },
  });

  //step
  Vue.component('wizardStep', {
    data() {
      return {};
    },
    props: ['step'],
    template: `
      <div class="b-scc-step">
        <h3>{{ step.title }}</h3>
        <div class="b-scc-step__error" v-if="$store.state.error">{{ $store.state.error }}</div>
        <p v-html="step.description"></p>
        <div class="b-scc-step__controls">
          <div v-for="(formControl, formControlIndex) in step.controls">
            <form-control-textarea v-if="formControl.type==='textarea'" :formControl="formControl" :formControlIndex="formControlIndex"></form-control-textarea>
            <form-control v-else :formControl="formControl" :formControlIndex="formControlIndex"></form-control>
          </div>
        </div>
        <wizard-step-button :step="step"></wizard-step-button>
      </div>
    `,
  });

  //button
  Vue.component('wizardStepButton', {
    data() {
      return {};
    },
    props: ['step'],
    template: `
      <div class="b-scc-step__button" v-if="step.button">
        <div class="btn btn-primary btn-lg" :class="{'btn--load-circle': $store.state.loading}" @click.prevent="submitStep">{{ step.button.text }}</div>
      </div>
    `,
    methods: {
      async submitStep() {
        store.commit('changeProp', { prop: 'loading', value: true });

        let formData = new FormData(),
          controller = new AbortController(),
          response,
          result;

        formData.set('stepId', this.step.id);
        formData.set('fields', 'fields');

        setTimeout(() => {
          if (!response) {
            controller.abort();
          }
        }, 20000);

        try {
          response = await fetch(
            this.$store.state.submitStepURL /*, {
              method: 'POST',
              body: formData,
              signal: controller.signal,
            }*/
          );

          result = await response.json();

          if (result && typeof result === 'object') {
            store.commit('changeProp', { prop: 'loading', value: false });
            if (
              result.status === 'success' &&
              this.step.button.type === 'continue'
            ) {
              this.$store.commit(
                'setStepActive',
                this.$store.getters.activeStepIndex + 1
              );
              this.$store.commit(
                'setStepVisited',
                this.$store.getters.activeStepIndex + 1
              );
            } else {
              if (
                typeof result.data === 'object' &&
                result.data.errors &&
                result.data.errors[0]
              ) {
                store.commit('changeProp', {
                  prop: 'error',
                  value: result.data.errors[0],
                });
              }
            }
          }
        } catch (err) {
          store.commit('changeProp', { prop: 'loading', value: false });
          store.commit('changeProp', {
            prop: 'error',
            value: err,
          });
          throw err;
        }
        //submit data
        //if success - set next step as active and visited
        //ese - show error
      },
    },
  });

  const App = {
    el: '#studyCoursesCreateWizard',
    store,
    template: `
      <div>
        <wizard-navigation></wizard-navigation>
        <wizard-step :step="$store.state.steps[ $store.getters.activeStepIndex ]"></wizard-step>
      </div>
    `,
    methods: {},
    mounted() {},
  };

  const app = new Vue(App);
};
