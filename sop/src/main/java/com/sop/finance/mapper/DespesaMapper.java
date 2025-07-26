package com.sop.finance.mapper;

import com.sop.finance.dto.DespesaDTO;
import com.sop.finance.entity.Despesa;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface DespesaMapper {
    DespesaMapper INSTANCE = Mappers.getMapper(DespesaMapper.class);

    DespesaDTO toDTO(Despesa despesa);

    Despesa toEntity(DespesaDTO despesaDTO);
}
