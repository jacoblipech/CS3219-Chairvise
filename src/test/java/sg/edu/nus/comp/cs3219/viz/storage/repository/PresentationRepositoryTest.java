package sg.edu.nus.comp.cs3219.viz.storage.repository;

import sg.edu.nus.comp.cs3219.viz.BaseTestWithDBAccess;
import sg.edu.nus.comp.cs3219.viz.common.entity.Presentation;

import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class PresentationRepositoryTest extends BaseTestWithDBAccess {

    @Override
    protected String getDataBundleName() {
        return "/PresentationRepositoryTest.json";
    }

    @Autowired
    private PresentationRepository presentationRepository;

    @Test
    public void testFindByCreatorIdentifier_typicalCase_shouldReturnsCorrectly() {
        List<Presentation> actualList = presentationRepository.findByCreatorIdentifier("test1@viz.test");
        Assert.assertEquals(2, actualList.size());

        actualList = presentationRepository.findByCreatorIdentifier("test2@viz.test");
        Assert.assertEquals(1, actualList.size());

        actualList = presentationRepository.findByCreatorIdentifier("test3@viz.test");
        Assert.assertEquals(0, actualList.size());
    }
}
