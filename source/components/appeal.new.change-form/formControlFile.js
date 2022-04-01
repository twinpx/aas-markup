Vue.component('formControlFile', {
  data() {
    return {
      loading: false,
      fileLoaded: 0, //%
      isFileLoaded: false,
      xhrStatus: '', //'Y', 'E'
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
        <div class="b-float-label--file" :class="{'filled': isFilled, 'progressing': isLoading, 'invalid': !!invalid }" ref="controlFile" >
          <span class="b-float-label-file__label">{{ formControl.label }}</span>

          <svg xmlns="http://www.w3.org/2000/svg" width="17.383" height="24" viewBox="0 0 17.383 24" v-html="icon"></svg>

          <input type="file" :data-value="fileid" :data-required="required" :name="name" :id="id" @change="uploadFile($refs.inputFile.files)" ref="inputFile" />
          <div class="b-float-label__progressbar" v-show="isLoading && !invalid" ref="progressbar">
            <span v-html="label" v-show="isFileLoaded"></span>
            <span v-show="!isFileLoaded">{{fileLoaded}}%</span>
          </div>
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
  watch: {
    fileLoaded(val) {
      if (val === 100) {
        setTimeout(() => {
          this.isFileLoaded = true;
        }, 600);
      }
    },
  },
  computed: {
    isLoading() {
      if (this.formControl.multy) {
        return (
          this.loading || this.formControl.value[this.controlIndex].loading
        );
      }
      return this.loading;
    },
    isClearable() {
      return !!this.filenameLocal && !this.isLoading;
    },
    isFilled() {
      return !!this.filenameLocal;
    },
    fileid() {
      return typeof this.formControl.value === 'object'
        ? this.formControl.value[this.controlIndex].val
        : this.formControl.value;
    },
    invalid() {
      if (this.xhrStatus === 'E') {
        return 'Ошибка загрузки';
      } else if (this.files[0] && this.files[0].size && this.files[0].name) {
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
      this.xhrStatus = '';
      this.fileLoaded = 0;
      //invalid and label change
      setTimeout(() => {
        if (this.invalid) {
          this.$refs.inputFile.value = '';
          //this.files = [];

          //set value
          /*store.commit('setFile', {
            id: this.controlId,
            property: this.formControl.property,
            filename: '',
            controlIndex: this.controlIndex,
            value: '',
          });*/

          this.filenameLocal = this.formControl.multy
            ? this.formControl.filename[this.controlIndex]
            : this.formControl.filename;
        } else {
          let data = {};
          data[this.name] = this.files[0];
          data.FILEID =
            typeof this.formControl.value === 'object'
              ? this.formControl.value[this.controlIndex].val
              : this.formControl.value;

          this.sendData(data);
        }
      }, 0);

      bitrixLogs(11, `${this.formControl.label}: ${this.label}`);
    },
    clearInputFile() {
      this.fileLoaded = 0;
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
        this.loading = true;
        const url = this.$store.state.url.fileUpload;
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });

        //we have to change fetch to xhr, because the progress bar is needed and is possible only for xhr for now
        /*const response = await fetch(url, {
          method: 'POST',
          body: formData,
          headers: {
            Authentication: 'secret',
          },
        });*/

        let xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        //xhr.setRequestHeader('Content-Type', 'multipart/form-data');
        xhr.setRequestHeader('Authentication', 'secret');
        xhr.upload.addEventListener('progress', ({ loaded, total }) => {
          console.log(loaded, total);
          this.fileLoaded = Math.floor((loaded / total) * 100);
          this.$refs.progressbar.style.width = `calc(20px + (100% - 20px ) * ${this.fileLoaded} / 100)`;
        });
        xhr.send(formData);

        let componentThis = this;

        xhr.onreadystatechange = function () {
          if (this.readyState != 4) return;

          console.log(this.response);
          const fileObject = JSON.parse(this.response);

          if (fileObject) {
            componentThis.xhrStatus = fileObject.STATUS;

            switch (fileObject.STATUS) {
              case 'Y':
                //set value
                store.commit('setFile', {
                  id: componentThis.controlId,
                  property: componentThis.formControl.property,
                  filename: componentThis.files[0]
                    ? componentThis.files[0].name
                    : '',
                  controlIndex: componentThis.controlIndex,
                  value: componentThis.files[0] ? fileObject.ID : '',
                });

                componentThis.filenameLocal = componentThis.formControl.multy
                  ? componentThis.formControl.filename[
                      componentThis.controlIndex
                    ]
                  : componentThis.formControl.filename;

                setTimeout(() => {
                  componentThis.$refs.inputFile.value = '';
                }, 100);

                componentThis.loading = false;
                break;

              case 'E':
                break;
            }
            componentThis.fileLoaded = 0;
          }
          componentThis.$emit('timeoutAutosave');
        };
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
