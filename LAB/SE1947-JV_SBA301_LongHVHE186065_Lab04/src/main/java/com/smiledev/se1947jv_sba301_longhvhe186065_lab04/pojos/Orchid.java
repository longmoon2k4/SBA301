package com.smiledev.se1947jv_sba301_longhvhe186065_lab04.pojos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Orchid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "OrchidID")
    private Integer orchidID;

    @Column(name = "OrchidName")
    private String orchidName;

    @Column(name = "isNatural")
    private Boolean isNatural;

    @Column(name = "orchidDescription")
    private String orchidDescription;

    @Column(name = "orchidCategory")
    private String orchidCategory;

    @Column(name = "isAttractive")
    private Boolean isAttractive;

    @Column(name = "orchidURL")
    private String orchidURL;

    public Orchid() {
    }

    public Orchid(Integer orchidID, String orchidName, Boolean isNatural, String orchidDescription, String orchidCategory, Boolean isAttractive, String orchidURL) {
        this.orchidID = orchidID;
        this.orchidName = orchidName;
        this.isNatural = isNatural;
        this.orchidDescription = orchidDescription;
        this.orchidCategory = orchidCategory;
        this.isAttractive = isAttractive;
        this.orchidURL = orchidURL;
    }

    public Integer getOrchidID() {
        return orchidID;
    }

    public void setOrchidID(Integer orchidID) {
        this.orchidID = orchidID;
    }

    public String getOrchidName() {
        return orchidName;
    }

    public void setOrchidName(String orchidName) {
        this.orchidName = orchidName;
    }

    public Boolean getIsNatural() {
        return isNatural;
    }

    public void setIsNatural(Boolean isNatural) {
        this.isNatural = isNatural;
    }

    public String getOrchidDescription() {
        return orchidDescription;
    }

    public void setOrchidDescription(String orchidDescription) {
        this.orchidDescription = orchidDescription;
    }

    public String getOrchidCategory() {
        return orchidCategory;
    }

    public void setOrchidCategory(String orchidCategory) {
        this.orchidCategory = orchidCategory;
    }

    public Boolean getIsAttractive() {
        return isAttractive;
    }

    public void setIsAttractive(Boolean isAttractive) {
        this.isAttractive = isAttractive;
    }

    public String getOrchidURL() {
        return orchidURL;
    }

    public void setOrchidURL(String orchidURL) {
        this.orchidURL = orchidURL;
    }
}
