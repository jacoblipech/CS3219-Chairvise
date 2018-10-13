package sg.edu.nus.comp.cs3219.viz.logic;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import sg.edu.nus.comp.cs3219.viz.BaseTestWithDBAccess;
import sg.edu.nus.comp.cs3219.viz.common.datatransfer.AnalysisRequest;

import java.util.List;
import java.util.Map;

public class AnalysisLogicTest extends BaseTestWithDBAccess {

    @Autowired
    private AnalysisLogic analysisLogic;

    @Override
    protected String getDataBundleName() {
        return "/AnalysisLogicTest.json";
    }

    @Test
    public void testAnalyse_queryOnlySubmissionRecord_shouldQueryCorrectly() {
        Assert.assertEquals(1, submissionRecordRepository.findByDataSetEquals("test@example.com").size());

        AnalysisRequest analysisRequest = new AnalysisRequest();

        analysisRequest.setDataSet("test@example.com");

        AnalysisRequest.Record submissionRecord = new AnalysisRequest.Record();
        submissionRecord.setName("submission_record");
        analysisRequest.getInvolvedRecords().add(submissionRecord);

        List<Map<String, Object>> result = analysisLogic.analyse(analysisRequest);

        Assert.assertEquals(1, result.size());
    }

    @Test
    public void testAnalyse_queryOnlySubmissionRecordWithSelectionSpecified_shouldQueryCorrectly() {
        Assert.assertEquals(1, submissionRecordRepository.findByDataSetEquals("test@example.com").size());

        AnalysisRequest analysisRequest = new AnalysisRequest();

        analysisRequest.setDataSet("test@example.com");

        AnalysisRequest.Record submissionRecord = new AnalysisRequest.Record();
        submissionRecord.setName("submission_record");
        analysisRequest.getInvolvedRecords().add(submissionRecord);

        AnalysisRequest.Selection selection = new AnalysisRequest.Selection();
        selection.setField("s_authors");
        analysisRequest.getSelections().add(selection);

        List<Map<String, Object>> result = analysisLogic.analyse(analysisRequest);

        Assert.assertEquals(1, result.size());
        Assert.assertEquals(1, result.get(0).keySet().size());
        Assert.assertEquals("Laxxx Kaxx", result.get(0).get("s_authors"));
    }

    @Test
    public void testAnalyse_queryOnlySubmissionRecordWithSomeSelectionsSpecified_shouldQueryCorrectly() {
        Assert.assertEquals(1, submissionRecordRepository.findByDataSetEquals("test@example.com").size());

        AnalysisRequest analysisRequest = new AnalysisRequest();

        analysisRequest.setDataSet("test@example.com");

        AnalysisRequest.Record submissionRecord = new AnalysisRequest.Record();
        submissionRecord.setName("submission_record");
        analysisRequest.getInvolvedRecords().add(submissionRecord);

        AnalysisRequest.Selection selection = new AnalysisRequest.Selection();
        selection.setField("s_authors");
        analysisRequest.getSelections().add(selection);
        selection = new AnalysisRequest.Selection();
        selection.setField("s_is_accepted");
        analysisRequest.getSelections().add(selection);

        List<Map<String, Object>> result = analysisLogic.analyse(analysisRequest);

        Assert.assertEquals(1, result.size());
        Assert.assertEquals(2, result.get(0).keySet().size());
        Assert.assertEquals("Laxxx Kaxx", result.get(0).get("s_authors"));
        Assert.assertEquals(false, result.get(0).get("s_is_accepted"));
    }

    @Test
    public void testAnalyse_queryOnlyAuthorRecord_shouldQueryCorrectly() {
        Assert.assertEquals(2, authorRecordRepository.findByDataSetEquals("test1@example.com").size());

        AnalysisRequest analysisRequest = new AnalysisRequest();

        analysisRequest.setDataSet("test1@example.com");

        AnalysisRequest.Record submissionRecord = new AnalysisRequest.Record();
        submissionRecord.setName("author_record");
        analysisRequest.getInvolvedRecords().add(submissionRecord);

        List<Map<String, Object>> result = analysisLogic.analyse(analysisRequest);

        Assert.assertEquals(2, result.size());
    }

