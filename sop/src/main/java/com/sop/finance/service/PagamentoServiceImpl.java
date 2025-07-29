package com.sop.finance.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.sop.finance.dto.PagamentoDTO;
import com.sop.finance.entity.Empenho;
import com.sop.finance.entity.Pagamento;
import com.sop.finance.exception.ResourceNotFoundException;
import com.sop.finance.mapper.PagamentoMapper;
import com.sop.finance.repository.EmpenhoRepository;
import com.sop.finance.repository.PagamentoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PagamentoServiceImpl implements PagamentoService {

    private final PagamentoRepository pagamentoRepository;
    private final EmpenhoRepository empenhoRepository;

    @Override
    public PagamentoDTO salvar(PagamentoDTO dto) {
        // Busca o Empenho associado
    	Empenho empenho = empenhoRepository.findById(dto.getEmpenho())
                .orElseThrow(() -> new ResourceNotFoundException("Empenho não encontrado com id: " + dto.getEmpenho()));

        Pagamento pagamento = PagamentoMapper.toEntity(dto);
        pagamento.setEmpenho(empenho);

        return PagamentoMapper.toDTO(pagamentoRepository.save(pagamento));
    }

    @Override
    public List<PagamentoDTO> listarTodos() {
        return pagamentoRepository.findAll().stream()
                .map(PagamentoMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PagamentoDTO buscarPorId(Long id) {
        Pagamento pagamento = pagamentoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pagamento não encontrado com id: " + id));
        return PagamentoMapper.toDTO(pagamento);
    }

    @Override
    public void deletar(Long id) {
        if (!pagamentoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Pagamento não encontrado para exclusão.");
        }
        pagamentoRepository.deleteById(id);
    }
}
