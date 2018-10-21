package sg.edu.nus.comp.cs3219.viz.logic;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import sg.edu.nus.comp.cs3219.viz.BaseTestWithGAE;
import sg.edu.nus.comp.cs3219.viz.common.datatransfer.AccessLevel;
import sg.edu.nus.comp.cs3219.viz.common.datatransfer.UserInfo;
import sg.edu.nus.comp.cs3219.viz.common.exception.UnauthorisedException;

public class GateKeeperTest extends BaseTestWithGAE {

    @Autowired
    private GateKeeper gateKeeper;

    @Override
    protected String getDataBundleName() {
        return "/GateKeeperTest.json";
    }

    @Test
    public void testGetCurrentLoginUser_loginNormalUser_shouldReturnCorrectInfo() {
        gaeSimulation.loginUser("test@example.com");

        UserInfo currentUser = gateKeeper.getCurrentLoginUser().get();
        Assert.assertEquals("test@example.com", currentUser.getUserEmail());
        Assert.assertEquals("test@example.com", currentUser.getUserNickname());
        Assert.assertFalse(currentUser.isAdmin());
    }

    @Test
    public void testGetCurrentLoginUser_loginAdminUser_shouldReturnCorrectInfo() {
        gaeSimulation.loginAsAdmin("test@example.com");

        UserInfo currentUser = gateKeeper.getCurrentLoginUser().get();
        Assert.assertEquals("test@example.com", currentUser.getUserEmail());
        Assert.assertEquals("test@example.com", currentUser.getUserNickname());
        Assert.assertTrue(currentUser.isAdmin());
    }

    @Test(expected = UnauthorisedException.class)
    public void testVerifyLoginAccess_notLogin_shouldThrowException() {
        gaeSimulation.logoutUser();

        gateKeeper.verifyLoginAccess();
    }

    @Test
    public void testVerifyLoginAccess_loginUser_shouldNotThrowException() {
        gaeSimulation.loginUser("test@example.com");

        gateKeeper.verifyLoginAccess();
    }

    @Test(expected = UnauthorisedException.class)
    public void testVerifyAdminAccess_notLoginUser_shouldThrowException() {
        gaeSimulation.logoutUser();

        gateKeeper.verifyAdminAccess();
    }

    @Test(expected = UnauthorisedException.class)
    public void testVerifyAdminAccess_loginUserWithoutAdminAccess_shouldThrowException() {
        gaeSimulation.loginUser("test@example.com");

        gateKeeper.verifyAdminAccess();
    }

    @Test
    public void testVerifyAdminAccess_loginUserWithAdminAccess_shouldNotThrowException() {
        gaeSimulation.loginAsAdmin("test@example.com");

        gateKeeper.verifyAdminAccess();
    }

    @Test
    public void testVerifyDeletionAccessForPresentation_loginAsCreator_presentationDeletable() {
        gaeSimulation.loginUser("test@viz.test");

        gateKeeper.verifyDeletionAccessForPresentation(dataBundle.presentations.get("presentationA"));
    }

    @Test(expected = UnauthorisedException.class)
    public void testVerifyDeletionAccessForPresentation_loginIsNotCreator_presentationNotDeletable() {
        gaeSimulation.loginUser("test2@viz.test");

        gateKeeper.verifyDeletionAccessForPresentation(dataBundle.presentations.get("presentationA"));
    }

    @Test
    public void testVerifyAccessForPresentation_loginAsCreator_shouldHaveAllAccess() {
        gaeSimulation.loginUser("test@viz.test");

        gateKeeper.verifyAccessForPresentation(dataBundle.presentations.get("presentationA"), AccessLevel.CAN_READ);
        gateKeeper.verifyAccessForPresentation(dataBundle.presentations.get("presentationA"), AccessLevel.CAN_WRITE);
    }

    @Test(expected = UnauthorisedException.class)
    public void testVerifyAccessForPresentation_notCreatorNotInACL_shouldHaveNoReadAccess() {
        gaeSimulation.loginUser("test5@viz.test");

        gateKeeper.verifyAccessForPresentation(dataBundle.presentations.get("presentationA"), AccessLevel.CAN_READ);
    }

    @Test(expected = UnauthorisedException.class)
    public void testVerifyAccessForPresentation_notCreatorNotLoginNoPublicAccess_shouldHaveNoReadAccess() {
        gaeSimulation.logoutUser();

        gateKeeper.verifyAccessForPresentation(dataBundle.presentations.get("presentationA"), AccessLevel.CAN_READ);
    }

    @Test(expected = UnauthorisedException.class)
    public void testVerifyAccessForPresentation_notCreatorNotLoginNoPublicAccess_shouldHaveNoWriteAccess() {
        gaeSimulation.logoutUser();

        gateKeeper.verifyAccessForPresentation(dataBundle.presentations.get("presentationA"), AccessLevel.CAN_WRITE);
    }

    @Test(expected = UnauthorisedException.class)
    public void testVerifyAccessForPresentation_notCreatorNotInACL_shouldHaveNoWriteAccess() {
        gaeSimulation.loginUser("test5@viz.test");

        gateKeeper.verifyAccessForPresentation(dataBundle.presentations.get("presentationA"), AccessLevel.CAN_WRITE);
    }

    @Test
    public void testVerifyAccessForPresentation_onlyWriteAccess_shouldHaveWriteAccess() {
        gaeSimulation.loginUser("test2@viz.test");

        gateKeeper.verifyAccessForPresentation(dataBundle.presentations.get("presentationA"), AccessLevel.CAN_WRITE);
    }

    @Test(expected = UnauthorisedException.class)
    public void testVerifyAccessForPresentation_onlyReadAccess_shouldHaveNoWriteAccess() {
        gaeSimulation.loginUser("test1@viz.test");

        gateKeeper.verifyAccessForPresentation(dataBundle.presentations.get("presentationA"), AccessLevel.CAN_WRITE);
    }

    @Test
    public void testVerifyAccessForPresentation_publicReadAccessAndNoLogin_shouldHaveReadAccess() {
        gaeSimulation.logoutUser();

        gateKeeper.verifyAccessForPresentation(dataBundle.presentations.get("presentationB"), AccessLevel.CAN_READ);
    }

    @Test(expected = UnauthorisedException.class)
    public void testVerifyAccessForPresentation_publicReadAccessAndNoLogin_shouldNotHaveWriteAccess() {
        gaeSimulation.logoutUser();

        gateKeeper.verifyAccessForPresentation(dataBundle.presentations.get("presentationB"), AccessLevel.CAN_WRITE);
    }
}