    @Test
    public void testAnalyse_queryOnlyReviewRecord_shouldQueryCorrectly() {
        Assert.assertEquals(2, reviewRecordRepository.findByDataSetEquals("test@example.com").size());

        AnalysisRequest analysisRequest = new AnalysisRequest();

        analysisRequest.setDataSet("test@example.com");

        AnalysisRequest.Record submissionRecord = new AnalysisRequest.Record();
        submissionRecord.setName("review_record");
        analysisRequest.getInvolvedRecords().add(submissionRecord);

        List<Map<String, Object>> result = analysisLogic.analyse(analysisRequest);

        Assert.assertEquals(2, result.size());
    }

    @Test
    public void testAnalyse_queryOnlySubmissionRecordWithStringFilter_shouldQueryCorrectly() {
        Assert.assertTrue(1 < submissionRecordRepository.findByDataSetEquals("test1@example.com").size());

        AnalysisRequest analysisRequest = new AnalysisRequest();

        analysisRequest.setDataSet("test1@example.com");

        AnalysisRequest.Record submissionRecord = new AnalysisRequest.Record();
        submissionRecord.setName("submission_record");
        analysisRequest.getInvolvedRecords().add(submissionRecord);

        AnalysisRequest.Filter filter = new AnalysisRequest.Filter();
        filter.setField("s_authors");
        filter.setComparator("=");
        filter.setValue("test");
        analysisRequest.getFilters().add(filter);

        List<Map<String, Object>> result = analysisLogic.analyse(analysisRequest);

        Assert.assertEquals(1, result.size());
        Assert.assertEquals("test", result.get(0).get("s_authors"));
    }

    @Test
    public void testAnalyse_queryOnlySubmissionRecordWithBooleanFilter_shouldQueryCorrectly() {
        Assert.assertNotEquals(
                0,
                submissionRecordRepository.findByDataSetEquals("test1@example.com").stream()
                        .filter(s -> s.isS_is_notified() == true)
                        .count()
        );
        Assert.assertNotEquals(
                0,
                submissionRecordRepository.findByDataSetEquals("test1@example.com").stream()
                        .filter(s -> s.isS_is_notified() == false)
                        .count()
        );

        AnalysisRequest analysisRequest = new AnalysisRequest();

        analysisRequest.setDataSet("test1@example.com");

        AnalysisRequest.Record submissionRecord = new AnalysisRequest.Record();
        submissionRecord.setName("submission_record");
        analysisRequest.getInvolvedRecords().add(submissionRecord);

        AnalysisRequest.Filter filter = new AnalysisRequest.Filter();
        filter.setField("s_is_notified");
        filter.setComparator("=");
        filter.setValue("false");
        analysisRequest.getFilters().add(filter);

        List<Map<String, Object>> result = analysisLogic.analyse(analysisRequest);

        Assert.assertEquals(1, result.size());
        Assert.assertEquals(false, result.get(0).get("s_is_notified"));
    }

    @Test
    public void testAnalyse_queryOnlyReviewRecordWithNumberFilter_shouldQueryCorrectly() {
        Assert.assertNotEquals(
                0,
                reviewRecordRepository.findByDataSetEquals("test@example.com").stream()
                        .filter(s -> s.getR_num_review_assignment() == 47)
                        .count()
        );

        AnalysisRequest analysisRequest = new AnalysisRequest();

        analysisRequest.setDataSet("test@example.com");

        AnalysisRequest.Record submissionRecord = new AnalysisRequest.Record();
        submissionRecord.setName("review_record");
        analysisRequest.getInvolvedRecords().add(submissionRecord);

        AnalysisRequest.Filter filter = new AnalysisRequest.Filter();
        filter.setField("r_num_review_assignment");
        filter.setComparator("=");
        filter.setValue("47");
        analysisRequest.getFilters().add(filter);

        List<Map<String, Object>> result = analysisLogic.analyse(analysisRequest);

        Assert.assertEquals(1, result.size());
        Assert.assertEquals(47, result.get(0).get("r_num_review_assignment"));
    }

