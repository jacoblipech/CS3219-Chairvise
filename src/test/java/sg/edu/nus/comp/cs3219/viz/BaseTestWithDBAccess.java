package sg.edu.nus.comp.cs3219.viz;

import sg.edu.nus.comp.cs3219.viz.storage.repository.PresentationAccessControlRepository;
import sg.edu.nus.comp.cs3219.viz.storage.repository.PresentationRepository;
import sg.edu.nus.comp.cs3219.viz.testhelper.DataBundle;
import sg.edu.nus.comp.cs3219.viz.testhelper.TestProperties;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.junit.After;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.google.gson.Gson;

@RunWith(SpringRunner.class)
@SpringBootTest
public abstract class BaseTestWithDBAccess {

    protected DataBundle dataBundle;

    @Autowired
    private PresentationRepository presentationRepository;

    @Autowired
    private PresentationAccessControlRepository presentationAccessControlRepository;

    protected abstract String getDataBundleName();

    @Before
    public void injectDataBundle() {
        dataBundle = loadDataBundle(getDataBundleName());
        presentationRepository.saveAll(dataBundle.presentations.values());
        presentationAccessControlRepository.saveAll(dataBundle.presentationAccessControls.values());
    }

    @After
    public void removeDataBundle() {
        presentationAccessControlRepository.deleteAll();
        presentationRepository.deleteAll();
    }

    protected static DataBundle loadDataBundle(String pathToJsonFileParam) {
        try {
            String jsonString = new String(
                Files.readAllBytes(Paths.get(TestProperties.TEST_DATA_FOLDER + pathToJsonFileParam)));
            return new Gson().fromJson(jsonString, DataBundle.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
