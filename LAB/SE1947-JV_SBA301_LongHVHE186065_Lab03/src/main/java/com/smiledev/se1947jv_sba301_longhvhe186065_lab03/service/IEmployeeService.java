package com.smiledev.se1947jv_sba301_longhvhe186065_lab03.service;

import com.smiledev.se1947jv_sba301_longhvhe186065_lab03.data.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface IEmployeeService {
    List<Employee> getAllEmployees();
    Optional<Employee> getEmployeeById(String id);
    Employee create(Employee employee);
    void delete(String id);
    Page<Employee> findAll(Pageable pageable);
}
