<template>
  <basic-section-detail :section-detail="sectionDetail" :presentation-id="presentationId" :has-data="hasData"
                        :edit-form-selections-rule="editFormSelectionsRule"
                        :edit-form-involved-records-rule="editFormInvolvedRecordsRule"
                        :edit-form-filters-rule="editFormFiltersRule"
                        @update-visualisation="updateVisualisation" @save-section-detail="saveSectionDetail" ref="basicSectionDetail">
    <vue-word-cloud :words="words"
                    :animationDuration="animationDuration"
                    :color="colorComputer"
                    :font-family="fontFamily"
                    style="width: 100%;height: 200px"></vue-word-cloud>
  </basic-section-detail>
</template>

<script>
  import VueWordCloud from 'vuewordcloud';
  import BasicSectionDetail from '@/components/sectionDetail/BasicSectionDetail.vue'

  export default {
    props: {
      sectionDetail: {
        type: Object,
        required: true
      },
      presentationId: {
        type: String,
        required: true
      }
    },

    data() {
      return {
        editFormSelectionsRule: {
          validator: (rule, value, callback) => {
            if (value.length >= 2 || value.length < 1) {
              return callback(new Error('There must be only one field to analysis'))
            }
            return callback();
          },
          trigger: 'blur',
        },
        editFormInvolvedRecordsRule:             {
          validator: (rule, value, callback) => {
            if (value.length >= 2 || value.length < 1) {
              return callback(new Error('There must be only one record involved'))
            }
            return callback();
          },
          trigger: 'blur',
        },
        editFormFiltersRule: {
          validator: (rule, value, callback) => {
            if (value.field.length === 0 || value.comparator.length === 0 || value.value.length === 0) {
              return callback(new Error('Please specify all fields'))
            }
            callback();
          },
          trigger: 'blur',
        },

        // word cloud related field
        animationDuration: 50,
        fontFamily: "Roboto",
        words: []
      }
    },

    computed: {
      hasData() {
        return this.words.length === 0;
      }
    },

    methods: {
      saveSectionDetail(basicSectionDetail) {
        this.$store.dispatch('saveSectionDetail', basicSectionDetail)
          .then(() => {
            this.$refs['basicSectionDetail'].changeEditMode(false);
            this.$refs['basicSectionDetail'].sendAnalysisRequest();
          })
      },

      updateVisualisation({result, selections}) {
        let fieldName = selections[0].field;
        let wordsCount = {};
        // will only require at least one selection
        // count the occurrence of word
        result.forEach(r => {
          r[fieldName].split(/[\r|\n]/).forEach(w => {
            // skip empty string
            if (w.length === 0) {
              return
            }
            // put in the count map
            if (wordsCount.hasOwnProperty(w)) {
              wordsCount[w]++
            } else {
              wordsCount[w] = 0;
            }
          })
        });
        // generate format as VueWordCloud required
        this.words = [];
        for (let word in wordsCount) {
          if (wordsCount.hasOwnProperty(word)) {
            this.words.push([word, wordsCount[wordsCount]])
          }
        }
      },



      // word cloud related
      colorComputer([, weight]) {
        return weight > 10 ? 'Red' : weight > 5 ? 'Blue' : 'Black'
      },
    },

    components: {
      [VueWordCloud.name]: VueWordCloud,
      BasicSectionDetail
    }
  }
</script>

<style scoped>
  .title {
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .noDataToDisplay {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .errorMessage {
    margin-top: 10px;
  }
</style>