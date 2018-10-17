package sg.edu.nus.comp.cs3219.viz.logic;

import org.springframework.stereotype.Component;
import sg.edu.nus.comp.cs3219.viz.common.entity.record.AuthorRecord;
import sg.edu.nus.comp.cs3219.viz.common.entity.record.ReviewRecord;
import sg.edu.nus.comp.cs3219.viz.common.entity.record.SubmissionRecord;
import sg.edu.nus.comp.cs3219.viz.storage.repository.AuthorRecordRepository;
import sg.edu.nus.comp.cs3219.viz.storage.repository.ReviewRecordRepository;
import sg.edu.nus.comp.cs3219.viz.storage.repository.SubmissionRecordRepository;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class RecordLogic {

    AuthorRecordRepository authorRecordRepository;

    SubmissionRecordRepository submissionRecordRepository;

    ReviewRecordRepository reviewRecordRepository;

    public RecordLogic(AuthorRecordRepository authorRecordRepository,
                       SubmissionRecordRepository submissionRecordRepository,
                       ReviewRecordRepository reviewRecordRepository) {
        this.authorRecordRepository = authorRecordRepository;
        this.submissionRecordRepository = submissionRecordRepository;
        this.reviewRecordRepository = reviewRecordRepository;
    }

    public void removeAndPersistAuthorRecordForDataSet(String dataSet, List<AuthorRecord> authorRecordList) {
        authorRecordRepository.deleteAllByDataSetEquals(dataSet);
        authorRecordRepository.saveAll(authorRecordList.stream().peek(r -> {
            // should not set ID when creating records
            r.setA_id(null);
            // should set dataSet
            r.setDataSet(dataSet);
            // the other field can be arbitrary
        }).collect(Collectors.toList()));
    }

    public void removeAndPersistReviewRecordForDataSet(String dataSet, List<ReviewRecord> reviewRecordList) {
        reviewRecordRepository.deleteAllByDataSetEquals(dataSet);
        reviewRecordRepository.saveAll(reviewRecordList.stream().peek(r -> {
            // should not set ID when creating records
            r.setR_id(null);
            // should set dataSet
            r.setDataSet(dataSet);
            // the other field can be arbitrary
        }).collect(Collectors.toList()));
    }

    public void removeAndPersistSubmissionRecordForDataSet(String dataSet, List<SubmissionRecord> submissionRecordList) {
        submissionRecordRepository.deleteAllByDataSetEquals(dataSet);
        submissionRecordRepository.saveAll(submissionRecordList.stream().peek(r -> {
            // should not set ID when creating records
            r.setS_id(null);
            // should set dataSet
            r.setDataSet(dataSet);
            // the other field can be arbitrary
        }).collect(Collectors.toList()));
    }
}
