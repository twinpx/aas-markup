window.addEventListener('load', () => {
  //Vue app form
  if (!window.Vue) return;

  Vue.component('v-select', VueSelect.VueSelect);

  new Vue({
    el: '#changeStatusForm',
    data() {
      return {
        ...window.appealDetailData,
      };
    },
    computed: {
      textareaActive() {
        return !!this.textarea.value;
      },
      buttonDisabled() {
        return this.select.codeToShowTextarea.find(
          (elem) => elem === this.select.selectedOption.code
        )
          ? !this.textarea.value
          : false;
      },
    },
    template: `
      <form :action="this.form.action" :method="this.form.method">
        <div class="form-control-wrapper">
          <v-select :options="select.options" :value="select.options[0]" class="form-control-select" @input="onSelect()" v-model="select.selectedOption"></v-select>
          <label>{{select.label}}</label>
          <input type="hidden" :name="select.name" v-model="select.selectedOption.code">
        </div>
        <hr>
        <div v-if="select.codeToShowTextarea.find((elem) => elem === select.selectedOption.code)">
          <div class="b-float-label" :class="{invalid: textarea.invalid}">
            <textarea :name="textarea.name" autocomplete="off" required="required" v-model="textarea.value"></textarea>
            <label :class="{active: textareaActive}">{{textarea.label}}</label>
          </div>
          <hr>
        </div>
        <div class="row">
          <div class="col-xl-6">
            <a href="" class="btn btn-secondary btn-lg" :disabled="buttonDisabled" data-toggle="modal" data-target="#changeStatusConfirmModal">{{button.text}}</a>
          </div>
          <hr class="d-block d-xl-none w-100">
          <div class="col-xl-6 muted small d-flex align-items-center">{{button.message}}</div>
        </div>
        <div class="modal--text modal fade" id="changeStatusConfirmModal" tabindex="-1" aria-labelledby="changeStatusConfirmModalLabel" aria-hidden="true" style="display: none;">
          <div class="modal-dialog">
            <div class="modal-content">
              <button class="close" type="button" data-dismiss="modal" aria-label="Close" style="background-image: url( '/template/images/cancel.svg' );"></button>
              <div class="modal-body">
                <div v-html="modal.html"></div>
                <div class="text-center modal-buttons">
                  <button :name="button.name" class="btn btn-secondary" type="submit">{{button.confirm}}</button>
                  <button class="btn btn-light" data-dismiss="modal">{{button.dismiss}}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>`,
    methods: {
      onSelect() {},
    },
  });
});
