<template>
<el-row class="sectionDetail">
  <div v-if="sectionDetail.type === WORD_CLOUD">
    <word-cloud-section-detail :sectionDetail="sectionDetail" :presentationId="presentationId"/>
  </div>
  <div v-else-if="sectionDetail.type === BAR_CHART">
    <bar-chart-section-detail :sectionDetail="sectionDetail" :presentationId="presentationId"/>
  </div>
  <div v-else>
    Not A/B/C
  </div>
</el-row>
</template>

<script>
import WordCloudSectionDetail from "@/components/sectionDetail/WordCloudSectionDetail.vue"
import BarChartSectionDetail from "@/components/sectionDetail/BarChartSectionDetail.vue"
import {SECTION_TYPE_WORD_CLOUD} from "@/common/const";
import {SECTION_TYPE_BAR_CHART} from "@/common/const";

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
  data() {
    return {
      // constant
      WORD_CLOUD: SECTION_TYPE_WORD_CLOUD,
      BAR_CHART: SECTION_TYPE_BAR_CHART
    }
  },
  components: {
    WordCloudSectionDetail,
    BarChartSectionDetail
  }
}
</script>

<style scoped>
  .sectionDetail {
    margin-bottom: 30px;
  }
</style>

