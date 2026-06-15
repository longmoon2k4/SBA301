package com.smiledev.se1947jv_sba301_longhvhe186065_lab04.controllers;

import com.smiledev.se1947jv_sba301_longhvhe186065_lab04.pojos.Orchid;
import com.smiledev.se1947jv_sba301_longhvhe186065_lab04.services.IOrchidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orchids")
public class OrchidController {

    @Autowired
    private IOrchidService orchidService;

    @GetMapping({"", "/"})
    public ResponseEntity<List<Orchid>> getAllOrchids() {
        List<Orchid> orchids = orchidService.getAll();
        return new ResponseEntity<>(orchids, HttpStatus.OK);
    }

    @PostMapping({"", "/"})
    public ResponseEntity<Orchid> createOrchid(@RequestBody Orchid orchid) {
        Orchid createdOrchid = orchidService.insert(orchid);
        return new ResponseEntity<>(createdOrchid, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Orchid> getOrchidById(@PathVariable("id") Integer id) {
        return orchidService.getById(id)
                .map(orchid -> new ResponseEntity<>(orchid, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Orchid> updateOrchid(@PathVariable("id") Integer id, @RequestBody Orchid orchid) {
        Orchid updatedOrchid = orchidService.update(id, orchid);
        if (updatedOrchid != null) {
            return new ResponseEntity<>(updatedOrchid, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrchid(@PathVariable("id") Integer id) {
        boolean deleted = orchidService.delete(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
