<template>
    <el-row :gutter="20" class="map-container">
        <el-col :span="3"></el-col>
        <el-col :span="12" class="map-area">
            <div class="db-tags">
                <h3>Database fields</h3>
                <div class="tag" v-for="(item, idx) in dbList"  
                    v-bind:key="idx"
                    v-bind:class="[ idx == selectedDBTag ? 'active' : '', mappedDBTag.includes(idx) ? 'hidden' : '' ]"
                    v-on:click="dbTagClicked(idx)">
                    {{ item }}
                </div>
            </div>
            <div class="import-tags">
                <h3>Imported data fields</h3>
                <div class="tag" v-for="(item, idx) in importList"
                    v-bind:key="idx"
                    v-bind:class="[ idx == selectedImportTag ? 'active' : '', mappedImportTag.includes(idx) ? 'hidden' : '' ]"
                    v-on:click="importTagClicked(idx)">
                    {{ item }}
                </div>
            </div>
        </el-col>
        <el-col :span="6" class="map-result">
            <h3>Mapping</h3>
            <div class="pair-tag" v-for="(item, idx) in mappedPairs"
                v-bind:key="idx">
                <span>{{ dbList[item[0]] }} <i class="el-icon-caret-right"></i> {{ importList[item[1]] }}</span><i class="el-icon-close" v-on:click="removeMapClicked(idx)"></i>
            </div>
        </el-col>
        <el-col :span="3"></el-col>
    </el-row>
</template>

<script>
export default {
    name: "MappingTool",
    props: {
        dbList: {
            type: Array,
            default: function() { return ["submission #", "first name", "last name", "email", "country", "organization", "web page", "person", "corresponding"]; }
        },
        importList: {
            type: Array,
            default: function() { return []; }
        }
    },
    data() {
        return {
            selectedDBTag: -1,
            selectedImportTag: -1,
            mappedDBTag: [],
            mappedImportTag: []
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
            }
        },
        removeMapClicked: function(idx) {
            console.log(idx);
            this.mappedDBTag.splice(idx, 1);
            this.mappedImportTag.splice(idx, 1);
        }
    },
    mounted() {},
    updated() {}
}
</script>

<style scoped>
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

.map-container {
    display: flex;
    flex-direction: row;
}

.tag {
    display: inline-block;
    height: 20px;
    margin: 5px 5px;
    padding: 5px 10px;
    background-color: dimgray;
    border: 1px solid dimgray;
    color: #fff;
    letter-spacing: 1px;
    font-size: 15px;
    cursor: pointer;
    transition: .3s;
}

.tag.active {
    animation: pulse 1s infinite;
    background-color: #fff;
    color: dimgray;
    transition: .3s;
}

.tag.hidden {
    display: none;
}

.tag:hover {
    background-color: #fff;
    color: dimgray;
    transition: .3s;
}

.map-result {
    display: flex;
    flex-direction: column;
}

.pair-tag {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 5px 5px;
    padding: 5px 10px;
    background-color: dimgray;
    border: 1px solid dimgray;
    color: #fff;
}

.pair-tag .el-icon-close {
    margin-top: 2px;
    cursor: pointer;
    transition: .3s;
}

.pair-tag .el-icon-caret-right {
    position: relative;
    top: 2px;
}

.pair-tag .el-icon-close:hover {
    margin-top: 2px;
    color: crimson;
    transition: .3s;
}
</style>