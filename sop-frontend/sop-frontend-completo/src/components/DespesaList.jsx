import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DespesaList = () => {
  const [despesas, setDespesas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/despesas')
      .then(response => setDespesas(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Despesas</h2>
      <ul>
        {despesas.map((d) => (
          <li key={d.id}>{d.numeroProtocolo} - {d.credor}</li>
        ))}
      </ul>
    </div>
  );
};

export default DespesaList;
