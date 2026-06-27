package fu.se.lap05_longhvhe186065_be.controllers;

import fu.se.lap05_longhvhe186065_be.pojos.Orchid;
import fu.se.lap05_longhvhe186065_be.services.IOrchidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/orchids")
public class OrchidController {

    @Autowired
    private IOrchidService service;

    @GetMapping("/")
    public List<Orchid> getAllOrchids() {
        return service.getAllOrchids();
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public Orchid createOrchid(@RequestBody Orchid orchid) {
        return service.insertOrchid(orchid);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Orchid> getOrchidByID(@PathVariable int id) {
        Optional<Orchid> orchid = service.getOrchidByID(id);
        if (orchid.isPresent()) {
            return ResponseEntity.ok(orchid.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateOrchid(@PathVariable int id, @RequestBody Orchid orchid) {
        Orchid updatedOrchid = service.updateOrchid(id, orchid);
        return ResponseEntity.ok(updatedOrchid);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrchid(@PathVariable int id) {
        service.deleteOrchid(id);
        return ResponseEntity.ok("Deleted!!");
    }
}
