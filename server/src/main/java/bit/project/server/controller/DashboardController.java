package bit.project.server.controller;

import bit.project.server.UsecaseList;

import bit.project.server.dao.EmployeeDao;
import bit.project.server.dao.MaterialDao;
import bit.project.server.dao.SupplierDao;
;
import bit.project.server.entity.Employee;
import bit.project.server.entity.Material;
import bit.project.server.entity.Supplier;
import bit.project.server.util.security.AccessControlManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/dashboard")
public class DashboardController {
    @Autowired
    public EmployeeDao employeeDao;

    @Autowired
    public SupplierDao supplierDao;

    @Autowired
    public MaterialDao materialDao;


    @Autowired
    public AccessControlManager accessControlManager;





    @GetMapping("/recent-employee-count")
    public HashMap getRecentEmployeeCount(HttpServletRequest request){
       // accessControlManager.authorize(request, "No privilege to get recent employees", UsecaseList.SHOW_ALL_EMPLOYEES);

        LocalDateTime timeWeekago=LocalDateTime.now().minusWeeks(1);
        List<Employee> recentemployees=employeeDao.findAllByToCreationAfter(timeWeekago);

        HashMap<String,Integer> data =new HashMap();

        data.put("count",recentemployees.size());
        return data;
    }






    @GetMapping("/recent-material-count")
    public HashMap getRecentMaterialCount(HttpServletRequest request){
       // accessControlManager.authorize(request, "No privilege to get recent materials", UsecaseList.SHOW_ALL_MATERIALS);

        LocalDateTime timeWeekago=LocalDateTime.now().minusWeeks(1);
        List<Material> recentmaterials=materialDao.findAllByToCreationAfter(timeWeekago);

        HashMap<String,Integer> data =new HashMap();

        data.put("count",recentmaterials.size());
        return data;
    }

    @GetMapping("/recent-supplier-count")
    public HashMap getRecentSupplierCount(HttpServletRequest request){
       // accessControlManager.authorize(request, "No privilege to get recent suppliers", UsecaseList.SHOW_ALL_SUPPLIERS);

        LocalDateTime timeWeekago=LocalDateTime.now().minusWeeks(1);
        List<Supplier> recentsuppliers=supplierDao.findAllByToCreationAfter(timeWeekago);

        HashMap<String,Integer> data =new HashMap();

        data.put("count",recentsuppliers.size());
        return data;
    }
}
