package com.smiledev.se1947jv_sba301_longhvhe186065_lab03.repository;

import com.smiledev.se1947jv_sba301_longhvhe186065_lab03.data.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class EmployeeRepository implements IEmployeeRepository {
    private List<Employee> employees = createList();

    private List<Employee> createList() {
        List<Employee> list = new ArrayList<>();
        list.add(new Employee("EMP001", "Steven Paris", "Manager", 5000));
        list.add(new Employee("EMP002", "John Lemon", "Developer", 4000));
        list.add(new Employee("EMP003", "Alice Smith", "Designer", 3500));
        list.add(new Employee("EMP004", "Bob Johnson", "Tester", 3000));
        return list;
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employees;
    }

    @Override
    public Optional<Employee> getEmployeeById(String id) {
        return employees.stream().filter(e -> e.getEmpId().equals(id)).findFirst();
    }

    @Override
    public Employee create(Employee employee) {
        employees.add(employee);
        return employee;
    }

    @Override
    public void delete(String id) {
        employees.removeIf(e -> e.getEmpId().equals(id));
    }

    @Override
    public Iterable<Employee> findAll(Sort sort) {
        return employees;
    }

    @Override
    public Page<Employee> findAll(Pageable pageable) {
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), employees.size());
        List<Employee> sublist = new ArrayList<>();
        if (start <= end) {
            sublist = employees.subList(start, end);
        }
        return new PageImpl<>(sublist, pageable, employees.size());
    }
}
