package sg.edu.nus.comp.cs3219.viz.common.entity.record;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;

@Exportable(name = "Review Record", nameInDB = "review_record")
@Entity
public class ReviewRecord {

    @Id
    @GenericGenerator(name = "UseExistingIdOtherwiseGenerateUsingIdentity", strategy = "sg.edu.nus.comp.cs3219.viz.common.entity.UseExistingIdOtherwiseGenerateUsingIdentity")
    @GeneratedValue(generator = "UseExistingIdOtherwiseGenerateUsingIdentity")
    @JsonSerialize(using = ToStringSerializer.class)
    private Long r_id;

    // each record will be imported by each user, dataSet is used to distinguished records submitted by different user
    private String dataSet;

    @Exportable(name = "Submission Id")
    private String r_submission_id;

    @Exportable(name = "Review Id")
    private String r_review_id;

    // (Each reviewer is given a number for each track he/she is reviewing.
    // For example Animesh reviewed 2 different tracks but 3 papers in total- one from Track 1 and two papers from Track 2. He therefore has 2 uniques numbers assigned
    @Exportable(name = "Num Review Assignment", description = "Each reviewer is given a number for each track he/she is reviewing")
    private int r_num_review_assignment;

    @Exportable(name = "Reviewer Name")
    private String r_reviewer_name;

    // Reviewer selects a field 1-5 to indicate expertise while submitting the review. For example 5: expert, 1: passing knowledge
    @Exportable(name = "Expertise Level", description = "Reviewer selects a field 1-5 to indicate expertise while submitting the review.")
    private String r_expertise_level;

    @Exportable(name = "Review Comment")
    private String r_review_comment;

    @Exportable(name = "Overall Evaluation Score")
    private double r_overall_evaluation_score;

    @Exportable(name = "Review Submission Time")
    private Instant r_review_submission_time;

    @Exportable(name = "Review Submission Time Date", description = "The date part of Review Submission Time")
    @Transient
    private transient LocalDate r_review_submission_time_date;

    @Exportable(name = "Review Submission Time Time", description = "The time part of Review Submission Time")
    @Transient
    private transient LocalTime r_review_submission_time_time;

    @Exportable(name = "Has Recommended for the Best Paper")
    private boolean r_has_recommended_for_best_paper;

    public Long getR_id() {
        return r_id;
    }

    public void setR_id(Long r_id) {
        this.r_id = r_id;
    }

    public String getDataSet() {
        return dataSet;
    }

    public void setDataSet(String dataSet) {
        this.dataSet = dataSet;
    }

    public String getR_submission_id() {
        return r_submission_id;
    }

    public void setR_submission_id(String r_submission_id) {
        this.r_submission_id = r_submission_id;
    }

    public String getR_review_id() {
        return r_review_id;
    }

    public void setR_review_id(String r_review_id) {
        this.r_review_id = r_review_id;
    }

    public int getR_num_review_assignment() {
        return r_num_review_assignment;
    }

    public void setR_num_review_assignment(int r_num_review_assignment) {
        this.r_num_review_assignment = r_num_review_assignment;
    }

    public String getR_reviewer_name() {
        return r_reviewer_name;
    }

    public void setR_reviewer_name(String r_reviewer_name) {
        this.r_reviewer_name = r_reviewer_name;
    }

    public String getR_expertise_level() {
        return r_expertise_level;
    }

    public void setR_expertise_level(String r_expertise_level) {
        this.r_expertise_level = r_expertise_level;
    }

    public String getR_review_comment() {
        return r_review_comment;
    }

    public void setR_review_comment(String r_review_comment) {
        this.r_review_comment = r_review_comment;
    }

    public double getR_overall_evaluation_score() {
        return r_overall_evaluation_score;
    }

    public void setR_overall_evaluation_score(double r_overall_evaluation_score) {
        this.r_overall_evaluation_score = r_overall_evaluation_score;
    }

    public Instant getR_review_submission_time() {
        return r_review_submission_time;
    }

    public void setR_review_submission_time(Instant r_review_submission_time) {
        this.r_review_submission_time = r_review_submission_time;
    }

    public boolean isR_has_recommended_for_best_paper() {
        return r_has_recommended_for_best_paper;
    }

    public void setR_has_recommended_for_best_paper(boolean r_has_recommended_for_best_paper) {
        this.r_has_recommended_for_best_paper = r_has_recommended_for_best_paper;
    }
}
