package com.sop.finance.mapper;

import com.sop.finance.dto.PagamentoDTO;
import com.sop.finance.entity.Pagamento;

public class PagamentoMapper {

    public static Pagamento toEntity(PagamentoDTO dto) {
        return Pagamento.builder()
                .id(dto.getId())
                .numeroPagamento(dto.getNumeroPagamento())
                .dataPagamento(dto.getDataPagamento())
                .valorPago(dto.getValorPago())
                .build();
    }

    public static PagamentoDTO toDTO(Pagamento entity) {
        return PagamentoDTO.builder()
                .id(entity.getId())
                .numeroPagamento(entity.getNumeroPagamento())
                .dataPagamento(entity.getDataPagamento())
                .valorPago(entity.getValorPago())
                .empenho(entity.getEmpenho().getId())
                .build();
    }
}
