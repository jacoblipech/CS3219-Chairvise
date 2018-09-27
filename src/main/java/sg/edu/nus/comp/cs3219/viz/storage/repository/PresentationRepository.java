package sg.edu.nus.comp.cs3219.viz.storage.repository;

import sg.edu.nus.comp.cs3219.viz.common.entity.Presentation;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PresentationRepository extends JpaRepository<Presentation, Long> {

    List<Presentation> findByCreatorIdentifier(String creatorIdentifier);
}
