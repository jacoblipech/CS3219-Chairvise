<template>
  <el-row :gutter="20" class="map-container">
    <el-col :span="10" :offset="1" class="map-area">
      <div class="db-tags">
        <h3>Database fields</h3>
        <transition-group name="tags-group" tag="div">
          <div class="tag" v-for="(item, idx) in dbList.fieldMetaDataList"
               v-bind:key="idx"
               v-bind:class="[ idx == selectedDBTag ? 'active' : '', mappedDBTag.includes(idx) ? 'hidden' : '' ]"
               v-on:click="dbTagClicked(idx)">
            {{ item.fieldName }}
          </div>
        </transition-group>
      </div>
            
      <div class="import-tags">
        <h3>Imported data fields</h3>
        <transition-group name="tags-group" tag="div">
          <div class="tag" v-for="(item, idx) in importList"
               v-bind:key="idx"
               v-bind:class="[ idx == selectedImportTag ? 'active' : '', mappedImportTag.includes(idx) ? 'hidden' : '' ]"
               v-on:click="importTagClicked(idx)">
            {{ item }}
          </div>
        </transition-group>
      </div>
    </el-col>
    <el-col :span="12" class="map-result">
      <h3>Mapping</h3>
      <transition-group name="map-group" tag="div">
        <div class="pair-tag" v-for="(item, index) in mappedPairs" v-bind:key="index">
					<el-tag>{{ dbList.fieldMetaDataList[item[0]].type }}</el-tag>
          <span class="pair-info">
						{{ dbList.fieldMetaDataList[item[0]].fieldName }} 
						<i class="el-icon-caret-right"></i> 
						{{ importList[item[1]] }}
					</span>
					<el-input placeholder="format" 
							v-model="dataTypes[index].detail" 
							v-if="dbList.fieldMetaDataList[item[0]].type == 'LocalDate'
								|| dbList.fieldMetaDataList[item[0]].type == 'LocalTime'
								|| dbList.fieldMetaDataList[item[0]].type == 'boolean'">
					</el-input>
					<i class="el-icon-close" v-on:click="removeMapClicked(index)"></i>
        </div>
      </transition-group>
      <transition name="fade" mode="out-in">
        <div class="no-map-info" v-show="mappedPairs.length == 0">
          <p>No mapping specified!</p>
        </div>
      </transition>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "MappingTool",
  props: {
    dbList: Object,
    importList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      selectedDBTag: -1,
      selectedImportTag: -1,
      mappedDBTag: [],
      mappedImportTag: [],
      tableType: "",
			dataTypes: []
    };
  },
  computed: {
    mappedPairs: function() {
      var temp = this.mappedImportTag;
      var result = this.mappedDBTag.map(function(e, i) {
        return [e, temp[i]];
			});
      return result;
    }
	},
  methods: {
    dbTagClicked: function(idx) {
      if (idx == this.selectedDBTag) {
        this.selectedDBTag = -1;
        return;
      }
      this.selectedDBTag = idx;
      if (this.selectedImportTag != -1 && this.selectedDBTag != -1) {
        this.mappedDBTag.push(this.selectedDBTag);
        this.mappedImportTag.push(this.selectedImportTag);
        this.selectedDBTag = -1;
				this.selectedImportTag = -1;
				var newTypeObject = {};
				newTypeObject[this.dataTypes.length] = { detail: "" };
				this.dataTypes.push(newTypeObject);
      }
    },
    importTagClicked: function(idx) {
      if (idx == this.selectedImportTag) {
        this.selectedImportTag = -1;
        return;
      }
      this.selectedImportTag = idx;
      if (this.selectedImportTag != -1 && this.selectedDBTag != -1) {
        this.mappedDBTag.push(this.selectedDBTag);
        this.mappedImportTag.push(this.selectedImportTag);
        this.selectedDBTag = -1;
				this.selectedImportTag = -1;
				var newTypeObject = {};
				newTypeObject[this.dataTypes.length] = { detail: "" };
				this.dataTypes.push(newTypeObject);
      }
    },
    removeMapClicked: function(idx) {
      this.mappedDBTag.splice(idx, 1);
			this.mappedImportTag.splice(idx, 1);
			this.dataTypes.splice(idx, 1);
    },
    uploadMapping: function() {
			console.log(this.mappedPairs);
			console.log(this.dataTypes)
    }
  },
  mounted() {},
  updated() {}
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:300,400,500");

@keyframes pulse {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  50% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

.map-container h3 {
  letter-spacing: 0.5px;
}

.tags-group-move {
  transition: all 300ms ease-in-out 50ms;
}

.map-group-move {
  transition: all 600ms ease-in-out 50ms;
}

/* appearing */
.map-group-enter-active {
  transition: all 300ms ease-out;
}

/* disappearing */
.map-group-leave-active {
  transition: all 200ms ease-in;
}

/* appear at / disappear to */
.map-group-enter {
  opacity: 0;
  transform: translateY(30px);
}

.map-group-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.map-container {
  display: flex;
  flex-direction: row;
}

.db-tags {
  min-height: 90px;
}

.tag {
  display: inline-block;
  height: 20px;
  margin: 5px 5px;
  padding: 7px 14px;
  background-color: #ffffff;
  border: 1px solid #007bff;
  color: #007bff;
  font-size: 14px;
  cursor: pointer;
  opacity: 1;
  z-index: 1;
  transition: opacity 0.2s, transform 0.3s, background-color 0.2s;
  border-radius: 5px;
  /* box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12); */
}

.tag.active {
  animation: pulse 1s infinite;
  background-color: #007bff;
  color: #ffffff;
  transition: 0.3s;
}

.tag.hidden {
  position: absolute;
  opacity: 0;
  z-index: -1;
  transition: 0.2s;
}

.tag:hover {
  background-color: #007bff;
  color: #ffffff;
  transition: 0.2s;
}

.map-result {
  display: flex;
  flex-direction: column;
  /* border: 1px dashed #565656; */
  border-radius: 5px;
  min-height: 300px;
  /* padding: 30px 10px; */
  transition: all 0.3s ease;
}

.pair-tag {
  margin: 5px 5px;
  padding: 15px 14px;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #eee;
  color: #565656;
}

.pair-tag .pair-info {
	margin-left: 10px;
  transition: 1s ease;
	font-size: 14px;
}

.pair-tag .el-icon-close {
  margin-top: 2px;
  cursor: pointer;
  transition: 0.3s;
}

.pair-tag .el-icon-caret-right {
  position: relative;
  top: 2px;
}

.pair-tag .el-icon-close {
	float: right;
	margin-top: 13px;
}

.pair-tag .el-icon-close:hover {
  color: crimson;
  transition: 0.3s;
}

.no-map-info {
  color: #777;
  font-weight: 300;
  position: absolute;
  top: 65px;
  margin-left: 10px;
}

.el-tag {
	margin-left: 0px;
	width: 70px;
	text-align: center;
}

.el-input {
	margin-left: 10px;
	width: 150px;
}
</style>