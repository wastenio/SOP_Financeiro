package com.sop.finance.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.sop.finance.dto.DespesaDTO;
import com.sop.finance.entity.Despesa;
import com.sop.finance.entity.Empenho;
import com.sop.finance.exception.ResourceNotFoundException;
import com.sop.finance.mapper.DespesaMapper;
import com.sop.finance.repository.DespesaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DespesaServiceImpl implements DespesaService {

	private final DespesaRepository despesaRepository;

	@Override
	public Despesa salvar(DespesaDTO dto) {
		if (despesaRepository.existsByNumeroProtocolo(dto.getNumeroProtocolo())) {
			throw new IllegalArgumentException("Já existe uma despesa com esse número de protocolo.");
		}

		Despesa despesa = DespesaMapper.toEntity(dto);

		// Talvez inicializar status da despesa como "Aguardando Empenho"
		despesa.setStatus("Aguardando Empenho");

		return despesaRepository.save(despesa);
	}

	@Override
	public List<Despesa> listarTodas() {
		return despesaRepository.findAll();
	}

	@Override
	public Optional<Despesa> buscarPorId(Long id) {
		Optional<Despesa> despesa = despesaRepository.findById(id);
		return despesa;
	}

	public void atualizarStatus(Despesa despesa) {
	    BigDecimal somaEmpenhos = despesa.getEmpenhos().stream()
	            .map(Empenho::getValorEmpenhado)
	            .reduce(BigDecimal.ZERO, BigDecimal::add);

	    BigDecimal somaPagamentos = despesa.getEmpenhos().stream()
	            .flatMap(empenho -> empenho.getPagamentos().stream())
	            .map(pagamento -> pagamento.getValorPago())
	            .reduce(BigDecimal.ZERO, BigDecimal::add);

	    BigDecimal valorDespesa = despesa.getValor();

	    if (somaEmpenhos.compareTo(BigDecimal.ZERO) == 0) {
	        despesa.setStatus("Aguardando Empenho");
	    } else if (somaEmpenhos.compareTo(valorDespesa) < 0) {
	        despesa.setStatus("Parcialmente Empenhada");
	    } else if (somaEmpenhos.compareTo(valorDespesa) == 0 && somaPagamentos.compareTo(BigDecimal.ZERO) == 0) {
	        despesa.setStatus("Aguardando Pagamento");
	    } else if (somaPagamentos.compareTo(valorDespesa) < 0) {
	        despesa.setStatus("Parcialmente Paga");
	    } else if (somaPagamentos.compareTo(valorDespesa) == 0) {
	        despesa.setStatus("Paga");
	    }

	    despesaRepository.save(despesa);
	}


	@Override
	public void deletar(Long id) {
		Despesa despesa = despesaRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Despesa não encontrada para exclusão."));

		if (despesa.getEmpenhos() != null && !despesa.getEmpenhos().isEmpty()) {
			throw new IllegalStateException("Não é permitido excluir despesa com empenhos associados.");
		}

		despesaRepository.deleteById(id);
	}

}