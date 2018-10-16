<template>
<el-alert v-if="isErrorList" v-on="isError" :title="apiErrorMsgList" type="error" show-icon />
  <el-form v-else label-position="right" ref="presentationForm" label-width="120px" :rules="rules" :model="presentationForm" v-loading="isLoading">
    <el-alert v-if="isErrorForm" :title="apiErrorMsgForm" type="error" show-icon />
    <el-form-item label="Name" :prop=" isInEditMode ? 'name' : ''">
    <div v-if="!isInEditMode">{{ presentationForm.name }}</div>
    <el-input v-model="presentationFormName" v-if="isInEditMode"/>
  </el-form-item>
  <el-form-item label="Access Control" v-if="!isNewPresentation" >
    <el-tag>Created by {{ presentationForm.creatorIdentifier }}</el-tag>
    <el-button type="success" size="small" class="share_button_left_margin" icon="el-icon-view" @click="dialogFormVisible = true">SHARE</el-button>
  </el-form-item>
  <el-dialog title="Share with other users:" :visible.sync="dialogFormVisible">
    <el-form>
      <el-form-item label="Email address:" :label-width="shareFormLabelWidth">
        <el-input v-model="shareFormEmail" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Permissions:" :label-width="shareFormLabelWidth">
        <el-select v-model="shareFormAccessLevel" placeholder="Select the permission">
          <el-option label="View" value=AccessLevel.CAN_READ></el-option>
          <el-option label="Edit" value=AccessLevel.CAN_WRITE></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">Cancel</el-button>
      <el-button type="primary" @click="dialogFormVisible = false, submitShareForm()">Confirm</el-button>
    </span>
  </el-dialog>
  <el-form-item label="Description">
    <div v-if="!isInEditMode">{{ presentationForm.description }}</div>
    <el-input v-model="presentationFormDescription" v-if="isInEditMode"/>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="changeEditMode(true)" v-if="!isInEditMode">Edit</el-button>
    <el-button type="primary" @click="submitForm()" v-if="isInEditMode">Save</el-button>
    <el-button type="info" @click="changeEditMode(false)" v-if="isInEditMode && !isNewPresentation">Cancel</el-button>
  </el-form-item>
</el-form>
</template>

<script>
import {ID_NEW_PRESENTATION} from "@/common/const";

export default {
  name: 'PresentationBrief',
  props: {
    id: String
  },
  mounted() {
    this.updatePresentationForm()
  },
  watch: {
    'id'() {
      this.updatePresentationForm()
    },
  },
  computed: {
    presentationForm() {
      return {
        name: this.presentationFormName,
        creatorIdentifier: this.presentationFormCreatorIdentifier,
        description: this.presentationFormDescription,
        mappingList: this.presentationFormMappingList,
      }
    },
    presentationFormName: {
      get() {
        return this.$store.state.presentation.presentationForm.name
      },
      set(value) {
        this.$store.commit('setPresentationFormField', {
          field: 'name',
          value
        })
      },
    },
    presentationFormCreatorIdentifier() {
      return this.$store.state.presentation.presentationForm.creatorIdentifier
    },
    presentationFormMappingList() {
      return this.$store.state.presentation.presentationForm.mappingList
    },
    presentationFormDescription: {
      get() {
        return this.$store.state.presentation.presentationForm.description
      },
      set(value) {
        this.$store.commit('setPresentationFormField', {
          field: 'description',
          value
        })
      },
    },
    shareFormEmail: {
        get() {
            return this.$store.state.presentation.shareForm.email
        },
        set(value) {
            this.$store.commit('setShareFormField', {
                field: 'email',
                value
            })
        },
    },
    shareFormAccessLevel: {
      get() {
        return this.$store.state.presentation.shareForm.accessLevel
      },
      set(value) {
        this.$store.commit('setShareFormField', {
          field: 'accessLevel',
          value
        })
      },
    },
    isNewPresentation() {
      return this.id === ID_NEW_PRESENTATION
    },
    isInEditMode() {
      return this.isEditing || this.isNewPresentation
    },
    isLoading() {
      return this.$store.state.presentation.presentationFormStatus.isLoading
    },
    isErrorList() {
      return this.$store.state.presentation.presentationListStatus.isApiError
    },
    apiErrorMsgList() {
      return this.$store.state.presentation.presentationListStatus.apiErrorMsg
    },
    isErrorForm() {
        return this.$store.state.presentation.presentationFormStatus.isApiError
    },
    apiErrorMsgForm() {
        return this.$store.state.presentation.presentationFormStatus.apiErrorMsg
    },
  },
  data() {
    return {
      isEditing: false,
      dialogFormVisible: false,
      shareFormLabelWidth: '120px',
      rules: {
        name: [
          { required: true, message: 'Please enter presentation name', trigger: 'blur' },
          { min: 3, message: 'The length should be more than 3 character', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    changeEditMode(isEditing) {
      this.isEditing = isEditing
    },
    submitForm() {
      this.$refs['presentationForm'].validate((valid) => {
        if (!valid) {
          return
        }
        this.$refs['presentationForm'].clearValidate();
        if (this.isNewPresentation) {
          // add
          this.$store.dispatch('savePresentation')
              .then(() => {
                // redirect to the newly added presentation
                this.$router.push({
                  name: 'analyze',
                  params: {
                    id: this.$store.state.presentation.presentationForm.id
                  }
                });
              });
        } else {
          // edit
          this.$store.dispatch('updatePresentation')
              .then(() => {
                this.isEditing = false
              })
        }
      });
    },
    submitShareForm() {
      this.$store.commit('setPresentationFormAccessControlList', this.$store.state.presentation.shareForm)
      this.$store.dispatch('sharePresentation')
          .then(() => {
            this.isEditing = false
          })
    },
    updatePresentationForm() {
      this.$refs['presentationForm'].clearValidate();
      if (this.id === ID_NEW_PRESENTATION) {
        this.$store.commit('resetPresentationForm')
      } else {
        this.$store.dispatch('getPresentation', this.id)
      }
    }
  }
}
</script>

<style scoped>
.share_button_left_margin {
  margin-left: 10px;
}
</style>
