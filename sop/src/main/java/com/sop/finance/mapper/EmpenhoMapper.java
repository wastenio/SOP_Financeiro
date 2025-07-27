package com.sop.finance.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.sop.finance.dto.EmpenhoDTO;
import com.sop.finance.entity.Empenho;

@Mapper(componentModel = "spring")
public interface EmpenhoMapper {
    EmpenhoMapper INSTANCE = Mappers.getMapper(EmpenhoMapper.class);

    EmpenhoDTO toDTO(Empenho empenho);

    Empenho toEntity(EmpenhoDTO empenhoDTO);
}
