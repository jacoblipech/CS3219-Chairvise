<template>
  <el-row v-loading="sectionDetail.status.isLoading">
    <el-form status-icon ref="editForm" label-position="left" :model="editForm" label-width="140px" :rules="editFormRule">
      <div class="title" v-if="!isEditing">
        {{ sectionDetail.title }}
        <el-button type="primary" plain @click="changeEditMode(true)">Edit</el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click="deleteSection"></el-button>
      </div>
      <div class="title" v-else>
        <el-input v-model="editForm.title"></el-input>
      </div>
      <el-alert
        v-if="sectionDetail.status.isApiError"
        :title="sectionDetail.status.apiErrorMsg"
        :description="sectionDetail.status.apiErrorMsgDetail"
        show-icon
        type="error"
        class="errorMessage">
      </el-alert>
      <el-alert
        v-if="words.length === 0"
        title="No Data to display"
        type="info"
        class="noDataToDisplay"
      >
      </el-alert>
      <vue-word-cloud v-else :words="words"
                      :animationDuration="animationDuration"
                      :color="colorComputer"
                      :font-family="fontFamily"
                      style="width: 100%;height: 200px"></vue-word-cloud>
      <div v-if="isEditing">
        <el-form-item label="Field to Analysis" prop="selections">
          <el-select v-model="editForm.selections" multiple placeholder="Please select">
            <el-option-group
              v-for="group in selectionsOptions"
              :key="group.label"
              :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>

        <el-form-item label="Record Involved" prop="involvedRecords">
          <el-select v-model="editForm.involvedRecords" multiple placeholder="Please select">
            <el-option
              v-for="option in involvedRecordsOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-for="(filter, index) in editForm.filters" :label="'Filter ' + index"
                      :key="index"
                      :prop="'filters.' + index" :rules="editFormFilterRule">
          <el-select placeholder="Filed" v-model="filter.field">
            <el-option-group
              v-for="group in filtersFieldOptions"
              :key="group.label"
              :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>&nbsp;
          <el-select v-model="filter.comparator" style="width: 80px">
            <el-option label=">" value=">" />
            <el-option label="=" value="=" />
            <el-option label="<" value="<" />
          </el-select>&nbsp;
          <el-input v-model="filter.value" placeholder="Value" style="width: 200px"></el-input>&nbsp;
          <el-button type="danger" icon="el-icon-delete" circle @click="removeFilter(filter)"></el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="previewResult('editForm')" plain>Preview</el-button>
          <el-button type="success" @click="submitForm('editForm')">Save</el-button>
          <el-button @click="cancelEditing">Cancel</el-button>
          <el-button type="success" plain @click="addFilter">Add filter</el-button>
        </el-form-item>
      </div>
    </el-form>
  </el-row>
</template>

