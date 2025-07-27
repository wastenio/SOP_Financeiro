package com.sop.finance.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.sop.finance.dto.PagamentoDTO;
import com.sop.finance.entity.Pagamento;

@Mapper(componentModel = "spring")
public interface PagamentoMapper {
    PagamentoMapper INSTANCE = Mappers.getMapper(PagamentoMapper.class);

    PagamentoDTO toDTO(Pagamento pagamento);

    Pagamento toEntity(PagamentoDTO pagamentoDTO);
}