    @Test
    public void testAnalyse_queryOnlyReviewRecordWithMixedFilters_shouldQueryCorrectly() {
        Assert.assertNotEquals(
                0,
                reviewRecordRepository.findByDataSetEquals("test@example.com").stream()
                        .filter(s -> s.getR_num_review_assignment() == 47)
                        .filter(s -> s.getR_expertise_level().equals("1"))
                        .count()
        );

        AnalysisRequest analysisRequest = new AnalysisRequest();

        analysisRequest.setDataSet("test@example.com");

        AnalysisRequest.Record submissionRecord = new AnalysisRequest.Record();
        submissionRecord.setName("review_record");
        analysisRequest.getInvolvedRecords().add(submissionRecord);

        AnalysisRequest.Filter filter = new AnalysisRequest.Filter();
        filter.setField("r_num_review_assignment");
        filter.setComparator("=");
        filter.setValue("47");
        analysisRequest.getFilters().add(filter);
        filter = new AnalysisRequest.Filter();
        filter.setField("r_expertise_level");
        filter.setComparator("=");
        filter.setValue("1");
        analysisRequest.getFilters().add(filter);

        List<Map<String, Object>> result = analysisLogic.analyse(analysisRequest);

        Assert.assertEquals(1, result.size());
        Assert.assertEquals(47, result.get(0).get("r_num_review_assignment"));
        Assert.assertEquals("1", result.get(0).get("r_expertise_level"));
    }

    @Test
    public void testAnalyse_querySubmissionReviewRecordJoin_shouldQueryCorrectly() {
        AnalysisRequest analysisRequest = new AnalysisRequest();

        analysisRequest.setDataSet("test@example.com");

        AnalysisRequest.Record submissionRecord = new AnalysisRequest.Record();
        submissionRecord.setName("submission_record");
        analysisRequest.getInvolvedRecords().add(submissionRecord);
        submissionRecord = new AnalysisRequest.Record();
        submissionRecord.setName("review_record");
        analysisRequest.getInvolvedRecords().add(submissionRecord);

        AnalysisRequest.Filter filter = new AnalysisRequest.Filter();
        filter.setField("s_submission_id");
        filter.setComparator("=");
        filter.setValue("2");
        analysisRequest.getFilters().add(filter);

        AnalysisRequest.Joiner joiner = new AnalysisRequest.Joiner();
        joiner.setLeft("s_submission_id");
        joiner.setRight("r_submission_id");
        analysisRequest.getJoiners().add(joiner);

        List<Map<String, Object>> result = analysisLogic.analyse(analysisRequest);

        Assert.assertEquals(2, result.size());
        Assert.assertEquals("Laxxx Kaxx", result.get(0).get("s_authors"));
        Assert.assertEquals("Laxxx Kaxx", result.get(1).get("s_authors"));
        Assert.assertNotEquals(result.get(0).get("r_review_comment"), result.get(1).get("r_review_comment"));
    }

    @Test
    public void testAnalyse_querySubmissionAuthorRecordJoin_shouldQueryCorrectly() {
        AnalysisRequest analysisRequest = new AnalysisRequest();

        analysisRequest.setDataSet("test1@example.com");

        AnalysisRequest.Record submissionRecord = new AnalysisRequest.Record();
        submissionRecord.setName("submission_record");
        analysisRequest.getInvolvedRecords().add(submissionRecord);
        submissionRecord = new AnalysisRequest.Record();
        submissionRecord.setName("author_record");
        analysisRequest.getInvolvedRecords().add(submissionRecord);

        AnalysisRequest.Joiner joiner = new AnalysisRequest.Joiner();
        joiner.setLeft("s_submission_id");
        joiner.setRight("a_submission_id");
        analysisRequest.getJoiners().add(joiner);

        List<Map<String, Object>> result = analysisLogic.analyse(analysisRequest);

        Assert.assertEquals(2, result.size());
        Assert.assertNotEquals(result.get(0).get("a_country"), result.get(1).get("a_country"));
    }

    @Test
    public void testWrapValue_typicalFieldName_shouldGenerateWrapperCorrectly() {
        Assert.assertEquals("true", analysisLogic.wrapValue("a_is_corresponding", "true"));
        Assert.assertEquals("21", analysisLogic.wrapValue("r_num_review_assignment", "21"));
        Assert.assertEquals("21.0", analysisLogic.wrapValue("r_overall_evaluation_score", "21.0"));
        Assert.assertEquals("'NUS'", analysisLogic.wrapValue("a_organisation", "NUS"));
    }

    @Test(expected = NullPointerException.class)
    public void testWrapValue_unknownFieldName_shouldThrowException() {
        analysisLogic.wrapValue("unknown_name", "true");
    }

}
