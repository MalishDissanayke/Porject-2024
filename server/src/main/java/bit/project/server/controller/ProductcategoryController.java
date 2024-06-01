package bit.project.server.controller;

import bit.project.server.dao.ProductcategoryDao;
import bit.project.server.dao.SupplierstatusDao;
import bit.project.server.entity.Productcategory;
import bit.project.server.entity.Supplierstatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/productcategories")
public class ProductcategoryController {
    @Autowired
    private ProductcategoryDao productcategoryDao;

    @GetMapping
    public List<Productcategory> getAll(){
        return productcategoryDao.findAll();
    }
}
