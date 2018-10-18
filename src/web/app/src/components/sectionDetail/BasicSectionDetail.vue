<template>
  <el-row v-loading="sectionDetail.status.isLoading">
    <el-form status-icon ref="editForm" label-position="left" :model="editForm" label-width="170px" :rules="editFormRule">
      <div class="title" v-if="!isEditing">
        {{ sectionDetail.title }}
        <el-button type="primary" plain @click="changeEditMode(true)">Edit</el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click="deleteSectionDetail"></el-button>
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
        v-if="this.hasData"
        title="No Data to display"
        type="info"
        class="noDataToDisplay"
      >
      </el-alert>
      <slot v-else></slot>
      <div v-if="!isEditing" class="description">{{ editForm.description }}</div>
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
                      :prop="'filters.' + index" :rules="[editFormFiltersRule]">
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

        <el-form-item label="Description for the section">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4 }"
            placeholder="Please enter description (Leave empty to hide the description part)"
            v-model="editForm.description">
          </el-input>
        </el-form-item>

        <slot name="extraFormItems" :extraData="editForm.extraData"></slot>

        <el-form-item>
          <el-button type="primary" @click="previewAnalysisResult('editForm')" plain>Preview</el-button>
          <el-button type="success" @click="saveSectionDetail('editForm')">Save</el-button>
          <el-button @click="cancelEditing">Cancel</el-button>
          <el-button type="success" plain @click="addFilter">Add filter</el-button>
        </el-form-item>
      </div>
    </el-form>
  </el-row>
</template>

<script>
  export default {
    props: {
      sectionDetail: {
        type: Object,
        required: true
      },
      presentationId: {
        type: String,
        required: true
      },
      hasData: {
        type: Boolean,
        required: true
      },
      extraFormItemsRules: {
        type: Object,
        required: false
      },
      editFormSelectionsRule: {
        type: Object,
        required: false
      },
      editFormInvolvedRecordsRule: {
        type: Object,
        required: false
      },
      editFormFiltersRule: {
        type: Object,
        required: false
      },
      editFormJoinersRule: {
        type: Object,
        required: false
      },

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
          description: '',
          dataSet: '',
          selections: [],
          involvedRecords: [],
          filters: [],
          joiners: [],
          extraData: {}
        },

        editFormRule: {
          selections: [
            this.editFormSelectionsRule
          ],
          involvedRecords: [
            this.editFormInvolvedRecordsRule
          ],
          extraData: this.extraFormItemsRules
        },

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
      },
      joinersFieldOptions() {
        return this.selectionsOptions;
      }
    },

    methods: {
      changeEditMode(isEditing) {
        this.isEditing = isEditing;
      },

      cancelEditing() {
        this.isEditing = false;
        this.syncDataWithProps();
      },

      syncDataWithProps() {
        this.editForm.title = this.sectionDetail.title;
        this.editForm.description = this.sectionDetail.description;
        this.editForm.dataSet = this.sectionDetail.dataSet;
        this.editForm.selections = this.sectionDetail.selections.map(s => s.field);
        this.editForm.involvedRecords = this.sectionDetail.involvedRecords.map(r => r.name);
        this.editForm.filters = this.sectionDetail.filters.map(f => Object.assign({}, f));
        this.editForm.joiners = this.sectionDetail.joiners.map(f => Object.assign({}, f));
        this.editForm.extraData = JSON.parse(JSON.stringify(this.sectionDetail.extraData)) // deep copy
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

      saveSectionDetail(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('saveSectionDetail', {
              id: this.sectionDetail.id,
              presentationId: this.presentationId,
              title: this.editForm.title,
              description: this.editForm.description,
              dataSet: this.sectionDetail.dataSet,
              selections: this.editForm.selections.map(s => ({field: s})),
              involvedRecords: this.editForm.involvedRecords.map(s => ({name: s})),
              filters: this.editForm.filters.map(f => Object.assign({}, f)),
              joiners: this.editForm.joiners.map(j => Object.assign({}, j)),
              extraData: this.editForm.extraData
            })
              .then(() => {
                this.isEditing = false;
                this.sendAnalysisRequest();
              });
            return true;
          } else {
            return false;
          }
        });
      },

      deleteSectionDetail() {
        this.$store.dispatch('deleteSectionDetail', {
          presentationId: this.presentationId,
          id: this.sectionDetail.id
        });
      },

      previewAnalysisResult(formName) {
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
              this.$emit('update-visualisation', {
                selections: this.editForm.selections.map(s => ({field: s})),
                involvedRecords: this.editForm.involvedRecords.map(s => ({name: s})),
                filters: this.editForm.filters.map(f => Object.assign({}, f)),
                joiners: this.editForm.joiners.map(j => Object.assign({}, j)),
                result: this.sectionDetail.previewResult,
                extraData: this.editForm.extraData
              });
            })
        });
      },

      sendAnalysisRequest() {
        this.$store.dispatch('sendAnalysisRequest', this.sectionDetail.id)
          .then(() => {
            this.$emit('update-visualisation', {
              selections: this.sectionDetail.selections,
              involvedRecords: this.sectionDetail.involvedRecords,
              filters: this.sectionDetail.filters,
              joiners: this.sectionDetail.joiners,
              result: this.sectionDetail.result,
              extraData: this.sectionDetail.extraData
            });
          })
      },
    },
  }
</script>

<style scoped>
  .title {
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .description {
    margin-top: 20px;
    padding-left: 50px;
    padding-right: 50px;
  }

  .noDataToDisplay {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .errorMessage {
    margin-top: 10px;
  }
</style>