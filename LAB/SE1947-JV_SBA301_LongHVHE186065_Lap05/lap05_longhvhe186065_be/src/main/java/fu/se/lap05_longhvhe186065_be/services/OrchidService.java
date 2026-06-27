package fu.se.lap05_longhvhe186065_be.services;

import fu.se.lap05_longhvhe186065_be.pojos.Orchid;
import fu.se.lap05_longhvhe186065_be.repositories.IOrchidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrchidService implements IOrchidService {

    @Autowired
    private IOrchidRepository repository;

    @Override
    public List<Orchid> getAllOrchids() {
        return repository.findAll();
    }

    @Override
    public Orchid insertOrchid(Orchid o) {
        return repository.save(o);
    }

    @Override
    public Orchid updateOrchid(int id, Orchid o) {
        Optional<Orchid> existingOrchidOpt = repository.findById(id);
        if (existingOrchidOpt.isPresent()) {
            Orchid oldEntity = existingOrchidOpt.get();
            oldEntity.setOrchidName(o.getOrchidName());
            oldEntity.setIsNatural(o.getIsNatural());
            oldEntity.setImage(o.getImage());
            return repository.save(oldEntity);
        }
        throw new RuntimeException("Orchid not found with id " + id);
    }

    @Override
    public void deleteOrchid(int id) {
        repository.deleteById(id);
    }

    @Override
    public Optional<Orchid> getOrchidByID(int id) {
        return repository.findById(id);
    }
}
