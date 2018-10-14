<template>
  <div>
    <el-alert
        title="You need to have admin access to view the page"
        type="error"
        v-if="!isAdmin && !isAppLoading"
    >
      &nbsp;<el-button type="warning" plain size="mini" @click="navigateToHomePage">Return to the Home Page</el-button>
    </el-alert>
    <div v-if="isAdmin">
        <mapping-tool :importList="importedTitles"></mapping-tool>
    </div>
  </div>
</template>

<script>
  import MappingTool from "@/components/MappingTool.vue"

  export default {
    name: "ImportData",
    data() {
      return {
        importedTitles: ["number", "track number", "track name", "title", "authors"]
      };
    },
    computed: {
      isAdmin: function() {
        return this.$store.state.userInfo.isAdmin
      },
      isAppLoading() {
        return this.$store.state.isPageLoading
      }
    },
    methods: {
      navigateToHomePage() {
        this.$router.replace("/home")
      }
    },
    components: {
        MappingTool
    }
  }
</script>