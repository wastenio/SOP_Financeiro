package com.sop.finance.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PagamentoDTO {

    private Long id;
    private String numeroPagamento;
    private LocalDate dataPagamento;
    private BigDecimal valorPago;
    private Long empenhoId;
}
