package com.smiledev.se1947jv_sba301_longhvhe186065_lab03.controller;

import com.smiledev.se1947jv_sba301_longhvhe186065_lab03.data.Employee;
import com.smiledev.se1947jv_sba301_longhvhe186065_lab03.service.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private IEmployeeService employeeService;

    @GetMapping
    public Object getAllEmployees(
            @RequestParam(defaultValue = "0", required = false) Integer page,
            @RequestParam(defaultValue = "10", required = false) Integer size,
            @RequestParam(required = false) String sort) {
        if (page != null && size != null) {
            Pageable pageable = PageRequest.of(page, size);
            return employeeService.findAll(pageable);
        }
        return employeeService.getAllEmployees();
    }

    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable String id) {
        Optional<Employee> emp = employeeService.getEmployeeById(id);
        return emp.orElse(null);
    }

    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeService.create(employee);
    }

    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable String id) {
        employeeService.delete(id);
    }
}
