package com.sop.finance.repository;

import com.sop.finance.entity.Despesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DespesaRepository extends JpaRepository<Despesa, Long> {
    boolean existsByNumeroProtocolo(String numeroProtocolo);
}
