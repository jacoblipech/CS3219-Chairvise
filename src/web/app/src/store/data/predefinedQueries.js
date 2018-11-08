export default {
  "word_cloud_keywords_all_submission": {
    name: "Word Cloud for All Submissions Keywords",
    group: 'Submission Record',
    data: {
      type: 'word_cloud',
      title: 'Word Cloud for All Submissions',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      selections: [
        {
          expression: 's_keywords',
          rename: 's_keywords'
        }
      ],
      involvedRecords: [
        {
          name: 'submission_record',
          customized: false,
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
  "word_cloud_keywords_reviewer_comment": {
    name: "Word Cloud for Reviewer Comment",
    group: 'Review Record',
    data: {
      type: 'word_cloud',
      title: 'Word Cloud for Reviewer Comment',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      selections: [
        {
          expression: 'r_review_comment',
          rename: 'r_review_comment'
        }
      ],
      involvedRecords: [
        {
          name: 'review_record',
          customized: false,
        }
      ],
      filters: [],
      joiners: [],
      groupers: [],
      sorters: [],
      extraData: {
        delimiters: ['\\r', '\\n', '\\s']
      }
    }
  },
  "submission_rank_author": {
    name: "Submission Rank Author",
    group: 'Author Record',
    data: {
      type: 'bar_chart',
      title: 'Submission Rank Author',
      dataSet: '${PLACEHOLDER_DATA_SET}',
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
          name: 'author_record',
          customized: false,
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
        fieldsShownInToolTips: [{ label: 'Email', field: 'author_email'}],
        xAxisFieldName: 'author_name',
        yAxisFieldName: 'submission_count',

        // specific to category type
        numOfResultToDisplay: 10,
      }
    }
  },
  "submission_rank_paper_author": {
    name: "Submission Rank Paper Author",
    group: 'Submission Record',
    data: {
      type: 'bar_chart',
      title: 'Submission Rank Paper Author',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      selections: [
        {
          expression: 'COUNT(*)',
          rename: 'paper_count'
        },
        {
          expression: "s_author_name",
          rename: 's_author_name'
        }
      ],
      involvedRecords: [
        {
          name: "(SELECT s_author_name FROM submission_record, submission_record_author_set, submission_author_record " +
            "WHERE s_id = submission_record_s_id AND author_set_s_author_id = s_author_id AND submission_record.data_set = '${PLACEHOLDER_DATA_SET}') AS `tmp`",
          customized: true,
        }
      ],
      filters: [],
      joiners: [],
      groupers: [
        {
          field: "s_author_name"
        }
      ],
      sorters: [
        {
          field: 'paper_count',
          order: 'DESC',
        },
        {
          field: 's_author_name',
          order: 'ASC',
        }
      ],
      extraData: {
        type: 'category',
        dataSetLabel: 'Paper Counts',
        fieldsShownInToolTips: [],
        xAxisFieldName: 's_author_name',
        yAxisFieldName: 'paper_count',

        // specific to category type
        numOfResultToDisplay: 10,
      }
    }
  },
  "submission_rank_country": {
    name: "Submission Rank Country",
    group: 'Author Record',
    data: {
      type: 'pie_chart',
      title: 'Submission Rank Country',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      selections: [
        {
          expression: 'COUNT(*)',
          rename: 'submission_count'
        },
        {
          expression: "a_country",
          rename: 'a_country'
        }
      ],
      involvedRecords: [
        {
          name: 'author_record',
          customized: false,
        }
      ],
      filters: [],
      joiners: [],
      groupers: [
        {
          field: "a_country"
        }
      ],
      sorters: [
        {
          field: 'submission_count',
          order: 'DESC',
        }
      ],
      extraData: {
        categoryFieldName: 'a_country',
        valueFieldName: 'submission_count',
        numOfResultToDisplay: 10,
      }
    }
  },
  "submission_rank_organization": {
    name: "Submission Rank Organization",
    group: 'Author Record',
    data: {
      type: 'pie_chart',
      title: 'Submission Rank Organization',
      dataSet: '${PLACEHOLDER_DATA_SET}',
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
          name: 'author_record',
          customized: false,
        }
      ],
      filters: [],
      joiners: [],
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
        categoryFieldName: 'a_organisation',
        valueFieldName: 'submission_count',
        numOfResultToDisplay: 10,
      }
    }
  },
  "accepted_organization_rank": {
    name: "Accepted Submission Organization Rank",
    group: 'Author Record',
    data: {
      type: 'bar_chart',
      title: 'Accepted Submission Organization Rank',
      dataSet: '${PLACEHOLDER_DATA_SET}',
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
          name: 'author_record',
          customized: false,
        },
        {
          name: 'submission_record',
          customized: false,
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
    group: 'Review Record',
    data: {
      type: 'bar_chart',
      title: 'Review Score Distribution',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      selections: [
        {
          expression: '1',
          rename: 'submission_count'
        },
        {
          expression: 'SUM(r_expertise_level * r_overall_evaluation_score) / SUM(r_expertise_level)',
          rename: 'weighted_score'
        },
      ],
      involvedRecords: [
        {
          name: 'review_record',
          customized: false,
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
  },
  "review_weighted_evaluation_score_stats_summary": {
    name: "Review Weighted Evaluation Score Statistic Summary",
    group: 'Review Record',
    data: {
      type: 'stats',
      title: 'Review Weighted Evaluation Score Statistic Summary',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      selections: [
        {
          expression: 'SUM(r_expertise_level * r_overall_evaluation_score) / SUM(r_expertise_level)',
          rename: 'weighted_score'
        },
      ],
      involvedRecords: [
        {
          name: 'review_record',
          customized: false,
        }
      ],
      filters: [],
      joiners: [],
      groupers: [{
        field: 'r_submission_id'
      }],
      sorters: [],
      extraData: {
        types: ['min', 'max', 'avg', 'median', 'std'],
      }
    }
  },
  "review_expertise_level_stats_summary": {
    name: "Reviewer Expertise Level Statistic Summary",
    group: 'Review Record',
    data: {
      type: 'stats',
      title: 'Reviewer Expertise Level Statistic Summary',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      selections: [
        {
          expression: 'r_expertise_level',
          rename: 'r_expertise_level'
        },
      ],
      involvedRecords: [
        {
          name: 'review_record',
          customized: false,
        }
      ],
      filters: [],
      joiners: [],
      groupers: [
        {
          field: 'r_expertise_level'
        },
        {
          field: 'r_reviewer_name'
        }
      ],
      sorters: [],
      extraData: {
        types: ['min', 'max', 'avg', 'median', 'std'],
      }
    }
  },
  "submission_rank_track": {
    name: "Submission Rank Track",
    group: 'Submission Record',
    data: {
      type: 'bar_chart',
      title: 'Submission Rank Track',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      selections: [
        {
          expression: 'COUNT(*)',
          rename: 'submission_count'
        },
        {
          expression: "s_track_name",
          rename: 's_track_name'
        }
      ],
      involvedRecords: [
        {
          name: 'submission_record',
          customized: false,
        }
      ],
      filters: [],
      joiners: [],
      groupers: [
        {
          field: "s_track_name"
        }
      ],
      sorters: [
        {
          field: 's_track_name',
          order: 'ASC',
        }
      ],
      extraData: {
        type: 'category',
        dataSetLabel: 'Submission Count',
        fieldsShownInToolTips: [],
        xAxisFieldName: 's_track_name',
        yAxisFieldName: 'submission_count',

        // specific to category type
        numOfResultToDisplay: 10,
      }
    }
  },
  "acceptance_ratio_track": {
    name: "Acceptance Ratio Track",
    group: 'Submission Record',
    data: {
      type: 'bar_chart',
      title: 'Acceptance Ratio Track',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      selections: [
        {
          expression: "SUM(CASE WHEN s_is_accepted = 'yes' THEN 1 ELSE 0 END)/COUNT(*)",
          rename: 'acceptance_ratio'
        },
        {
          expression: "s_track_name",
          rename: 's_track_name'
        }
      ],
      involvedRecords: [
        {
          name: 'submission_record',
          customized: false,
        }
      ],
      filters: [],
      joiners: [],
      groupers: [
        {
          field: "s_track_name"
        }
      ],
      sorters: [
        {
          field: 's_track_name',
          order: 'ASC',
        }
      ],
      extraData: {
        type: 'category',
        dataSetLabel: 'Acceptance Ratio',
        fieldsShownInToolTips: [],
        xAxisFieldName: 's_track_name',
        yAxisFieldName: 'acceptance_ratio',

        // specific to category type
        numOfResultToDisplay: 10,
      }
    }
  },
  "acceptance_ratio_by_Year": {
    name: "Acceptance Ratio by Year",
    group: 'Submission Record',
    data: {
      type: 'line_chart',
      title: 'Acceptance Ratio by Year',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      selections: [
        {
          expression: "SUM(CASE WHEN s_is_accepted = 'yes' THEN 1 ELSE 0 END)/COUNT(*)",
          rename: 'acceptance_ratio'
        },
        {
          expression: "YEAR(s_submission_time)",
          rename: 'year'
        }
      ],
      involvedRecords: [
        {
          name: 'submission_record',
          customized: false,
        }
      ],
      filters: [],
      joiners: [],
      groupers: [
        {
          field: "YEAR(s_submission_time)"
        }
      ],
      sorters: [
        {
          field: 'year',
          order: 'ASC',
        }
      ],
      extraData: {
        dataSetLabel: 'Acceptance Ratio',
        xAxisFieldName: 'year',
        yAxisFieldName: 'acceptance_ratio',
      }
    }
  },
  "recommendation_for_best_paper_distribution": {
    name: "Recommendation for Best Paper Distribution",
    group: 'Review Record',
    data: {
      type: 'pie_chart',
      title: 'Recommendation for Best Paper Distribution',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      selections: [
        {
          expression: "CASE WHEN r_has_recommended_for_best_paper = 'yes' THEN 'Recommended' ELSE 'Not Recommended' END",
          rename: 'label'
        },
        {
          expression: "COUNT(*)",
          rename: 'review_count'
        }
      ],
      involvedRecords: [
        {
          name: 'review_record',
          customized: false,
        }
      ],
      filters: [],
      joiners: [],
      groupers: [
        {
          field: "r_has_recommended_for_best_paper"
        }
      ],
      sorters: [],
      extraData: {
        categoryFieldName: 'label',
        valueFieldName: 'review_count',
        numOfResultToDisplay: 10,
      }
    }
  },
  "review_count_summary_for_each_submission": {
    name: "Review Count Summary for Each Submission",
    group: 'Review Record',
    data: {
      type: 'stats',
      title: 'Review Count Summary for Each Submission',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      selections: [
        {
          expression: 'COUNT(*)',
          rename: 'number_of_review'
        },
      ],
      involvedRecords: [
        {
          name: 'review_record',
          customized: false,
        }
      ],
      filters: [],
      joiners: [],
      groupers: [
        {
          field: 'r_submission_id'
        }
      ],
      sorters: [],
      extraData: {
        types: ['min', 'max', 'avg', 'median'],
      }
    }
  },
  "submission_acceptance_rate_rank_author": {
    name: "Submission Acceptance Rate Rank Author",
    group: 'Author Record + Submission Record',
    data: {
      type: 'bar_chart',
      title: 'Submission Acceptance Rate Rank Author',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      selections: [
        {
          expression: "SUM(CASE WHEN s_is_accepted = 'yes' THEN 1 ELSE 0 END)/COUNT(*)",
          rename: 'acceptance_rate'
        },
        {
          expression: "CONCAT(a_first_name, ' ', a_last_name)",
          rename: 'author_name'
        },
        {
          expression: "a_email",
          rename: 'author_email'
        },
        {
          expression: "COUNT(*)",
          rename: 'submitted'
        },
        {
          expression: "SUM(CASE WHEN s_is_accepted = 'yes' THEN 1 ELSE 0 END)",
          rename: 'accepted'
        }
      ],
      involvedRecords: [
        {
          name: 'author_record',
          customized: false,
        },
        {
          name: 'submission_record',
          customized: false,
        }
      ],
      filters: [],
      joiners: [
        {
          left: "a_submission_id",
          right: "s_submission_id",
        }
      ],
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
          field: 'acceptance_rate',
          order: 'DESC',
        },
        {
          field: 'a_email',
          order: 'ASC',
        }
      ],
      extraData: {
        type: 'category',
        dataSetLabel: 'Acceptance Rate',
        fieldsShownInToolTips: [
          {
            label: 'Email',
            field: 'author_email',
          },
          {
            label: 'Total Accepted',
            field: 'accepted',
          },
          {
            label: 'Total Submitted',
            field: 'submitted',
          },
        ],
        xAxisFieldName: 'author_name',
        yAxisFieldName: 'acceptance_rate',

        // specific to category type
        numOfResultToDisplay: 10,
      }
    }
  },
  "submission_acceptance_rate_rank_organisation": {
    name: "Submission Acceptance Rate Rank Organization",
    group: 'Author Record + Submission Record',
    data: {
      type: 'bar_chart',
      title: 'Submission Acceptance Rate Rank Organization',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      selections: [
        {
          expression: "SUM(CASE WHEN s_is_accepted = 'yes' THEN 1 ELSE 0 END)/COUNT(*)",
          rename: 'acceptance_rate'
        },
        {
          expression: "a_organisation",
          rename: 'a_organisation'
        },
        {
          expression: "COUNT(*)",
          rename: 'submitted'
        },
        {
          expression: "SUM(CASE WHEN s_is_accepted = 'yes' THEN 1 ELSE 0 END)",
          rename: 'accepted'
        }
      ],
      involvedRecords: [
        {
          name: 'author_record',
          customized: false,
        },
        {
          name: 'submission_record',
          customized: false,
        }
      ],
      filters: [],
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
          field: 'acceptance_rate',
          order: 'DESC',
        },
        {
          field: 'a_organisation',
          order: 'ASC',
        }
      ],
      extraData: {
        type: 'category',
        dataSetLabel: 'Acceptance Rate',
        fieldsShownInToolTips: [
          {
            label: 'Total Accepted',
            field: 'accepted',
          },
          {
            label: 'Total Submitted',
            field: 'submitted',
          },
        ],
        xAxisFieldName: 'a_organisation',
        yAxisFieldName: 'acceptance_rate',

        // specific to category type
        numOfResultToDisplay: 10,
      }
    }
  },
  "submission_acceptance_rate_rank_country": {
    name: "Submission Acceptance Rate Rank Country",
    group: 'Author Record + Submission Record',
    data: {
      type: 'bar_chart',
      title: 'Submission Acceptance Rate Rank Country',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      selections: [
        {
          expression: "SUM(CASE WHEN s_is_accepted = 'yes' THEN 1 ELSE 0 END)/COUNT(*)",
          rename: 'acceptance_rate'
        },
        {
          expression: "a_country",
          rename: 'a_country'
        },
        {
          expression: "COUNT(*)",
          rename: 'submitted'
        },
        {
          expression: "SUM(CASE WHEN s_is_accepted = 'yes' THEN 1 ELSE 0 END)",
          rename: 'accepted'
        }
      ],
      involvedRecords: [
        {
          name: 'author_record',
          customized: false,
        },
        {
          name: 'submission_record',
          customized: false,
        }
      ],
      filters: [],
      joiners: [
        {
          left: "a_submission_id",
          right: "s_submission_id",
        }
      ],
      groupers: [
        {
          field: "a_country"
        }
      ],
      sorters: [
        {
          field: 'acceptance_rate',
          order: 'DESC',
        },
        {
          field: 'a_country',
          order: 'ASC',
        }
      ],
      extraData: {
        type: 'category',
        dataSetLabel: 'Acceptance Rate',
        fieldsShownInToolTips: [
          {
            label: 'Total Accepted',
            field: 'accepted',
          },
          {
            label: 'Total Submitted',
            field: 'submitted',
          },
        ],
        xAxisFieldName: 'a_country',
        yAxisFieldName: 'acceptance_rate',

        // specific to category type
        numOfResultToDisplay: 10,
      }
    }
  },
  "reviewer_assignment_rank": {
    name: "Reviewer Assignment Rank",
    group: 'Review Record',
    data: {
      type: 'bar_chart',
      title: 'Reviewer Assignment Rank',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      selections: [
        {
          expression: 'MAX(r_num_review_assignment)',
          rename: 'review_assignment'
        },
        {
          expression: "r_reviewer_name",
          rename: 'r_reviewer_name'
        }
      ],
      involvedRecords: [
        {
          name: 'review_record',
          customized: false,
        }
      ],
      filters: [],
      joiners: [],
      groupers: [
        {
          field: "r_reviewer_name"
        }
      ],
      sorters: [
        {
          field: 'review_assignment',
          order: 'DESC',
        },
        {
          field: 'r_reviewer_name',
          order: 'ASC',
        }
      ],
      extraData: {
        type: 'category',
        dataSetLabel: 'Average Num of Review Assignment',
        fieldsShownInToolTips: [],
        xAxisFieldName: 'r_reviewer_name',
        yAxisFieldName: 'review_assignment',

        // specific to category type
        numOfResultToDisplay: 10,
      }
    }
  },
  "reviewer_avg_expertise_level_rank": {
    name: "Reviewer Average Expertise Level Rank",
    group: 'Review Record',
    data: {
      type: 'bar_chart',
      title: 'Reviewer Average Expertise Level Rank',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      selections: [
        {
          expression: 'AVG(r_expertise_level)',
          rename: 'avg_expertise_level'
        },
        {
          expression: "r_reviewer_name",
          rename: 'r_reviewer_name'
        }
      ],
      involvedRecords: [
        {
          name: 'review_record',
          customized: false,
        }
      ],
      filters: [],
      joiners: [],
      groupers: [
        {
          field: "r_reviewer_name"
        }
      ],
      sorters: [
        {
          field: 'avg_expertise_level',
          order: 'DESC',
        },
        {
          field: 'r_reviewer_name',
          order: 'ASC',
        }
      ],
      extraData: {
        type: 'category',
        dataSetLabel: 'Average Num of Review Assignment',
        fieldsShownInToolTips: [],
        xAxisFieldName: 'r_reviewer_name',
        yAxisFieldName: 'avg_expertise_level',

        // specific to category type
        numOfResultToDisplay: 30,
      }
    }
  },
  "reviewer_avg_expertise_level_distribution": {
    name: "Reviewer Average Expertise Level Distribution",
    group: 'Review Record',
    data: {
      type: 'bar_chart',
      title: 'Reviewer Average Expertise Level Rank',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      selections: [
        {
          expression: '1',
          rename: 'num_of_reviewer'
        },
        {
          expression: 'AVG(r_expertise_level)',
          rename: 'avg_expertise_level'
        }
      ],
      involvedRecords: [
        {
          name: 'review_record',
          customized: false,
        }
      ],
      filters: [],
      joiners: [],
      groupers: [
        {
          field: "r_reviewer_name"
        }
      ],
      sorters: [
        {
          field: 'avg_expertise_level',
          order: 'ASC',
        }
      ],
      extraData: {
        type: 'group',
        dataSetLabel: 'Num of Reviewer',
        fieldsShownInToolTips: [],
        xAxisFieldName: 'avg_expertise_level',
        yAxisFieldName: 'num_of_reviewer',

        // specific to category type
        group: {
          min: 1,
          max: 5.0,
          stepSize: 0.25,
        }
      }
    }
  },
}