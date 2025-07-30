const DespesaList = ({ despesas, onEdit }) => {
  if (!despesas || despesas.length === 0) {
    return <p className="text-center">Nenhuma despesa cadastrada.</p>;
  }

  return (
    <table className="table table-striped table-hover">
      <thead className="table-dark">
        <tr>
          <th>Credor</th>
          <th>Data Protocolo</th>
          <th>Data Vencimento</th>
          <th>Descrição</th>
          <th>Número Protocolo</th>
          <th>Status</th>
          <th>Tipo Despesa</th>
          <th>Valor</th>
          <th>Ações</th> {/* Coluna nova */}
        </tr>
      </thead>
      <tbody>
        {despesas.map((despesa) => (
          <tr key={despesa.id}>
            <td>{despesa.credor || '-'}</td>
            <td>{despesa.dataProtocolo ? new Date(despesa.dataProtocolo).toLocaleString('pt-BR') : '-'}</td>
            <td>{despesa.dataVencimento ? new Date(despesa.dataVencimento).toLocaleDateString('pt-BR') : '-'}</td>
            <td>{despesa.descricao || '-'}</td>
            <td>{despesa.numeroProtocolo || '-'}</td>
            <td>{despesa.status || '-'}</td>
            <td>{despesa.tipoDespesa || '-'}</td>
            <td>
              {typeof despesa.valor === 'number'
                ? despesa.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                : '-'}
            </td>
            <td>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => onEdit(despesa)}
              >
                Editar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DespesaList;
