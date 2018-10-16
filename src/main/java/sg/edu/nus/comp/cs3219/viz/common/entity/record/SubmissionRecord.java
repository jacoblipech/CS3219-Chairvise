package sg.edu.nus.comp.cs3219.viz.common.entity.record;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.Instant;

@Exportable(name = "Submission Record", nameInDB = "submission_record")
@Entity
public class SubmissionRecord {

    @Id
    @GenericGenerator(name = "UseExistingIdOtherwiseGenerateUsingIdentity", strategy = "sg.edu.nus.comp.cs3219.viz.common.entity.UseExistingIdOtherwiseGenerateUsingIdentity")
    @GeneratedValue(generator = "UseExistingIdOtherwiseGenerateUsingIdentity")
    @JsonSerialize(using = ToStringSerializer.class)
    private Long s_id;

    // each record will be imported by each user, dataSet is used to distinguished records submitted by different user
    private String dataSet;

    @Exportable(name = "Submission Id")
    private String s_submission_id;

    // Track the submission is submitted to; like a full paper or just a poster
    @Exportable(name = "Track Id", description = "Track the submission is submitted to")
    private String s_track_id;

    // Name for the track referred in col2 (string)
    @Exportable(name = "Track Name")
    private String s_track_name;

    // Title of the submission
    @Exportable(name = "Title")
    private String s_title;

    // authors of the associated submission
    // TODO use many-to-many relationship
    @Exportable(name = "Authors")
    private String s_authors;

    // time submitted
    @Exportable(name = "Submission Time")
    private Instant s_submission_time;

    //  time last updated
    @Exportable(name = "Last Updated Time")
    private Instant s_last_updated_time;

    // keywords associated with submissions as put by the authors
    @Exportable(name = "Keywords")
    @Column(columnDefinition="TEXT")
    private String s_keywords;

    // accept/reject decision
    @Exportable(name = "Is Accepted", description = "Accept/Reject decision")
    private boolean s_is_accepted;

    // acceptance/rejection mail sent to authors or not?
    @Exportable(name = "Is Notified", description = "Acceptance/rejection mail sent to authors or not?")
    private boolean s_is_notified;

    // review sent in the mails or not?
    @Exportable(name = "Is Reviews Sent", description = "Review sent in the mails or not?")
    private boolean s_is_reviews_sent;

    // abstract of the submission.
    @Column(columnDefinition="TEXT")
    @Exportable(name = "Submission Abstract", description = "Abstract of the submission")
    private String s_submission_abstract;

    public Long getS_id() {
        return s_id;
    }

    public void setS_id(Long s_id) {
        this.s_id = s_id;
    }

    public String getDataSet() {
        return dataSet;
    }

    public void setDataSet(String dataSet) {
        this.dataSet = dataSet;
    }

    public String getS_submission_id() {
        return s_submission_id;
    }

    public void setS_submission_id(String s_submission_id) {
        this.s_submission_id = s_submission_id;
    }

    public String getS_track_id() {
        return s_track_id;
    }

    public void setS_track_id(String s_track_id) {
        this.s_track_id = s_track_id;
    }

    public String getS_track_name() {
        return s_track_name;
    }

    public void setS_track_name(String s_track_name) {
        this.s_track_name = s_track_name;
    }

    public String getS_title() {
        return s_title;
    }

    public void setS_title(String s_title) {
        this.s_title = s_title;
    }

    public String getS_authors() {
        return s_authors;
    }

    public void setS_authors(String s_authors) {
        this.s_authors = s_authors;
    }

    public Instant getS_submission_time() {
        return s_submission_time;
    }

    public void setS_submission_time(Instant s_submission_time) {
        this.s_submission_time = s_submission_time;
    }

    public Instant getS_last_updated_time() {
        return s_last_updated_time;
    }

    public void setS_last_updated_time(Instant s_last_updated_time) {
        this.s_last_updated_time = s_last_updated_time;
    }

    public String getS_keywords() {
        return s_keywords;
    }

    public void setS_keywords(String s_keywords) {
        this.s_keywords = s_keywords;
    }

    public boolean isS_is_accepted() {
        return s_is_accepted;
    }

    public void setS_is_accepted(boolean s_is_accepted) {
        this.s_is_accepted = s_is_accepted;
    }

    public boolean isS_is_notified() {
        return s_is_notified;
    }

    public void setS_is_notified(boolean s_is_notified) {
        this.s_is_notified = s_is_notified;
    }

    public boolean isS_is_reviews_sent() {
        return s_is_reviews_sent;
    }

    public void setS_is_reviews_sent(boolean s_is_reviews_sent) {
        this.s_is_reviews_sent = s_is_reviews_sent;
    }

    public String getS_submission_abstract() {
        return s_submission_abstract;
    }

    public void setS_submission_abstract(String s_submission_abstract) {
        this.s_submission_abstract = s_submission_abstract;
    }
}
