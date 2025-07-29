package com.sop.finance.service;

import java.util.List;
import java.util.Optional;

import com.sop.finance.dto.DespesaDTO;
import com.sop.finance.entity.Despesa;

public interface DespesaService {
//    DespesaDTO salvar(DespesaDTO dto);
	Despesa salvar(DespesaDTO dto);
//    List<DespesaDTO> listarTodas();
	List<Despesa> listarTodas();
//    DespesaDTO buscarPorId(Long id);
    void deletar(Long id);
    Optional<Despesa> buscarPorId(Long id);
}
