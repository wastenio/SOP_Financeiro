package com.sop.finance.mapper;

import org.mapstruct.Mapper;

import com.sop.finance.dto.DespesaDTO;
import com.sop.finance.entity.Despesa;


@Mapper(componentModel = "spring")
public interface DespesaMapper {
	
	public static DespesaDTO toDTO(Despesa despesa) {
		
		DespesaDTO dto = new DespesaDTO();
		
		dto.setId(despesa.getId());
		dto.setCredor(despesa.getCredor());
		dto.setDataProtocolo(despesa.getDataProtocolo());
		dto.setDataVencimento(despesa.getDataVencimento());
		dto.setDescricao(despesa.getDescricao());
		dto.setNumeroProtocolo(despesa.getNumeroProtocolo());
		dto.setStatus(despesa.getStatus());
		dto.setTipoDespesa(despesa.getTipoDespesa());
		dto.setValor(despesa.getValor());
		
		return dto;
	}
	
	public static Despesa toEntity(DespesaDTO dto) {
		
		Despesa despesa = new Despesa();
		
		despesa.setId(dto.getId());
		despesa.setCredor(dto.getCredor());
		despesa.setDataProtocolo(dto.getDataProtocolo());
		despesa.setDataVencimento(dto.getDataVencimento());
		despesa.setDescricao(dto.getDescricao());
		despesa.setNumeroProtocolo(dto.getNumeroProtocolo());
		despesa.setStatus(dto.getStatus());
		despesa.setTipoDespesa(dto.getTipoDespesa());
		despesa.setValor(dto.getValor());
		
		return despesa;
	}
	
}