package bit.project.server.dao;

import bit.project.server.entity.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.time.LocalDateTime;
import java.util.List;

@RepositoryRestResource(exported=false)
public interface SupplierDao extends JpaRepository<Supplier, Integer>{
    Supplier findByCode(String code);
    Supplier findByName(String name);
    Supplier findByEmail(String email);

    @Query("select new Supplier (s.id,s.code,s.name) from Supplier s")
    Page<Supplier> findAllBasic(PageRequest pageRequest);

    @Query("select new Supplier (s.id,s.code,s.name) from Supplier s where s.tocreation>=:dateTime")
    List<Supplier> findAllByToCreationAfter (@Param("dateTime") LocalDateTime datetime) ;
}
