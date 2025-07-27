package com.sop.finance.service;

import java.util.List;

import com.sop.finance.dto.PagamentoDTO;

public interface PagamentoService {
    PagamentoDTO salvar(PagamentoDTO pagamentoDTO);
    List<PagamentoDTO> listarTodos();
    PagamentoDTO buscarPorId(Long id);
    void deletar(Long id);
}
