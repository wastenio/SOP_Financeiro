package com.sop.finance.service;

import java.util.List;

import com.sop.finance.dto.DespesaDTO;

public interface DespesaService {
    DespesaDTO salvar(DespesaDTO despesaDTO);
    List<DespesaDTO> listarTodas();
    DespesaDTO buscarPorId(Long id);
    void deletar(Long id);
}
