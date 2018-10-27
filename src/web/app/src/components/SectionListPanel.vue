<template>
  <el-row class="addRowRightAlign" v-if="isNewPresentation">
    <el-alert
      title="Please create presentation before adding sections"
      type="info">
    </el-alert>
  </el-row>
  <div v-loading="isLoadingDBMetaData || isLoadingSectionList" v-else>
    <el-row class="addRowRightAlign">
      <el-select v-model="selectedNewSection" placeholder="Please select a section">
        <el-option
          v-for="item in predefinedSections"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button class="addButtonLeft" type="success" @click="addNewSection">Add New Section</el-button>
    </el-row>
    <br/>
    <el-alert
      v-if="isSectionListApiError"
      :title="sectionListApiErrorMsg"
      type="error">
    </el-alert>
    <abstract-section-detail ref="presentationSection" :id="'presentation-section-' + idx" v-for="(section, idx) in sectionList" :sectionDetail="section" :key="section.id" :presentationId="presentationId"/>
  </div>
</template>

<script>
import AbstractSectionDetail from "@/components/AbstractSectionDetail.vue"
import {ID_NEW_PRESENTATION} from "@/common/const";
import PredefinedQueries from "@/store/data/predefinedQueries"

export default {
  props: {
    presentationId: String,
  },
  watch: {
    presentationId: 'fetchSectionList'
  },
  data() {
    return {
      selectedNewSection: '',
    }
  },
  computed: {
    predefinedSections() {
      let sectionOptions = [];
      for (let key in PredefinedQueries) {
        if (PredefinedQueries.hasOwnProperty(key)) {
          sectionOptions.push({
            value: key,
            label: PredefinedQueries[key].name,
          })
        }
      }
      return sectionOptions;
    },

    isNewPresentation() {
      return this.presentationId === ID_NEW_PRESENTATION
    },

    sectionList() {
      return this.$store.state.section.sectionList
    },
    isLoadingSectionList() {
      return this.$store.state.section.sectionListStatus.isLoading
    },
    isSectionListApiError() {
      return this.$store.state.section.sectionListStatus.isApiError
    },
    sectionListApiErrorMsg() {
      return this.$store.state.section.sectionListStatus.apiErrorMsg
    },
    isLoadingDBMetaData() {
      return this.$store.state.dbMetaData.entitiesStatus.isLoading
    }
  },
  components: {
    AbstractSectionDetail
  },
  mounted() {
    this.fetchSectionList();
    this.$store.dispatch('fetchDBMetaDataEntities');
  },
  methods: {
    fetchSectionList() {
      if (!this.isNewPresentation) {
        this.$store.dispatch('fetchSectionList', this.presentationId)
      }
    },

    addNewSection() {
      this.$store.dispatch('addSectionDetail', {
        presentationId: this.presentationId,
        selectedNewSection: this.selectedNewSection,
        dataSet: this.$store.state.userInfo.userEmail,
      }).then(() => {
        this.selectedNewSection = ''
      })
    }
  }
}
</script>

<style scoped>
.addButtonLeft {
  margin-left: 10px;
}

.addRowRightAlign {
  text-align: right;
}
</style>