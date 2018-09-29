package sg.edu.nus.comp.cs3219.viz.testhelper;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import com.google.appengine.tools.development.testing.LocalMailServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalModulesServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.google.appengine.tools.development.testing.LocalTaskQueueTestConfig;
import com.google.appengine.tools.development.testing.LocalUserServiceTestConfig;

/**
 * Provides a Singleton in-memory simulation of the GAE for unit testing.
 *
 * <p>This is not the same as testing against the dev server.
 * When testing against the GAE simulation, there is no need for the dev server to be running.
 *
 */
public class GaeSimulation {

    private static final String QUEUE_XML_PATH = "src/main/webapp/WEB-INF/queue.xml";

    private static GaeSimulation instance = new GaeSimulation();

    private LocalServiceTestHelper helper;

    /**
     * Gets the GAE simulation instance.
     */
    public static GaeSimulation inst() {
        return instance;
    }

    /**
     * Sets up the GAE simulation.
     */
    public synchronized void setup() {
        System.out.println("Setting up GAE simulation");

        LocalTaskQueueTestConfig localTasks = new LocalTaskQueueTestConfig();
        localTasks.setQueueXmlPath(QUEUE_XML_PATH);

        LocalUserServiceTestConfig localUserServices = new LocalUserServiceTestConfig();
        LocalMailServiceTestConfig localMail = new LocalMailServiceTestConfig();
        LocalModulesServiceTestConfig localModules = new LocalModulesServiceTestConfig();
        helper = new LocalServiceTestHelper(localMail, localUserServices,
                                            localTasks, localModules);

        helper.setEnvAttributes(this.getEnvironmentAttributesWithApplicationHostname());
        helper.setUp();
    }

    /**
     * Logs in the user to the GAE simulation environment without admin rights.
     */
    public void loginUser(String userEmail) {
        helper.setEnvIsLoggedIn(true);
        helper.setEnvEmail(userEmail);
        helper.setEnvAuthDomain("gmail.com");
        helper.setEnvIsAdmin(false);
    }

    /**
     * Logs the current user out of the GAE simulation environment.
     */
    public void logoutUser() {
        helper.setEnvIsLoggedIn(false);
        helper.setEnvIsAdmin(false);
    }

    /**
     * Logs in the user to the GAE simulation environment as an admin.
     */
    public void loginAsAdmin(String userId) {
        loginUser(userId);
        helper.setEnvIsAdmin(true);
    }


    /**
     * Tears down the GAE simulation.
     */
    public void tearDown() {
        try {
            if (helper != null) {
                helper.tearDown();
            }
        } catch (Exception e) {
            System.out.println("Ignoring exception during teardown...");
        }
    }

    /**
     * Returns an environment attribute with application host name.
     */
    private Map<String, Object> getEnvironmentAttributesWithApplicationHostname() {
        Map<String, Object> attributes = new HashMap<>();
        try {
            attributes.put("com.google.appengine.runtime.default_version_hostname",
                    new URL("http://localhost/").getAuthority());
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
        return attributes;
    }

}
