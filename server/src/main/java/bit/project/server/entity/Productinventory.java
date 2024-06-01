package bit.project.server.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
//import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Productinventory {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;
    private String code;

    @ManyToOne
    private Product product;

    private BigDecimal qty;

    private LocalDateTime tocreation;

    @ManyToOne
    @JsonIgnoreProperties({"creator","status","tocreation","roleList"})
    private User creator;

    public Productinventory(Integer id, String code, Product product, BigDecimal qty, LocalDateTime tocreation, User creator) {
        this.id = id;
        this.code = code;
        this.product = product;
        this.qty = qty;
        this.tocreation = tocreation;
        this.creator = creator;
    }
}
