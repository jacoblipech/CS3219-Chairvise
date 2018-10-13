<template>
  <div>
    <el-alert
        title="You need to login-in to view the page"
        type="error"
        v-if="!isLogin && !isAppLoading"
    />
    <div v-if="isLogin">
      <el-container>
        <el-aside width="250px">
          <list-of-presentation />
        </el-aside>
        <el-main>
          <presentation-brief :id="id"/>
          <section-list-panel />
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import ListOfPresentation from '@/components/ListOfPresentation.vue'
import PresentationBrief from "@/components/PresentationBrief.vue";
import SectionListPanel from "@/components/SectionListPanel.vue";

export default {
  name: 'Analyze',
  props: {
    id: String,
  },
  computed: {
    isLogin() {
      return this.$store.state.userInfo.isLogin
    },
    isAppLoading() {
      return this.$store.state.isPageLoading
    }
  },
  components: {
    PresentationBrief,
    ListOfPresentation,
    SectionListPanel
  }
}
</script>