<script>
  import VueWordCloud from 'vuewordcloud';

  export default {
    props: {
      sectionDetail: {
        type: Object,
        required: true
      },
      presentationId: {
        type: String,
        required: true
      }
    },

    mounted() {
      this.syncDataWithProps();
      this.sendAnalysisRequest();
    },

    data() {
      return {
        isEditing: false,

        editForm: {
          title: '',
          selections: [],
          involvedRecords: [],
          filters: [],
        },

        editFormRule: {
          selections: [
            {
              validator: (rule, value, callback) => {
                if (value.length >= 2 || value.length < 1) {
                  return callback(new Error('There must be only one field to analysis'))
                }
                return callback();
              },
              trigger: 'blur',
            }
          ],
          involvedRecords: [
            {
              validator: (rule, value, callback) => {
                if (value.length >= 2 || value.length < 1) {
                  return callback(new Error('There must be only one record involved'))
                }
                return callback();
              },
              trigger: 'blur',
            }
          ]
        },
        editFormFilterRule: [
          {
            validator: (rule, value, callback) => {
              if (value.field.length === 0 || value.comparator.length === 0 || value.value.length === 0) {
                return callback(new Error('Please specify all fields'))
              }
              callback();
            },
            trigger: 'blur',
          }
        ],

        // word cloud related field
        animationDuration: 50,
        fontFamily: "Roboto",
        words: []
      }
    },

    computed: {
      selectionsOptions() {
        return this.$store.state.dbMetaData.entities.map(entity => ({
          label: entity.name,
          options: entity.fieldMetaDataList.map(field => ({
            label: field.name,
            value: field.fieldName
          }))
        }))
      },
      involvedRecordsOptions() {
        return this.$store.state.dbMetaData.entities.map(entity => ({
          label: entity.name,
          value: entity.tableName
        }))
      },
      filtersFieldOptions() {
        return this.selectionsOptions;
      }
    },

    methods: {
      changeEditMode(isEditing) {
        this.isEditing = isEditing
      },

      cancelEditing() {
        this.isEditing = false;
        this.syncDataWithProps();
      },

      syncDataWithProps() {
        this.editForm.title = this.sectionDetail.title;
        this.editForm.selections = this.sectionDetail.selections.map(s => s.field);
        this.editForm.involvedRecords = this.sectionDetail.involvedRecords.map(r => r.name);
        this.editForm.filters = this.sectionDetail.filters.map(f => Object.assign({}, f));
      },

      addFilter() {
        this.editForm.filters.push({
          field: '',
          comparator: '=',
          value: '',
        })
      },

      removeFilter(filter) {
        let index = this.editForm.filters.indexOf(filter);
        this.editForm.filters.splice(index, 1)
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('saveSection', {
              id: this.sectionDetail.id,
              presentationId: this.presentationId,
              title: this.editForm.title,
              description: '',
              dataSet: this.sectionDetail.dataSet,
              selections: this.editForm.selections.map(s => ({field: s})),
              involvedRecords: this.editForm.involvedRecords.map(s => ({name: s})),
              filters: this.editForm.filters.map(f => Object.assign({}, f)),
              joiners: [],
            }).then(() => {
              this.isEditing = false;
              this.sendAnalysisRequest();
            })
          } else {
            return false;
          }
        });
      },

      deleteSection() {
        this.$store.dispatch('deleteSection', {
          presentationId: this.presentationId,
          id: this.sectionDetail.id
        });
      },

      previewResult(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return false;
          }

          this.$store.dispatch('sendPreviewAnalysisRequest', {
            id: this.sectionDetail.id,
            dataSet: this.sectionDetail.dataSet,
            selections: [{
              field: this.editForm.selections[0]
            }],
            involvedRecords: [{
              name: this.editForm.involvedRecords[0]
            }],
            filters: this.editForm.filters,
          })
            .then(() => {
              this.updateWords({
                result: this.sectionDetail.previewResult,
                fieldName: this.editForm.selections[0]
              });
            })
        });
      },


      // word cloud related
      colorComputer([, weight]) {
        return weight > 10 ? 'Red' : weight > 5 ? 'Blue' : 'Black'
      },
      sendAnalysisRequest() {
        this.$store.dispatch('sendAnalysisRequest', this.sectionDetail.id)
          .then(() => {
            this.updateWords({
              result: this.sectionDetail.result,
              fieldName: this.sectionDetail.selections[0].field
            });
          })
      },
      updateWords({result, fieldName}) {
        let wordsCount = {};
        // will only require at least one selection
        // count the occurrence of word
        result.forEach(r => {
          r[fieldName].split(/[\r|\n]/).forEach(w => {
            // skip empty string
            if (w.length === 0) {
              return
            }
            // put in the count map
            if (wordsCount.hasOwnProperty(w)) {
              wordsCount[w]++
            } else {
              wordsCount[w] = 0;
            }
          })
        });
        // generate format as VueWordCloud required
        this.words = [];
        for (let word in wordsCount) {
          if (wordsCount.hasOwnProperty(word)) {
            this.words.push([word, wordsCount[wordsCount]])
          }
        }
      }
    },

    components: {
      [VueWordCloud.name]: VueWordCloud
    }
  }
</script>

<style scoped>
  .title {
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .noDataToDisplay {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .errorMessage {
    margin-top: 10px;
  }
</style>