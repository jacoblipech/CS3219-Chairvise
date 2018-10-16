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
      <mapping-tool v-if="uploaded" :importList="importedTitles"></mapping-tool>
      <el-button class="back-button" type="info" v-if="uploaded" plain v-on:click="backClicked">back</el-button>
      <div v-else class="upload-box">
        <el-upload drag action="" 
          :auto-upload="false"
          :show-file-list="false"
          :multiple="false"
          :on-change="fileUploaded">
          <i class="el-icon-upload"></i>
            <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
            <div class="el-upload__tip" slot="tip">Please upload .csv files with filed names.</div>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
  import MappingTool from "@/components/MappingTool.vue"

  export default {
    name: "ImportData",
    data() {
      return {
        importedTitles: ["number", "track number", "track name", "title", "authors"],
        uploaded: false
      };
    },
    computed: {
      isAdmin: function() {
        return this.$store.state.userInfo.isAdmin
      },
      isAppLoading: function() {
        return this.$store.state.isPageLoading
      }
    },
    methods: {
      navigateToHomePage() {
        this.$router.replace("/home")
      },
      fileUploaded: function(file, fileList) {
        var fileReader = new FileReader();
        fileReader.readAsText(file.raw);
        fileReader.onloadend = function() {
          var firstLine = fileReader.result.split("\n")[0];
          this.importedTitles = firstLine.split(",").map(function(item) { return item.trim().replace(/['"]+/g, ""); });
          this.uploaded = true;
        }.bind(this)
      },
      backClicked: function() {
        this.uploaded = false;
        this.importedTitles = [];
      }
    },
    components: {
      MappingTool
    }
  }
</script>

<style scoped>
.upload-box {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  padding-top: 100px;
}

.back-button {
  margin-left: 12.5%;
  margin-top: 30px;
}
</style>
