<template>
<el-alert v-if="isError" :title="apiErrorMsg" type="error" show-icon />
<el-form v-else label-position="right" ref="presentationForm" label-width="120px" :rules="rules" :model="presentationForm" v-loading="isLoading">
  <el-form-item label="Name" :prop=" isInEditMode ? 'name' : ''">
    <div v-if="!isInEditMode">{{ presentationForm.name }}</div>
    <el-input v-model="presentationFormName" v-if="isInEditMode"/>
  </el-form-item>
  <el-form-item label="Access Control" v-if="!isNewPresentation" >
    <el-tag>Created by {{ presentationForm.creatorIdentifier }}</el-tag>
    <el-button type="success" size="small" class="share_button_left_margin" icon="el-icon-view">SHARE</el-button>
  </el-form-item>
  <el-form-item label="Description">
    <div v-if="!isInEditMode">{{ presentationForm.description }}</div>
    <el-input v-model="presentationFormDescription" v-if="isInEditMode"/>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="changeEditMode(true)" v-if="!isInEditMode">Edit</el-button>
    <el-button type="primary" @click="submitForm()" v-if="isInEditMode">Save</el-button>
    <el-button type="info" @click="cancelEditMode()" v-if="isInEditMode && !isNewPresentation">Cancel</el-button>
  </el-form-item>
  <el-form-item v-if="!isNewPresentation">
    <el-button type="danger" @click="deleteForm()">Delete</el-button>
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
    isNewPresentation() {
      return this.id === ID_NEW_PRESENTATION
    },
    isInEditMode() {
      return this.isEditing || this.isNewPresentation
    },
    isLoading() {
      return this.$store.state.presentation.presentationFormStatus.isLoading
    },
    isError() {
      return this.$store.state.presentation.presentationListStatus.isApiError
    },
    apiErrorMsg() {
      return this.$store.state.presentation.presentationListStatus.apiErrorMsg
    }
  },
  data() {
    return {
      isEditing: false,
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
    cancelEditMode() {
      this.$store.dispatch('getPresentation', this.id);
      this.isEditing = false;
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
    deleteForm() {
      this.$store.dispatch('deletePresentation', this.id)
        .then(() => {
          this.$router.replace({
              name: 'analyze',
              params: {
                  id: "__NEW__"
              }
          });
          this.isEditing = false;
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
