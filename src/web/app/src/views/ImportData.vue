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
      <mapping-tool v-if="readyForMapping" ref="mapTool"></mapping-tool>
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
        <el-select v-if="uploaded" v-model="hasLabel" placeholder="Has label?">
          <el-option :key="'Yes'" :label="'Yes'" :value="true"></el-option>
          <el-option :key="'No'" :label="'No'" :value="false"></el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
import MappingTool from "@/components/MappingTool.vue";
import { DateDayField, DateTimeField } from "../common/const.js"
import Papa from "papaparse";

export default {
  name: "ImportData",
  data() {
    return {};
  },
  mounted() {
    // When page is loaded, fetch all the database fields
    this.$store.dispatch('fetchDBMetaDataEntities');
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
    tableType: {
      get: function() {
        return this.$store.state.dataMapping.data.tableType;
      },
      set: function(newValue) {
        var dbSchema = JSON.parse(JSON.stringify(this.dbSchemas[newValue]));
        if (newValue == 1) {
          dbSchema.fieldMetaDataList.push(DateDayField);
          dbSchema.fieldMetaDataList.push(DateTimeField);
        }
        this.$store.commit("setTableType", newValue);
        this.$store.commit("setDBSchema", dbSchema);
      }
    },
    hasLabel: {
      get: function() {
        return this.$store.state.dataMapping.data.hasLabel;
      },
      set: function(newValue) {
        this.$store.commit("setHasLabel", newValue);
      }
    },
    readyForMapping: function() {
      return this.$store.state.dataMapping.hasFileUploaded
        && this.$store.state.dataMapping.hasTableTypeSelected
        && this.$store.state.dataMapping.hasLabelSpecified;
    },
    uploaded: function() {
      return this.$store.state.dataMapping.hasFileUploaded;
    }
  },
  methods: {
    navigateToHomePage() {
      this.$router.replace("/home");
    },
    fileUploaded: function(file) {
      // show loading and go parsing
      this.$store.commit("setDataProcessingStatus", true);
      Papa.parse(file.raw, {
        complete: function(result) {
          // when complete, commit result to store
          // and disable loading animation
          this.$store.commit("setUploadedFile", result.data);
          this.$store.commit("setDataProcessingStatus", false);
        }.bind(this)
      });
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
  margin-left: 15px;
}

.button-row {
  margin-top: 30px;
}
</style>
