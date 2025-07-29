package com.sop.finance.mapper;

import org.springframework.stereotype.Component;

import com.sop.finance.dto.UsuarioDTO;
import com.sop.finance.entity.Usuario;

@Component
public class UsuarioMapper {

	public UsuarioDTO toDto(Usuario usuario) {
	    UsuarioDTO dto = new UsuarioDTO();
	    dto.setId(usuario.getId());
	    dto.setUserName(usuario.getUserName());
	    dto.setPassword(usuario.getPassword());
	    dto.setEmail(usuario.getEmail());
	    return dto;
	}


    public Usuario toEntity(UsuarioDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setId(dto.getId());
        usuario.setUserName(dto.getUserName());
        usuario.setPassword(dto.getPassword());
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
