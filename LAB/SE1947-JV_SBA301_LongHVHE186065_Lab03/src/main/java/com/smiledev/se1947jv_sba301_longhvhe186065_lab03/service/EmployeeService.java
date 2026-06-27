package com.smiledev.se1947jv_sba301_longhvhe186065_lab03.service;

import com.smiledev.se1947jv_sba301_longhvhe186065_lab03.data.Employee;
import com.smiledev.se1947jv_sba301_longhvhe186065_lab03.repository.IEmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService implements IEmployeeService {

    @Autowired
    private IEmployeeRepository employeeRepository;

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.getAllEmployees();
    }

    @Override
    public Optional<Employee> getEmployeeById(String id) {
        return employeeRepository.getEmployeeById(id);
    }

    @Override
    public Employee create(Employee employee) {
        return employeeRepository.create(employee);
    }

    @Override
    public void delete(String id) {
        employeeRepository.delete(id);
    }

    @Override
    public Page<Employee> findAll(Pageable pageable) {
        return employeeRepository.findAll(pageable);
    }
}
