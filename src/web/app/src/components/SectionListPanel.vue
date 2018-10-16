<template>
  <div :v-loading="isLoadingDBMetaData">
    <el-row class="addRowRightAlign">
      <el-select v-model="value" placeholder="Please select a section">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button class="addButtonLeft" type="success">Add New Section</el-button>
    </el-row>
    <br/>
    <abstract-section-detail v-for="section in sectionList" :sectionDetail="section" :key="section.id"/>
  </div>
</template>

<script>
import {SECTION_TYPE_WORD_CLOUD} from "@/common/const";
import AbstractSectionDetail from "@/components/AbstractSectionDetail.vue"

export default {
  data() {
    return {
      options: [{
        value: 'Word Cloud for Submission Keyword',
        label: SECTION_TYPE_WORD_CLOUD
      }],
      value: ''
    }
  },
  computed: {
    sectionList() {
      return this.$store.state.section.sectionList
    },
    isLoadingDBMetaData() {
      return this.$store.state.dbMetaData.entitiesStatus.isLoading
    }
  },
  components: {
    AbstractSectionDetail
  },
  mounted() {
    this.$store.dispatch('fetchDBMetaDataEntities');
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