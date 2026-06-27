package fu.se.lap05_longhvhe186065_be.services;

import fu.se.lap05_longhvhe186065_be.pojos.Orchid;
import java.util.List;
import java.util.Optional;

public interface IOrchidService {
    List<Orchid> getAllOrchids();
    Orchid insertOrchid(Orchid o);
    Orchid updateOrchid(int id, Orchid o);
    void deleteOrchid(int id);
    Optional<Orchid> getOrchidByID(int id);
}
