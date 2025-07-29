const DespesaList = ({ despesas }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Credor</th>
          <th>Data Protocolo</th>
          <th>Data Vencimento</th>
          <th>Descrição</th>
          <th>Número Protocolo</th>
          <th>Status</th>
          <th>Tipo Despesa</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        {despesas.map(despesa => (
          <tr key={despesa.id}>
            <td>{despesa.credor}</td>
            <td>{new Date(despesa.dataProtocolo).toLocaleString()}</td>
            <td>{new Date(despesa.dataVencimento).toLocaleDateString()}</td>
            <td>{despesa.descricao}</td>
            <td>{despesa.numeroProtocolo}</td>
            <td>{despesa.status}</td>
            <td>{despesa.tipoDespesa}</td>
            <td>{despesa.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DespesaList;
