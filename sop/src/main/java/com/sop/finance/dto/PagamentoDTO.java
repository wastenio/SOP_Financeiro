package com.sop.finance.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PagamentoDTO {

    private Long id;
    private String numeroPagamento;
    private LocalDate dataPagamento;
    private BigDecimal valorPago;
    private Long empenhoId; // Referência para o Empenho associado
}
