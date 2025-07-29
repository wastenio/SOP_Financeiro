import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  credor: yup.string().required('Credor é obrigatório'),
  dataProtocolo: yup.string().required('Data Protocolo é obrigatória'),
  dataVencimento: yup.string().required('Data Vencimento é obrigatória'),
  descricao: yup.string().required('Descrição é obrigatória'),
  numeroProtocolo: yup.string().required('Número Protocolo é obrigatório'),
  status: yup.string().required('Status é obrigatório'),
  tipoDespesa: yup.string().required('Tipo Despesa é obrigatório'),
  valor: yup
    .number()
    .typeError('Valor deve ser um número')
    .positive('Valor deve ser positivo')
    .required('Valor é obrigatório'),
});

const DespesaForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const internalSubmit = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(internalSubmit)}>
      <div className="mb-3">
        <label>Credor</label>
        <input className="form-control" {...register('credor')} />
        <p className="text-danger">{errors.credor?.message}</p>
      </div>

      <div className="mb-3">
        <label>Data Protocolo</label>
        <input type="datetime-local" className="form-control" {...register('dataProtocolo')} />
        <p className="text-danger">{errors.dataProtocolo?.message}</p>
      </div>

      <div className="mb-3">
        <label>Data Vencimento</label>
        <input type="date" className="form-control" {...register('dataVencimento')} />
        <p className="text-danger">{errors.dataVencimento?.message}</p>
      </div>

      <div className="mb-3">
        <label>Descrição</label>
        <textarea className="form-control" {...register('descricao')} />
        <p className="text-danger">{errors.descricao?.message}</p>
      </div>

      <div className="mb-3">
        <label>Número Protocolo</label>
        <input className="form-control" {...register('numeroProtocolo')} />
        <p className="text-danger">{errors.numeroProtocolo?.message}</p>
      </div>

      <div className="mb-3">
        <label>Status</label>
        <input className="form-control" {...register('status')} />
        <p className="text-danger">{errors.status?.message}</p>
      </div>

      <div className="mb-3">
        <label>Tipo Despesa</label>
        <input className="form-control" {...register('tipoDespesa')} />
        <p className="text-danger">{errors.tipoDespesa?.message}</p>
      </div>

      <div className="mb-3">
        <label>Valor</label>
        <input type="number" step="0.01" className="form-control" {...register('valor')} />
        <p className="text-danger">{errors.valor?.message}</p>
      </div>

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Salvar Despesa'}
      </button>
    </form>
  );
};

export default DespesaForm;
