package com.sop.finance.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import com.sop.finance.entity.Despesa;
import com.sop.finance.entity.Empenho;

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
public class EmpenhoDTO {

    private Long id;
    private String numeroEmpenho;
    private LocalDate dataEmpenho;
    private BigDecimal valorEmpenhado;
    private Despesa despesa; // ID da despesa associada

    // Lista de pagamentos relacionados ao empenho (opcional: pode ser incluída futuramente)
    // private List<PagamentoDTO> pagamentos; 
}
