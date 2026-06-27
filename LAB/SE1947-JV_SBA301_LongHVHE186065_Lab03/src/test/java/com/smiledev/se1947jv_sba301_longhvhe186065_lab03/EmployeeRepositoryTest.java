package com.smiledev.se1947jv_sba301_longhvhe186065_lab03;

import com.smiledev.se1947jv_sba301_longhvhe186065_lab03.data.Employee;
import com.smiledev.se1947jv_sba301_longhvhe186065_lab03.repository.EmployeeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@Import(EmployeeRepository.class)
public class EmployeeRepositoryTest {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Test
    public void testGetAllEmployees() {
        List<Employee> employees = employeeRepository.getAllEmployees();
        assertThat(employees).hasSize(4);
    }
}
