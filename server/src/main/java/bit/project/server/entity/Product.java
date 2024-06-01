package bit.project.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Product {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    private String code;

    private String name;
    private BigDecimal price;

//    private LocalDate doordered;
//
//    private LocalDate dorequired;
//
//    private LocalDate doreceived;

    @Lob
    private String description;

    private LocalDateTime tocreation;


    @ManyToOne
    private Supplier supplier;

    @OneToMany(mappedBy="product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Productmaterial> productmaterialList;

    @ManyToOne
    private Productstatus productstatus;

    @ManyToOne
    private Productstatus producttype;

    @ManyToOne
    private Productstatus productcategory;

    @ManyToOne
    @JsonIgnoreProperties({"creator","status","tocreation","roleList"})
    private User creator;


//    @JsonIgnore
//    @OneToMany(mappedBy = "product")
//    private List<Purchase> productPurchaseList;


    public Product(Integer id){
        this.id = id;
    }

    public Product(Integer id, String code, String name ,BigDecimal price,Supplier supplier){
        this.id = id;
        this.code = code;
        this.name= name;
        this.price= price;
//        this.doordered = doordered;
//        this.dorequired = dorequired;
        this.supplier = supplier;
    }

}
