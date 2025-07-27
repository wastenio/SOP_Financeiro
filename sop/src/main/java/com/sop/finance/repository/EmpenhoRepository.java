package com.sop.finance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sop.finance.entity.Empenho;

@Repository
public interface EmpenhoRepository extends JpaRepository<Empenho, Long> {
    boolean existsByNumeroEmpenho(String numeroEmpenho);
}
