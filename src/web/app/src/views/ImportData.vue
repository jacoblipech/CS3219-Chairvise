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
      <mapping-tool v-if="isReadyForMapping" ref="mapTool"></mapping-tool>
      <div v-else class="upload-box">
        <el-upload drag action=""
                   :auto-upload="false"
                   :show-file-list="false"
                   :multiple="false"
                   :on-change="fileUploadHandler">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
          <div class="el-upload__tip" slot="tip">Please upload .csv files with filed names.</div>
        </el-upload>
        <el-select v-if="uploaded" v-model="tableType" placeholder="Table Type">
          <el-option v-for="(schema, idx) in dbSchemas"
                     :key="schema.name"
                     :label="schema.name"
                     :value="idx">
          </el-option>
        </el-select>
        <el-select v-if="uploaded" v-model="hasHeader" placeholder="Has header?">
          <el-option :key="'Yes'" :label="'Yes'" :value="true"></el-option>
          <el-option :key="'No'" :label="'No'" :value="false"></el-option>
        </el-select>
        <el-select v-if="uploaded" v-model="predefinedMappingId" placeholder="Predefined Mapping">
          <el-option v-for="(mapping, idx) in predefinedMappings"
                     :key="mapping.name"
                     :label="mapping.name"
                     :value="idx">
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
  import MappingTool from "@/components/MappingTool.vue";
  import Papa from "papaparse";
  import {REVIEW_DATE_DAY_FIELD, REVIEW_DATE_TIME_FIELD, REVIEW_TABLE_ID} from "@/common/const"
  import {deepCopy} from "@/common/utility"
  import PredefinedMappings from "@/store/data/predefinedMapping"

  export default {
    name: "ImportData",
    data() {
      return {
        predefinedMappings: PredefinedMappings
      };
    },
    mounted() {
      // When page is loaded, fetch all the database fields
      this.$store.dispatch('fetchDBMetaDataEntities');
    },
    computed: {
      isLogin() {
        return this.$store.state.userInfo.isLogin;
      },
      isAppLoading: function () {
        return this.$store.state.isPageLoading || this.$store.state.dbMetaData.entitiesStatus.isLoading;
      },
      dbSchemas: function () {
        return this.$store.state.dbMetaData.entities;
      },
      tableType: {
        get: function () {
          return this.$store.state.dataMapping.data.tableType;
        },
        set: function (newValue) {
          let dbSchema = deepCopy(this.dbSchemas[newValue]);
          if (newValue === REVIEW_TABLE_ID) {
            dbSchema.fieldMetaDataList.push(REVIEW_DATE_DAY_FIELD);
            dbSchema.fieldMetaDataList.push(REVIEW_DATE_TIME_FIELD);
          }
          this.$store.commit("setTableType", newValue);
          this.$store.commit("setDBSchema", dbSchema);
        }
      },
      hasHeader: {
        get: function () {
          return this.$store.state.dataMapping.data.hasHeader;
        },
        set: function (newValue) {
          this.$store.commit("setHasHeader", newValue);
        }
      },
      predefinedMappingId: {
        get: function () {
          return this.$store.state.dataMapping.data.predefinedMappingId;
        },
        set: function (newValue) {
          this.$store.commit("setPredefinedMapping", {id: newValue, mapping: PredefinedMappings[newValue].mapping});
        }
      },
      isReadyForMapping: function () {
        return this.$store.state.dataMapping.hasFileUploaded
          && this.$store.state.dataMapping.hasTableTypeSelected
          && this.$store.state.dataMapping.hasHeaderSpecified
          && this.$store.state.dataMapping.hasPredefinedSpecified;
      },
      uploaded: function () {
        return this.$store.state.dataMapping.hasFileUploaded;
      }
    },
    methods: {
      navigateToHomePage() {
        this.$router.replace("/home");
      },
      fileUploadHandler: function (file) {
        // show loading and go parsing
        this.$store.commit("setPageLoadingStatus", true);
        Papa.parse(file.raw, {
          complete: function (result) {
            // when complete, commit result to store
            // and disable loading animation
            this.$store.commit("setUploadedFile", result.data);
            this.$store.commit("setPageLoadingStatus", false);
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
