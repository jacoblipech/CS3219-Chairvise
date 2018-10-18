export default {
  "word_cloud_keywords_all_submission": {
    name: "Word Cloud for All Submissions Keywords",
    data: {
      type: 'word_cloud',
      title: 'Word Cloud for All Submissions',
      dataSet: '${WILL_BE_REPLACED}',
      selections: [
        {
          field: 's_keywords'
        }
      ],
      involvedRecords: [
        {
          name: 'submission_record'
        }
      ],
      filters: [],
      joiners: [],
      extraData: {
        delimiters: ['\\r', '\\n']
      }
    }
  }
}