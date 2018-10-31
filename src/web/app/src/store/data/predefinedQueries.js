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
  "word_cloud_keywords_reviewer_comment": {
    name: "Word Cloud for Reviewer Comment",
    data: {
      type: 'word_cloud',
      title: 'Word Cloud for Reviewer Comment',
      dataSet: '${WILL_BE_REPLACED}',
      selections: [
        {
          expression: 'r_review_comment',
          rename: 'r_review_comment'
        }
      ],
      involvedRecords: [
        {
          name: 'review_record'
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
    data: {
      type: 'bar_chart',
      title: 'Submission Rank Author',
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
        fieldsShownInToolTips: [{ label: 'Email', field: 'author_email'}],
        xAxisFieldName: 'author_name',
        yAxisFieldName: 'submission_count',

        // specific to category type
        numOfResultToDisplay: 10,
      }
    }
  },
  "submission_rank_country": {
    name: "Submission Rank Country",
    data: {
      type: 'pie_chart',
      title: 'Submission Rank Country',
      dataSet: '${WILL_BE_REPLACED}',
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
          name: 'author_record'
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
    data: {
      type: 'pie_chart',
      title: 'Submission Rank Organization',
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
  },
  "review_weighted_evaluation_score_stats_summary": {
    name: "Review Weighted Evaluation Score Statistic Summary",
    data: {
      type: 'stats',
      title: 'Review Weighted Evaluation Score Statistic Summary',
      dataSet: '${WILL_BE_REPLACED}',
      selections: [
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
      sorters: [],
      extraData: {
        types: ['min', 'max', 'avg', 'median', 'std'],
      }
    }
  },
  "review_expertise_level_stats_summary": {
    name: "Reviewer Expertise Level Statistic Summary",
    data: {
      type: 'stats',
      title: 'Reviewer Expertise Level Statistic Summary',
      dataSet: '${WILL_BE_REPLACED}',
      selections: [
        {
          expression: 'r_expertise_level',
          rename: 'r_expertise_level'
        },
      ],
      involvedRecords: [
        {
          name: 'review_record'
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
    data: {
      type: 'bar_chart',
      title: 'Submission Rank Track',
      dataSet: '${WILL_BE_REPLACED}',
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
          name: 'submission_record'
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
    data: {
      type: 'bar_chart',
      title: 'Acceptance Ratio Track',
      dataSet: '${WILL_BE_REPLACED}',
      selections: [
        {
          expression: 'SUM(CASE WHEN s_is_accepted THEN 1 ELSE 0 END)/COUNT(*)',
          rename: 'acceptance_ratio'
        },
        {
          expression: "s_track_name",
          rename: 's_track_name'
        }
      ],
      involvedRecords: [
        {
          name: 'submission_record'
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
    data: {
      type: 'line_chart',
      title: 'Acceptance Ratio by Year',
      dataSet: '${WILL_BE_REPLACED}',
      selections: [
        {
          expression: 'SUM(CASE WHEN s_is_accepted THEN 1 ELSE 0 END)/COUNT(*)',
          rename: 'acceptance_ratio'
        },
        {
          expression: "YEAR(s_submission_time)",
          rename: 'year'
        }
      ],
      involvedRecords: [
        {
          name: 'submission_record'
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
    data: {
      type: 'pie_chart',
      title: 'Recommendation for Best Paper Distribution',
      dataSet: '${WILL_BE_REPLACED}',
      selections: [
        {
          expression: "CASE WHEN r_has_recommended_for_best_paper THEN 'Recommended' ELSE 'Not Recommended' END",
          rename: 'label'
        },
        {
          expression: "COUNT(*)",
          rename: 'review_count'
        }
      ],
      involvedRecords: [
        {
          name: 'review_record'
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
    data: {
      type: 'stats',
      title: 'Review Count Summary for Each Submission',
      dataSet: '${WILL_BE_REPLACED}',
      selections: [
        {
          expression: 'COUNT(*)',
          rename: 'number_of_review'
        },
      ],
      involvedRecords: [
        {
          name: 'review_record'
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
    data: {
      type: 'bar_chart',
      title: 'Submission Acceptance Rate Rank Author',
      dataSet: '${WILL_BE_REPLACED}',
      selections: [
        {
          expression: 'SUM(CASE WHEN s_is_accepted THEN 1 ELSE 0 END)/COUNT(*)',
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
          expression: "SUM(CASE WHEN s_is_accepted THEN 1 ELSE 0 END)",
          rename: 'accepted'
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
    data: {
      type: 'bar_chart',
      title: 'Submission Acceptance Rate Rank Organization',
      dataSet: '${WILL_BE_REPLACED}',
      selections: [
        {
          expression: 'SUM(CASE WHEN s_is_accepted THEN 1 ELSE 0 END)/COUNT(*)',
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
          expression: "SUM(CASE WHEN s_is_accepted THEN 1 ELSE 0 END)",
          rename: 'accepted'
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
    data: {
      type: 'bar_chart',
      title: 'Submission Acceptance Rate Rank Country',
      dataSet: '${WILL_BE_REPLACED}',
      selections: [
        {
          expression: 'SUM(CASE WHEN s_is_accepted THEN 1 ELSE 0 END)/COUNT(*)',
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
          expression: "SUM(CASE WHEN s_is_accepted THEN 1 ELSE 0 END)",
          rename: 'accepted'
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
    data: {
      type: 'bar_chart',
      title: 'Reviewer Assignment Rank',
      dataSet: '${WILL_BE_REPLACED}',
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
          name: 'review_record'
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
    data: {
      type: 'bar_chart',
      title: 'Reviewer Average Expertise Level Rank',
      dataSet: '${WILL_BE_REPLACED}',
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
          name: 'review_record'
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
    data: {
      type: 'bar_chart',
      title: 'Reviewer Average Expertise Level Rank',
      dataSet: '${WILL_BE_REPLACED}',
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
          name: 'review_record'
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