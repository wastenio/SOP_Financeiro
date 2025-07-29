import { configureStore } from '@reduxjs/toolkit';
import despesaReducer from '../features/despesas/despesaSlice';
import empenhoReducer from '../features/empenhos/empenhoSlice';
import pagamentoReducer from '../features/pagamentos/pagamentoSlice';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: {
    despesas: despesaReducer,
    empenhos: empenhoReducer,
    pagamentos: pagamentoReducer,
    auth: authReducer,
  },
});

export default store;

