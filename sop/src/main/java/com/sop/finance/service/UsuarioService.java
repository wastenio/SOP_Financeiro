package com.sop.finance.service;

import java.util.List;
import java.util.Optional;

import com.sop.finance.dto.UsuarioDTO;

public interface UsuarioService {

	UsuarioDTO save(UsuarioDTO usuarioDTO);
    Optional<UsuarioDTO> findByUsername(String username);
    List<UsuarioDTO> findAll();
    Optional<UsuarioDTO> findById(Long id);
    UsuarioDTO update(UsuarioDTO usuarioDTO);
    void delete(Long id);
}
