package com.sop.finance.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

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
public class DespesaDTO {

    private Long id;
    
    private String credor;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dataProtocolo;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataVencimento;
    
    private String descricao;
    
    private String numeroProtocolo;
    
    private String status;
    
    private String tipoDespesa;
    
    private BigDecimal valor;

    // Por enquanto pode ser uma lista genérica, ou substitua quando criar EmpenhoDTO
    private List<Object> empenhos;
}
