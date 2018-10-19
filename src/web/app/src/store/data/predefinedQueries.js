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
        type: 'category',
        dataSetLabel: 'Submission Counts',
        fieldsShownInToolTips: ['author_email'],
        xAxisFieldName: 'author_name',
        yAxisFieldName: 'submission_count',

        // specific to category type
        numOfResultToDisplay: 10,
      }
    }
  },
  "accepted_organization_rank": {
    name: "Accepted Submission Organization Rank",
    data: {
      type: 'bar_chart',
      title: 'Accepted Submission Organization Rank',
      dataSet: '${WILL_BE_REPLACED}',
      selections: [
        {
          expression: 'COUNT(*)',
          rename: 'submission_count'
        },
        {
          expression: "a_organisation",
          rename: 'a_organisation'
        }
      ],
      involvedRecords: [
        {
          name: 'author_record'
        },
        {
          name: 'submission_record'
        }
      ],
      filters: [
        {
          field: "s_is_accepted",
          comparator: "=",
          value: "true",
        }
      ],
      joiners: [
        {
          left: "a_submission_id",
          right: "s_submission_id",
        }
      ],
      groupers: [
        {
          field: "a_organisation"
        }
      ],
      sorters: [
        {
          field: 'submission_count',
          order: 'DESC',
        }
      ],
      extraData: {
        type: 'category',
        dataSetLabel: 'Accepted Counts',
        fieldsShownInToolTips: [],
        xAxisFieldName: 'a_organisation',
        yAxisFieldName: 'submission_count',

        // specific to category type
        numOfResultToDisplay: 10,
      }
    }
  },
  "review_score_distribution": {
    name: "Review Score Distribution",
    data: {
      type: 'bar_chart',
      title: 'Review Score Distribution',
      dataSet: '${WILL_BE_REPLACED}',
      selections: [
        {
          expression: 'COUNT(*)',
          rename: 'submission_count'
        },
        {
          expression: 'SUM(r_expertise_level * r_overall_evaluation_score) / SUM(r_expertise_level)',
          rename: 'weighted_score'
        },
      ],
      involvedRecords: [
        {
          name: 'review_record'
        }
      ],
      filters: [],
      joiners: [],
      groupers: [{
        field: 'r_submission_id'
      }],
      sorters: [
        {
          field: 'weighted_score',
          order: 'ASC',
        }
      ],
      extraData: {
        type: 'group',
        dataSetLabel: 'Num of Submission',
        fieldsShownInToolTips: [],
        xAxisFieldName: 'weighted_score',
        yAxisFieldName: 'submission_count',

        // specific to category type
        group: {
          min: -3.0,
          max: 3.0,
          stepSize: 0.25,
        }
      }
    }
  }
}