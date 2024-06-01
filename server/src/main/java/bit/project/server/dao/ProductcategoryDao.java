package bit.project.server.dao;

import bit.project.server.entity.Productcategory;
import bit.project.server.entity.Suppliertype;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported=false)
public interface ProductcategoryDao extends JpaRepository<Productcategory, Integer> {
}
