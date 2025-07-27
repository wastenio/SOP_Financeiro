package com.sop.finance.service;

import java.util.List;

import com.sop.finance.dto.EmpenhoDTO;

public interface EmpenhoService {
    EmpenhoDTO salvar(EmpenhoDTO empenhoDTO);
    List<EmpenhoDTO> listarTodos();
    EmpenhoDTO buscarPorId(Long id);
    void deletar(Long id);
}
