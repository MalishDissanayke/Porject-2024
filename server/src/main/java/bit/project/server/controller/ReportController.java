package bit.project.server.controller;

import bit.project.server.UsecaseList;
import bit.project.server.dao.EmployeeDao;
import bit.project.server.dao.MaterialDao;
import bit.project.server.util.security.AccessControlManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/reports")
public class ReportController {

    @Autowired
    public EmployeeDao employeeDao;

    @Autowired
    private MaterialDao materialDao;

    @Autowired
    public AccessControlManager accessControlManager;

    @GetMapping("/year-wise-employee-count/{yearcount}")
    public ArrayList<HashMap<String, Object>> yearWiseEmployeeCount(@PathVariable Integer yearcount, HttpServletRequest request) {
        accessControlManager.authorize(request, "No privilege to get recent employees", UsecaseList.SHOW_YEAR_WISE_EMPLOYEE_COUNT);

        ArrayList<HashMap<String, Object>> data = new ArrayList<>();
        ArrayList<LocalDateTime[]> years = new ArrayList<>();
        LocalDateTime[] currentYear = new LocalDateTime[2];

        currentYear[0] = LocalDateTime.of(LocalDate.now().getYear(), 1, 1, 0, 0);
        currentYear[1] = LocalDateTime.of(LocalDate.now().getYear(), 12, 31, 23, 59, 59);
        years.add(currentYear);

        for (int i = 0; i < yearcount - 1; i++) {
            LocalDateTime[] year = new LocalDateTime[2];
            LocalDateTime[] lastYear = years.get(years.size() - 1);
            year[0] = lastYear[0].minusYears(1);
            year[1] = lastYear[1].minusYears(1);
            years.add(year);
        }

        for (LocalDateTime[] year : years) {
            String y = String.valueOf(year[0].getYear());
            Long count = employeeDao.countEmployeesByCreatedDateBetween(year[0], year[1]);
            HashMap<String, Object> d = new HashMap<>();
            d.put("year", y);
            d.put("count", count);
            data.add(d);
        }

        return data;
    }

    @GetMapping("/material-report")
    public List<HashMap<String, Object>> materialQuantities(HttpServletRequest request) {
        accessControlManager.authorize(request, "No privilege to get material quantities", UsecaseList.SHOW_MATERIAL_QUANTITIES);

        List<Object[]> results = materialDao.findAllMaterialsAndQuantities();
        List<HashMap<String, Object>> data = new ArrayList<>();

        for (Object[] result : results) {
            HashMap<String, Object> record = new HashMap<>();
            record.put("name", result[0]);
            record.put("quantity", result[1]);
            data.add(record);
        }

        return data;
    }
}
