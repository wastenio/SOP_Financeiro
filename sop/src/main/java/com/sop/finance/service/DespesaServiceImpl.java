package com.sop.finance.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.sop.finance.dto.DespesaDTO;
import com.sop.finance.entity.Despesa;
import com.sop.finance.exception.ResourceNotFoundException;
import com.sop.finance.mapper.DespesaMapper;
import com.sop.finance.repository.DespesaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DespesaServiceImpl implements DespesaService {

	private final DespesaRepository despesaRepository;
    private final DespesaMapper despesaMapper;

    @Override
    public DespesaDTO salvar(DespesaDTO dto) {
        // Verifica se o número de protocolo já existe
        if (despesaRepository.existsByNumeroProtocolo(dto.getNumeroProtocolo())) {
            throw new IllegalArgumentException("Já existe uma despesa com esse número de protocolo.");
        }

        Despesa despesa = despesaMapper.toEntity(dto);
        return despesaMapper.toDTO(despesaRepository.save(despesa));
    }

    @Override
    public List<DespesaDTO> listarTodas() {
        return despesaRepository.findAll().stream()
                .map(despesaMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DespesaDTO buscarPorId(Long id) {
        Despesa despesa = despesaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Despesa não encontrada com id: " + id));
        return despesaMapper.toDTO(despesa);
    }

    @Override
    public void deletar(Long id) {
        if (!despesaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Despesa não encontrada para exclusão.");
        }
        despesaRepository.deleteById(id);
    }
}
