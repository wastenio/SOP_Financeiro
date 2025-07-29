package com.sop.finance.service;

import java.util.List;
import java.util.Optional;

import com.sop.finance.dto.EmpenhoDTO;
import com.sop.finance.entity.Empenho;

public interface EmpenhoService {
//    EmpenhoDTO salvar(EmpenhoDTO empenhoDTO);
//    List<EmpenhoDTO> listarTodos();
//    EmpenhoDTO buscarPorId(Long id);
//    void deletar(Long id);
	
	Empenho salvar(EmpenhoDTO dto);
	List<Empenho> listarTodos();
	void deletar(Long id);
	Optional<Empenho> buscarPorId(Long id);
}
