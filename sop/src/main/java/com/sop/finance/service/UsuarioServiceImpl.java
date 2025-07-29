package com.sop.finance.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sop.finance.dto.UsuarioDTO;
import com.sop.finance.entity.Usuario;
import com.sop.finance.mapper.UsuarioMapper;
import com.sop.finance.repository.UsuarioRepository;
import com.sop.finance.exception.UsuarioNotFoundException;


@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final UsuarioMapper usuarioMapper;
    private final PasswordEncoder passwordEncoder;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository, UsuarioMapper usuarioMapper,
                              PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioMapper = usuarioMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UsuarioDTO save(UsuarioDTO usuarioDTO) {
        Usuario usuario = usuarioMapper.toEntity(usuarioDTO);
        usuario.setPassword(passwordEncoder.encode(usuarioDTO.getPassword())); // criptografa senha
        Usuario saved = usuarioRepository.save(usuario);
        return usuarioMapper.toDto(saved);
    }

    @Override
    public Optional<UsuarioDTO> findByUsername(String username) {
        return usuarioRepository.findByUserName(username)
                .map(usuarioMapper::toDto);
    }

    @Override
    public List<UsuarioDTO> findAll() {
        return usuarioRepository.findAll()
                .stream()
                .map(usuarioMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<UsuarioDTO> findById(Long id) {
        return usuarioRepository.findById(id)
                .map(usuarioMapper::toDto);
    }

    @Override
    public UsuarioDTO update(UsuarioDTO usuarioDTO) {
        Usuario usuario = usuarioRepository.findById(usuarioDTO.getId())
            .orElseThrow(() -> new UsuarioNotFoundException("Usuário não encontrado para atualização"));
        
        usuario.setUserName(usuarioDTO.getUserName());
        usuario.setEmail(usuarioDTO.getEmail());
        
        if (usuarioDTO.getPassword() != null && !usuarioDTO.getPassword().isEmpty()) {
            usuario.setPassword(passwordEncoder.encode(usuarioDTO.getPassword()));
        }
        
        Usuario updated = usuarioRepository.save(usuario);
        return usuarioMapper.toDto(updated);
    }


    @Override
    public void delete(Long id) {
        usuarioRepository.deleteById(id);
    }
}
