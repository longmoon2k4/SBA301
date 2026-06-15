package com.smiledev.se1947jv_sba301_longhvhe186065_lab04.repositories;

import com.smiledev.se1947jv_sba301_longhvhe186065_lab04.pojos.Orchid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IOrchidRepository extends JpaRepository<Orchid, Integer> {
}
