package com.smiledev.se1947jv_sba301_longhvhe186065_lab04.services;

import com.smiledev.se1947jv_sba301_longhvhe186065_lab04.pojos.Orchid;
import com.smiledev.se1947jv_sba301_longhvhe186065_lab04.repositories.IOrchidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrchidService implements IOrchidService {

    @Autowired
    private IOrchidRepository orchidRepository;

    @Override
    public List<Orchid> getAll() {
        return orchidRepository.findAll();
    }

    @Override
    public Optional<Orchid> getById(Integer id) {
        return orchidRepository.findById(id);
    }

    @Override
    public Orchid insert(Orchid orchid) {
        return orchidRepository.save(orchid);
    }

    @Override
    public Orchid update(Integer id, Orchid orchid) {
        return orchidRepository.findById(id).map(existingOrchid -> {
            existingOrchid.setOrchidName(orchid.getOrchidName());
            existingOrchid.setIsNatural(orchid.getIsNatural());
            existingOrchid.setOrchidDescription(orchid.getOrchidDescription());
            existingOrchid.setOrchidCategory(orchid.getOrchidCategory());
            existingOrchid.setIsAttractive(orchid.getIsAttractive());
            existingOrchid.setOrchidURL(orchid.getOrchidURL());
            return orchidRepository.save(existingOrchid);
        }).orElse(null);
    }

    @Override
    public boolean delete(Integer id) {
        if (orchidRepository.existsById(id)) {
            orchidRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
