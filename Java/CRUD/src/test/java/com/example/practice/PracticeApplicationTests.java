package com.example.practice;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;


import com.example.practice.model.Student;
import com.example.practice.repository.StudentRepo;
import com.example.practice.service.StudentService;
import org.springframework.test.annotation.Rollback;

import javax.lang.model.element.Name;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class PracticeApplicationTests {

	@Autowired
	private StudentService service;

	@MockBean
	private StudentRepo repository;


	@Test
	@Order(1)
	@Rollback(value = false)
	public void createStudentTest(){
		Student student = new Student(1,"Shad",30);
		when(repository.save(student)).thenReturn(student);
		assertEquals(student,service.createStudent(student));
	}

	@Test
	@Order(2)
	@Rollback(value = false)
	public void getStudentsByIDTest(){
		if(repository.existsById(1)) {
		Student newstudent = repository.findById(1).get();
		assertThat(newstudent.getId()).isEqualTo(1);
	}
		else{
		System.out.println("Not Found the record");
	}
	}

	@Test
	@Order(3)
	@Rollback(value = false)
	public void getStudentsTest(){
		when(repository.findAll()).thenReturn(Stream
		.of(new Student(2,"Mohan",22),new Student(3,"Sohan",20)).collect(Collectors.toList()));
		assertEquals(2, service.getStudents().size());
	}
	@Test
	@Order(4)
	@Rollback(value = false)
	public void updateStudentTest(){
		if(repository.existsById(1)) {
			Student student = repository.findById(1).get();
			student.setName("Shad Sheikh");
			Student studentUpdate = repository.save(student);
			assertThat(studentUpdate.getName()).isEqualTo("Shad Sheikh");
		}
		else{
			System.out.println("Not Found the record");
		}
	}

	@Test
	@Order(5)
	@Rollback(value = false)
	public void deleteStudentTest(){
		Student student = new Student(1,"sheikh",30);
		int id = 1;
		service.deleteStudent(id);
		verify(repository,times(1)).deleteById(id);
	}
}
