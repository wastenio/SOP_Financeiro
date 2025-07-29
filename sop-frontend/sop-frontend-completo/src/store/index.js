import { configureStore } from '@reduxjs/toolkit';
import despesaReducer from './slices/despesaSlice';
import empenhoReducer from './slices/empenhoSlice';
import pagamentoReducer from './slices/pagamentoSlice';

const store = configureStore({
  reducer: {
    despesa: despesaReducer,
    empenho: empenhoReducer,
    pagamento: pagamentoReducer,
  },
});

export default store;
