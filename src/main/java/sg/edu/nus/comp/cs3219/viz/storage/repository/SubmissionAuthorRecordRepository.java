package sg.edu.nus.comp.cs3219.viz.storage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sg.edu.nus.comp.cs3219.viz.common.entity.record.SubmissionAuthorRecord;

import java.util.List;

public interface SubmissionAuthorRecordRepository extends JpaRepository<SubmissionAuthorRecord, Long> {

    List<SubmissionAuthorRecord> findByDataSetEquals(String dataSet);

    SubmissionAuthorRecord findFirstByNameEqualsAndDataSetEquals(String name, String dataset);

    void deleteAllByDataSetEquals(String dataSet);
}
