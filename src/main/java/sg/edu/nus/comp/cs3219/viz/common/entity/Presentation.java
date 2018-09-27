package sg.edu.nus.comp.cs3219.viz.common.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

@Entity
public class Presentation {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;

    private String name;

    private String description;

    private String creatorIdentifier;

    // ACL for the presentation
    @OneToMany(mappedBy="presentation")
    private Set<PresentationAccessControl> accessControlList = new HashSet<>();

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
