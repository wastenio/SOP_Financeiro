package com.sop.finance.service;

import java.util.List;
import java.util.Optional;

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

    @Override
    public Despesa salvar(DespesaDTO dto) {
        // Verifica se o número de protocolo já existe
        if (despesaRepository.existsByNumeroProtocolo(dto.getNumeroProtocolo())) {
            throw new IllegalArgumentException("Já existe uma despesa com esse número de protocolo.");
        }

        Despesa despesa = DespesaMapper.toEntity(dto);
        
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

	@Override
    public void deletar(Long id) {
        if (!despesaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Despesa não encontrada para exclusão.");
        }
        despesaRepository.deleteById(id);
    }

}