package com.smiledev.se1947jv_sba301_longhvhe186065_lab03.repository;

import com.smiledev.se1947jv_sba301_longhvhe186065_lab03.data.Employee;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

@NoRepositoryBean
public interface IEmployeeRepository extends PagingAndSortingRepository<Employee, String> {
    List<Employee> getAllEmployees();
    Optional<Employee> getEmployeeById(String id);
    Employee create(Employee employee);
    void delete(String id);
}
