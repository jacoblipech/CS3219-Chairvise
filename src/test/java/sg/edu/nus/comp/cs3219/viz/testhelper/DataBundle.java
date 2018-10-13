package sg.edu.nus.comp.cs3219.viz.testhelper;

import sg.edu.nus.comp.cs3219.viz.common.entity.Presentation;
import sg.edu.nus.comp.cs3219.viz.common.entity.PresentationAccessControl;

import java.util.LinkedHashMap;
import java.util.Map;

public class DataBundle {
    public Map<String, Presentation> presentations = new LinkedHashMap<>();
    public Map<String, PresentationAccessControl> presentationAccessControls = new LinkedHashMap<>();
}
