package com.sop.finance.service;

import com.sop.finance.dto.EmpenhoDTO;
import java.util.List;

public interface EmpenhoService {
    EmpenhoDTO salvar(EmpenhoDTO empenhoDTO);
    List<EmpenhoDTO> listarTodos();
    EmpenhoDTO buscarPorId(Long id);
    void deletar(Long id);
}
