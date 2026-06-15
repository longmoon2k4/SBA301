package com.smiledev.se1947jv_sba301_longhvhe186065_lab04.services;

import com.smiledev.se1947jv_sba301_longhvhe186065_lab04.pojos.Orchid;
import java.util.List;
import java.util.Optional;

public interface IOrchidService {
    List<Orchid> getAll();
    Optional<Orchid> getById(Integer id);
    Orchid insert(Orchid orchid);
    Orchid update(Integer id, Orchid orchid);
    boolean delete(Integer id);
}
