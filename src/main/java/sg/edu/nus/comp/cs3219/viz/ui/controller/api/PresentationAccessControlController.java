package sg.edu.nus.comp.cs3219.viz.ui.controller.api;

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
    public ResponseEntity<?> sharePresentation(@RequestBody Presentation presentation, @PathVariable Long id, @PathVariable String email, @PathVariable String accessLevel) throws URISyntaxException {
        Presentation oldPresentation = presentationLogic.findById(id)
                .orElseThrow(() -> new PresentationNotFoundException(id));
        gateKeeper.verifyAccessForPresentation(oldPresentation, AccessLevel.CAN_WRITE);

        updateAccessControl(presentation, email, accessLevel);
        Presentation updatedPresentation = presentationLogic.updatePresentation(oldPresentation, presentation);
        return ResponseEntity
                .created(new URI("/presentations/" + presentation.getId()))
                .body(updatedPresentation);
    }

    @PutMapping("/presentations/{id}/newAccessControl/{email}/{accessLevel}")
    public ResponseEntity<?> updatePermissions(@RequestBody Presentation presentation, @PathVariable Long id, @PathVariable String email, @PathVariable String accessLevel) throws URISyntaxException {
        Presentation oldPresentation = presentationLogic.findById(id)
                .orElseThrow(() -> new PresentationNotFoundException(id));

        for (PresentationAccessControl accessControl : presentation.getAccessControlList()) {
            if (accessControl.getUserIdentifier().equals(email) && !accessControl.getAccessLevel().equals(accessLevel)) {
                presentationAccessControlRepository.delete(accessControl);
                updateAccessControl(presentation, email, accessLevel);
            }
        }

        return ResponseEntity
                .created(new URI("/presentations/" + presentation.getId()))
                .body(oldPresentation);
    }

    @PutMapping("/presentations/{id}/{email}")
    public ResponseEntity<?> removePermissions(@RequestBody Presentation presentation, @PathVariable Long id, @PathVariable String email) throws URISyntaxException {
        Presentation oldPresentation = presentationLogic.findById(id)
                .orElseThrow(() -> new PresentationNotFoundException(id));

        for (PresentationAccessControl accessControl : presentation.getAccessControlList()) {
            if (accessControl.getUserIdentifier().equals(email)) {
                presentationAccessControlRepository.delete(accessControl);
            }
        }

        Presentation updatedPresentation = presentationLogic.updatePresentation(oldPresentation, presentation);
        return ResponseEntity
                .created(new URI("/presentations/" + oldPresentation.getId()))
                .body(updatedPresentation);
    }

    /**
     * Updates the access control of the target presentation file.
     */
    public void updateAccessControl(Presentation presentation, String email, String accessLevel) {
        PresentationAccessControl accessControl = new PresentationAccessControl();
        accessControl.setUserIdentifier(email);
        accessControl.setPresentation(presentation);
        accessControl.setAccessLevel(getAccessLevel(accessLevel));
        presentationAccessControlRepository.save(accessControl);
    }

    /**
     * Returns the actual access level of a string equivalent.
     */
    public AccessLevel getAccessLevel(String accessLevel) {
        switch (accessLevel) {
            case "CAN_WRITE":
                return AccessLevel.CAN_WRITE;
            case "CAN_READ":
                return AccessLevel.CAN_READ;
        }
        return AccessLevel.CAN_READ;
    }
}
