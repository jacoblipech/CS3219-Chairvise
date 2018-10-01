package sg.edu.nus.comp.cs3219.viz.common.datatransfer;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserInfo {

    private String userEmail;

    private String userNickname;

    private boolean isAdmin;

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    @JsonProperty("isAdmin")
    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public String getUserNickname() {
        return userNickname;
    }

    public void setUserNickname(String userNickname) {
        this.userNickname = userNickname;
    }
}