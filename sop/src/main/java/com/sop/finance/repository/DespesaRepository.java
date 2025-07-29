package com.sop.finance.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sop.finance.entity.Despesa;

@Repository
public interface DespesaRepository extends JpaRepository<Despesa, Long> {
    boolean existsByNumeroProtocolo(String numeroProtocolo);

	Optional<Despesa> findById(Optional<Despesa> despesa);
}
