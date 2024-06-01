package bit.project.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Columns;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name ="`order`")
public class Order {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "creator_id")
    private Integer creator;

    private LocalDate orderdate;

    private LocalDate arrivaldate;

    @OneToMany(mappedBy="order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Productorder> productorder;

    @Column(columnDefinition = "DECIMAL(15,2)")
    private BigDecimal price;

    public Order(Integer id, User creator, LocalDate orderdate, LocalDate arrivaldate, List<Productorder> productorder, BigDecimal price) {
        this.id = id;
        this.creator = creator.getId();
        this.orderdate = orderdate;
        this.arrivaldate = arrivaldate;
        this.productorder = productorder;
        this.price = price;
    }
}
