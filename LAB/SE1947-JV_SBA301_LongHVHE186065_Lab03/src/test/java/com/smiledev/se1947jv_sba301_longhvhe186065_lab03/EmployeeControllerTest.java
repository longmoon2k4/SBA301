package com.smiledev.se1947jv_sba301_longhvhe186065_lab03;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smiledev.se1947jv_sba301_longhvhe186065_lab03.controller.EmployeeController;
import com.smiledev.se1947jv_sba301_longhvhe186065_lab03.data.Employee;
import com.smiledev.se1947jv_sba301_longhvhe186065_lab03.service.IEmployeeService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(EmployeeController.class)
public class EmployeeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IEmployeeService employeeService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testGetAllEmployees() throws Exception {
        Employee emp = new Employee("EMP001", "Steven Paris", "Manager", 5000);
        List<Employee> list = Arrays.asList(emp);
        Pageable pageable = PageRequest.of(0, 10);
        Mockito.when(employeeService.findAll(any(Pageable.class))).thenReturn(new PageImpl<>(list, pageable, 1));

        mockMvc.perform(get("/employees?page=0&size=10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].empId").value("EMP001"));
    }
}
