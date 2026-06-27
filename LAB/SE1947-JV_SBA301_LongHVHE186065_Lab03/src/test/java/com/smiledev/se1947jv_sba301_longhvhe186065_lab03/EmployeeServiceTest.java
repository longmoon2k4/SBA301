package com.smiledev.se1947jv_sba301_longhvhe186065_lab03;

import com.smiledev.se1947jv_sba301_longhvhe186065_lab03.data.Employee;
import com.smiledev.se1947jv_sba301_longhvhe186065_lab03.service.EmployeeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class EmployeeServiceTest {

    @Autowired
    private EmployeeService employeeService;

    @Test
    public void testGetAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        assertThat(employees).isNotEmpty();
    }
}
