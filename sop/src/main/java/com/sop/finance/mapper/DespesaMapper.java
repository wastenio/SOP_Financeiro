package com.sop.finance.mapper;

import org.mapstruct.Mapper;

import com.sop.finance.dto.DespesaDTO;
import com.sop.finance.entity.Despesa;


@Mapper(componentModel = "spring")
public interface DespesaMapper {

	DespesaDTO toDTO(Despesa entity);
	Despesa toEntity(DespesaDTO dto);
}