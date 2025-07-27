package com.sop.finance.dto;

import java.time.LocalDateTime;

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
    private String numeroProtocolo;
    private String tipoDespesa;
    private LocalDateTime dataProtocolo;
    private LocalDateTime dataVencimento;
    private String descricao;
    
    
}
