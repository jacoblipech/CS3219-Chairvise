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
      <mapping-tool v-if="readyForMapping" :importList="importedTitles" :dbList="dbSchemas[tableType]" ref="mapTool"></mapping-tool>
      <el-row v-if="readyForMapping" class="button-row">
        <el-col :offset="3">
          <el-button class="back-button" type="info" v-on:click="backClicked">back</el-button>
          <el-button class="back-button" type="success" v-on:click="uploadClicked">upload</el-button>
        </el-col>
      </el-row>
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
        <el-select v-if="uploaded" v-model="tableType" placeholder="Table Type">
          <el-option v-for="(schema, idx) in dbSchemas"
              :key="schema.tableName"
              :label="schema.tableName.replace('_', ' ')"
              :value="idx">
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
import MappingTool from "@/components/MappingTool.vue";

export default {
  name: "ImportData",
  data() {
    return {
      importedTitles: [
        "number",
        "track number",
        "track name",
        "title",
        "authors"
      ],
      uploaded: false,
      tableTypeSelected: false,
      tableType: null
    };
  },
  mounted() {
    this.$store.dispatch('fetchDBMetaDataEntities');
  },
  watch: {
    tableType: function(newType) {
      if (newType != null) {
        this.tableTypeSelected = true;
      }
    }
  },
  computed: {
    isAdmin: function() {
      return this.$store.state.userInfo.isAdmin;
    },
    isAppLoading: function() {
      return this.$store.state.isPageLoading || this.$store.state.isDataProcessing;
    },
    dbSchemas: function() {
      return this.$store.state.dbMetaData.entities;
    },
    readyForMapping: function() {
      return this.uploaded && this.tableTypeSelected;
    }
  },
  methods: {
    navigateToHomePage() {
      this.$router.replace("/home");
    },
    fileUploaded: function(file) {
      this.$store.commit("setDataProcessingStatus", true);
      var fileReader = new FileReader();
      fileReader.readAsText(file.raw);
      fileReader.onloadend = function() {
        var firstLine = fileReader.result.split("\n")[0];
        this.importedTitles = firstLine.split(",").map(function(item) {
          return item.trim().replace(/['"]+/g, "");
        });
        this.uploaded = true;
        this.$store.commit("setDataProcessingStatus", false);
      }.bind(this);
    },
    backClicked: function() {
      this.uploaded = false;
      this.importedTitles = [];
      this.tableType = null;
      this.tableTypeSelected = false;
    },
    uploadClicked: function() {
      this.$refs.mapTool.uploadMapping();
    }
  },
  components: {
    MappingTool
  }
};
</script>

<style scoped>
.upload-box {
  width: 100%;
  text-align: center;
  padding-top: 100px;
}

.upload-box .el-select {
  margin-top: 20px;
}

.button-row {
  margin-top: 30px;
}
</style>
