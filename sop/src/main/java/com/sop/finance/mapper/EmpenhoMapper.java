package com.sop.finance.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.sop.finance.dto.EmpenhoDTO;
import com.sop.finance.entity.Empenho;

@Mapper(componentModel = "spring")
public interface EmpenhoMapper {
    EmpenhoMapper INSTANCE = Mappers.getMapper(EmpenhoMapper.class);

//    EmpenhoDTO toDTO(Empenho empenho);
//
//    Empenho toEntity(EmpenhoDTO empenhoDTO);
    
    public static EmpenhoDTO toDTO(Empenho empenho) {
    	
    	EmpenhoDTO dto = new EmpenhoDTO();
    	
    	dto.setId(empenho.getId());
    	dto.setNumeroEmpenho(empenho.getNumeroEmpenho());
    	dto.setDataEmpenho(empenho.getDataEmpenho());
    	dto.setValorEmpenhado(empenho.getValorEmpenhado());
    	dto.setDespesa(empenho.getDespesa()); // verificar esse campo
    	
    	return dto;
    }
    
    public static Empenho toEntity(EmpenhoDTO dto) {
    	
    	Empenho empenho = new Empenho();
    	
    	empenho.setId(dto.getId());
    	empenho.setNumeroEmpenho(dto.getNumeroEmpenho());
    	empenho.setDataEmpenho(dto.getDataEmpenho());
    	empenho.setValorEmpenhado(dto.getValorEmpenhado());
    	empenho.setDespesa(dto.getDespesa()); //verificar esse campo
    	
    	return empenho;
    }
}
