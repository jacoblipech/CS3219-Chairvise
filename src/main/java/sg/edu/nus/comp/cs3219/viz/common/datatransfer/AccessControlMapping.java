package sg.edu.nus.comp.cs3219.viz.common.datatransfer;

public class AccessControlMapping {

    private String email;

    private String accessLevel;

    // Dummy constructor
    public AccessControlMapping() {

    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAccessLevel() {
        return accessLevel;
    }

    public void setAccessLevel(String accessLevel) {
        this.accessLevel = accessLevel;
    }
}
