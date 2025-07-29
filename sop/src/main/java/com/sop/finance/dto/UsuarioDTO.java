package com.sop.finance.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioDTO {
	

	private Long id;

	@NotBlank(message = "Nome de usuário é obrigatório")
	@Size(min = 3, max = 50)
	private String userName;

	@NotBlank(message = "Senha é obrigatória")
	@Size(min = 6, max = 100)
	private String password;

	@NotBlank(message = "Email é obrigatório")
	@Email(message = "Email inválido")
	private String email;

}
