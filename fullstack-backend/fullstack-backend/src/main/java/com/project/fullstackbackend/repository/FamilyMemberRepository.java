package com.project.fullstackbackend.repository;

import com.project.fullstackbackend.model.FamilyMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FamilyMemberRepository extends JpaRepository<FamilyMember, Long> {
}
