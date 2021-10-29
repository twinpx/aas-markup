window.addEventListener('load', () => {
  //Vue app form
  if (!window.Vue) return;

  Vue.component('v-select', VueSelect.VueSelect);

  new Vue({
    el: '#changeStatusForm',
    data() {
      return {
        select: {
          options: [
            {
              label: 'Ожидает проверки',
              code: '',
            },
            {
              label: 'В работе',
              code: 'prop1',
            },
            {
              label: 'Отклонено',
              code: 'prop2',
            },
            {
              label: 'Выполнено',
              code: 'prop3',
            },
          ],
          selectedOption: {
            label: 'Ожидает проверки',
            code: '',
          },
          label: 'Статус обращения',
          codeToShowTextarea: 'prop2',
        },
        textarea: {
          invalid: false,
          name: 'message',
          value: '',
          label: 'Комментарий для сотрудников СРО ААС',
        },
        button: {
          text: 'Сохранить',
          message: 'Для отправки необходимо заполнить все поля.',
        },
      };
    },
    computed: {
      textareaActive() {
        return !!this.textarea.value;
      },
      buttonDisabled() {
        return this.select.selectedOption.code ===
          this.select.codeToShowTextarea
          ? !this.textarea.value
          : false;
      },
    },
    template: `
      <div>
        <div class="form-control-wrapper">
          <v-select :options="select.options" :value="select.options[0]" class="form-control-select" @input="onSelect()" v-model="select.selectedOption"></v-select>
          <label>{{select.label}}</label>
        </div>
        <hr>
        <div v-if="select.selectedOption.code === select.codeToShowTextarea">
          <div class="b-float-label" :class="{invalid: textarea.invalid}">
            <textarea :name="textarea.name" autocomplete="off" required="required" v-model="textarea.value"></textarea>
            <label :class="{active: textareaActive}">{{textarea.label}}</label>
          </div>
          <hr>
        </div>
        <div class="row">
          <div class="col-xl-6">
            <button class="btn btn-secondary btn-lg" type="submit" :disabled="buttonDisabled">{{button.text}}</button>
          </div>
          <hr class="d-block d-xl-none w-100">
          <div class="col-xl-6 muted small d-flex align-items-center">{{button.message}}</div>
        </div>
      </div>`,
    methods: {
      onSelect() {},
    },
  });
});
