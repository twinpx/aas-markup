window.onload = function () {
  //enable submit button
  document
    .querySelector('.b-poll .b-checkbox [type="checkbox"]')
    .addEventListener('change', function (e) {
      console.log(e.target.checked);
      if (e.target.checked) {
        document
          .querySelector('.b-poll .btn[type="submit"]')
          .removeAttribute('disabled');
      } else {
        document
          .querySelector('.b-poll .btn[type="submit"]')
          .setAttribute('disabled', true);
      }
    });

  //poll vue application
  if (!window.Vue && !window.Vuex) return;

  const store = new Vuex.Store({
    state: window.pollStore,
    mutations: {
      changeChecked(state, payload) {
        state.questions[payload.questionIndex].answers[
          payload.answerIndex
        ].checked = payload.checked;
      },
      changeCheckedNum(state, payload) {
        state.questions[payload.questionIndex].checkedNum = payload.checkedNum;
      },
    },
  });

  Vue.component('formControlCheckbox', {
    data() {
      return {
        checked: this.data.checked,
      };
    },
    props: ['data', 'questionIndex', 'index'],
    template: `<label class="b-poll__form-control" :class="[{'i-active': checked}, {'i-disabled': getDisabledClass()}]">
      <div class="b-poll__form-control__content">
        <div class="b-poll__form-control__img" :style="getStyle()" v-if="data.img"></div>
        <div class="b-poll__form-control__text"><b>{{data.label}}</b><span>{{data.note}}</span></div>
      </div>
      <div class="b-poll__checkbox"><input type="checkbox" :name="data.name" v-model="checked" :value="data.value" class="filled-in" @change="change()"><span></span></div>
    </label>`,
    methods: {
      change() {
        this.$emit('form-control-change', {
          checked: this.checked,
          answerIndex: this.index,
        });
      },
      getDisabledClass() {
        return (
          this.checked === false &&
          store.state.questions[this.questionIndex].allowed ===
            store.state.questions[this.questionIndex].checkedNum
        );
      },
      getStyle() {
        return "background-image: url('" + this.data.img + "')";
      },
    },
  });

  Vue.component('formControlRadio', {
    data() {
      return {
        checked: this.data.checked,
      };
    },
    props: ['data', 'index'],
    template: `<label class="b-poll__form-control" :class="{'i-active': checked}">
      <div class="b-poll__form-control__content">
        <div class="b-poll__form-control__img" :style="getStyle()" v-if="data.img"></div>
        <div class="b-poll__form-control__text"><b>{{data.label}}</b><span>{{data.note}}</span></div>
      </div>
      <div class="b-poll__radio"><input type="radio" :name="data.name" :checked="checked" :value="data.value" class="with-gap" @change="change"><span></span></div>
    </label>
    `,
    methods: {
      change(e) {
        if (e.target.checked) {
          e.target
            .closest('.b-poll__questions__set')
            .querySelectorAll('label')
            .forEach(function (label) {
              label.classList.remove('i-active');
            });
          e.target.closest('label').classList.add('i-active');
        }
      },
      getStyle() {
        return "background-image: url('" + this.data.img + "')";
      },
    },
  });

  Vue.component('question', {
    data() {
      return {};
    },
    props: ['index', 'question'],
    template: `
    <div class="b-poll__questions__item">

      <h3>{{question.title}}</h3>
      <p>{{question.description}}</p>
      <div class="b-poll__questions__note" :class="getNoteClass()" v-if="question.type === 'checkbox'"><div>Выбрано {{question.checkedNum}} из допустимых {{question.allowed}}</div></div>

      <div class="b-poll__questions__set">
        <div v-for="(answer, answerIndex) in question.answers">
          <form-control-checkbox v-if="question.type === 'checkbox'" :data="answer" :questionIndex="index" :index="answerIndex" @form-control-change="formControlChange"></form-control-checkbox>
          <form-control-radio v-else :data="answer" :index="answerIndex"></form-control-radio>
        </div>
      </div>
    </div>
    `,
    methods: {
      getNoteClass() {
        return {
          'text-success':
            store.state.questions[this.index].allowed ===
            store.state.questions[this.index].checkedNum,
          'text-danger': store.state.questions[this.index].checkedNum === 0,
        };
      },
      formControlChange(obj) {
        //commit checked
        store.commit('changeChecked', {
          questionIndex: this.index,
          answerIndex: obj.answerIndex,
          checked: obj.checked,
        });

        //change checked num
        this.changeCheckedNum();
      },
      changeCheckedNum() {
        let num = 0;
        store.state.questions[this.index].answers.forEach(function (answer) {
          if (answer.checked === true) {
            num++;
          }
        });

        store.commit('changeCheckedNum', {
          questionIndex: this.index,
          checkedNum: num,
        });
      },
    },
    mounted() {
      this.changeCheckedNum();
    },
  });

  let pollApp = new Vue({
    el: '#pollQuestions',
    data() {
      return {
        pollData: store.state,
      };
    },
    template: `
      <div class="b-poll__questions">
        <div v-for="(question, index) in pollData.questions">
          <question :index="index" :question="question" ></question>
        </div>
      </div>
    `,
    methods: {},
  });
};
