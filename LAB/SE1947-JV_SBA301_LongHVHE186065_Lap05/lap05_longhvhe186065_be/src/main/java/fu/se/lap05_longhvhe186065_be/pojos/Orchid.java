package fu.se.lap05_longhvhe186065_be.pojos;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "orchid")
public class Orchid implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "orchidName")
    private String orchidName;

    @com.fasterxml.jackson.annotation.JsonProperty("isNatural")
    @Column(name = "isNatural", columnDefinition = "bit default 0")
    private boolean isNatural;

    @Column(name = "image")
    private String image;

    public Orchid() {
    }

    public Orchid(int id, String orchidName, boolean isNatural, String image) {
        this.id = id;
        this.orchidName = orchidName;
        this.isNatural = isNatural;
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getOrchidName() {
        return orchidName;
    }

    public void setOrchidName(String orchidName) {
        this.orchidName = orchidName;
    }

    @com.fasterxml.jackson.annotation.JsonProperty("isNatural")
    public boolean getIsNatural() {
        return isNatural;
    }

    @com.fasterxml.jackson.annotation.JsonProperty("isNatural")
    public void setIsNatural(boolean isNatural) {
        this.isNatural = isNatural;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
