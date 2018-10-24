package sg.edu.nus.comp.cs3219.viz.common.entity;

import java.util.ArrayList;
import java.util.Set;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Presentation extends BaseEntity {

    @Id
    @GenericGenerator(name = "UseExistingIdOtherwiseGenerateUsingIdentity", strategy = "sg.edu.nus.comp.cs3219.viz.common.entity.UseExistingIdOtherwiseGenerateUsingIdentity")
    @GeneratedValue(generator = "UseExistingIdOtherwiseGenerateUsingIdentity")
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;

    private String name;

    @OneToMany(mappedBy="presentation")
    private Set<PresentationAccessControl> accessControlList;

    private String description;

    private String creatorIdentifier;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreatorIdentifier() {
        return creatorIdentifier;
    }

    public void setCreatorIdentifier(String creatorIdentifier) {
        this.creatorIdentifier = creatorIdentifier;
    }

    public Set<PresentationAccessControl> getAccessControlList() {
        return accessControlList;
    }

    public void setAccessControlList(Set<PresentationAccessControl> accessControlList) {
        this.accessControlList = accessControlList;
    }
}
