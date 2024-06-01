package bit.project.server.dao;


import bit.project.server.entity.Product;
import bit.project.server.entity.Productinventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported=false)
public interface ProductinventoryDao extends JpaRepository<Productinventory, Integer> {

    Productinventory findByProduct(Product product);
}
