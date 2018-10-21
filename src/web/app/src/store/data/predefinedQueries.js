export default {
  "word_cloud_keywords_all_submission": {
    name: "Word Cloud for All Submissions Keywords",
    data: {
      type: 'word_cloud',
      title: 'Word Cloud for All Submissions',
      dataSet: '${WILL_BE_REPLACED}',
      selections: [
        {
          expression: 's_keywords',
          rename: 's_keywords'
        }
      ],
      involvedRecords: [
        {
          name: 'submission_record'
        }
      ],
      filters: [],
      joiners: [],
      groupers: [],
      sorters: [],
      extraData: {
        delimiters: ['\\r', '\\n']
      }
    }
  },
  "submission_rank": {
    name: "Submission Rank",
    data: {
      type: 'bar_chart',
      title: 'Submission Rank',
      dataSet: '${WILL_BE_REPLACED}',
      selections: [
        {
          expression: 'COUNT(*)',
          rename: 'submission_count'
        },
        {
          expression: "CONCAT(a_first_name, ' ', a_last_name)",
          rename: 'author_name'
        },
        {
          expression: "a_email",
          rename: 'author_email'
        }
      ],
      involvedRecords: [
        {
          name: 'author_record'
        }
      ],
      filters: [],
      joiners: [],
      groupers: [
        {
          field: "a_email"
        },
        {
          field: "a_first_name"
        },
        {
          field: "a_last_name"
        }
      ],
      sorters: [
        {
          field: 'submission_count',
          order: 'DESC',
        },
        {
          field: 'a_email',
          order: 'ASC',
        }
      ],
      extraData: {
        dataSetLabel: 'Submission Counts',
        fieldsShownInToolTips: ['author_email'],
        xAxisFieldName: 'author_name',
        yAxisFieldName: 'submission_count',
        numOfResultToDisplay: 10,
      }
    }
  }
}