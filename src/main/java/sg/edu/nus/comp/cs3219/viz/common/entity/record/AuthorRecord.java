package sg.edu.nus.comp.cs3219.viz.common.entity.record;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.hibernate.annotations.GenericGenerator;
import sg.edu.nus.comp.cs3219.viz.common.entity.BaseEntity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class AuthorRecord extends BaseEntity {

    @Id
    @GenericGenerator(name = "UseExistingIdOtherwiseGenerateUsingIdentity", strategy = "sg.edu.nus.comp.cs3219.viz.common.entity.UseExistingIdOtherwiseGenerateUsingIdentity")
    @GeneratedValue(generator = "UseExistingIdOtherwiseGenerateUsingIdentity")
    @JsonSerialize(using = ToStringSerializer.class)
    private Long a_id;

    // each record will be imported by each user, dataSet is used to distinguished records submitted by different user
    private String dataSet;

    private String a_submission_id;

    private String a_first_name;

    private String a_last_name;

    private String a_email;

    private String a_country;

    private String a_organisation;

    private String a_webPage;

    // author's unique id in user submitted csv file
    private String a_personId;

    // is the author corresponding author for the submission
    private boolean a_is_corresponding;

    public Long getA_id() {
        return a_id;
    }

    public void setA_id(Long a_id) {
        this.a_id = a_id;
    }

    public String getDataSet() {
        return dataSet;
    }

    public void setDataSet(String dataSet) {
        this.dataSet = dataSet;
    }

    public String getA_submission_id() {
        return a_submission_id;
    }

    public void setA_submission_id(String a_submission_id) {
        this.a_submission_id = a_submission_id;
    }

    public String getA_first_name() {
        return a_first_name;
    }

    public void setA_first_name(String a_first_name) {
        this.a_first_name = a_first_name;
    }

    public String getA_last_name() {
        return a_last_name;
    }

    public void setA_last_name(String a_last_name) {
        this.a_last_name = a_last_name;
    }

    public String getA_email() {
        return a_email;
    }

    public void setA_email(String a_email) {
        this.a_email = a_email;
    }

    public String getA_country() {
        return a_country;
    }

    public void setA_country(String a_country) {
        this.a_country = a_country;
    }

    public String getA_organisation() {
        return a_organisation;
    }

    public void setA_organisation(String a_organisation) {
        this.a_organisation = a_organisation;
    }

    public String getA_webPage() {
        return a_webPage;
    }

    public void setA_webPage(String a_webPage) {
        this.a_webPage = a_webPage;
    }

    public String getA_personId() {
        return a_personId;
    }

    public void setA_personId(String a_personId) {
        this.a_personId = a_personId;
    }

    public boolean isA_is_corresponding() {
        return a_is_corresponding;
    }

    public void setA_is_corresponding(boolean a_is_corresponding) {
        this.a_is_corresponding = a_is_corresponding;
    }
}
