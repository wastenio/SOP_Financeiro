package com.sop.finance.mapper;

import org.springframework.stereotype.Component;

import com.sop.finance.dto.UsuarioDTO;
import com.sop.finance.entity.Usuario;

@Component
public class UsuarioMapper {

    public UsuarioDTO toDto(Usuario usuario) {
        if (usuario == null) return null;
        // Não retorna senha por segurança
        return new UsuarioDTO(
            usuario.getId(),
            usuario.getUserName(),
            null,
            usuario.getEmail()
        );
    }

    public Usuario toEntity(UsuarioDTO dto) {
        if (dto == null) return null;
        Usuario usuario = new Usuario();
        usuario.setId(dto.getId());
        usuario.setUserName(dto.getUserName());
        usuario.setPassword(dto.getPassword());  // senha ainda não codificada
        usuario.setEmail(dto.getEmail());
        return usuario;
    }

    // Método para atualizar entidade existente com dados do DTO (exceto senha)
    public void updateEntityFromDto(UsuarioDTO dto, Usuario entity) {
        if (dto == null || entity == null) return;
        entity.setUserName(dto.getUserName());
        entity.setEmail(dto.getEmail());
        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            entity.setPassword(dto.getPassword()); // senha não codificada aqui, codifique no service
        }
    }
}
