package com.sop.finance.repository;

import com.sop.finance.entity.Pagamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {
    boolean existsByNumeroPagamento(String numeroPagamento);
}
