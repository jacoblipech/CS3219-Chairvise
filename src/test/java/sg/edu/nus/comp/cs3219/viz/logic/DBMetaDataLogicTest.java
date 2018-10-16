package sg.edu.nus.comp.cs3219.viz.logic;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import org.junit.Assert;
import org.junit.Test;
import sg.edu.nus.comp.cs3219.viz.common.datatransfer.DBEntityMetaData;
import sg.edu.nus.comp.cs3219.viz.testhelper.TestProperties;

import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

public class DBMetaDataLogicTest {

    private static final DBMetaDataLogic dbMetaDataLogic = new DBMetaDataLogic();

    private static final Gson gson = new GsonBuilder().setPrettyPrinting().create();

    @Test
    public void testGetEntityMetaDataList_shouldReturnCorrectValue() throws Exception {
        Type listType = new TypeToken<List<DBEntityMetaData>>(){}.getType();
        String jsonString = new String(
                Files.readAllBytes(Paths.get(TestProperties.TEST_DATA_FOLDER + "/DBMetaDataLogicTestExpected.json")));
        List<DBEntityMetaData> dbEntityMetaDataListExpected = gson.fromJson(jsonString, listType);

        List<DBEntityMetaData> dbEntityMetaDataList = dbMetaDataLogic.getEntityMetaDataList();

        Assert.assertEquals(gson.toJson(dbEntityMetaDataListExpected), gson.toJson(dbEntityMetaDataList));
    }

}
