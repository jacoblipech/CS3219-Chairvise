package sg.edu.nus.comp.cs3219.viz.storage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sg.edu.nus.comp.cs3219.viz.common.datatransfer.AccessLevel;
import sg.edu.nus.comp.cs3219.viz.common.entity.Presentation;
import sg.edu.nus.comp.cs3219.viz.common.entity.PresentationAccessControl;

public interface PresentationAccessControlRepository extends JpaRepository<PresentationAccessControl, Long> {

    boolean existsByPresentationAndUserIdentifierEqualsAndAccessLevelEquals(Presentation presentation, String userIdentifier, AccessLevel accessLevel);

}
