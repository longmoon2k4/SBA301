package fu.se.lap05_longhvhe186065_be.repositories;

import fu.se.lap05_longhvhe186065_be.pojos.Orchid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IOrchidRepository extends JpaRepository<Orchid, Integer> {
}
