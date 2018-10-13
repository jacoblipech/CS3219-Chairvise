package sg.edu.nus.comp.cs3219.viz;

import sg.edu.nus.comp.cs3219.viz.testhelper.GaeSimulation;

import org.junit.AfterClass;
import org.junit.BeforeClass;

public abstract class BaseTestWithGAE extends BaseTestWithDBAccess {

    protected static final GaeSimulation gaeSimulation = GaeSimulation.inst();

    @BeforeClass
    public static void setUpGae() {
        gaeSimulation.setup();
    }

    @AfterClass
    public static void tearDownGae() {
        gaeSimulation.tearDown();
    }

}
