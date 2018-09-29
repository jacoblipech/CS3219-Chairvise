package sg.edu.nus.comp.cs3219.viz.ui.controller.api;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import sg.edu.nus.comp.cs3219.viz.BaseTestREST;

import org.junit.Test;

public class AuthInfoControllerTest extends BaseTestREST {

    @Override
    protected String getDataBundleName() {
        return "/NoContent.json";
    }

    @Test
    public void testGetAuthInfo_redirectUrlNotSpecified_useDefaultUrl() throws Exception {
        gaeSimulation.logoutUser();

        mvc.perform(get("/api/auth"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.isLogin").value(false))
                .andExpect(jsonPath("$.logoutUrl").doesNotExist())
                .andExpect(jsonPath("$.loginUrl")
                        .value("http://localhost/_ah/login?continue=http%3A%2F%2Flocalhost"))
                .andExpect(jsonPath("$.userInfo").doesNotExist());
    }

    @Test
    public void testGetAuthInfo_redirectUrlSpecified_useSpecifiedUrl() throws Exception {
        gaeSimulation.logoutUser();

        mvc.perform(get("/api/auth").param("redirectUrl", "http://mywebsite.com"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.isLogin").value(false))
                .andExpect(jsonPath("$.logoutUrl").doesNotExist())
                .andExpect(jsonPath("$.loginUrl")
                        .value("http://localhost/_ah/login?continue=http%3A%2F%2Fmywebsite.com"))
                .andExpect(jsonPath("$.userInfo").doesNotExist());
    }

    @Test
    public void testGetAuthInfo_typicalNormalUser_shouldReturnCorrectResult() throws Exception {
        gaeSimulation.loginUser("test@example.com");

        mvc.perform(get("/api/auth").param("redirectUrl", "http://mywebsite.com"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.isLogin").value(true))
                .andExpect(jsonPath("$.logoutUrl")
                        .value("http://localhost/_ah/logout?continue=http%3A%2F%2Fmywebsite.com"))
                .andExpect(jsonPath("$.loginUrl").doesNotExist())
                .andExpect(jsonPath("$.userInfo.userEmail").value("test@example.com"))
                .andExpect(jsonPath("$.userInfo.userNickname").value("test@example.com"))
                .andExpect(jsonPath("$.userInfo.isAdmin").value(false));
    }

    @Test
    public void testGetAuthInfo_typicalAdminUser_shouldReturnCorrectResult() throws Exception {
        gaeSimulation.loginAsAdmin("test2@example.com");

        mvc.perform(get("/api/auth"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.isLogin").value(true))
                .andExpect(jsonPath("$.logoutUrl")
                        .value("http://localhost/_ah/logout?continue=http%3A%2F%2Flocalhost"))
                .andExpect(jsonPath("$.loginUrl").doesNotExist())
                .andExpect(jsonPath("$.userInfo.userEmail").value("test2@example.com"))
                .andExpect(jsonPath("$.userInfo.userNickname").value("test2@example.com"))
                .andExpect(jsonPath("$.userInfo.isAdmin").value(true));
    }
}
