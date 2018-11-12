export default {
  "word_cloud_keywords_all_submission": {
    name: "Word Cloud for All Submissions Keywords",
    group: 'Submission Record',
    data: {
      type: 'word_cloud',
      title: 'Word Cloud for All Submissions',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      description: 'This word cloud shows a list of key words found under abstract section for all submitted papers.',
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
        delimiters: ['\\r', '\\n'],
        ignoreWords: [],
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
      description: 'This word cloud shows a list of key words found under reviewer\'s comments for reviewed papers.',
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
        delimiters: ['\\r', '\\n', '\\s'],
        ignoreWords: ["the", "to", "of", "and", "in", "a", "are", "is", "this", "it", "that", "on", "be", "have",
          "for", "as", "an", "would", "some", "there", "from", "or", "by", "they", "can", "with", "should", "how", "what",
          "at", "could", "if"],
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
      description: 'This bar chart shows the number of papers submitted by each author in descending order. This tells us which author has more submissions than other authors.',
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
        dataSetLabel: 'Submission Counts',
        fieldsShownInToolTips: [{label: 'Email', field: 'author_email'}],
        xAxisFieldName: 'author_name',
        yAxisFieldName: 'submission_count',
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
      description: 'This bar chart shows the number of papers each author submitted based in descending order. This tells us which authors submitted the more papers than other authors.',
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

        numOfResultToDisplay: 10,
      }
    }
  },
  "submission_acceptance_rate_rank_paper_author": {
    name: "Submission Acceptance Rate Rank Paper Author",
    group: 'Submission Record',
    data: {
      type: 'bar_chart',
      title: 'Submission Acceptance Rate Rank Paper Author',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      description: 'This bar chart shows the percentage of acceptance rate of each author\'s papers in descending order. This tells us which authors has higher acceptance rate than other authors.',
      selections: [
        {
          expression: "SUM(CASE WHEN s_is_accepted = 'accept' THEN 1 ELSE 0 END)",
          rename: 'accepted'
        },
        {
          expression: "COUNT(*)",
          rename: 'submitted'
        },
        {
          expression: "SUM(CASE WHEN s_is_accepted = 'accept' THEN 1 ELSE 0 END)/COUNT(*)",
          rename: 'acceptance_rate'
        },
        {
          expression: "s_author_name",
          rename: 's_author_name'
        },
      ],
      involvedRecords: [
        {
          name: "(SELECT s_author_name, s_is_accepted FROM submission_record, submission_record_author_set, submission_author_record " +
            "WHERE s_id = submission_record_s_id AND author_set_s_author_id = s_author_id AND submission_record.data_set = '${PLACEHOLDER_DATA_SET}') AS `tmp`",
          customized: true,
        }
      ],
      filters: [],
      joiners: [],
      groupers: [
        {
          field: "s_author_name"
        },
      ],
      sorters: [
        {
          field: 'acceptance_rate',
          order: 'DESC',
        },
        {
          field: 's_author_name',
          order: 'ASC',
        }
      ],
      extraData: {
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
        xAxisFieldName: 's_author_name',
        yAxisFieldName: 'acceptance_rate',
        numOfResultToDisplay: 10,
      }
    }
  },
  "submission_accepted_rank_paper_author": {
    name: "Submission Accepted Rank Paper Author",
    group: 'Submission Record',
    data: {
      type: 'bar_chart',
      title: 'Submission Accepted Rank Paper Author',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      description: 'This bar chart shows the number of accepted papers submitted by each author in descending order. This tells us which authors has more accepted papers than other authors.',
      selections: [
        {
          expression: "SUM(CASE WHEN s_is_accepted = 'accept' THEN 1 ELSE 0 END)",
          rename: 'accepted'
        },
        {
          expression: "COUNT(*)",
          rename: 'submitted'
        },
        {
          expression: "SUM(CASE WHEN s_is_accepted = 'accept' THEN 1 ELSE 0 END)/COUNT(*)",
          rename: 'acceptance_rate'
        },
        {
          expression: "s_author_name",
          rename: 's_author_name'
        },
      ],
      involvedRecords: [
        {
          name: "(SELECT s_author_name, s_is_accepted FROM submission_record, submission_record_author_set, submission_author_record " +
            "WHERE s_id = submission_record_s_id AND author_set_s_author_id = s_author_id AND submission_record.data_set = '${PLACEHOLDER_DATA_SET}') AS `tmp`",
          customized: true,
        }
      ],
      filters: [],
      joiners: [],
      groupers: [
        {
          field: "s_author_name"
        },
      ],
      sorters: [
        {
          field: 'accepted',
          order: 'DESC',
        },
        {
          field: 's_author_name',
          order: 'ASC',
        }
      ],
      extraData: {
        dataSetLabel: 'Acceptance Rate',
        fieldsShownInToolTips: [
          {
            label: 'Acceptance Rate',
            field: 'acceptance_rate',
          },
          {
            label: 'Total Submitted',
            field: 'submitted',
          },
        ],
        xAxisFieldName: 's_author_name',
        yAxisFieldName: 'accepted',
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
      description: 'This pie chart shows the percentage and number of papers submitted from each country. This tells us which country has more submissions than other countries.',
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
      description: 'This pie chart shows the percentage and number of papers submitted from each organization. This tells us which organization has more submissions than other organizations.',
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
  "review_weighted_score_distribution": {
    name: "Review Weighted Score Distribution",
    group: 'Review Record',
    data: {
      type: 'bar_chart',
      title: 'Review Weighted Score Distribution',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      description: 'This bar chart shows the distribution of the weighted review score for all papers. This is calculated by retrieving the overall reviewed score and reviewer\'s confidence score in order to obtain a weighted average of all the scores. This gives us an insight on how the general score range for each submission.',
      selections: [
        {
          expression: 'weighted_score_interval',
          rename: 'weighted_score_interval'
        },
        {
          expression: "COUNT(*) - 1",
          rename: 'submission_count',
        }
      ],
      involvedRecords: [
        {
          name: "(SELECT CASE  \n" +
            "  WHEN weighted_score <= -2.75 THEN 1\n" +
            "  WHEN weighted_score <= -2.50 THEN 2\n" +
            "  WHEN weighted_score <= -2.25 THEN 3\n" +
            "  WHEN weighted_score <= -2.00 THEN 4\n" +
            "  WHEN weighted_score <= -1.75 THEN 5\n" +
            "  WHEN weighted_score <= -1.50 THEN 6\n" +
            "  WHEN weighted_score <= -1.25 THEN 7\n" +
            "  WHEN weighted_score <= -1.00 THEN 8\n" +
            "  WHEN weighted_score <= -0.75 THEN 9\n" +
            "  WHEN weighted_score <= -0.50 THEN 10\n" +
            "  WHEN weighted_score <= -0.25 THEN 11\n" +
            "  WHEN weighted_score <= 0.00 THEN 12\n" +
            "  WHEN weighted_score <= 0.25 THEN 13\n" +
            "  WHEN weighted_score <= 0.50 THEN 14\n" +
            "  WHEN weighted_score <= 0.75 THEN 15\n" +
            "  WHEN weighted_score <= 1.00 THEN 16\n" +
            "  WHEN weighted_score <= 1.25 THEN 17\n" +
            "  WHEN weighted_score <= 1.50 THEN 18\n" +
            "  WHEN weighted_score <= 1.75 THEN 19\n" +
            "  WHEN weighted_score <= 2.00 THEN 20\n" +
            "  WHEN weighted_score <= 2.25 THEN 21\n" +
            "  WHEN weighted_score <= 2.50 THEN 22\n" +
            "  WHEN weighted_score <= 2.75 THEN 23\n" +
            "  WHEN weighted_score <= 3.00 THEN 24\n" +
            "END `weighted_score_interval_sort`, CASE  \n" +
            "  WHEN weighted_score <= -2.75 THEN '-3.00 ~ -2.75'\n" +
            "  WHEN weighted_score <= -2.50 THEN '-2.75 ~ -2.50'\n" +
            "  WHEN weighted_score <= -2.25 THEN '-2.50 ~ -2.25'\n" +
            "  WHEN weighted_score <= -2.00 THEN '-2.25 ~ -2.00'\n" +
            "  WHEN weighted_score <= -1.75 THEN '-2.00 ~ -1.75'\n" +
            "  WHEN weighted_score <= -1.50 THEN '-1.75 ~ -1.50'\n" +
            "  WHEN weighted_score <= -1.25 THEN '-1.50 ~ -1.25'\n" +
            "  WHEN weighted_score <= -1.00 THEN '-1.25 ~ -1.00'\n" +
            "  WHEN weighted_score <= -0.75 THEN '-1.00 ~ -0.75'\n" +
            "  WHEN weighted_score <= -0.50 THEN '-0.75 ~ -0.50'\n" +
            "  WHEN weighted_score <= -0.25 THEN '-0.50 ~ -0.25'\n" +
            "  WHEN weighted_score <= 0.00 THEN '-0.25 ~ 0.00'\n" +
            "  WHEN weighted_score <= 0.25 THEN '0.00 ~ 0.25'\n" +
            "  WHEN weighted_score <= 0.50 THEN '0.25 ~ 0.50'\n" +
            "  WHEN weighted_score <= 0.75 THEN '0.50 ~ 0.75'\n" +
            "  WHEN weighted_score <= 1.00 THEN '0.75 ~ 1.00'\n" +
            "  WHEN weighted_score <= 1.25 THEN '1.00 ~ 1.25'\n" +
            "  WHEN weighted_score <= 1.50 THEN '1.25 ~ 1.50'\n" +
            "  WHEN weighted_score <= 1.75 THEN '1.50 ~ 1.75'\n" +
            "  WHEN weighted_score <= 2.00 THEN '1.75 ~ 2.00'\n" +
            "  WHEN weighted_score <= 2.25 THEN '2.00 ~ 2.25'\n" +
            "  WHEN weighted_score <= 2.50 THEN '2.25 ~ 2.50'\n" +
            "  WHEN weighted_score <= 2.75 THEN '2.50 ~ 2.75'\n" +
            "  WHEN weighted_score <= 3.00 THEN '2.75 ~ 3.00'\n" +
            "END AS `weighted_score_interval` FROM (SELECT SUM(r_confidence_level * r_overall_evaluation_score) / SUM(r_confidence_level) AS `weighted_score` " +
            "FROM review_record WHERE review_record.data_set = '${PLACEHOLDER_DATA_SET}' GROUP BY r_submission_id " +
            "UNION ALL SELECT -2.75\n" +
            "UNION ALL SELECT -2.50\n" +
            "UNION ALL SELECT -2.25\n" +
            "UNION ALL SELECT -2.00\n" +
            "UNION ALL SELECT -1.75\n" +
            "UNION ALL SELECT -1.50\n" +
            "UNION ALL SELECT -1.25\n" +
            "UNION ALL SELECT -1.00\n" +
            "UNION ALL SELECT -0.75\n" +
            "UNION ALL SELECT -0.50\n" +
            "UNION ALL SELECT -0.25\n" +
            "UNION ALL SELECT 0.00\n" +
            "UNION ALL SELECT 0.25\n" +
            "UNION ALL SELECT 0.50\n" +
            "UNION ALL SELECT 0.75\n" +
            "UNION ALL SELECT 1.00\n" +
            "UNION ALL SELECT 1.25\n" +
            "UNION ALL SELECT 1.50\n" +
            "UNION ALL SELECT 1.75\n" +
            "UNION ALL SELECT 2.00\n" +
            "UNION ALL SELECT 2.25\n" +
            "UNION ALL SELECT 2.50\n" +
            "UNION ALL SELECT 2.75\n" +
            "UNION ALL SELECT 3.00) AS `tmp1`) AS `tmp2`",
          customized: true,
        }
      ],
      filters: [],
      joiners: [],
      groupers: [{
        field: 'weighted_score_interval'
      }, {
        field: 'weighted_score_interval_sort'
      }],
      sorters: [
        {
          field: 'weighted_score_interval_sort',
          order: 'ASC',
        }
      ],
      extraData: {
        dataSetLabel: 'Num of Submission',
        fieldsShownInToolTips: [],
        xAxisFieldName: 'weighted_score_interval',
        yAxisFieldName: 'submission_count',
        numOfResultToDisplay: 50,
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
      description: 'This table shows the weighted evaluation score statistics based on the minimum, maximum value, the average, median score and the standard deviation of the weighted evaluation scores. This gives us an insight on the evaluation score given by each reviewer in their review.',
      selections: [
        {
          expression: 'SUM(r_confidence_level * r_overall_evaluation_score) / SUM(r_confidence_level)',
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
      description: 'This table shows the reviewer expertise level statistics based on the minimum, maximum value, the average, median score and the standard deviation of the weighted evaluation scores. This gives us an insight on how specialized each reviewer is in their review.',
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
      groupers: [],
      sorters: [],
      extraData: {
        types: ['min', 'max', 'avg', 'median', 'std'],
      }
    }
  },
  "review_confidence_level_stats_summary": {
    name: "Reviewer Confidence Level Statistic Summary",
    group: 'Review Record',
    data: {
      type: 'stats',
      title: 'Reviewer Confidence Level Statistic Summary',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      description: 'This table shows the reviewer confidence level statistics based on the minimum, maximum value, the average, median score and the standard deviation of the weighted evaluation scores. This gives us an insight on how confident each reviewer is in their review.',
      selections: [
        {
          expression: 'r_confidence_level',
          rename: 'r_confidence_level'
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
      groupers: [],
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
      description: 'This bar chart shows the number of papers submitted in each track. This tells us which track is more popular than other tracks.',
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
        dataSetLabel: 'Submission Count',
        fieldsShownInToolTips: [],
        xAxisFieldName: 's_track_name',
        yAxisFieldName: 'submission_count',
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
      description: 'This bar char shows the acceptance rate of each paper based on tracks. This tells us which track has higher acceptance rate than others.',
      selections: [
        {
          expression: "SUM(CASE WHEN s_is_accepted = 'accept' THEN 1 ELSE 0 END)/COUNT(*)",
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
        dataSetLabel: 'Acceptance Ratio',
        fieldsShownInToolTips: [],
        xAxisFieldName: 's_track_name',
        yAxisFieldName: 'acceptance_ratio',
        numOfResultToDisplay: 10,
      }
    }
  },
  "acceptance_ratio_by_year": {
    name: "Acceptance Ratio by Year",
    group: 'Submission Record',
    data: {
      type: 'line_chart',
      title: 'Acceptance Ratio by Year',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      description: 'This area under line graph shows the acceptance rate of all submitted papers based on different years. This tells us which year has more papers getting accepted than other years.',
      selections: [
        {
          expression: "SUM(CASE WHEN s_is_accepted = 'accept' THEN 1 ELSE 0 END)/COUNT(*)",
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
      description: 'This pie chart shows the number and percentage of papers recommended and not recommended for best paper. This tells us how many papers are worthy to be submitted for the best paper',
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
      description: 'This table shows a statistic of the number of reviews for each submission based on  the minimum, maximum value, the average and median score. This gives us an insight to how many reviews are provided for each submission.',
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
      description: 'By combining author and submission data, this bar chart shows the percentage of acceptance rate of each author\'s papers in descending order. This tells us which authors has higher acceptance rate than other authors.',
      selections: [
        {
          expression: "SUM(CASE WHEN s_is_accepted = 'accept' THEN 1 ELSE 0 END)/COUNT(*)",
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
          expression: "SUM(CASE WHEN s_is_accepted = 'accept' THEN 1 ELSE 0 END)",
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
        numOfResultToDisplay: 10,
      }
    }
  },
  "submission_accepted_rank_author": {
    name: "Submission Accepted Rank Author",
    group: 'Author Record + Submission Record',
    data: {
      type: 'bar_chart',
      title: 'Submission Accepted Rank Author',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      description: 'By combining author and submission data, this bar chart shows the number of accepted papers submitted by each author in descending order. This tells us which authors has more accepted papers than other authors.',
      selections: [
        {
          expression: "SUM(CASE WHEN s_is_accepted = 'accept' THEN 1 ELSE 0 END)/COUNT(*)",
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
          expression: "SUM(CASE WHEN s_is_accepted = 'accept' THEN 1 ELSE 0 END)",
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
          field: 'accepted',
          order: 'DESC',
        },
        {
          field: 'a_email',
          order: 'ASC',
        }
      ],
      extraData: {
        dataSetLabel: 'Acceptance Rate',
        fieldsShownInToolTips: [
          {
            label: 'Email',
            field: 'author_email',
          },
          {
            label: 'Accepted Rate',
            field: 'acceptance_rate',
          },
          {
            label: 'Total Submitted',
            field: 'submitted',
          },
        ],
        xAxisFieldName: 'author_name',
        yAxisFieldName: 'accepted',
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
      description: 'By combining author and submission, this bar chart shows the percentage of acceptance rate of each organization\'s papers in descending order. This tells us which organizations has higher acceptance rate than other organizations.',
      selections: [
        {
          expression: "SUM(CASE WHEN s_is_accepted = 'accept' THEN 1 ELSE 0 END)/COUNT(*)",
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
          expression: "SUM(CASE WHEN s_is_accepted = 'accept' THEN 1 ELSE 0 END)",
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
        numOfResultToDisplay: 10,
      }
    }
  },
  "submission_accepted_rank_organisation": {
    name: "Submission Accepted Rank Organization",
    group: 'Author Record + Submission Record',
    data: {
      type: 'bar_chart',
      title: 'Submission Accepted Rank Organization',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      description: 'By combining author and submission data, this bar chart shows the number of accepted papers submitted by each organization in descending order. This tells us which organizations has more accepted papers than other organizations.',
      selections: [
        {
          expression: "SUM(CASE WHEN s_is_accepted = 'accept' THEN 1 ELSE 0 END)/COUNT(*)",
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
          expression: "SUM(CASE WHEN s_is_accepted = 'accept' THEN 1 ELSE 0 END)",
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
          field: 'accepted',
          order: 'DESC',
        },
        {
          field: 'a_organisation',
          order: 'ASC',
        }
      ],
      extraData: {
        dataSetLabel: 'Acceptance Rate',
        fieldsShownInToolTips: [
          {
            label: 'Total Accepted',
            field: 'accepted',
          },
          {
            label: 'Acceptance Rate',
            field: 'acceptance_rate',
          },
        ],
        xAxisFieldName: 'a_organisation',
        yAxisFieldName: 'accepted',
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
      description: 'By combining author and submission, this bar chart shows the percentage of acceptance rate of each country\'s papers in descending order. This tells us which countries has higher acceptance rate than other countries.',
      selections: [
        {
          expression: "SUM(CASE WHEN s_is_accepted = 'accept' THEN 1 ELSE 0 END)/COUNT(*)",
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
          expression: "SUM(CASE WHEN s_is_accepted = 'accept' THEN 1 ELSE 0 END)",
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
        numOfResultToDisplay: 10,
      }
    }
  },
  "submission_accepted_rank_country": {
    name: "Submission Accepted Rank Country",
    group: 'Author Record + Submission Record',
    data: {
      type: 'bar_chart',
      title: 'Submission Accepted Rank Country',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      description: 'By combining author and submission data, this bar chart shows the number of accepted papers submitted by each country in descending order. This tells us which countries has more accepted papers than other countries.',
      selections: [
        {
          expression: "SUM(CASE WHEN s_is_accepted = 'accept' THEN 1 ELSE 0 END)/COUNT(*)",
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
          expression: "SUM(CASE WHEN s_is_accepted = 'accept' THEN 1 ELSE 0 END)",
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
          field: 'accepted',
          order: 'DESC',
        },
        {
          field: 'a_country',
          order: 'ASC',
        }
      ],
      extraData: {
        dataSetLabel: 'Acceptance Rate',
        fieldsShownInToolTips: [
          {
            label: 'Acceptance Rate',
            field: 'acceptance_rate',
          },
          {
            label: 'Total Submitted',
            field: 'submitted',
          },
        ],
        xAxisFieldName: 'a_country',
        yAxisFieldName: 'accepted',
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
      description: 'This bar chart shows the number of fields each reviewer is assigned to in descending order. A high number shows that the author is knowledgeable as he or she reviewed in multiple fields.',
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
        dataSetLabel: 'Average Num of Review Assignment',
        fieldsShownInToolTips: [],
        xAxisFieldName: 'r_reviewer_name',
        yAxisFieldName: 'review_assignment',
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
      description: 'This bar chart shows the average expertise level for each reviewer in descending order. This tells us how skilled each reviewer is in reviewer the papers.',
      selections: [
        {
          expression: 'AVG(r_confidence_level)',
          rename: 'avg_confidence_level'
        },
        {
          expression: 'AVG(r_expertise_level)',
          rename: 'avg_expertise_level'
        },
        {
          expression: 'AVG(r_overall_evaluation_score)',
          rename: 'avg_evaluation_score'
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
        dataSetLabel: 'Average Expertise Level',
        fieldsShownInToolTips: [
          {
            label: 'Average Evaluation Score',
            field: 'avg_evaluation_score',
          },
          {
            label: 'Average Confidence Level',
            field: 'avg_confidence_level',
          },
        ],
        xAxisFieldName: 'r_reviewer_name',
        yAxisFieldName: 'avg_expertise_level',
        numOfResultToDisplay: 30,
      }
    }
  },
  "reviewer_avg_confidence_level_rank": {
    name: "Reviewer Average Confidence Level Rank",
    group: 'Review Record',
    data: {
      type: 'bar_chart',
      title: 'Reviewer Average Confidence Level Rank',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      description: 'This bar chart shows the average confidence level for each reviewer in descending order. This tells us how confident each reviewer is in giving their review for other papers.',
      selections: [
        {
          expression: 'AVG(r_confidence_level)',
          rename: 'avg_confidence_level'
        },
        {
          expression: 'AVG(r_expertise_level)',
          rename: 'avg_expertise_level'
        },
        {
          expression: 'AVG(r_overall_evaluation_score)',
          rename: 'avg_evaluation_score'
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
          field: 'avg_confidence_level',
          order: 'DESC',
        },
        {
          field: 'r_reviewer_name',
          order: 'ASC',
        }
      ],
      extraData: {
        dataSetLabel: 'Average Confidence Level',
        fieldsShownInToolTips: [
          {
            label: 'Average Evaluation Score',
            field: 'avg_evaluation_score',
          },
          {
            label: 'Average Expertise Level',
            field: 'avg_expertise_level',
          },
        ],
        xAxisFieldName: 'r_reviewer_name',
        yAxisFieldName: 'avg_confidence_level',
        numOfResultToDisplay: 30,
      }
    }
  },
  "reviewer_avg_evaluation_score_rank": {
    name: "Reviewer Average Evaluation Score Rank",
    group: 'Review Record',
    data: {
      type: 'bar_chart',
      title: 'Reviewer Average Evaluation Score Rank',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      description: 'This bar chart shows the average evaluation score given by each reviewer in descending order. This gives us an insight of how generous the reviewer grade other papers in general.',
      selections: [
        {
          expression: 'AVG(r_confidence_level)',
          rename: 'avg_confidence_level'
        },
        {
          expression: 'AVG(r_expertise_level)',
          rename: 'avg_expertise_level'
        },
        {
          expression: 'AVG(r_overall_evaluation_score)',
          rename: 'avg_evaluation_score'
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
          field: 'avg_evaluation_score',
          order: 'DESC',
        },
        {
          field: 'r_reviewer_name',
          order: 'ASC',
        }
      ],
      extraData: {
        dataSetLabel: 'Average Evaluation Level',
        fieldsShownInToolTips: [
          {
            label: 'Average Confidence Level',
            field: 'avg_confidence_level',
          },
          {
            label: 'Average Expertise Level',
            field: 'avg_expertise_level',
          },
        ],
        xAxisFieldName: 'r_reviewer_name',
        yAxisFieldName: 'avg_evaluation_score',
        numOfResultToDisplay: 30,
      }
    }
  },
  "num_of_review_distribution": {
    name: "Number of Review Distribution",
    group: "Review Record",
    data: {
      type: 'bar_chart',
      title: 'Number of Review Distribution',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      description: 'This bar chart shows the distribution of the number of reviews for each submitted paper. This gives us an insight on how many reviews are made for each submission.',
      selections: [
        {
          expression: 'COUNT(*)-1',
          rename: 'num_of_submission'
        },
        {
          expression: 'num_of_review',
          rename: 'num_of_review',
        }
      ],
      involvedRecords: [{
        name: "(SELECT IF(COUNT(*)<10, CONVERT(COUNT(*), char), '>=10') AS `num_of_review` FROM review_record WHERE " +
          "review_record.data_set = '${PLACEHOLDER_DATA_SET}' AND review_record.data_set = '${PLACEHOLDER_DATA_SET}' " +
          "GROUP BY r_submission_id " +
          "UNION ALL SELECT '0'" +
          "UNION ALL SELECT '1'" +
          "UNION ALL SELECT '2'" +
          "UNION ALL SELECT '3'" +
          "UNION ALL SELECT '4'" +
          "UNION ALL SELECT '5'" +
          "UNION ALL SELECT '6'" +
          "UNION ALL SELECT '7'" +
          "UNION ALL SELECT '8'" +
          "UNION ALL SELECT '9'" +
          "UNION ALL SELECT '>=10') AS `tmp`",
        customized: true,
      }],
      filters: [],
      joiners: [],
      groupers: [{
        field: 'num_of_review'
      }],
      sorters: [
        {
          field: 'num_of_review',
          order: 'ASC',
        }
      ],
      extraData: {
        dataSetLabel: 'Num of Submission',
        fieldsShownInToolTips: [],
        xAxisFieldName: 'num_of_review',
        yAxisFieldName: 'num_of_submission',
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
      description: 'This bar chart shows the distribution of the expertise level of each reviewer in reviewing all the papers. This gives us an insight of how specialized each reviewer is in giving the review.',
      selections: [
        {
          expression: 'avg_expertise_level_interval',
          rename: 'avg_expertise_level_interval'
        },
        {
          expression: "COUNT(*) - 1",
          rename: 'num_of_reviewer',
        },
        {
          expression: "SUM(avg_evaluation_score) / (COUNT(*) - 1)",
          rename: 'evaluation_score_in_group',
        },
        {
          expression: "SUM(avg_confidence_level) / (COUNT(*) - 1)",
          rename: 'confidence_level_in_group',
        }
      ],
      involvedRecords: [
        {
          name: "(SELECT CASE  \n" +
            "  WHEN avg_expertise_level <= 0.25 THEN 1\n" +
            "  WHEN avg_expertise_level <= 0.50 THEN 2\n" +
            "  WHEN avg_expertise_level <= 0.75 THEN 3\n" +
            "  WHEN avg_expertise_level <= 1.00 THEN 4\n" +
            "  WHEN avg_expertise_level <= 1.25 THEN 5\n" +
            "  WHEN avg_expertise_level <= 1.50 THEN 6\n" +
            "  WHEN avg_expertise_level <= 1.75 THEN 7\n" +
            "  WHEN avg_expertise_level <= 2.00 THEN 8\n" +
            "  WHEN avg_expertise_level <= 2.25 THEN 9\n" +
            "  WHEN avg_expertise_level <= 2.50 THEN 10\n" +
            "  WHEN avg_expertise_level <= 2.75 THEN 11\n" +
            "  WHEN avg_expertise_level <= 3.00 THEN 12\n" +
            "  WHEN avg_expertise_level <= 3.25 THEN 13\n" +
            "  WHEN avg_expertise_level <= 3.50 THEN 14\n" +
            "  WHEN avg_expertise_level <= 3.75 THEN 15\n" +
            "  WHEN avg_expertise_level <= 4.00 THEN 16\n" +
            "  WHEN avg_expertise_level <= 4.25 THEN 17\n" +
            "  WHEN avg_expertise_level <= 4.50 THEN 18\n" +
            "  WHEN avg_expertise_level <= 4.75 THEN 19\n" +
            "  WHEN avg_expertise_level <= 5.00 THEN 20\n" +
            "END `avg_expertise_level_interval_sort`, CASE  \n" +
            "  WHEN avg_expertise_level <= 0.25 THEN '0.00 ~ 0.25'\n" +
            "  WHEN avg_expertise_level <= 0.50 THEN '0.25 ~ 0.50'\n" +
            "  WHEN avg_expertise_level <= 0.75 THEN '0.50 ~ 0.75'\n" +
            "  WHEN avg_expertise_level <= 1.00 THEN '0.75 ~ 1.00'\n" +
            "  WHEN avg_expertise_level <= 1.25 THEN '1.00 ~ 1.25'\n" +
            "  WHEN avg_expertise_level <= 1.50 THEN '1.25 ~ 1.50'\n" +
            "  WHEN avg_expertise_level <= 1.75 THEN '1.50 ~ 1.75'\n" +
            "  WHEN avg_expertise_level <= 2.00 THEN '1.75 ~ 2.00'\n" +
            "  WHEN avg_expertise_level <= 2.25 THEN '2.00 ~ 2.25'\n" +
            "  WHEN avg_expertise_level <= 2.50 THEN '2.25 ~ 2.50'\n" +
            "  WHEN avg_expertise_level <= 2.75 THEN '2.50 ~ 2.75'\n" +
            "  WHEN avg_expertise_level <= 3.00 THEN '2.75 ~ 3.00'\n" +
            "  WHEN avg_expertise_level <= 3.25 THEN '3.00 ~ 3.25'\n" +
            "  WHEN avg_expertise_level <= 3.50 THEN '3.25 ~ 3.50'\n" +
            "  WHEN avg_expertise_level <= 3.75 THEN '3.50 ~ 3.75'\n" +
            "  WHEN avg_expertise_level <= 4.00 THEN '3.75 ~ 4.00'\n" +
            "  WHEN avg_expertise_level <= 4.25 THEN '4.00 ~ 4.25'\n" +
            "  WHEN avg_expertise_level <= 4.50 THEN '4.25 ~ 4.50'\n" +
            "  WHEN avg_expertise_level <= 4.75 THEN '4.50 ~ 4.75'\n" +
            "  WHEN avg_expertise_level <= 5.00 THEN '4.75 ~ 5.00'\n" +
            "END AS `avg_expertise_level_interval`, avg_evaluation_score, avg_confidence_level FROM (SELECT AVG(r_confidence_level) AS `avg_confidence_level`, AVG(r_overall_evaluation_score) AS `avg_evaluation_score`, AVG(r_expertise_level) AS `avg_expertise_level` " +
            "FROM review_record WHERE review_record.data_set = '${PLACEHOLDER_DATA_SET}' GROUP BY r_reviewer_name " +
            "UNION ALL SELECT 0, 0, 0.25\n" +
            "UNION ALL SELECT 0, 0, 0.50\n" +
            "UNION ALL SELECT 0, 0, 0.75\n" +
            "UNION ALL SELECT 0, 0, 1.00\n" +
            "UNION ALL SELECT 0, 0, 1.25\n" +
            "UNION ALL SELECT 0, 0, 1.50\n" +
            "UNION ALL SELECT 0, 0, 1.75\n" +
            "UNION ALL SELECT 0, 0, 2.00\n" +
            "UNION ALL SELECT 0, 0, 2.25\n" +
            "UNION ALL SELECT 0, 0, 2.50\n" +
            "UNION ALL SELECT 0, 0, 2.75\n" +
            "UNION ALL SELECT 0, 0, 3.00\n" +
            "UNION ALL SELECT 0, 0, 3.25\n" +
            "UNION ALL SELECT 0, 0, 3.50\n" +
            "UNION ALL SELECT 0, 0, 3.75\n" +
            "UNION ALL SELECT 0, 0, 4.00\n" +
            "UNION ALL SELECT 0, 0, 4.25\n" +
            "UNION ALL SELECT 0, 0, 4.50\n" +
            "UNION ALL SELECT 0, 0, 4.75\n" +
            "UNION ALL SELECT 0, 0, 5.00) AS `tmp1`) AS `tmp2`",
          customized: true,
        }
      ],
      filters: [],
      joiners: [],
      groupers: [
        {
          field: "avg_expertise_level_interval"
        },
        {
          field: 'avg_expertise_level_interval_sort'
        }
      ],
      sorters: [
        {
          field: 'avg_expertise_level_interval_sort',
          order: 'ASC',
        }
      ],
      extraData: {
        dataSetLabel: 'Num of Reviewer',
        fieldsShownInToolTips: [
          {
            label: 'Evaluation Score in Group',
            field: 'evaluation_score_in_group',
          },
          {
            label: 'Confidence Level in Group',
            field: 'confidence_level_in_group',
          },
        ],
        xAxisFieldName: 'avg_expertise_level_interval',
        yAxisFieldName: 'num_of_reviewer',
        numOfResultToDisplay: 30,
      }
    }
  },
  "reviewer_avg_confidence_level_distribution": {
    name: "Reviewer Average Confidence Level Distribution",
    group: 'Review Record',
    data: {
      type: 'bar_chart',
      title: 'Reviewer Average Confidence Level Rank',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      description: 'This bar chart shows the distribution of the confidence level of each reviewer in reviewing all the papers. This gives us an insight of how confident each reviewer is in giving the review.',
      selections: [
        {
          expression: 'avg_confidence_level_interval',
          rename: 'avg_confidence_level_interval'
        },
        {
          expression: "COUNT(*) - 1",
          rename: 'num_of_reviewer',
        },
        {
          expression: "SUM(avg_evaluation_score) / (COUNT(*) - 1)",
          rename: 'evaluation_score_in_group',
        },
        {
          expression: "SUM(avg_expertise_level) / (COUNT(*) - 1)",
          rename: 'expertise_level_in_group',
        }
      ],
      involvedRecords: [
        {
          name: "(SELECT CASE  \n" +
            "  WHEN avg_confidence_level <= 0.25 THEN 1\n" +
            "  WHEN avg_confidence_level <= 0.50 THEN 2\n" +
            "  WHEN avg_confidence_level <= 0.75 THEN 3\n" +
            "  WHEN avg_confidence_level <= 1.00 THEN 4\n" +
            "  WHEN avg_confidence_level <= 1.25 THEN 5\n" +
            "  WHEN avg_confidence_level <= 1.50 THEN 6\n" +
            "  WHEN avg_confidence_level <= 1.75 THEN 7\n" +
            "  WHEN avg_confidence_level <= 2.00 THEN 8\n" +
            "  WHEN avg_confidence_level <= 2.25 THEN 9\n" +
            "  WHEN avg_confidence_level <= 2.50 THEN 10\n" +
            "  WHEN avg_confidence_level <= 2.75 THEN 11\n" +
            "  WHEN avg_confidence_level <= 3.00 THEN 12\n" +
            "  WHEN avg_confidence_level <= 3.25 THEN 13\n" +
            "  WHEN avg_confidence_level <= 3.50 THEN 14\n" +
            "  WHEN avg_confidence_level <= 3.75 THEN 15\n" +
            "  WHEN avg_confidence_level <= 4.00 THEN 16\n" +
            "  WHEN avg_confidence_level <= 4.25 THEN 17\n" +
            "  WHEN avg_confidence_level <= 4.50 THEN 18\n" +
            "  WHEN avg_confidence_level <= 4.75 THEN 19\n" +
            "  WHEN avg_confidence_level <= 5.00 THEN 20\n" +
            "END `avg_confidence_level_interval_sort`, CASE  \n" +
            "  WHEN avg_confidence_level <= 0.25 THEN '0.00 ~ 0.25'\n" +
            "  WHEN avg_confidence_level <= 0.50 THEN '0.25 ~ 0.50'\n" +
            "  WHEN avg_confidence_level <= 0.75 THEN '0.50 ~ 0.75'\n" +
            "  WHEN avg_confidence_level <= 1.00 THEN '0.75 ~ 1.00'\n" +
            "  WHEN avg_confidence_level <= 1.25 THEN '1.00 ~ 1.25'\n" +
            "  WHEN avg_confidence_level <= 1.50 THEN '1.25 ~ 1.50'\n" +
            "  WHEN avg_confidence_level <= 1.75 THEN '1.50 ~ 1.75'\n" +
            "  WHEN avg_confidence_level <= 2.00 THEN '1.75 ~ 2.00'\n" +
            "  WHEN avg_confidence_level <= 2.25 THEN '2.00 ~ 2.25'\n" +
            "  WHEN avg_confidence_level <= 2.50 THEN '2.25 ~ 2.50'\n" +
            "  WHEN avg_confidence_level <= 2.75 THEN '2.50 ~ 2.75'\n" +
            "  WHEN avg_confidence_level <= 3.00 THEN '2.75 ~ 3.00'\n" +
            "  WHEN avg_confidence_level <= 3.25 THEN '3.00 ~ 3.25'\n" +
            "  WHEN avg_confidence_level <= 3.50 THEN '3.25 ~ 3.50'\n" +
            "  WHEN avg_confidence_level <= 3.75 THEN '3.50 ~ 3.75'\n" +
            "  WHEN avg_confidence_level <= 4.00 THEN '3.75 ~ 4.00'\n" +
            "  WHEN avg_confidence_level <= 4.25 THEN '4.00 ~ 4.25'\n" +
            "  WHEN avg_confidence_level <= 4.50 THEN '4.25 ~ 4.50'\n" +
            "  WHEN avg_confidence_level <= 4.75 THEN '4.50 ~ 4.75'\n" +
            "  WHEN avg_confidence_level <= 5.00 THEN '4.75 ~ 5.00'\n" +
            "END AS `avg_confidence_level_interval`, avg_evaluation_score, avg_expertise_level FROM (SELECT AVG(r_confidence_level) AS `avg_confidence_level`, AVG(r_overall_evaluation_score) AS `avg_evaluation_score`, AVG(r_expertise_level) AS `avg_expertise_level` " +
            "FROM review_record WHERE review_record.data_set = '${PLACEHOLDER_DATA_SET}' GROUP BY r_reviewer_name " +
            "UNION ALL SELECT 0.25, 0, 0\n" +
            "UNION ALL SELECT 0.50, 0, 0\n" +
            "UNION ALL SELECT 0.75, 0, 0\n" +
            "UNION ALL SELECT 1.00, 0, 0\n" +
            "UNION ALL SELECT 1.25, 0, 0\n" +
            "UNION ALL SELECT 1.50, 0, 0\n" +
            "UNION ALL SELECT 1.75, 0, 0\n" +
            "UNION ALL SELECT 2.00, 0, 0\n" +
            "UNION ALL SELECT 2.25, 0, 0\n" +
            "UNION ALL SELECT 2.50, 0, 0\n" +
            "UNION ALL SELECT 2.75, 0, 0\n" +
            "UNION ALL SELECT 3.00, 0, 0\n" +
            "UNION ALL SELECT 3.25, 0, 0\n" +
            "UNION ALL SELECT 3.50, 0, 0\n" +
            "UNION ALL SELECT 3.75, 0, 0\n" +
            "UNION ALL SELECT 4.00, 0, 0\n" +
            "UNION ALL SELECT 4.25, 0, 0\n" +
            "UNION ALL SELECT 4.50, 0, 0\n" +
            "UNION ALL SELECT 4.75, 0, 0\n" +
            "UNION ALL SELECT 5.00, 0, 0) AS `tmp1`) AS `tmp2`",
          customized: true,
        }
      ],
      filters: [],
      joiners: [],
      groupers: [
        {
          field: "avg_confidence_level_interval"
        },
        {
          field: 'avg_confidence_level_interval_sort'
        }
      ],
      sorters: [
        {
          field: 'avg_confidence_level_interval_sort',
          order: 'ASC',
        }
      ],
      extraData: {
        dataSetLabel: 'Num of Reviewer',
        fieldsShownInToolTips: [
          {
            label: 'Evaluation Score in Group',
            field: 'evaluation_score_in_group',
          },
          {
            label: 'Expertise Level in Group',
            field: 'expertise_level_in_group',
          },
        ],
        xAxisFieldName: 'avg_confidence_level_interval',
        yAxisFieldName: 'num_of_reviewer',
        numOfResultToDisplay: 30,
      }
    }
  },
  "reviewer_avg_evaluation_score_distribution": {
    name: "Reviewer Average Evaluation Score Distribution",
    group: 'Review Record',
    data: {
      type: 'bar_chart',
      title: 'Reviewer Average Evaluation Score Rank',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      description: 'This bar chart shows the distribution of the evaluation level of each reviewer in reviewing all the papers. This gives us an insight of the evaluation score given by each reviewer.',
      selections: [
        {
          expression: 'avg_evaluation_score_interval',
          rename: 'avg_evaluation_score_interval'
        },
        {
          expression: "COUNT(*) - 1",
          rename: 'num_of_reviewer',
        },
        {
          expression: "SUM(avg_confidence_level) / (COUNT(*) - 1)",
          rename: 'confidence_level_in_group',
        },
        {
          expression: "SUM(avg_expertise_level) / (COUNT(*) - 1)",
          rename: 'expertise_level_in_group',
        }
      ],
      involvedRecords: [
        {
          name: "(SELECT CASE  \n" +
            "  WHEN avg_evaluation_score <= -2.75 THEN 1\n" +
            "  WHEN avg_evaluation_score <= -2.50 THEN 2\n" +
            "  WHEN avg_evaluation_score <= -2.25 THEN 3\n" +
            "  WHEN avg_evaluation_score <= -2.00 THEN 4\n" +
            "  WHEN avg_evaluation_score <= -1.75 THEN 5\n" +
            "  WHEN avg_evaluation_score <= -1.50 THEN 6\n" +
            "  WHEN avg_evaluation_score <= -1.25 THEN 7\n" +
            "  WHEN avg_evaluation_score <= -1.00 THEN 8\n" +
            "  WHEN avg_evaluation_score <= -0.75 THEN 9\n" +
            "  WHEN avg_evaluation_score <= -0.50 THEN 10\n" +
            "  WHEN avg_evaluation_score <= -0.25 THEN 11\n" +
            "  WHEN avg_evaluation_score <= 0.00 THEN 12\n" +
            "  WHEN avg_evaluation_score <= 0.25 THEN 13\n" +
            "  WHEN avg_evaluation_score <= 0.50 THEN 14\n" +
            "  WHEN avg_evaluation_score <= 0.75 THEN 15\n" +
            "  WHEN avg_evaluation_score <= 1.00 THEN 16\n" +
            "  WHEN avg_evaluation_score <= 1.25 THEN 17\n" +
            "  WHEN avg_evaluation_score <= 1.50 THEN 18\n" +
            "  WHEN avg_evaluation_score <= 1.75 THEN 19\n" +
            "  WHEN avg_evaluation_score <= 2.00 THEN 20\n" +
            "  WHEN avg_evaluation_score <= 2.25 THEN 21\n" +
            "  WHEN avg_evaluation_score <= 2.50 THEN 22\n" +
            "  WHEN avg_evaluation_score <= 2.75 THEN 23\n" +
            "  WHEN avg_evaluation_score <= 3.00 THEN 24\n" +
            "END `avg_evaluation_score_interval_sort`, CASE  \n" +
            "  WHEN avg_evaluation_score <= -2.75 THEN '-3.00 ~ -2.75'\n" +
            "  WHEN avg_evaluation_score <= -2.50 THEN '-2.75 ~ -2.50'\n" +
            "  WHEN avg_evaluation_score <= -2.25 THEN '-2.50 ~ -2.25'\n" +
            "  WHEN avg_evaluation_score <= -2.00 THEN '-2.25 ~ -2.00'\n" +
            "  WHEN avg_evaluation_score <= -1.75 THEN '-2.00 ~ -1.75'\n" +
            "  WHEN avg_evaluation_score <= -1.50 THEN '-1.75 ~ -1.50'\n" +
            "  WHEN avg_evaluation_score <= -1.25 THEN '-1.50 ~ -1.25'\n" +
            "  WHEN avg_evaluation_score <= -1.00 THEN '-1.25 ~ -1.00'\n" +
            "  WHEN avg_evaluation_score <= -0.75 THEN '-1.00 ~ -0.75'\n" +
            "  WHEN avg_evaluation_score <= -0.50 THEN '-0.75 ~ -0.50'\n" +
            "  WHEN avg_evaluation_score <= -0.25 THEN '-0.50 ~ -0.25'\n" +
            "  WHEN avg_evaluation_score <= 0.00 THEN '-0.25 ~ 0.00'\n" +
            "  WHEN avg_evaluation_score <= 0.25 THEN '0.00 ~ 0.25'\n" +
            "  WHEN avg_evaluation_score <= 0.50 THEN '0.25 ~ 0.50'\n" +
            "  WHEN avg_evaluation_score <= 0.75 THEN '0.50 ~ 0.75'\n" +
            "  WHEN avg_evaluation_score <= 1.00 THEN '0.75 ~ 1.00'\n" +
            "  WHEN avg_evaluation_score <= 1.25 THEN '1.00 ~ 1.25'\n" +
            "  WHEN avg_evaluation_score <= 1.50 THEN '1.25 ~ 1.50'\n" +
            "  WHEN avg_evaluation_score <= 1.75 THEN '1.50 ~ 1.75'\n" +
            "  WHEN avg_evaluation_score <= 2.00 THEN '1.75 ~ 2.00'\n" +
            "  WHEN avg_evaluation_score <= 2.25 THEN '2.00 ~ 2.25'\n" +
            "  WHEN avg_evaluation_score <= 2.50 THEN '2.25 ~ 2.50'\n" +
            "  WHEN avg_evaluation_score <= 2.75 THEN '2.50 ~ 2.75'\n" +
            "  WHEN avg_evaluation_score <= 3.00 THEN '2.75 ~ 3.00'\n" +
            "END AS `avg_evaluation_score_interval`, avg_confidence_level, avg_expertise_level FROM (SELECT AVG(r_confidence_level) AS `avg_confidence_level`, AVG(r_overall_evaluation_score) AS `avg_evaluation_score`, AVG(r_expertise_level) AS `avg_expertise_level` " +
            "FROM review_record WHERE review_record.data_set = '${PLACEHOLDER_DATA_SET}' GROUP BY r_reviewer_name " +
            "UNION ALL SELECT 0, -2.75, 0\n" +
            "UNION ALL SELECT 0, -2.50, 0\n" +
            "UNION ALL SELECT 0, -2.25, 0\n" +
            "UNION ALL SELECT 0, -2.00, 0\n" +
            "UNION ALL SELECT 0, -1.75, 0\n" +
            "UNION ALL SELECT 0, -1.50, 0\n" +
            "UNION ALL SELECT 0, -1.25, 0\n" +
            "UNION ALL SELECT 0, -1.00, 0\n" +
            "UNION ALL SELECT 0, -0.75, 0\n" +
            "UNION ALL SELECT 0, -0.50, 0\n" +
            "UNION ALL SELECT 0, -0.25, 0\n" +
            "UNION ALL SELECT 0, 0.00, 0\n" +
            "UNION ALL SELECT 0, 0.25, 0\n" +
            "UNION ALL SELECT 0, 0.50, 0\n" +
            "UNION ALL SELECT 0, 0.75, 0\n" +
            "UNION ALL SELECT 0, 1.00, 0\n" +
            "UNION ALL SELECT 0, 1.25, 0\n" +
            "UNION ALL SELECT 0, 1.50, 0\n" +
            "UNION ALL SELECT 0, 1.75, 0\n" +
            "UNION ALL SELECT 0, 2.00, 0\n" +
            "UNION ALL SELECT 0, 2.25, 0\n" +
            "UNION ALL SELECT 0, 2.50, 0\n" +
            "UNION ALL SELECT 0, 2.75, 0\n" +
            "UNION ALL SELECT 0, 3.00, 0) AS `tmp1`) AS `tmp2`",
          customized: true,
        }
      ],
      filters: [],
      joiners: [],
      groupers: [
        {
          field: "avg_evaluation_score_interval_sort"
        },
        {
          field: 'avg_evaluation_score_interval'
        }
      ],
      sorters: [
        {
          field: 'avg_evaluation_score_interval_sort',
          order: 'ASC',
        }
      ],
      extraData: {
        dataSetLabel: 'Num of Reviewer',
        fieldsShownInToolTips: [
          {
            label: 'Confidence Level in Group',
            field: 'confidence_level_in_group',
          },
          {
            label: 'Expertise Level in Group',
            field: 'expertise_level_in_group',
          },
        ],
        xAxisFieldName: 'avg_evaluation_score_interval',
        yAxisFieldName: 'num_of_reviewer',
        numOfResultToDisplay: 30,
      }
    }
  },
  "acceptance_rate_and_weighted_score": {
    name: "Acceptance Rate and Weighted Score",
    group: 'Review Record + Submission Record',
    data: {
      type: 'bar_chart',
      title: 'Acceptance Rate and Weighted Score',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      description: 'By combining review and submission, this bar chart shows the percentage of acceptance rate of based on the weighted score of the submissions. This gives us insight on what percentage of the papers will be accepted given a review score.',
      selections: [
        {
          expression: 'weighted_score_interval',
          rename: 'weighted_score_interval'
        },
        {
          expression: "SUM(CASE WHEN s_is_accepted = 'accept' THEN 1 ELSE 0 END)",
          rename: 'accepted'
        },
        {
          expression: "COUNT(*) - 1",
          rename: 'submitted'
        },
        {
          expression: "SUM(CASE WHEN s_is_accepted = 'accept' THEN 1 ELSE 0 END) / (COUNT(*) - 1)",
          rename: 'acceptance_rate'
        },
      ],
      involvedRecords: [
        {
          name: "(SELECT CASE  \n" +
            "  WHEN weighted_score <= -2.75 THEN 1\n" +
            "  WHEN weighted_score <= -2.50 THEN 2\n" +
            "  WHEN weighted_score <= -2.25 THEN 3\n" +
            "  WHEN weighted_score <= -2.00 THEN 4\n" +
            "  WHEN weighted_score <= -1.75 THEN 5\n" +
            "  WHEN weighted_score <= -1.50 THEN 6\n" +
            "  WHEN weighted_score <= -1.25 THEN 7\n" +
            "  WHEN weighted_score <= -1.00 THEN 8\n" +
            "  WHEN weighted_score <= -0.75 THEN 9\n" +
            "  WHEN weighted_score <= -0.50 THEN 10\n" +
            "  WHEN weighted_score <= -0.25 THEN 11\n" +
            "  WHEN weighted_score <= 0.00 THEN 12\n" +
            "  WHEN weighted_score <= 0.25 THEN 13\n" +
            "  WHEN weighted_score <= 0.50 THEN 14\n" +
            "  WHEN weighted_score <= 0.75 THEN 15\n" +
            "  WHEN weighted_score <= 1.00 THEN 16\n" +
            "  WHEN weighted_score <= 1.25 THEN 17\n" +
            "  WHEN weighted_score <= 1.50 THEN 18\n" +
            "  WHEN weighted_score <= 1.75 THEN 19\n" +
            "  WHEN weighted_score <= 2.00 THEN 20\n" +
            "  WHEN weighted_score <= 2.25 THEN 21\n" +
            "  WHEN weighted_score <= 2.50 THEN 22\n" +
            "  WHEN weighted_score <= 2.75 THEN 23\n" +
            "  WHEN weighted_score <= 3.00 THEN 24\n" +
            "END `weighted_score_interval_sort`, CASE  \n" +
            "  WHEN weighted_score <= -2.75 THEN '-3.00 ~ -2.75'\n" +
            "  WHEN weighted_score <= -2.50 THEN '-2.75 ~ -2.50'\n" +
            "  WHEN weighted_score <= -2.25 THEN '-2.50 ~ -2.25'\n" +
            "  WHEN weighted_score <= -2.00 THEN '-2.25 ~ -2.00'\n" +
            "  WHEN weighted_score <= -1.75 THEN '-2.00 ~ -1.75'\n" +
            "  WHEN weighted_score <= -1.50 THEN '-1.75 ~ -1.50'\n" +
            "  WHEN weighted_score <= -1.25 THEN '-1.50 ~ -1.25'\n" +
            "  WHEN weighted_score <= -1.00 THEN '-1.25 ~ -1.00'\n" +
            "  WHEN weighted_score <= -0.75 THEN '-1.00 ~ -0.75'\n" +
            "  WHEN weighted_score <= -0.50 THEN '-0.75 ~ -0.50'\n" +
            "  WHEN weighted_score <= -0.25 THEN '-0.50 ~ -0.25'\n" +
            "  WHEN weighted_score <= 0.00 THEN '-0.25 ~ 0.00'\n" +
            "  WHEN weighted_score <= 0.25 THEN '0.00 ~ 0.25'\n" +
            "  WHEN weighted_score <= 0.50 THEN '0.25 ~ 0.50'\n" +
            "  WHEN weighted_score <= 0.75 THEN '0.50 ~ 0.75'\n" +
            "  WHEN weighted_score <= 1.00 THEN '0.75 ~ 1.00'\n" +
            "  WHEN weighted_score <= 1.25 THEN '1.00 ~ 1.25'\n" +
            "  WHEN weighted_score <= 1.50 THEN '1.25 ~ 1.50'\n" +
            "  WHEN weighted_score <= 1.75 THEN '1.50 ~ 1.75'\n" +
            "  WHEN weighted_score <= 2.00 THEN '1.75 ~ 2.00'\n" +
            "  WHEN weighted_score <= 2.25 THEN '2.00 ~ 2.25'\n" +
            "  WHEN weighted_score <= 2.50 THEN '2.25 ~ 2.50'\n" +
            "  WHEN weighted_score <= 2.75 THEN '2.50 ~ 2.75'\n" +
            "  WHEN weighted_score <= 3.00 THEN '2.75 ~ 3.00'\n" +
            "END AS `weighted_score_interval`, s_is_accepted FROM (SELECT SUM(r_confidence_level * r_overall_evaluation_score) / SUM(r_confidence_level) AS `weighted_score`, s_is_accepted " +
            "FROM review_record, submission_record WHERE review_record.data_set = '${PLACEHOLDER_DATA_SET}' AND submission_record.data_set = '${PLACEHOLDER_DATA_SET}' " +
            "AND review_record.r_submission_id = submission_record.s_submission_id GROUP BY r_submission_id, s_is_accepted " +
            "UNION ALL SELECT -2.75, 'no'\n" +
            "UNION ALL SELECT -2.50, 'no'\n" +
            "UNION ALL SELECT -2.25, 'no'\n" +
            "UNION ALL SELECT -2.00, 'no'\n" +
            "UNION ALL SELECT -1.75, 'no'\n" +
            "UNION ALL SELECT -1.50, 'no'\n" +
            "UNION ALL SELECT -1.25, 'no'\n" +
            "UNION ALL SELECT -1.00, 'no'\n" +
            "UNION ALL SELECT -0.75, 'no'\n" +
            "UNION ALL SELECT -0.50, 'no'\n" +
            "UNION ALL SELECT -0.25, 'no'\n" +
            "UNION ALL SELECT 0.00, 'no'\n" +
            "UNION ALL SELECT 0.25, 'no'\n" +
            "UNION ALL SELECT 0.50, 'no'\n" +
            "UNION ALL SELECT 0.75, 'no'\n" +
            "UNION ALL SELECT 1.00, 'no'\n" +
            "UNION ALL SELECT 1.25, 'no'\n" +
            "UNION ALL SELECT 1.50, 'no'\n" +
            "UNION ALL SELECT 1.75, 'no'\n" +
            "UNION ALL SELECT 2.00, 'no'\n" +
            "UNION ALL SELECT 2.25, 'no'\n" +
            "UNION ALL SELECT 2.50, 'no'\n" +
            "UNION ALL SELECT 2.75, 'no'\n" +
            "UNION ALL SELECT 3.00, 'no') AS `tmp1`) AS `tmp2`",
          customized: true,
        }
      ],
      filters: [],
      joiners: [],
      groupers: [{
        field: 'weighted_score_interval'
      }, {
        field: 'weighted_score_interval_sort'
      }],
      sorters: [
        {
          field: 'weighted_score_interval_sort',
          order: 'ASC',
        }
      ],
      extraData: {
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
        xAxisFieldName: 'weighted_score_interval',
        yAxisFieldName: 'acceptance_rate',
        numOfResultToDisplay: 50,
      }
    }
  },
  "avg_weighted_score_by_track": {
    name: "Average Weighted Score By Track",
    group: 'Review Record + Submission Record',
    data: {
      type: 'bar_chart',
      title: 'Average Weighted Score By Track',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      description: 'By combining review and submission, this bar chart shows the average weighted score for papers in each track. This gives us insight on which track has been weighted scores than other tracks.',
      selections: [
        {
          expression: 'AVG(weighted_score)',
          rename: 'avg_weighted_score'
        },
        {
          expression: "s_track_name",
          rename: 's_track_name'
        },
      ],
      involvedRecords: [
        {
          name: "(SELECT s_track_name, SUM(r_confidence_level * r_overall_evaluation_score) / SUM(r_confidence_level) AS `weighted_score` " +
            "FROM review_record, submission_record WHERE review_record.data_set = '${PLACEHOLDER_DATA_SET}' AND submission_record.data_set = '${PLACEHOLDER_DATA_SET}' " +
            "AND review_record.r_submission_id = submission_record.s_submission_id GROUP BY r_submission_id, s_track_name) AS `tmp`",
          customized: true,
        }
      ],
      filters: [],
      joiners: [],
      groupers: [{
        field: 's_track_name'
      }],
      sorters: [
        {
          field: 's_track_name',
          order: 'ASC',
        }
      ],
      extraData: {
        dataSetLabel: 'Average Weighted Score',
        fieldsShownInToolTips: [],
        xAxisFieldName: 's_track_name',
        yAxisFieldName: 'avg_weighted_score',
        numOfResultToDisplay: 50,
      }
    }
  },
  "earliest_review_for_submission": {
    name: "Earliest Review in Days For Submission",
    group: 'Review Record + Submission Record',
    data: {
      type: 'bar_chart',
      title: 'Earliest Review in Days For Submission',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      description: 'By combining review and submission, this bar chart shows the number of days taken for submissions to be reviews. This gives us insight on the efficiency of the reviewers.',
      selections: [
        {
          expression: 'COUNT(*) - 1',
          rename: 'num_of_submission'
        },
        {
          expression: "duration_get_reviewed",
          rename: 'duration_get_reviewed'
        },
      ],
      involvedRecords: [
        {
          name: "(SELECT IF(DATEDIFF(MIN(r_review_submission_time), s_submission_time) < 21, CONVERT(DATEDIFF(MIN(r_review_submission_time), s_submission_time), char), '>=21')  AS `duration_get_reviewed` " +
            "FROM review_record, submission_record WHERE review_record.data_set = '${PLACEHOLDER_DATA_SET}' AND submission_record.data_set = '${PLACEHOLDER_DATA_SET}' " +
            "AND review_record.r_submission_id = submission_record.s_submission_id GROUP BY r_submission_id, s_submission_time " +
            "UNION ALL SELECT '0'" +
            "UNION ALL SELECT '1'" +
            "UNION ALL SELECT '2'" +
            "UNION ALL SELECT '3'" +
            "UNION ALL SELECT '4'" +
            "UNION ALL SELECT '5'" +
            "UNION ALL SELECT '6'" +
            "UNION ALL SELECT '7'" +
            "UNION ALL SELECT '8'" +
            "UNION ALL SELECT '9'" +
            "UNION ALL SELECT '10'" +
            "UNION ALL SELECT '11'" +
            "UNION ALL SELECT '12'" +
            "UNION ALL SELECT '13'" +
            "UNION ALL SELECT '14'" +
            "UNION ALL SELECT '15'" +
            "UNION ALL SELECT '16'" +
            "UNION ALL SELECT '17'" +
            "UNION ALL SELECT '18'" +
            "UNION ALL SELECT '19'" +
            "UNION ALL SELECT '20'" +
            "UNION ALL SELECT '>=21') AS `tmp`",
          customized: true,
        }
      ],
      filters: [],
      joiners: [],
      groupers: [{
        field: 'duration_get_reviewed'
      }],
      sorters: [
        {
          field: 'duration_get_reviewed',
          order: 'ASC',
        }
      ],
      extraData: {
        dataSetLabel: 'Num of Submission',
        fieldsShownInToolTips: [],
        xAxisFieldName: 'duration_get_reviewed',
        yAxisFieldName: 'num_of_submission',
        numOfResultToDisplay: 50,
      }
    }
  },
  "average_expert_level_for_submission": {
    name: "Average Expert Level For Submission",
    group: 'Review Record',
    data: {
      type: 'bar_chart',
      title: 'Average Expert Level For Submission',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      description: 'This bar chart shows  the number of submissions for different average expertise level. This gives us an insight on the average expertise level for different number of submissions.',
      selections: [
        {
          expression: 'COUNT(*) - 1',
          rename: 'num_of_submission'
        },
        {
          expression: "avg_expertise_level_interval",
          rename: 'avg_expertise_level_interval'
        },
      ],
      involvedRecords: [
        {
          name: "(SELECT CASE  \n" +
            "  WHEN avg_expertise_level <= 0.25 THEN 1\n" +
            "  WHEN avg_expertise_level <= 0.50 THEN 2\n" +
            "  WHEN avg_expertise_level <= 0.75 THEN 3\n" +
            "  WHEN avg_expertise_level <= 1.00 THEN 4\n" +
            "  WHEN avg_expertise_level <= 1.25 THEN 5\n" +
            "  WHEN avg_expertise_level <= 1.50 THEN 6\n" +
            "  WHEN avg_expertise_level <= 1.75 THEN 7\n" +
            "  WHEN avg_expertise_level <= 2.00 THEN 8\n" +
            "  WHEN avg_expertise_level <= 2.25 THEN 9\n" +
            "  WHEN avg_expertise_level <= 2.50 THEN 10\n" +
            "  WHEN avg_expertise_level <= 2.75 THEN 11\n" +
            "  WHEN avg_expertise_level <= 3.00 THEN 12\n" +
            "  WHEN avg_expertise_level <= 3.25 THEN 13\n" +
            "  WHEN avg_expertise_level <= 3.50 THEN 14\n" +
            "  WHEN avg_expertise_level <= 3.75 THEN 15\n" +
            "  WHEN avg_expertise_level <= 4.00 THEN 16\n" +
            "  WHEN avg_expertise_level <= 4.25 THEN 17\n" +
            "  WHEN avg_expertise_level <= 4.50 THEN 18\n" +
            "  WHEN avg_expertise_level <= 4.75 THEN 19\n" +
            "  WHEN avg_expertise_level <= 5.00 THEN 20\n" +
            "END `avg_expertise_level_interval_sort`, CASE  \n" +
            "  WHEN avg_expertise_level <= 0.25 THEN '0.00 ~ 0.25'\n" +
            "  WHEN avg_expertise_level <= 0.50 THEN '0.25 ~ 0.50'\n" +
            "  WHEN avg_expertise_level <= 0.75 THEN '0.50 ~ 0.75'\n" +
            "  WHEN avg_expertise_level <= 1.00 THEN '0.75 ~ 1.00'\n" +
            "  WHEN avg_expertise_level <= 1.25 THEN '1.00 ~ 1.25'\n" +
            "  WHEN avg_expertise_level <= 1.50 THEN '1.25 ~ 1.50'\n" +
            "  WHEN avg_expertise_level <= 1.75 THEN '1.50 ~ 1.75'\n" +
            "  WHEN avg_expertise_level <= 2.00 THEN '1.75 ~ 2.00'\n" +
            "  WHEN avg_expertise_level <= 2.25 THEN '2.00 ~ 2.25'\n" +
            "  WHEN avg_expertise_level <= 2.50 THEN '2.25 ~ 2.50'\n" +
            "  WHEN avg_expertise_level <= 2.75 THEN '2.50 ~ 2.75'\n" +
            "  WHEN avg_expertise_level <= 3.00 THEN '2.75 ~ 3.00'\n" +
            "  WHEN avg_expertise_level <= 3.25 THEN '3.00 ~ 3.25'\n" +
            "  WHEN avg_expertise_level <= 3.50 THEN '3.25 ~ 3.50'\n" +
            "  WHEN avg_expertise_level <= 3.75 THEN '3.50 ~ 3.75'\n" +
            "  WHEN avg_expertise_level <= 4.00 THEN '3.75 ~ 4.00'\n" +
            "  WHEN avg_expertise_level <= 4.25 THEN '4.00 ~ 4.25'\n" +
            "  WHEN avg_expertise_level <= 4.50 THEN '4.25 ~ 4.50'\n" +
            "  WHEN avg_expertise_level <= 4.75 THEN '4.50 ~ 4.75'\n" +
            "  WHEN avg_expertise_level <= 5.00 THEN '4.75 ~ 5.00'\n" +
            "END AS `avg_expertise_level_interval` FROM " +
            "(SELECT AVG(r_expertise_level) AS `avg_expertise_level` FROM review_record " +
            "WHERE review_record.data_set = '${PLACEHOLDER_DATA_SET}'" +
            "GROUP BY r_submission_id " +
            "UNION ALL SELECT 0.25\n" +
            "UNION ALL SELECT 0.50\n" +
            "UNION ALL SELECT 0.75\n" +
            "UNION ALL SELECT 1.00\n" +
            "UNION ALL SELECT 1.25\n" +
            "UNION ALL SELECT 1.50\n" +
            "UNION ALL SELECT 1.75\n" +
            "UNION ALL SELECT 2.00\n" +
            "UNION ALL SELECT 2.25\n" +
            "UNION ALL SELECT 2.50\n" +
            "UNION ALL SELECT 2.75\n" +
            "UNION ALL SELECT 3.00\n" +
            "UNION ALL SELECT 3.25\n" +
            "UNION ALL SELECT 3.50\n" +
            "UNION ALL SELECT 3.75\n" +
            "UNION ALL SELECT 4.00\n" +
            "UNION ALL SELECT 4.25\n" +
            "UNION ALL SELECT 4.50\n" +
            "UNION ALL SELECT 4.75\n" +
            "UNION ALL SELECT 5.00) AS `tmp1`) AS `tmp2`",
          customized: true,
        }
      ],
      filters: [],
      joiners: [],
      groupers: [{
        field: 'avg_expertise_level_interval'
      }, {
        field: 'avg_expertise_level_interval_sort'
      }],
      sorters: [
        {
          field: 'avg_expertise_level_interval_sort',
          order: 'ASC',
        }
      ],
      extraData: {
        dataSetLabel: 'Num of Submission',
        fieldsShownInToolTips: [],
        xAxisFieldName: 'avg_expertise_level_interval',
        yAxisFieldName: 'num_of_submission',
        numOfResultToDisplay: 50,
      }
    }
  },
  "average_confidence_level_for_submission": {
    name: "Average Confidence Level For Submission",
    group: 'Review Record',
    data: {
      type: 'bar_chart',
      title: 'Average Confidence Level For Submission',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      description: 'This bar chart shows  the number of submissions for different average confidence level. This gives us an insight on the average confidence level for different number of submissions.',
      selections: [
        {
          expression: 'COUNT(*) - 1',
          rename: 'num_of_submission'
        },
        {
          expression: "avg_confidence_level_interval",
          rename: 'avg_confidence_level_interval'
        },
      ],
      involvedRecords: [
        {
          name: "(SELECT CASE  \n" +
            "  WHEN avg_confidence_level <= 0.25 THEN 1\n" +
            "  WHEN avg_confidence_level <= 0.50 THEN 2\n" +
            "  WHEN avg_confidence_level <= 0.75 THEN 3\n" +
            "  WHEN avg_confidence_level <= 1.00 THEN 4\n" +
            "  WHEN avg_confidence_level <= 1.25 THEN 5\n" +
            "  WHEN avg_confidence_level <= 1.50 THEN 6\n" +
            "  WHEN avg_confidence_level <= 1.75 THEN 7\n" +
            "  WHEN avg_confidence_level <= 2.00 THEN 8\n" +
            "  WHEN avg_confidence_level <= 2.25 THEN 9\n" +
            "  WHEN avg_confidence_level <= 2.50 THEN 10\n" +
            "  WHEN avg_confidence_level <= 2.75 THEN 11\n" +
            "  WHEN avg_confidence_level <= 3.00 THEN 12\n" +
            "  WHEN avg_confidence_level <= 3.25 THEN 13\n" +
            "  WHEN avg_confidence_level <= 3.50 THEN 14\n" +
            "  WHEN avg_confidence_level <= 3.75 THEN 15\n" +
            "  WHEN avg_confidence_level <= 4.00 THEN 16\n" +
            "  WHEN avg_confidence_level <= 4.25 THEN 17\n" +
            "  WHEN avg_confidence_level <= 4.50 THEN 18\n" +
            "  WHEN avg_confidence_level <= 4.75 THEN 19\n" +
            "  WHEN avg_confidence_level <= 5.00 THEN 20\n" +
            "END `avg_confidence_level_interval_sort`, CASE  \n" +
            "  WHEN avg_confidence_level <= 0.25 THEN '0.00 ~ 0.25'\n" +
            "  WHEN avg_confidence_level <= 0.50 THEN '0.25 ~ 0.50'\n" +
            "  WHEN avg_confidence_level <= 0.75 THEN '0.50 ~ 0.75'\n" +
            "  WHEN avg_confidence_level <= 1.00 THEN '0.75 ~ 1.00'\n" +
            "  WHEN avg_confidence_level <= 1.25 THEN '1.00 ~ 1.25'\n" +
            "  WHEN avg_confidence_level <= 1.50 THEN '1.25 ~ 1.50'\n" +
            "  WHEN avg_confidence_level <= 1.75 THEN '1.50 ~ 1.75'\n" +
            "  WHEN avg_confidence_level <= 2.00 THEN '1.75 ~ 2.00'\n" +
            "  WHEN avg_confidence_level <= 2.25 THEN '2.00 ~ 2.25'\n" +
            "  WHEN avg_confidence_level <= 2.50 THEN '2.25 ~ 2.50'\n" +
            "  WHEN avg_confidence_level <= 2.75 THEN '2.50 ~ 2.75'\n" +
            "  WHEN avg_confidence_level <= 3.00 THEN '2.75 ~ 3.00'\n" +
            "  WHEN avg_confidence_level <= 3.25 THEN '3.00 ~ 3.25'\n" +
            "  WHEN avg_confidence_level <= 3.50 THEN '3.25 ~ 3.50'\n" +
            "  WHEN avg_confidence_level <= 3.75 THEN '3.50 ~ 3.75'\n" +
            "  WHEN avg_confidence_level <= 4.00 THEN '3.75 ~ 4.00'\n" +
            "  WHEN avg_confidence_level <= 4.25 THEN '4.00 ~ 4.25'\n" +
            "  WHEN avg_confidence_level <= 4.50 THEN '4.25 ~ 4.50'\n" +
            "  WHEN avg_confidence_level <= 4.75 THEN '4.50 ~ 4.75'\n" +
            "  WHEN avg_confidence_level <= 5.00 THEN '4.75 ~ 5.00'\n" +
            "END AS `avg_confidence_level_interval` FROM " +
            "(SELECT AVG(r_confidence_level) AS `avg_confidence_level` FROM review_record " +
            "WHERE review_record.data_set = '${PLACEHOLDER_DATA_SET}'" +
            "GROUP BY r_submission_id " +
            "UNION ALL SELECT 0.25\n" +
            "UNION ALL SELECT 0.50\n" +
            "UNION ALL SELECT 0.75\n" +
            "UNION ALL SELECT 1.00\n" +
            "UNION ALL SELECT 1.25\n" +
            "UNION ALL SELECT 1.50\n" +
            "UNION ALL SELECT 1.75\n" +
            "UNION ALL SELECT 2.00\n" +
            "UNION ALL SELECT 2.25\n" +
            "UNION ALL SELECT 2.50\n" +
            "UNION ALL SELECT 2.75\n" +
            "UNION ALL SELECT 3.00\n" +
            "UNION ALL SELECT 3.25\n" +
            "UNION ALL SELECT 3.50\n" +
            "UNION ALL SELECT 3.75\n" +
            "UNION ALL SELECT 4.00\n" +
            "UNION ALL SELECT 4.25\n" +
            "UNION ALL SELECT 4.50\n" +
            "UNION ALL SELECT 4.75\n" +
            "UNION ALL SELECT 5.00) AS `tmp1`) AS `tmp2`",
          customized: true,
        }
      ],
      filters: [],
      joiners: [],
      groupers: [{
        field: 'avg_confidence_level_interval'
      }, {
        field: 'avg_confidence_level_interval_sort'
      }],
      sorters: [
        {
          field: 'avg_confidence_level_interval_sort',
          order: 'ASC',
        }
      ],
      extraData: {
        dataSetLabel: 'Num of Submission',
        fieldsShownInToolTips: [],
        xAxisFieldName: 'avg_confidence_level_interval',
        yAxisFieldName: 'num_of_submission',
        numOfResultToDisplay: 50,
      }
    }
  },
  "avg_weighted_score_paper_author": {
    name: "Average Weighted Score Rank Paper Author",
    group: 'Review Record + Submission Record',
    data: {
      type: 'bar_chart',
      title: 'Average Weighted Score Rank Paper Author',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      description: 'By combining review and submission, this bar chart shows the average weighted score of all the submissions for each author. This gives us insight on which author performs better with his or her submissions than other authors.',
      selections: [
        {
          expression: 'AVG(weighted_score)',
          rename: 'avg_weighted_score'
        },
        {
          expression: "s_author_name",
          rename: 's_author_name'
        }
      ],
      involvedRecords: [
        {
          name: "(SELECT s_author_name, weighted_score FROM " +
            "(SELECT r_submission_id, SUM(r_confidence_level * r_overall_evaluation_score) / SUM(r_confidence_level) AS `weighted_score` FROM review_record WHERE review_record.data_set = '${PLACEHOLDER_DATA_SET}' GROUP BY r_submission_id) AS `tmp1`, submission_record, submission_record_author_set, submission_author_record " +
            "WHERE r_submission_id = s_submission_id AND s_id = submission_record_s_id AND author_set_s_author_id = s_author_id AND submission_record.data_set = '${PLACEHOLDER_DATA_SET}') AS `tmp2`",
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
          field: 'avg_weighted_score',
          order: 'DESC',
        },
        {
          field: 's_author_name',
          order: 'ASC',
        }
      ],
      extraData: {
        type: 'category',
        dataSetLabel: 'Average Weighted Score',
        fieldsShownInToolTips: [],
        xAxisFieldName: 's_author_name',
        yAxisFieldName: 'avg_weighted_score',

        numOfResultToDisplay: 10,
      }
    }
  },
  "avg_weighted_score_author": {
    name: "Average Weighted Score Rank Author",
    group: 'Author Record + Review Record',
    data: {
      type: 'bar_chart',
      title: 'Average Weighted Score Rank Author',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      description: 'By combining author and review, this bar chart shows the average weighted score of all the submissions for each author. This gives us insight on which author performs better with his or her submissions than other authors.',
      selections: [
        {
          expression: 'AVG(weighted_score)',
          rename: 'avg_weighted_score'
        },
        {
          expression: "COUNT(*)",
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
          name: "(SELECT a_first_name, a_last_name, a_email, SUM(r_confidence_level * r_overall_evaluation_score) / SUM(r_confidence_level) AS `weighted_score` FROM review_record, author_record " +
            "WHERE review_record.data_set = '${PLACEHOLDER_DATA_SET}' AND author_record.data_set = '${PLACEHOLDER_DATA_SET}' " +
            "AND review_record.r_submission_id = author_record.a_submission_id GROUP BY a_submission_id, a_first_name, a_last_name, a_email) AS `tmp`",
          customized: true,
        }
      ],
      filters: [],
      joiners: [],
      groupers: [
        {
          field: "a_first_name"
        },
        {
          field: "a_last_name"
        },
        {
          field: "a_email"
        }
      ],
      sorters: [
        {
          field: 'avg_weighted_score',
          order: 'DESC',
        },
        {
          field: 'a_email',
          order: 'ASC',
        }
      ],
      extraData: {
        type: 'category',
        dataSetLabel: 'Average Weighted Score',
        fieldsShownInToolTips: [
          {
            label: 'Email',
            field: 'author_email'
          },
          {
            label: 'Submission',
            field: 'submission_count'
          }
        ],
        xAxisFieldName: 'author_name',
        yAxisFieldName: 'avg_weighted_score',

        numOfResultToDisplay: 10,
      }
    }
  },
  "avg_weighted_score_organization": {
    name: "Average Weighted Score Rank Organization",
    group: 'Author Record + Review Record',
    data: {
      type: 'bar_chart',
      title: 'Average Weighted Score Rank Organization',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      description: 'By combining author and review, this bar chart shows the average weighted score of all the submissions for each organization. This gives us insight on which organization performs better with than other organizations.',
      selections: [
        {
          expression: 'AVG(weighted_score)',
          rename: 'avg_weighted_score'
        },
        {
          expression: "COUNT(*)",
          rename: 'submission_count'
        },
        {
          expression: "a_organisation",
          rename: 'a_organisation'
        }
      ],
      involvedRecords: [
        {
          name: "(SELECT a_organisation, SUM(r_confidence_level * r_overall_evaluation_score) / SUM(r_confidence_level) AS `weighted_score` FROM review_record, author_record " +
            "WHERE review_record.data_set = '${PLACEHOLDER_DATA_SET}' AND author_record.data_set = '${PLACEHOLDER_DATA_SET}' " +
            "AND review_record.r_submission_id = author_record.a_submission_id GROUP BY a_submission_id, a_organisation) AS `tmp`",
          customized: true,
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
          field: 'avg_weighted_score',
          order: 'DESC',
        },
        {
          field: 'a_organisation',
          order: 'ASC',
        }
      ],
      extraData: {
        type: 'category',
        dataSetLabel: 'Average Weighted Score',
        fieldsShownInToolTips: [
          {
            label: 'Submission',
            field: 'submission_count'
          }
        ],
        xAxisFieldName: 'a_organisation',
        yAxisFieldName: 'avg_weighted_score',

        numOfResultToDisplay: 10,
      }
    }
  },
  "avg_weighted_score_country": {
    name: "Average Weighted Score Rank Country",
    group: 'Author Record + Review Record',
    data: {
      type: 'bar_chart',
      title: 'Average Weighted Score Rank Country',
      dataSet: '${PLACEHOLDER_DATA_SET}',
      description: 'By combining author and review, this bar chart shows the average weighted score of all the submissions for each country. This gives us insight on which country performs better with than other countries.',
      selections: [
        {
          expression: 'AVG(weighted_score)',
          rename: 'avg_weighted_score'
        },
        {
          expression: "COUNT(*)",
          rename: 'submission_count'
        },
        {
          expression: "a_country",
          rename: 'a_country'
        }
      ],
      involvedRecords: [
        {
          name: "(SELECT a_country, SUM(r_confidence_level * r_overall_evaluation_score) / SUM(r_confidence_level) AS `weighted_score` FROM review_record, author_record " +
            "WHERE review_record.data_set = '${PLACEHOLDER_DATA_SET}' AND author_record.data_set = '${PLACEHOLDER_DATA_SET}' " +
            "AND review_record.r_submission_id = author_record.a_submission_id GROUP BY a_submission_id, a_country) AS `tmp`",
          customized: true,
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
          field: 'avg_weighted_score',
          order: 'DESC',
        },
        {
          field: 'a_country',
          order: 'ASC',
        }
      ],
      extraData: {
        type: 'category',
        dataSetLabel: 'Average Weighted Score',
        fieldsShownInToolTips: [
          {
            label: 'Submission',
            field: 'submission_count'
          }
        ],
        xAxisFieldName: 'a_country',
        yAxisFieldName: 'avg_weighted_score',

        numOfResultToDisplay: 10,
      }
    }
  },
}