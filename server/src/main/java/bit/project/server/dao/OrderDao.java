package bit.project.server.dao;

import bit.project.server.entity.Employee;
import bit.project.server.entity.Order;
import bit.project.server.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(exported=false)
public interface OrderDao extends JpaRepository<Order, Integer> {

    List<Order> findByCreator(Integer creator);
}
