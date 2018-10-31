<template>
  <div>
    <h3 class="el-icon-document"> List of Information Available</h3>
    <el-menu>
      <el-menu-item>
        <li>
          <i class="el-icon-question"></i>
          <span v-scroll-to="'#element'">
            General User Guide
          </span>
        </li>
      </el-menu-item>
      <el-menu-item>
        <li>
          <i class="el-icon-question"></i>
          <span>
            Features Supported
          </span>
        </li>
      </el-menu-item>
      <li>
        <el-menu-item>
          <i class="el-icon-question"></i>
          <span slot="title">
            How to Import Data
          </span>
        </el-menu-item>
      </li>
      <li>
        <el-menu-item>
          <i class="el-icon-question"></i>
          <span slot="title">
            How to Add Presentation
          </span>
        </el-menu-item>
      </li>
      <li>
        <el-menu-item>
          <i class="el-icon-question"></i>
          <span slot="title">
            How to Share Presentation
          </span>
        </el-menu-item>
      </li>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'ListOfGuide',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
