<template>
  <div>
    <h3 class="el-icon-document"> List of Information Available</h3>
    <el-menu>
      <li v-scroll-to="'#general-guide'">
        <el-menu-item>
          <i class="el-icon-question"></i>
          <span>
            General User Guide
          </span>
        </el-menu-item>
      </li>
      <li v-scroll-to="'#features-available'">
        <el-menu-item>
          <i class="el-icon-question"></i>
          <span>
            Features Supported
          </span>
        </el-menu-item>
      </li>
      <li v-scroll-to="'#import-guide'">
        <el-menu-item>
          <i class="el-icon-question"></i>
          <span>
            How to Import Data
          </span>
        </el-menu-item>
      </li>
      <li v-scroll-to="'#add-guide'">
        <el-menu-item>
          <i class="el-icon-question"></i>
          <span>
            How to Add Presentation
          </span>
        </el-menu-item>
      </li>
      <li v-scroll-to="'#share-guide'">
        <el-menu-item>
          <i class="el-icon-question"></i>
          <span>
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
