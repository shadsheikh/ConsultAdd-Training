package com.example.practice.service;

import com.example.practice.model.Student;
import com.example.practice.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepo studentRepo;

    //Create New student details

    public String createStudent(Student student){
        if(this.studentRepo.existsById(student.getId())){
            return "Student already exists";
        }
        else{
            this.studentRepo.save(student);
            return "Student details are saved.";
        }
    }

    //get all student details

    public List<Student> getStudents(){
        return this.studentRepo.findAll();
    }

    //delete student
    public void deleteStudent(int id) {
        this.studentRepo.deleteById(id);
    }

    //update student
    public Student updateStudent(Student student) {
        if(this.studentRepo.existsById(student.getId())){
            this.studentRepo.save(student);
            return student;
        }
        return null;
    }

    //get student by id
    public Student getStudentsByID(int id) {
        if(this.studentRepo.findById(id).isPresent()){
            return this.studentRepo.findById(id).get();
        }
        return null;
    }
}
