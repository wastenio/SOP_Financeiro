package com.sop.finance.repository;

import com.sop.finance.entity.Empenho;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpenhoRepository extends JpaRepository<Empenho, Long> {
    boolean existsByNumeroEmpenho(String numeroEmpenho);
}
