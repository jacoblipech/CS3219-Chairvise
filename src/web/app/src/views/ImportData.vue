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
      <h1>This is import data page</h1>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ImportData',
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
        this.$router.replace('/home')
      }
    }
  }
</script>