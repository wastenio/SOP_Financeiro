package com.sop.finance.service;

import com.sop.finance.dto.EmpenhoDTO;
import com.sop.finance.entity.Despesa;
import com.sop.finance.entity.Empenho;
import com.sop.finance.exception.ResourceNotFoundException;
import com.sop.finance.mapper.EmpenhoMapper;
import com.sop.finance.repository.DespesaRepository;
import com.sop.finance.repository.EmpenhoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmpenhoServiceImpl implements EmpenhoService {

    private final EmpenhoRepository empenhoRepository;
    private final DespesaRepository despesaRepository;
    private final EmpenhoMapper empenhoMapper;

    @Override
    public EmpenhoDTO salvar(EmpenhoDTO dto) {
        // Verifica se a despesa referenciada existe
        Despesa despesa = despesaRepository.findById(dto.getDespesaId())
                .orElseThrow(() -> new ResourceNotFoundException("Despesa não encontrada com id: " + dto.getDespesaId()));

        Empenho empenho = empenhoMapper.toEntity(dto);
        empenho.setDespesa(despesa); // associa a despesa

        return empenhoMapper.toDTO(empenhoRepository.save(empenho));
    }

    @Override
    public List<EmpenhoDTO> listarTodos() {
        return empenhoRepository.findAll().stream()
                .map(empenhoMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public EmpenhoDTO buscarPorId(Long id) {
        Empenho empenho = empenhoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Empenho não encontrado com id: " + id));
        return empenhoMapper.toDTO(empenho);
    }

    @Override
    public void deletar(Long id) {
        if (!empenhoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Empenho não encontrado para exclusão.");
        }
        empenhoRepository.deleteById(id);
    }
}
