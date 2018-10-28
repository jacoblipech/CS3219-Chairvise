package sg.edu.nus.comp.cs3219.viz.ui.controller.api;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import sg.edu.nus.comp.cs3219.viz.common.datatransfer.AccessLevel;
import sg.edu.nus.comp.cs3219.viz.common.entity.Presentation;
import sg.edu.nus.comp.cs3219.viz.common.entity.PresentationAccessControl;
import sg.edu.nus.comp.cs3219.viz.common.exception.PresentationNotFoundException;
import sg.edu.nus.comp.cs3219.viz.logic.GateKeeper;
import sg.edu.nus.comp.cs3219.viz.logic.PresentationLogic;
import sg.edu.nus.comp.cs3219.viz.storage.repository.PresentationAccessControlRepository;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
public class PresentationAccessControlController extends BaseRestController {
    private final PresentationLogic presentationLogic;

    private final GateKeeper gateKeeper;

    private PresentationAccessControlRepository presentationAccessControlRepository;

    public PresentationAccessControlController(PresentationLogic presentationLogic,
                                               GateKeeper gateKeeper,
                                               PresentationAccessControlRepository presentationAccessControlRepository) {
        this.presentationAccessControlRepository = presentationAccessControlRepository;
        this.presentationLogic = presentationLogic;
        this.gateKeeper = gateKeeper;
    }

    @PutMapping("/presentations/{id}/accessControl/{email}/{accessLevel}")
    public ResponseEntity<?> addPermission(@RequestBody Presentation presentation, @PathVariable Long id, @PathVariable String email, @PathVariable String accessLevel) throws URISyntaxException {
        Presentation oldPresentation = presentationLogic.findById(id)
                .orElseThrow(() -> new PresentationNotFoundException(id));
        gateKeeper.verifyAccessForPresentation(oldPresentation, AccessLevel.CAN_WRITE);

        PresentationAccessControl newAccessControl = updateAccessControl(presentation, email, accessLevel);
        return ResponseEntity
                .created(new URI("/presentations/" + presentation.getId() + "/newPermission/" + newAccessControl.getId()))
                .body(newAccessControl);
    }

    @PutMapping("/presentations/{id}/newAccessControl/{email}/{accessLevel}")
    public ResponseEntity<?> updatePermission(@RequestBody Presentation presentation, @PathVariable Long id, @PathVariable String email, @PathVariable String accessLevel) throws URISyntaxException {
        presentationLogic.findById(id)
            .orElseThrow(() -> new PresentationNotFoundException(id));

        PresentationAccessControl updatedAccessControl = new PresentationAccessControl();
        for (PresentationAccessControl accessControl : presentation.getAccessControlList()) {
            if (accessControl.getUserIdentifier().equals(email) && !accessControl.getAccessLevel().equals(accessLevel)) {
                presentationAccessControlRepository.delete(accessControl);
                updatedAccessControl = updateAccessControl(presentation, email, accessLevel);
            }
        }

        return ResponseEntity
                .created(new URI("/presentations/" + presentation.getId() + "/updatedPermission/" + updatedAccessControl.getId()))
                .body(updatedAccessControl);
    }

    @PutMapping("/presentations/{id}/{email}")
    public ResponseEntity<?> removePermission(@RequestBody Presentation presentation, @PathVariable Long id, @PathVariable String email) throws URISyntaxException {
        presentationLogic.findById(id)
            .orElseThrow(() -> new PresentationNotFoundException(id));

        PresentationAccessControl removedAccessControl = new PresentationAccessControl();
        for (PresentationAccessControl accessControl : presentation.getAccessControlList()) {
            if (accessControl.getUserIdentifier().equals(email)) {
                removedAccessControl = accessControl;
                presentationAccessControlRepository.delete(accessControl);
            }
        }

        return ResponseEntity
                .created(new URI("/presentations/" + presentation.getId() + "/removedPermission/" + removedAccessControl.getId()))
                .body(removedAccessControl);
    }

    /**
     * Updates the access control of the target presentation file.
     */
    public PresentationAccessControl updateAccessControl(Presentation presentation, String email, String accessLevel) {
        PresentationAccessControl accessControl = new PresentationAccessControl();
        accessControl.setUserIdentifier(email);
        accessControl.setPresentation(presentation);
        accessControl.setAccessLevel(AccessLevel.valueOf(accessLevel));
        presentationAccessControlRepository.save(accessControl);
        return accessControl;
    }
}
