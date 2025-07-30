package com.sop.finance.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.sop.finance.dto.EmpenhoDTO;
import com.sop.finance.entity.Despesa;
import com.sop.finance.entity.Empenho;
import com.sop.finance.exception.ResourceNotFoundException;
import com.sop.finance.mapper.EmpenhoMapper;
import com.sop.finance.repository.DespesaRepository;
import com.sop.finance.repository.EmpenhoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmpenhoServiceImpl implements EmpenhoService {

    private final EmpenhoRepository empenhoRepository;
    private final DespesaRepository despesaRepository;

    @Override
    public Empenho salvar(EmpenhoDTO dto) {
        if (empenhoRepository.existsByNumeroEmpenho(dto.getNumeroEmpenho())) {
            throw new IllegalArgumentException("Já existe um empenho com esse número.");
        }

        Despesa despesa = despesaRepository.findById(dto.getDespesa().getId())
            .orElseThrow(() -> new ResourceNotFoundException("Despesa não encontrada com o ID: " + dto.getDespesa().getId()));

        BigDecimal somaEmpenhosExistentes = despesa.getEmpenhos().stream()
            .map(Empenho::getValorEmpenhado)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (somaEmpenhosExistentes.add(dto.getValorEmpenhado()).compareTo(despesa.getValor()) > 0) {
            throw new IllegalArgumentException("A soma dos valores dos empenhos não pode ultrapassar o valor da despesa.");
        }

        Empenho empenho = EmpenhoMapper.toEntity(dto);

        despesa.addEmpenho(empenho);

        despesaRepository.save(despesa);

        return empenho;
    }

    @Override
    public List<Empenho> listarTodos() {
        return empenhoRepository.findAll();
    }

    @Override
    public Optional<Empenho> buscarPorId(Long id) {
        return empenhoRepository.findById(id);
    }

    @Override
    public void deletar(Long id) {
        Empenho empenho = empenhoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Empenho não encontrado para exclusão."));

        if (empenho.getPagamentos() != null && !empenho.getPagamentos().isEmpty()) {
            throw new IllegalStateException("Não é permitido excluir empenho que possua pagamentos associados.");
        }

        empenhoRepository.delete(empenho);
    }
}
