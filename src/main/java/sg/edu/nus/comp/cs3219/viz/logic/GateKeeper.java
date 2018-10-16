package sg.edu.nus.comp.cs3219.viz.logic;

import sg.edu.nus.comp.cs3219.viz.common.datatransfer.AccessLevel;
import sg.edu.nus.comp.cs3219.viz.common.datatransfer.UserInfo;
import sg.edu.nus.comp.cs3219.viz.common.entity.Presentation;
import sg.edu.nus.comp.cs3219.viz.common.entity.PresentationAccessControl;
import sg.edu.nus.comp.cs3219.viz.common.exception.UnauthorisedException;
import sg.edu.nus.comp.cs3219.viz.common.util.Const;
import sg.edu.nus.comp.cs3219.viz.storage.repository.PresentationAccessControlRepository;

import java.util.Optional;

import org.springframework.stereotype.Component;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

@Component
public class GateKeeper {

    private PresentationAccessControlRepository presentationAccessControlRepository;

    public GateKeeper(PresentationAccessControlRepository presentationAccessControlRepository) {
        this.presentationAccessControlRepository = presentationAccessControlRepository;
    }

    private static UserService userService = UserServiceFactory.getUserService();

    public Optional<UserInfo> getCurrentLoginUser() {
        User user = userService.getCurrentUser();

        if (user == null) {
            return Optional.empty();
        }

        UserInfo userInfo = new UserInfo();
        userInfo.setUserEmail(user.getEmail());
        userInfo.setUserNickname(user.getNickname());
        userInfo.setAdmin(userService.isUserAdmin());
        return Optional.of(userInfo);
    }

    public String getLoginUrl(String redirectPage) {
        User user = userService.getCurrentUser();

        if (user == null) {
            return userService.createLoginURL(redirectPage);
        }
        return redirectPage;
    }

    public String getLogoutUrl(String redirectPage) {
        return userService.createLogoutURL(redirectPage);
    }

    public UserInfo verifyLoginAccess() {
        return getCurrentLoginUser().orElseThrow(UnauthorisedException::new);
    }

    public UserInfo verifyAdminAccess() {
        UserInfo currentUser = getCurrentLoginUser()
                .orElseThrow(UnauthorisedException::new);
        if (!currentUser.isAdmin()) {
            throw new UnauthorisedException();
        }
        return currentUser;
    }

    public void verifyDeletionAccessForPresentation(Presentation presentation) {
        if (presentation == null) {
            throw new UnauthorisedException();
        }

        UserInfo currentUser = getCurrentLoginUser()
                .orElseThrow(UnauthorisedException::new);

        if (!currentUser.getUserEmail().equals(presentation.getCreatorIdentifier())) {
            throw new UnauthorisedException();
        }
    }

    public void verifyAccessForPresentation(Presentation presentation, AccessLevel accessLevel) {
        if (presentation == null) {
            throw new UnauthorisedException();
        }

        // check public access
        if (presentationAccessControlRepository.existsByPresentationAndUserIdentifierEqualsAndAccessLevelEquals(presentation, Const.SpecialIdentifier.PUBLIC, accessLevel)) {
            return;
        }

        UserInfo currentUser = getCurrentLoginUser()
                .orElseThrow(UnauthorisedException::new);

        // creator can always access their own presentation
        if (presentation.getCreatorIdentifier().equals(currentUser.getUserEmail())) {
            return;
        }

        if (!presentationAccessControlRepository.existsByPresentationAndUserIdentifierEqualsAndAccessLevelEquals(presentation, currentUser.getUserEmail(), accessLevel)) {

            // Check presentation file's ACL to verify access level of non-owners
            for (PresentationAccessControl accessControl : presentation.getAccessControlList()) {
                // If the user can write, he/she can also read the file
                if (accessControl.getUserIdentifier().equals(currentUser.getUserEmail()) &&
                        (accessControl.getAccessLevel() == accessLevel || accessControl.getAccessLevel() == AccessLevel.CAN_WRITE) ) {
                    return;
                }
            }
            throw new UnauthorisedException();
        }
    }


}
