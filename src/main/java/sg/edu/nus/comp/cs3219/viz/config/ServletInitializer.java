package sg.edu.nus.comp.cs3219.viz.config;

import sg.edu.nus.comp.cs3219.viz.VizApplication;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

import com.google.appengine.api.utils.SystemProperty;

public class ServletInitializer extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        if (SystemProperty.environment.value() == SystemProperty.Environment.Value.Production) {
            application.profiles("prod");
        } else {
            application.profiles("local");
        }

        return application.sources(VizApplication.class);
    }

}
