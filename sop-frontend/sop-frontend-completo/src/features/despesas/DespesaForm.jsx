import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect } from 'react';


const schema = yup.object().shape({
  credor: yup.string().required('Credor é obrigatório'),
  dataProtocolo: yup.date()
    .transform((value, originalValue) => (originalValue === '' ? null : new Date(originalValue)))
    .typeError('Data Protocolo deve ser uma data válida')
    .required('Data Protocolo é obrigatória'),
  dataVencimento: yup.date()
    .transform((value, originalValue) => (originalValue === '' ? null : new Date(originalValue)))
    .typeError('Data Vencimento deve ser uma data válida')
    .required('Data Vencimento é obrigatória'),
  descricao: yup.string().required('Descrição é obrigatória'),
  numeroProtocolo: yup.string()
    .required('Número Protocolo é obrigatório')
    .matches(/^[^zZ]*$/, 'Número Protocolo não pode conter a letra "z"'),
  status: yup.string()
    .required('Status é obrigatório')
    .oneOf(
      [
        'Aguardando Empenho',
        'Parcialmente Empenhada',
        'Aguardando Pagamento',
        'Parcialmente Paga',
        'Paga',
      ],
      'Status inválido'
    ),
  tipoDespesa: yup.string().required('Tipo Despesa é obrigatório'),
  valor: yup
    .number()
    .typeError('Valor deve ser um número')
    .positive('Valor deve ser positivo')
    .required('Valor é obrigatório'),
});

const DespesaForm = ({ onSubmit, initialData = null }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {}, // já seta valores iniciais no load
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);  // atualiza formulário se initialData mudar
    }
  }, [initialData, reset]);

  const internalSubmit = async (data) => {
    await onSubmit(data);
    // só resetar se não estiver editando (evitar perder dados em edição)
    if (!initialData) reset();
  };

  return (
    <form onSubmit={handleSubmit(internalSubmit)}>
      {/* ... seus inputs e labels aqui iguais ao original ... */}
      {/* Exemplo: */}
      <div className="mb-3">
        <label>Credor</label>
        <input className="form-control" {...register('credor')} />
        <p className="text-danger">{errors.credor?.message}</p>
      </div>
      {/* Resto dos campos ... */}

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Salvar Despesa'}
      </button>
    </form>
  );
};

export default DespesaForm;
