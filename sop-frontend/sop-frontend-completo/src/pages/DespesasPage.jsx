import { useEffect, useState } from "react";
import api from "../api";
import DespesaForm from "../features/despesas/DespesaForm";
import DespesaList from "../features/despesas/DespesaList";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DespesasPage = () => {
  const [despesas, setDespesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDespesa, setEditDespesa] = useState(null);

  const fetchDespesas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/despesas");
      setDespesas(response.data);
    } catch (err) {
      setError("Erro ao carregar despesas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDespesas();
  }, []);

  const handleAddOrUpdateDespesa = async (data) => {
    setError(null);
    try {
      const payload = {
        ...data,
        valor: parseFloat(data.valor),
        dataProtocolo: data.dataProtocolo,
        dataVencimento: data.dataVencimento,
      };

      if (editDespesa) {
        // Atualizar despesa (PUT)
        const response = await api.put(`/despesas/${editDespesa.id}`, payload);
        setDespesas((prev) =>
          prev.map((d) => (d.id === editDespesa.id ? response.data : d))
        );
        toast.success("Despesa atualizada com sucesso!");
        setEditDespesa(null);
      } else {
        // Criar despesa (POST)
        const response = await api.post("/despesas", payload);
        setDespesas((prev) => [...prev, response.data]);
        toast.success("Despesa salva com sucesso!");
      }
    } catch (err) {
      setError("Erro ao salvar despesa");
      toast.error("Erro ao salvar despesa");
    }
  };

  const handleEditClick = (despesa) => {
    setEditDespesa(despesa);
    window.scrollTo({ top: 0, behavior: "smooth" }); // opcional: rolar para o form
  };

  const handleCancelEdit = () => {
    setEditDespesa(null);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div
          className="spinner-border"
          role="status"
          aria-label="Carregando despesas"
        >
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Cadastro de Despesas</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">
                {editDespesa ? "Editar Despesa" : "Nova Despesa"}
              </h5>
              <DespesaForm
                onSubmit={handleAddOrUpdateDespesa}
                initialData={editDespesa}
              />
              {editDespesa && (
                <button
                  className="btn btn-secondary mt-2"
                  onClick={handleCancelEdit}
                >
                  Cancelar Edição
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Despesas Cadastradas</h5>
              <DespesaList despesas={despesas} onEdit={handleEditClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DespesasPage;
