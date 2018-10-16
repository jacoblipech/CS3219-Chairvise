package sg.edu.nus.comp.cs3219.viz.ui.controller.api;

import sg.edu.nus.comp.cs3219.viz.common.datatransfer.AccessControlMapping;
import sg.edu.nus.comp.cs3219.viz.common.datatransfer.AccessLevel;
import sg.edu.nus.comp.cs3219.viz.common.datatransfer.UserInfo;
import sg.edu.nus.comp.cs3219.viz.common.entity.Presentation;
import sg.edu.nus.comp.cs3219.viz.common.entity.PresentationAccessControl;
import sg.edu.nus.comp.cs3219.viz.common.exception.PresentationNotFoundException;
import sg.edu.nus.comp.cs3219.viz.logic.GateKeeper;
import sg.edu.nus.comp.cs3219.viz.logic.PresentationLogic;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import sg.edu.nus.comp.cs3219.viz.storage.repository.PresentationAccessControlRepository;

@RestController
public class PresentationController extends BaseRestController {

    private final PresentationLogic presentationLogic;

    private final GateKeeper gateKeeper;

    private PresentationAccessControlRepository presentationAccessControlRepository;

    public PresentationController(PresentationLogic presentationLogic,
                                  GateKeeper gateKeeper,
                                  PresentationAccessControlRepository presentationAccessControlRepository) {
        this.presentationAccessControlRepository = presentationAccessControlRepository;
        this.presentationLogic = presentationLogic;
        this.gateKeeper = gateKeeper;
    }

    @GetMapping("/presentations")
    public List<Presentation> all() {
        UserInfo currentUser = gateKeeper.verifyLoginAccess();

        return presentationLogic.findAllForUser(currentUser);
    }

    @PostMapping("/presentations")
    public ResponseEntity<?> newPresentation(@RequestBody Presentation presentation) throws URISyntaxException {
        UserInfo currentUser = gateKeeper.verifyLoginAccess();

        Presentation newPresentation = presentationLogic.saveForUser(presentation, currentUser);

        return ResponseEntity
                .created(new URI("/presentations/" + newPresentation.getId()))
                .body(newPresentation);
    }

    @GetMapping("/presentations/{id}")
    public Presentation one(@PathVariable Long id) {
        Presentation presentation = presentationLogic.findById(id)
                .orElseThrow(() -> new PresentationNotFoundException(id));

        gateKeeper.verifyAccessForPresentation(presentation, AccessLevel.CAN_READ);

        return presentation;
    }

    @PutMapping("/presentations/{id}")
    public ResponseEntity<?> updatePresentation(@RequestBody Presentation newPresentation, @PathVariable Long id) throws URISyntaxException {

        Presentation oldPresentation = presentationLogic.findById(id)
                .orElseThrow(() -> new PresentationNotFoundException(id));
        gateKeeper.verifyAccessForPresentation(oldPresentation, AccessLevel.CAN_WRITE);

        Presentation updatedPresentation = presentationLogic.updatePresentation(oldPresentation, newPresentation);
        return ResponseEntity
                .created(new URI("/presentations/" + newPresentation.getId()))
                .body(updatedPresentation);
    }

    @DeleteMapping("/presentations/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        Presentation oldPresentation = presentationLogic.findById(id)
                .orElseThrow(() -> new PresentationNotFoundException(id));
        gateKeeper.verifyDeletionAccessForPresentation(oldPresentation);

        presentationLogic.deleteById(id);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/sharePresentation/{id}")
    public ResponseEntity<?> sharePresentation(@RequestBody Presentation presentation, @PathVariable Long id) throws URISyntaxException {
        Presentation oldPresentation = presentationLogic.findById(id)
                .orElseThrow(() -> new PresentationNotFoundException(id));
        gateKeeper.verifyAccessForPresentation(oldPresentation, AccessLevel.CAN_WRITE);

        updateAccessControl(presentation);
        Presentation updatedPresentation = presentationLogic.updatePresentation(oldPresentation, presentation);
        return ResponseEntity
                .created(new URI("/presentations/" + presentation.getId()))
                .body(updatedPresentation);
    }

    /**
     * Updates the access control of the target presentation file.
     */
    public void updateAccessControl(Presentation presentation) {
        for (AccessControlMapping mapping : presentation.getMappingList()) {
            PresentationAccessControl accessControl = new PresentationAccessControl();
            accessControl.setUserIdentifier(mapping.getEmail());
            accessControl.setPresentation(presentation);
            accessControl.setAccessLevel(getAccessLevel(mapping.getAccessLevel()));
            presentationAccessControlRepository.save(accessControl);
        }
    }

    /**
     * Returns the actual access level of a string equivalent.
     */
    public AccessLevel getAccessLevel(String accessLevel) {
        switch (accessLevel) {
            case "AccessLevel.CAN_WRITE":
                return AccessLevel.CAN_WRITE;
            case "AccessLevel.CAN_READ":
                return AccessLevel.CAN_READ;
        }
        return AccessLevel.CAN_READ;
    }
}
