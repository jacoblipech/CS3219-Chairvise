<template>
<el-row>
  <div v-if="sectionDetail.type === WORD_CLOUD">
    <word-cloud-section-detail :sectionDetail="sectionDetail" :presentationId="presentationId"/>
  </div>
  <div v-else>
    Not A/B/C
  </div>
</el-row>
</template>

<script>
import WordCloudSectionDetail from "@/components/sectionDetail/WordCloudSectionDetail.vue"
import {SECTION_TYPE_WORD_CLOUD} from "@/common/const";

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
      WORD_CLOUD: SECTION_TYPE_WORD_CLOUD
    }
  },
  components: {
    WordCloudSectionDetail
  }
}
</script>

