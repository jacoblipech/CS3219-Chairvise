<template>
  <div>
    <el-alert
        title="You need to login-in to view the page"
        type="error"
        v-if="!isLogin && !isAppLoading"
    >
      &nbsp;<el-button type="warning" plain size="mini" @click="navigateToHomePage">Return to the Home Page</el-button>
    </el-alert>
    <div v-if="isLogin">
      <h1>This is import data page</h1>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ImportData',
    computed: {
      isLogin() {
        return this.$store.state.userInfo.isLogin
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