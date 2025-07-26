package com.sop.finance.service;

import com.sop.finance.dto.DespesaDTO;
import java.util.List;

public interface DespesaService {
    DespesaDTO salvar(DespesaDTO despesaDTO);
    List<DespesaDTO> listarTodas();
    DespesaDTO buscarPorId(Long id);
    void deletar(Long id);
}
