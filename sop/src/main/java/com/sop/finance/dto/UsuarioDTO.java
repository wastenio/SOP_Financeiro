package com.sop.finance.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


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

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;

	@NotBlank(message = "Email é obrigatório")
	@Email(message = "Email inválido")
	private String email;

}
