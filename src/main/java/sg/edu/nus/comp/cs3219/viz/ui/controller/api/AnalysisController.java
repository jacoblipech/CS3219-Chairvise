package sg.edu.nus.comp.cs3219.viz.ui.controller.api;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import sg.edu.nus.comp.cs3219.viz.common.datatransfer.AnalysisRequest;
import sg.edu.nus.comp.cs3219.viz.logic.AnalysisLogic;
import sg.edu.nus.comp.cs3219.viz.logic.GateKeeper;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class AnalysisController extends BaseRestController {

    private GateKeeper gateKeeper;

    private AnalysisLogic analysisLogic;

    public AnalysisController(GateKeeper gateKeeper, AnalysisLogic analysisLogic) {
        this.analysisLogic = analysisLogic;
        this.gateKeeper = gateKeeper;
    }

    @PostMapping("/analysis")
    public List<Map<String, Object>> analysis(@Valid @RequestBody AnalysisRequest analysisRequest) {
        gateKeeper.verifyLoginAccess();

        List<Map<String, Object>> result = analysisLogic.analyse(analysisRequest);
        // convert to map with key all in lower case
        return result.stream().map(m -> {
            Map<String, Object> map = new HashMap<>();
            m.forEach((k, v) -> {
                map.put(k.toLowerCase(), v);
            });
            return map;
        }).collect(Collectors.toList());
    }

}
