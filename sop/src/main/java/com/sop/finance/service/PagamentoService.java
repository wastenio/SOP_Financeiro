package com.sop.finance.service;

import com.sop.finance.dto.PagamentoDTO;
import java.util.List;

public interface PagamentoService {
    PagamentoDTO salvar(PagamentoDTO pagamentoDTO);
    List<PagamentoDTO> listarTodos();
    PagamentoDTO buscarPorId(Long id);
    void deletar(Long id);
}
