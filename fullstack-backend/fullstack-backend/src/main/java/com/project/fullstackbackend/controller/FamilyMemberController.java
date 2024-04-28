package com.project.fullstackbackend.controller;

import com.project.fullstackbackend.exception.FamilyMemberNotFoundException;
import com.project.fullstackbackend.model.FamilyMember;
import com.project.fullstackbackend.repository.FamilyMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class FamilyMemberController {

    @Autowired
    private FamilyMemberRepository familyMemberRepository;

    @Transactional(isolation = Isolation.READ_COMMITTED)
    @PostMapping("/familyMember")
    FamilyMember newFamilyMember(@RequestBody FamilyMember newFamilyMember){
        return familyMemberRepository.save(newFamilyMember);
    }

    @Transactional(isolation = Isolation.READ_COMMITTED)
    @GetMapping("/familyMember")
    List<FamilyMember> getAllFamilyMembers(){
        return familyMemberRepository.findAll();
    }

    @Transactional(isolation = Isolation.READ_COMMITTED)
    @GetMapping("/familyMember/{id}")
    FamilyMember getFamilyMemberById(@PathVariable Long id) {
        return familyMemberRepository.findById(id).orElseThrow(()->new FamilyMemberNotFoundException(id));
    }

    @Transactional(isolation = Isolation.READ_COMMITTED)
    @PutMapping("/familyMember/{id}")
    FamilyMember updateFamilyMember(@RequestBody FamilyMember newFamilyMember, @PathVariable Long id) {
        return familyMemberRepository.findById(id).map(familyMember->{
            familyMember.setUsername(newFamilyMember.getUsername());
            familyMember.setName(newFamilyMember.getName());
            familyMember.setEmail(newFamilyMember.getEmail());
            familyMember.setPhone(newFamilyMember.getPhone());
            familyMember.setAge(newFamilyMember.getAge());
            familyMember.setGender(newFamilyMember.getGender());
            return familyMemberRepository.save(familyMember);
        }).orElseThrow(()->new FamilyMemberNotFoundException(id));
    }

    @Transactional(isolation = Isolation.READ_COMMITTED)
    @DeleteMapping("/familyMember/{id}")
    String deleteFamilyMember(@PathVariable Long id) {
        if (!familyMemberRepository.existsById(id)) {
            throw new FamilyMemberNotFoundException(id);
        }
        familyMemberRepository.deleteById(id);
        return "FamilyMember with id " + id + " has been deleted successfully";
    }

}
