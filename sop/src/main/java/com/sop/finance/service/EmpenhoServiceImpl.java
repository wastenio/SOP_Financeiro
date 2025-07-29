package com.sop.finance.service;

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
        Despesa despesa = despesaRepository.findById(dto.getDespesa().getId())
            .orElseThrow(() -> new ResourceNotFoundException("Despesa não encontrada com o ID: " + dto.getDespesa().getId()));

        Empenho empenho = EmpenhoMapper.toEntity(dto);

        // Associa o empenho à despesa via método auxiliar, para manter a lista sincronizada
        despesa.addEmpenho(empenho);

        // Salva a despesa — devido ao cascade, o empenho será salvo também
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
        if (!empenhoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Empenho não encontrado para exclusão.");
        }
        empenhoRepository.deleteById(id);
    }
}
